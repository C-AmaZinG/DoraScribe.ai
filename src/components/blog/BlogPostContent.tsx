"use client";

import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { WPPost } from "@/lib/wordpress";
import { getFeaturedImage } from "@/lib/wordpress";
import { Mail, Link as LinkIcon, Check, MoreHorizontal, MoreVertical, Sparkles, List } from "lucide-react";
import { useTranslations } from "@/lib/translations/translations-context";

// ── Helpers ──────────────────────────────────────────────────
function ReadingTime({ content, label }: { content: string; label: string }) {
  const text = content.replace(/<[^>]+>/g, "");
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 230));
  return <span>{minutes} {label}</span>;
}

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, "").trim();
}

function sanitizeArticleContent(html: string) {
  return html.replace(
    /<p\b[^>]*>[\s\S]*?(Written by:|Medically reviewed by:|Published:|Last updated:|Reviewed on:|Why you can trust this:|Medical disclaimer:|How this article was created:)[\s\S]*?<\/p>/gi,
    ""
  );
}

// ── Scroll progress indicator ────────────────────────────────
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [navHeight, setNavHeight] = useState(64);

  useEffect(() => {
    function measure() {
      const navInner = document.querySelector("nav") || document.querySelector("header");
      if (navInner) setNavHeight(navInner.getBoundingClientRect().height);
    }
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, []);

  return (
    <motion.div
      className="fixed left-0 right-0 h-[3px] z-[99] origin-left"
      style={{
        scaleX,
        top: navHeight,
        background: "linear-gradient(90deg, #3d8183 0%, #6fb8ba 50%, #3d8183 100%)",
      }}
    />
  );
}

// ── Share config ─────────────────────────────────────────────
interface ShareItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  getUrl: (url: string, title: string) => string;
}

const ClaudeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.7 16.5 9.1 14l.07-.21-.07-.11H8.89l-.7-.05-2.37-.07-2.05-.08-2-.11L1.27 13.2 1 12.57l.27-.16h.86l1.9.13 2.84.2 2.06.12 3.05.32h.48l.07-.2-.17-.12-.13-.12-2.94-2-3.18-2.1L5 7.9l-.8-.55L3.79 7l-.15-.56c.21-.23.42-.54.66-.73.4-.3 1.01-.33 1.68.01l1.44.72 3.62 1.8L11 8.5l.1-.06v-.1l-.14-.22-1.17-2.1-1.25-2.15-.56-.89-.15-.53c-.05-.22-.09-.4-.09-.62L8.5.6l.75-.24 1.83.67.44.1.43.35.65.15.93.75.92 1.02 1.22 2.12.29.57.07.37-.13.1.1-.43-.1.07-.15-.37-.13-.25.24-.52.24-.39-.14-.32-.2-1.26-.48-.76-.3-.22.07-.08.29.44 2.12.54 2.54.21 1.27-.01.36.44.04 1.15.29 1.26.53.57.3.27.13.21-.17.5-.17.32-.25.18v-.13l-.4.58-.14.66-.35.3-.44-.06-1.08-.25-.62-.42-.67-.58-.29-.45-.18-.12-.32.06-.02.07.1.5v.57l-.35.79-.37.23-.47-.1-.4-.3-.57-.8-.15-.82v-.7l-.11-.14-.45.02-1.5.4-.74.15-.92.08-.62-.08-.37-.4.1-.55.34-.26.57-.1 1.8-.33.96-.06v-.13l-.04-.1-.75-.62-1.64-1.1-1.54-1.2-.47-.43-.16-.32v-.38Z" />
  </svg>
);

const PerplexityIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v18M4 8l16 8M4 16l16-8" />
  </svg>
);

const GeminiIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c0 6.6-5.4 12-12 12 6.6 0 12 5.4 12 12 0-6.6 5.4-12 12-12-6.6 0-12-5.4-12-12Z" />
  </svg>
);

const ChatGPTIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.28 9.82a5.9 5.9 0 0 0-.5-4.85 6 6 0 0 0-6.47-2.88A6 6 0 0 0 5 4.48a5.9 5.9 0 0 0-4 2.88 6 6 0 0 0 .75 7.04 5.9 5.9 0 0 0 .5 4.85 6 6 0 0 0 6.47 2.88 5.98 5.98 0 0 0 4.5 2.03 6 6 0 0 0 5.8-4.34 5.9 5.9 0 0 0 4-2.88 6 6 0 0 0-.74-7.04zM13.27 21.68a4.47 4.47 0 0 1-2.87-1.04l.14-.08 4.78-2.76a.79.79 0 0 0 .4-.68v-6.74l2.01 1.17a.08.08 0 0 1 .04.06v5.58a4.5 4.5 0 0 1-4.5 4.49zM3.61 17.55a4.47 4.47 0 0 1-.54-3.01l.14.08 4.79 2.76a.79.79 0 0 0 .78 0l5.84-3.37v2.33a.08.08 0 0 1-.03.06L9.74 19.2a4.5 4.5 0 0 1-6.13-1.65zM2.36 7.86a4.47 4.47 0 0 1 2.35-1.97v5.68a.78.78 0 0 0 .39.68l5.81 3.36-2.02 1.16a.08.08 0 0 1-.07 0L4 14.01a4.5 4.5 0 0 1-1.65-6.14zm16.58 3.85-5.84-3.38L15.11 7.2a.08.08 0 0 1 .07 0l4.83 2.79a4.5 4.5 0 0 1-.68 8.11v-5.67a.79.79 0 0 0-.4-.68zm2-3.02-.14-.09-4.78-2.78a.79.79 0 0 0-.79 0L9.4 9.18V6.85a.08.08 0 0 1 .03-.06l4.83-2.78a4.5 4.5 0 0 1 6.68 4.65zM8.3 12.85l-2.02-1.16a.08.08 0 0 1-.04-.06V6.06a4.5 4.5 0 0 1 7.37-3.45l-.14.08L8.7 5.45a.79.79 0 0 0-.4.68zm1.1-2.36L12 9l2.6 1.5v3L12 15l-2.6-1.5z" />
  </svg>
);

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.95.93-1.95 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07z" />
  </svg>
);

const RedditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 6.63 5.37 12 12 12s12-5.37 12-12c0-6.63-5.37-12-12-12zm6.34 13.12a4.05 4.05 0 0 1 .08.78c0 3.96-4.6 7.17-10.28 7.17-5.68 0-10.28-3.21-10.28-7.17 0-.27.03-.53.08-.78a2.28 2.28 0 1 1 3.08-3.3 12.58 12.58 0 0 1 6.84-2.17l1.3-6.12a.39.39 0 0 1 .46-.3l4.25.9a1.6 1.6 0 1 1-.17.84L10 2.55l-1.15 5.45a12.6 12.6 0 0 1 6.73 2.18 2.28 2.28 0 1 1 2.76 2.94zM8.03 13.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2zm8 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2zm-.51 4.2a.38.38 0 0 0-.54 0 4.66 4.66 0 0 1-3 .86 4.66 4.66 0 0 1-3-.86.38.38 0 1 0-.53.54c.93.93 2.33 1.08 3.53 1.08s2.6-.15 3.53-1.08a.38.38 0 0 0 0-.54z" />
  </svg>
);

const ThreadsIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.19 0c-6.9 0-11.72 4.65-11.94 11.66C.04 18.48 4.7 23.8 12.2 23.8c6.87 0 11.6-4.73 11.6-11.6C23.8 5.8 19.4 0 12.19 0zm.09 5.28c3.04 0 5.13 1.38 6.05 4 .22.62-.06 1.1-.7 1.25-.53.13-1-.15-1.22-.72-.56-1.5-1.87-2.28-4.13-2.28-2.38 0-3.8 1.1-3.8 2.75 0 1.04.87 1.76 3.87 2.22 3.13.47 6.4 1.4 6.4 4.75 0 3.06-2.5 5.12-6.47 5.12-3.97 0-6.38-2.22-7.22-4.72-.2-.6.13-1.1.75-1.22.56-.13 1.03.22 1.22.8.56 1.72 2.16 3.13 5.25 3.13 2.63 0 4.25-1.13 4.25-2.97 0-1.5-1.56-2.2-4.66-2.66-2.93-.44-5.6-1.47-5.6-4.28 0-2.97 2.56-5.17 6.01-5.17z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const AI_PLATFORMS: ShareItem[] = [
  { id: "claude", label: "Claude", icon: <ClaudeIcon />, getUrl: (url, title) => `https://claude.ai/new?q=${encodeURIComponent(`Summarize this medical article: ${title}\n${url}`)}` },
  { id: "chatgpt", label: "ChatGPT", icon: <ChatGPTIcon />, getUrl: (url, title) => `https://chatgpt.com/?q=${encodeURIComponent(`Summarize this medical article: ${title}\n${url}`)}` },
  { id: "perplexity", label: "Perplexity", icon: <PerplexityIcon />, getUrl: (url, title) => `https://www.perplexity.ai/search?q=${encodeURIComponent(`Summarize this medical article: ${title} ${url}`)}` },
  { id: "gemini", label: "Gemini", icon: <GeminiIcon />, getUrl: (url, title) => `https://gemini.google.com/app?q=${encodeURIComponent(`Summarize this medical article: ${title}\n${url}`)}` },
];

const SOCIAL_PLATFORMS: ShareItem[] = [
  { id: "x", label: "X", icon: <XIcon />, getUrl: (url, title) => `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}` },
  { id: "linkedin", label: "LinkedIn", icon: <LinkedInIcon />, getUrl: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
  { id: "facebook", label: "Facebook", icon: <FacebookIcon />, getUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  { id: "reddit", label: "Reddit", icon: <RedditIcon />, getUrl: (url, title) => `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
  { id: "threads", label: "Threads", icon: <ThreadsIcon />, getUrl: (url, title) => `https://www.threads.net/intent/post?text=${encodeURIComponent(`${title}\n${url}`)}` },
  { id: "whatsapp", label: "WhatsApp", icon: <WhatsAppIcon />, getUrl: (url, title) => `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}` },
  { id: "email", label: "Email", icon: <Mail size={16} />, getUrl: (url, title) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}` },
];

// ── Share dropdown menu content ──────────────────────────────
function ShareOverflowMenu({ onShare, overflowAI, overflowSocial }: { onShare: (item: ShareItem) => void; overflowAI: ShareItem[]; overflowSocial: ShareItem[] }) {
  const t = useTranslations();
  return (
    <div className="py-2">
      <div className="px-4 py-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#bbb]">
        <Sparkles size={12} />
        {t("Discuss with AI")}
      </div>
      {overflowAI.map((item) => (
        <button key={item.id} onClick={() => onShare(item)} className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-[#555] hover:text-[#1a1a1a] hover:bg-[#fafaf8] transition-colors">
          <span className="flex-shrink-0 w-5 flex items-center justify-center text-[#888]">{item.icon}</span>
          {item.label}
        </button>
      ))}
      <div className="h-px bg-[#f0efeb] mx-4 my-2" />
      <div className="px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#bbb]">{t("Share on Social")}</div>
      {overflowSocial.map((item) => (
        <button key={item.id} onClick={() => onShare(item)} className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-[#555] hover:text-[#1a1a1a] hover:bg-[#fafaf8] transition-colors">
          <span className="flex-shrink-0 w-5 flex items-center justify-center text-[#888]">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </div>
  );
}

// ── Floating share sidebar (desktop only) ────────────────────
function FloatingShareSidebar({ title }: { title: string }) {
  const t = useTranslations();
  const [showMore, setShowMore] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const getUrl = useCallback(() => (typeof window !== "undefined" ? window.location.href : ""), []);
  const plainTitle = stripHtml(title);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setShowMore(false);
    }
    if (showMore) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMore]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (item: ShareItem) => {
    window.open(item.getUrl(getUrl(), plainTitle), "_blank", "noopener,noreferrer");
    setShowMore(false);
  };

  const primaryItems = [SOCIAL_PLATFORMS[0], SOCIAL_PLATFORMS[1], AI_PLATFORMS[0]];

  return (
    <aside className="hidden xl:block absolute top-0 left-[14px] bottom-0 z-40 mb-[5ch]" ref={menuRef}>
      <div className="sticky top-[200px] flex flex-col items-center gap-2.5">
        <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#bbb] mb-0.5">{t("Share")}</span>

        <button
          onClick={handleCopyLink}
          className={`inline-flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-200 ${
            copied
              ? "border-emerald-300 bg-emerald-50 text-emerald-600"
              : "border-[#e5e5e0] hover:border-[#ccc] text-[#888] hover:text-[#555] hover:bg-[#f8f8f5]"
          }`}
          title={copied ? t("Copied!") : t("Copy link")}
        >
          {copied ? <Check size={16} /> : <LinkIcon size={16} />}
        </button>

        {primaryItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleShare(item)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#e5e5e0] hover:border-[#ccc] text-[#888] hover:text-[#555] hover:bg-[#f8f8f5] transition-all duration-200"
            title={item.label}
          >
            {item.icon}
          </button>
        ))}

        <div className="relative">
          <button
            onClick={() => setShowMore(!showMore)}
            className={`inline-flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-200 ${
              showMore ? "border-[#ccc] bg-[#f5f5f2] text-[#555]" : "border-[#e5e5e0] hover:border-[#ccc] text-[#888] hover:text-[#555] hover:bg-[#f8f8f5]"
            }`}
            title={t("More sharing options")}
          >
            <MoreVertical size={16} />
          </button>
          <AnimatePresence>
            {showMore && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: -4 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute left-full top-0 ml-3 z-50 bg-white rounded-xl border border-[#e8e5e0] shadow-[0_12px_40px_rgba(0,0,0,0.1)] min-w-[220px]"
              >
                <ShareOverflowMenu onShare={handleShare} overflowAI={AI_PLATFORMS.slice(1)} overflowSocial={SOCIAL_PLATFORMS.slice(2)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </aside>
  );
}

// ── Inline share bar (mobile / footer) ───────────────────────
function InlineShareBar({ title }: { title: string }) {
  const t = useTranslations();
  const [showMore, setShowMore] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const getUrl = useCallback(() => (typeof window !== "undefined" ? window.location.href : ""), []);
  const plainTitle = stripHtml(title);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setShowMore(false);
    }
    if (showMore) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMore]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (item: ShareItem) => {
    window.open(item.getUrl(getUrl(), plainTitle), "_blank", "noopener,noreferrer");
    setShowMore(false);
  };

  const primaryItems = [SOCIAL_PLATFORMS[0], SOCIAL_PLATFORMS[1], AI_PLATFORMS[0]];

  return (
    <div className="flex items-center gap-1.5 relative" ref={menuRef}>
      <button
        onClick={handleCopyLink}
        className={`inline-flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-200 ${
          copied ? "border-emerald-300 bg-emerald-50 text-emerald-600" : "border-[#e5e5e0] hover:border-[#ccc] text-[#888] hover:text-[#555]"
        }`}
        title={copied ? t("Copied!") : t("Copy link")}
      >
        {copied ? <Check size={15} /> : <LinkIcon size={15} />}
      </button>

      {primaryItems.map((item) => (
        <button key={item.id} onClick={() => handleShare(item)} className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#e5e5e0] hover:border-[#ccc] text-[#888] hover:text-[#555] transition-all duration-200" title={item.label}>
          {item.icon}
        </button>
      ))}

      <button
        onClick={() => setShowMore(!showMore)}
        className={`inline-flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-200 ${
          showMore ? "border-[#ccc] bg-[#f5f5f2] text-[#555]" : "border-[#e5e5e0] hover:border-[#ccc] text-[#888] hover:text-[#555]"
        }`}
        title={t("More sharing options")}
      >
        <MoreHorizontal size={16} />
      </button>

      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 z-50 bg-white rounded-xl border border-[#e8e5e0] shadow-[0_12px_40px_rgba(0,0,0,0.1)] min-w-[220px]"
          >
            <ShareOverflowMenu onShare={handleShare} overflowAI={AI_PLATFORMS.slice(1)} overflowSocial={SOCIAL_PLATFORMS.slice(2)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Table of Contents ────────────────────────────────────────
interface TocItem { id: string; text: string; level: number; }

function TableOfContents({ html }: { html: string }) {
  const t = useTranslations();
  const [activeId, setActiveId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const headings = useMemo(() => {
    const items: TocItem[] = [];
    const regex = /<h([2-3])[^>]*(?:id="([^"]*)")?[^>]*>(.*?)<\/h[2-3]>/gi;
    let match;
    let counter = 0;
    while ((match = regex.exec(html)) !== null) {
      const level = parseInt(match[1]);
      const existingId = match[2];
      const text = match[3].replace(/<[^>]+>/g, "").trim();
      if (!text) continue;
      items.push({ id: existingId || `heading-${counter}`, text, level });
      counter++;
    }
    return items;
  }, [html]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const container = document.querySelector(".wp-content");
    if (!container) return;
    const els = container.querySelectorAll("h2, h3");
    let counter = 0;
    els.forEach((el) => {
      if (!el.textContent?.trim()) return;
      const heading = headings[counter];
      if (heading && !el.id) el.id = heading.id;
      counter++;
    });
  }, [headings]);

  useEffect(() => {
    if (typeof window === "undefined" || headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0.1 }
    );
    headings.forEach((h) => { const el = document.getElementById(h.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="mb-10 rounded-2xl border border-[#e8e5e0] bg-white overflow-hidden"
      aria-label={t("Table of contents")}
    >
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-[#fafaf8] transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#3d8183]/[0.08] flex items-center justify-center text-[#3d8183]"><List size={15} /></div>
          <span className="text-[13px] font-semibold text-[#1a1a1a] tracking-[-0.01em]">{t("In this article")}</span>
          <span className="text-[11px] text-[#bbb] font-medium">{headings.length} {t("sections")}</span>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}><path d="M6 9l6 6 6-6" /></svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
            <div className="px-7 pb-6 pt-3">
              <div className="border-l-2 border-[#f0efeb] pl-0 flex flex-col gap-0.5">
                {headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    onClick={(e) => { e.preventDefault(); const el = document.getElementById(heading.id); if (el) { window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: "smooth" }); } }}
                    className={`block transition-all duration-200 py-2.5 pr-3 border-l-2 -ml-[2px] leading-snug ${activeId === heading.id ? "border-[#3d8183] text-[#1a1a1a] font-medium" : "border-transparent text-[#777] hover:text-[#1a1a1a] hover:border-[#ddd]"} ${heading.level === 3 ? "pl-8 text-[13px]" : "pl-5 text-[13.5px]"}`}
                  >
                    {heading.text}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ── Related articles ─────────────────────────────────────────
function RelatedArticles({ posts }: { posts: WPPost[] }) {
  const t = useTranslations();
  if (posts.length === 0) return null;

  return (
    <>
      <section className="pt-14 pb-8">
        <h2
          className="text-[28px] sm:text-[32px] font-bold text-[#1a1a1a] tracking-[-0.02em] mb-8"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {t("Related Articles")}
        </h2>
        <section className="stories-grid">
          {posts.map((post, index) => {
            const img = getFeaturedImage(post) || undefined;
            const minutes = Math.max(
              1,
              Math.round(post.content.rendered.replace(/<[^>]+>/g, "").trim().split(/\s+/).length / 230)
            );
            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: (index % 3) * 0.05 }}
                className="grid-story"
              >
                <Link href={`/blog/${post.slug}`} className="grid-link">
                  <div className="grid-image-wrap">
                    <img
                      src={img}
                      alt={stripHtml(post.title.rendered)}
                      className="grid-image"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="grid-copy">
                    <div className="grid-meta">
                      <time>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    </div>

                    <h3
                      className="grid-title"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <p className="grid-excerpt">{stripHtml(post.excerpt.rendered)}</p>

                    <div className="grid-footer">
                      <span>{minutes} {t("min read")}</span>
                      <span className="story-cta">
                        {t("Read article")}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </section>
      </section>

      <style jsx>{`
        .stories-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }
        .grid-story {
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid #e5e1d9;
          background: #ffffff;
          box-shadow: 0 6px 24px rgba(15, 23, 42, 0.05);
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
        }
        .grid-story:hover {
          transform: translateY(-3px);
          border-color: rgba(41, 105, 183, 0.24);
          box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);
        }
        .grid-link {
          display: flex;
          flex-direction: column;
          height: 100%;
          color: inherit;
          text-decoration: none;
        }
        .grid-image-wrap {
          height: 210px;
          overflow: hidden;
          background: #eff3f8;
          flex-shrink: 0;
        }
        .grid-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.45s ease;
        }
        .grid-story:hover .grid-image {
          transform: scale(1.04);
        }
        .grid-copy {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 20px;
        }
        .grid-meta {
          display: flex;
          justify-content: flex-start;
          font-family: "Inter", sans-serif;
          font-size: 0.8rem;
          color: #9ca3af;
        }
        .grid-title {
          margin-top: 14px;
          font-family: "Inter", sans-serif;
          font-size: 1.04rem;
          font-weight: 700;
          line-height: 1.4;
          color: #171717;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .grid-excerpt {
          margin-top: 10px;
          font-family: "Inter", sans-serif;
          font-size: 0.9rem;
          line-height: 1.7;
          color: #6b7280;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .grid-footer {
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid #f0ece6;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          font-family: "Inter", sans-serif;
          font-size: 0.8rem;
          color: #9ca3af;
        }
        .grid-footer > span:first-child {
          white-space: nowrap;
          line-height: 1;
        }
        .story-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          line-height: 1;
          white-space: nowrap;
          flex-shrink: 0;
          color: #171717;
          font-family: "Inter", sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          transition: color 0.3s ease;
        }
        .story-cta svg {
          width: 32px;
          height: 32px;
          padding: 8px;
          border-radius: 999px;
          border: 1px solid #ece8e1;
          color: #b8bcc4;
          transition: color 0.3s ease, border-color 0.3s ease;
        }
        .grid-story:hover .story-cta {
          color: #3d8183;
        }
        .grid-story:hover .story-cta svg {
          color: #3d8183;
          border-color: #3d8183;
        }
        @media (max-width: 1040px) {
          .stories-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 760px) {
          .stories-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}

// ── Main post content ─────────────────────────────────────────
interface BlogPostContentProps {
  post: WPPost;
  relatedPosts: WPPost[];
}

export function BlogPostContent({ post, relatedPosts }: BlogPostContentProps) {
  const t = useTranslations();
  const featuredImage = getFeaturedImage(post) || undefined;
  const sanitizedContent = sanitizeArticleContent(post.content.rendered);
  const date = new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const isoDate = new Date(post.date).toISOString();
  const title = post.title.rendered.replace(/<[^>]+>/g, "");

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col font-sans">
      <Header />
      <ScrollProgressBar />

      <div className="flex-1" style={{ background: "#FAFAF8" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ paddingTop: "120px", paddingBottom: "40px" }}
        >
          <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 24px" }}>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-[#aaa] font-medium mb-8 tracking-[0.06em] uppercase">
              <Link href="/" className="hover:text-[#3d8183] transition-colors">{t("Home")}</Link>
              <svg width="10" height="10" viewBox="0 0 20 20" fill="none" className="text-[#ddd]"><path d="M8 5L13 10L8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <Link href="/blog" className="hover:text-[#3d8183] transition-colors">{t("Blog")}</Link>
              <svg width="10" height="10" viewBox="0 0 20 20" fill="none" className="text-[#ddd]"><path d="M8 5L13 10L8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span className="text-[#777] truncate max-w-[200px]">{title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-14 items-center">
              <div className="py-2">
                <div className="flex items-center gap-4 mb-6">
                  <time dateTime={isoDate} className="text-[13px] text-[#999] font-medium">{date}</time>
                </div>

                <h1
                  className="text-[28px] sm:text-[34px] md:text-[40px] lg:text-[44px] font-bold text-[#1a1a1a] leading-[1.1] tracking-[-0.03em] mb-7"
                  style={{ fontFamily: "var(--font-heading)" }}
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />

                <div className="flex items-center gap-3 text-[13px] text-[#999] font-medium pt-5 border-t border-[#eee]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#ccc]"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                  <ReadingTime content={sanitizedContent} label={t("min read")} />
                </div>
              </div>

              {featuredImage && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[20px] overflow-hidden bg-[#f0efeb] aspect-[4/3] lg:aspect-[4/3.2] shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
                >
                  <img src={featuredImage} alt={title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <FloatingShareSidebar title={post.title.rendered} />

          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <TableOfContents html={sanitizedContent} />

            <motion.article
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="pb-16 wp-content-wrapper wp-content-prose"
            >
              <style jsx global>{`
                .wp-content-wrapper p { font-family: var(--font-body); font-size: 1.05rem; line-height: 1.8; color: #374151; margin-bottom: 1.5em; }
                .wp-content-wrapper h2 { font-size: 1.75rem; font-weight: 700; color: #1a1a1a; margin-top: 2em; margin-bottom: 0.75em; letter-spacing: -0.02em; font-family: var(--font-heading); }
                .wp-content-wrapper h3 { font-size: 1.35rem; font-weight: 600; color: #1a1a1a; margin-top: 1.5em; margin-bottom: 0.75em; font-family: var(--font-heading); }
                .wp-content-wrapper a { color: #3d8183; text-decoration: underline; text-underline-offset: 4px; border-radius: 2px; transition: opacity 0.2s; }
                .wp-content-wrapper a:hover { opacity: 0.8; }
                .wp-content-wrapper ul { list-style-type: disc; margin-bottom: 1.5em; padding-left: 1.5em; color: #374151; }
                .wp-content-wrapper ol { list-style-type: decimal; margin-bottom: 1.5em; padding-left: 1.5em; color: #374151; }
                .wp-content-wrapper li { margin-bottom: 0.5em; line-height: 1.7; }
                .wp-content-wrapper blockquote { border-left: 4px solid #3d8183; padding-left: 1.5em; margin-left: 0; margin-right: 0; font-style: italic; color: #555; background: #f8fcfb; padding: 1.25em; border-radius: 0 8px 8px 0; }
                .wp-content-wrapper img { width: 100%; height: auto; border-radius: 12px; margin: 2em 0; }
                .wp-content-wrapper .wp-block-image { margin: 2em 0; }
                .wp-content-wrapper .wp-block-image figcaption { text-align: center; font-size: 0.85rem; color: #888; margin-top: 0.75em; }
              `}</style>
              <div className="wp-content" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
            </motion.article>

            <div className="pb-20">
              <div className="xl:hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6 border-t border-b border-[#e8e5e0]">
                <span className="text-[13px] font-semibold text-[#999] uppercase tracking-[0.1em]">{t("Share this article")}</span>
                <InlineShareBar title={post.title.rendered} />
              </div>
              <div className="mt-10 xl:mt-0">
                <Link href="/blog" className="inline-flex items-center gap-2.5 text-[#3d8183] font-semibold text-[14px] hover:gap-3.5 transition-all group">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="group-hover:-translate-x-1 transition-transform"><path d="M19 12H5M5 12L11 6M5 12L11 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {t("Back to all articles")}
                </Link>
              </div>
            </div>

            <RelatedArticles posts={relatedPosts} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
