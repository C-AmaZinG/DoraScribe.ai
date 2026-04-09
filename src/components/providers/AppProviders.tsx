"use client";

import React, { useEffect, useRef } from "react";
import { LanguageProvider, SupportedLanguage, useLanguage } from "@/lib/language-context";

const EXCLUDED_TAGS = new Set([
  "SCRIPT",
  "STYLE",
  "NOSCRIPT",
  "TEXTAREA",
  "INPUT",
  "SELECT",
  "OPTION",
  "CODE",
  "PRE",
  "SVG",
]);

type TextNodeEntry = {
  node: Text;
  original: string;
};

function isTranslatableNode(node: Text) {
  const parent = node.parentElement;
  if (!parent) return false;
  if (EXCLUDED_TAGS.has(parent.tagName)) return false;
  if (parent.closest("[data-no-translate='true']")) return false;
  const text = node.textContent?.trim() ?? "";
  if (!text) return false;
  return /[A-Za-z]/.test(text);
}

function collectTranslatableNodes(root: Node) {
  if (root.nodeType === Node.TEXT_NODE) {
    const textNode = root as Text;
    return isTranslatableNode(textNode)
      ? [{ node: textNode, original: textNode.textContent ?? "" }]
      : [];
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const entries: TextNodeEntry[] = [];
  let currentNode = walker.nextNode();
  while (currentNode) {
    const textNode = currentNode as Text;
    if (isTranslatableNode(textNode)) {
      entries.push({ node: textNode, original: textNode.textContent ?? "" });
    }
    currentNode = walker.nextNode();
  }
  return entries;
}

function TranslationEngine() {
  const { activeLanguage } = useLanguage();
  const originalTextMapRef = useRef(new WeakMap<Text, string>());
  const cacheRef = useRef(new Map<string, string>());
  const runIdRef = useRef(0);

  const translateBatchWithLibre = async (texts: string[], targetLanguage: SupportedLanguage) => {
    const endpoints = [
      "https://translate.argosopentech.com/translate",
      "https://libretranslate.de/translate",
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            q: texts,
            source: "en",
            target: targetLanguage,
            format: "text",
          }),
        });

        if (!response.ok) {
          continue;
        }

        const data = (await response.json()) as
          | { translatedText?: string | string[] }
          | Array<{ translatedText?: string }>;

        if (Array.isArray(data)) {
          const translated = data.map((item) => item.translatedText ?? "");
          if (translated.length === texts.length) return translated;
          continue;
        }

        if (Array.isArray(data.translatedText)) {
          if (data.translatedText.length === texts.length) return data.translatedText;
          continue;
        }

        if (typeof data.translatedText === "string" && texts.length === 1) {
          return [data.translatedText];
        }
      } catch {
        // Try next endpoint.
      }
    }

    throw new Error("LibreTranslate batch failed");
  };

  const translateSingleWithGoogle = async (text: string, targetLanguage: SupportedLanguage) => {
    const cacheKey = `${targetLanguage}::${text}`;
    const cached = cacheRef.current.get(cacheKey);
    if (cached) return cached;

    try {
      const url =
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLanguage}&dt=t&q=` +
        encodeURIComponent(text);
      const response = await fetch(url);
      if (!response.ok) return text;

      const data = (await response.json()) as unknown;
      const translated =
        Array.isArray(data) && Array.isArray(data[0])
          ? (data[0] as Array<[string]>).map((item) => item[0]).join("")
          : text;

      cacheRef.current.set(cacheKey, translated);
      return translated;
    } catch {
      return text;
    }
  };

  useEffect(() => {
    if (typeof document === "undefined") return;
    const entries = collectTranslatableNodes(document.body);
    for (const entry of entries) {
      if (!originalTextMapRef.current.has(entry.node)) {
        originalTextMapRef.current.set(entry.node, entry.original);
      }
    }

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") {
          const textNode = mutation.target as Text;
          if (isTranslatableNode(textNode) && !originalTextMapRef.current.has(textNode)) {
            originalTextMapRef.current.set(textNode, textNode.textContent ?? "");
          }
          continue;
        }
        for (const addedNode of mutation.addedNodes) {
          const newEntries = collectTranslatableNodes(addedNode);
          for (const entry of newEntries) {
            if (!originalTextMapRef.current.has(entry.node)) {
              originalTextMapRef.current.set(entry.node, entry.original);
            }
          }
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    runIdRef.current += 1;
    const currentRunId = runIdRef.current;

    const allEntries = collectTranslatableNodes(document.body);

    // Always restore original English copy before applying another language.
    for (const { node } of allEntries) {
      const original = originalTextMapRef.current.get(node);
      if (original !== undefined) {
        node.textContent = original;
      }
    }

    if (activeLanguage.language === "en") {
      return;
    }

    const uniqueTexts = new Map<string, Text[]>();
    for (const { node } of allEntries) {
      const original = originalTextMapRef.current.get(node);
      if (!original) continue;
      if (!uniqueTexts.has(original)) {
        uniqueTexts.set(original, []);
      }
      uniqueTexts.get(original)?.push(node);
    }

    const run = async () => {
      const textsToTranslate = Array.from(uniqueTexts.keys());
      const uncachedTexts = textsToTranslate.filter(
        (text) => !cacheRef.current.has(`${activeLanguage.language}::${text}`)
      );

      if (uncachedTexts.length > 0) {
        const batchSize = 32;
        for (let i = 0; i < uncachedTexts.length; i += batchSize) {
          const chunk = uncachedTexts.slice(i, i + batchSize);
          try {
            const translatedChunk = await translateBatchWithLibre(chunk, activeLanguage.language);
            if (runIdRef.current !== currentRunId) return;
            chunk.forEach((original, index) => {
              cacheRef.current.set(
                `${activeLanguage.language}::${original}`,
                translatedChunk[index] ?? original
              );
            });
          } catch {
            const fallbackResults = await Promise.all(
              chunk.map((text) => translateSingleWithGoogle(text, activeLanguage.language))
            );
            if (runIdRef.current !== currentRunId) return;
            chunk.forEach((original, index) => {
              cacheRef.current.set(
                `${activeLanguage.language}::${original}`,
                fallbackResults[index] ?? original
              );
            });
          }
        }
      }

      for (const [originalText, nodes] of uniqueTexts.entries()) {
        const translatedText =
          cacheRef.current.get(`${activeLanguage.language}::${originalText}`) ?? originalText;
        if (runIdRef.current !== currentRunId) return;
        for (const node of nodes) {
          node.textContent = translatedText;
        }
      }
    };

    void run();
  }, [activeLanguage.language]);

  return null;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <TranslationEngine />
      {children}
    </LanguageProvider>
  );
}
