"use client";

import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { WPPost } from "@/lib/wordpress";
import { getFeaturedImage, getCategories, fetchPostBySlug, fetchPosts } from "@/lib/wordpress";

// Lucide icons replacements 
import { Mail, Link as LinkIcon, Check, MoreHorizontal, MoreVertical, Sparkles, List } from "lucide-react";

// ── Helpers ──────────────────────────────────────────────────
function getCategory(post: WPPost) {
  return getCategories(post)[0]?.name ?? null;
}

function ReadingTime({ content }: { content: string }) {
  const text = content.replace(/<[^>]+>/g, "");
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 230));
  return <span>{minutes} min read</span>;
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
        background: "linear-gradient(90deg, #FB1A0E 0%, #FF6B4A 50%, #FB1A0E 100%)",
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
    <path d="M7 5.5c1.3-.9 2.8-1.4 4.4-1.4 3.7 0 6.8 2.8 7.2 6.5.2 1.6-.1 3.2-.9 4.5l1.5 2-2.4.2a7.18 7.18 0 0 1-5.3 2.3c-3.9 0-7.1-3.2-7.1-7.1 0-1.5.5-3 1.4-4.3L4.6 5.8 7 5.5Z" />
  </svg>
);

const PerplexityIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 4h3.5l4.5 5.2L16.5 4H20l-6.3 7.2L20 20h-3.5l-4.5-5.2L7.5 20H4l6.3-8.8L4 4Z" />
  </svg>
);

const GeminiIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c0 6.6-5.4 12-12 12 6.6 0 12 5.4 12 12 0-6.6 5.4-12 12-12-6.6 0-12-5.4-12-12Z" />
  </svg>
);

const AI_PLATFORMS: ShareItem[] = [
  { id: "claude", label: "Claude", icon: <ClaudeIcon />, getUrl: (url, title) => `https://claude.ai/new?q=${encodeURIComponent(`Summarize this medical article: ${title}\n${url}`)}` },
  { id: "chatgpt", label: "ChatGPT", icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.99 2a4.2 4.2 0 0 1 3.63 2.08 4.2 4.2 0 0 1 5.74 5.74A4.2 4.2 0 0 1 19.28 18a4.2 4.2 0 0 1-7.29 2.2A4.2 4.2 0 0 1 4.7 18a4.2 4.2 0 0 1-2.08-7.29A4.2 4.2 0 0 1 8.36 4.1 4.2 4.2 0 0 1 12 2Z" />
      </svg>
  ), getUrl: (url, title) => `https://chatgpt.com/?q=${encodeURIComponent(`Summarize this medical article: ${title}\n${url}`)}` },
  { id: "perplexity", label: "Perplexity", icon: <PerplexityIcon />, getUrl: (url, title) => `https://www.perplexity.ai/search?q=${encodeURIComponent(`Summarize this medical article: ${title} ${url}`)}` },
  { id: "gemini", label: "Gemini", icon: <GeminiIcon />, getUrl: (url, title) => `https://gemini.google.com/app?q=${encodeURIComponent(`Summarize this medical article: ${title}\n${url}`)}` },
];

const SOCIAL_PLATFORMS: ShareItem[] = [
  { id: "x", label: "X", icon: <span style={{ fontWeight: 700, fontSize: "0.82rem" }}>X</span>, getUrl: (url, title) => `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}` },
  { id: "linkedin", label: "LinkedIn", icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 7.04a1.96 1.96 0 1 0 0-3.92 1.96 1.96 0 0 0 0 3.92ZM20.44 13.15c0-3.45-1.84-5.05-4.3-5.05-1.98 0-2.87 1.09-3.36 1.85V8.5H9.41c.04.96 0 11.5 0 11.5h3.37v-6.42c0-.34.03-.68.12-.92.27-.68.89-1.39 1.92-1.39 1.35 0 1.9 1.03 1.9 2.54V20h3.38v-6.85Z" />
      </svg>
  ), getUrl: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
  { id: "facebook", label: "Facebook", icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.5 21v-7h2.4l.36-2.73H13.5V9.53c0-.79.22-1.33 1.35-1.33h1.44V5.76c-.25-.03-1.12-.1-2.13-.1-2.1 0-3.54 1.28-3.54 3.63v2.02H8.25V14h2.37v7h2.88Z" />
      </svg>
  ), getUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  { id: "reddit", label: "Reddit", icon: <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>r</span>, getUrl: (url, title) => `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
  { id: "threads", label: "Threads", icon: <span style={{ fontWeight: 700, fontSize: "0.85rem" }}>@</span>, getUrl: (url, title) => `https://www.threads.net/intent/post?text=${encodeURIComponent(`${title}\n${url}`)}` },
  { id: "whatsapp", label: "WhatsApp", icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.52 3.48A11.8 11.8 0 0 0 12.07 0C5.5 0 .17 5.34.17 11.91c0 2.1.55 4.15 1.59 5.96L0 24l6.31-1.66a11.85 11.85 0 0 0 5.76 1.47h.01c6.57 0 11.91-5.34 11.91-11.91 0-3.18-1.24-6.18-3.47-8.42Z" />
      </svg>
  ), getUrl: (url, title) => `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}` },
  { id: "email", label: "Email", icon: <Mail size={16} />, getUrl: (url, title) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}` },
];

// ── Share dropdown menu content ──────────────────────────────
function ShareOverflowMenu({ onShare, overflowAI, overflowSocial }: { onShare: (item: ShareItem) => void; overflowAI: ShareItem[]; overflowSocial: ShareItem[] }) {
  return (
    <>
      <div className="px-3.5 py-1.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#bbb]">
        <Sparkles size={12} />
        Discuss with AI
      </div>
      {overflowAI.map((item) => (
        <button key={item.id} onClick={() => onShare(item)} className="w-full flex items-center gap-3 px-3.5 py-2.5 text-[13px] font-medium text-[#555] hover:text-[#1a1a1a] hover:bg-[#fafaf8] transition-colors">
          <span className="flex-shrink-0 text-[#888]">{item.icon}</span>
          {item.label}
        </button>
      ))}
      <div className="h-px bg-[#f0efeb] mx-3 my-1" />
      <div className="px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#bbb]">Share on Social</div>
      {overflowSocial.map((item) => (
        <button key={item.id} onClick={() => onShare(item)} className="w-full flex items-center gap-3 px-3.5 py-2.5 text-[13px] font-medium text-[#555] hover:text-[#1a1a1a] hover:bg-[#fafaf8] transition-colors">
          <span className="flex-shrink-0 text-[#888]">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </>
  );
}

// ── Floating share sidebar (desktop only) ────────────────────
function FloatingShareSidebar({ title }: { title: string }) {
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
        <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#bbb] mb-0.5">Share</span>

        <button
          onClick={handleCopyLink}
          className={`inline-flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-200 ${
            copied
              ? "border-emerald-300 bg-emerald-50 text-emerald-600"
              : "border-[#e5e5e0] hover:border-[#ccc] text-[#888] hover:text-[#555] hover:bg-[#f8f8f5]"
          }`}
          title={copied ? "Copied!" : "Copy link"}
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
            title="More sharing options"
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
                className="absolute left-full top-0 ml-3 z-50 bg-white rounded-xl border border-[#e8e5e0] shadow-[0_12px_40px_rgba(0,0,0,0.1)] py-1.5 min-w-[200px]"
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
        title={copied ? "Copied!" : "Copy link"}
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
        title="More sharing options"
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
            className="absolute right-0 top-full mt-2 z-50 bg-white rounded-xl border border-[#e8e5e0] shadow-[0_12px_40px_rgba(0,0,0,0.1)] py-1.5 min-w-[200px]"
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
      aria-label="Table of contents"
    >
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-[#fafaf8] transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#FB1A0E]/[0.08] flex items-center justify-center text-[#FB1A0E]"><List size={15} /></div>
          <span className="text-[13px] font-semibold text-[#1a1a1a] tracking-[-0.01em]">In this article</span>
          <span className="text-[11px] text-[#bbb] font-medium">{headings.length} sections</span>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}><path d="M6 9l6 6 6-6" /></svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
            <div className="px-6 pb-5 pt-1">
              <div className="border-l-2 border-[#f0efeb] pl-0">
                {headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    onClick={(e) => { e.preventDefault(); const el = document.getElementById(heading.id); if (el) { window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: "smooth" }); } }}
                    className={`block transition-all duration-200 py-1.5 border-l-2 -ml-[2px] ${activeId === heading.id ? "border-[#FB1A0E] text-[#1a1a1a] font-medium" : "border-transparent text-[#777] hover:text-[#1a1a1a] hover:border-[#ddd]"} ${heading.level === 3 ? "pl-7 text-[13px]" : "pl-4 text-[13.5px]"}`}
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
  if (posts.length === 0) return null;

  return (
    <section className="pt-14 pb-8">
      <h2
        className="text-[28px] sm:text-[32px] font-bold text-[#1a1a1a] tracking-[-0.02em] mb-8"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Related Articles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => {
          const img = getFeaturedImage(post) || undefined;
          const d = new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
          const cat = getCategory(post);
          const words = post.content.rendered.replace(/<[^>]+>/g, "").trim().split(/\s+/).length;
          const mins = Math.max(1, Math.round(words / 230));
          return (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block h-full">
              <div className="rounded-[12px] overflow-hidden border border-[#e2e0dc] bg-white flex flex-col h-full transition-all duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
                <div className="h-[180px] overflow-hidden bg-[#f0efeb]">
                  <img src={img} alt={stripHtml(post.title.rendered)} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    {cat ? (
                      <span className="text-[11px] font-semibold text-[#FB1A0E] bg-[#FB1A0E]/[0.07] px-2.5 py-1 rounded-md">{cat}</span>
                    ) : <span />}
                    <time className="text-[12px] text-[#999] font-medium">{d}</time>
                  </div>
                  <h3
                    className="text-[16px] font-bold text-[#1a1a1a] leading-[1.35] mb-2 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <div
                    className="text-[#888] text-[13px] leading-[1.6] line-clamp-3 mb-3"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                  <div className="text-[12px] text-[#aaa] font-medium mt-auto">{mins} min read</div>
                  <div className="flex items-center justify-end mt-4 pt-3 border-t border-[#f0efeb]">
                    <div className="w-8 h-8 rounded-full border border-[#e8e5e0] flex items-center justify-center text-[#ccc] group-hover:border-[#FB1A0E] group-hover:text-[#FB1A0E] transition-all duration-300">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

// ── Main blog post page ───────────────────────────────────
export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<WPPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      const [currentPost, relatedData] = await Promise.all([fetchPostBySlug(slug), fetchPosts(1, 4)]);
      if (cancelled) return;
      setPost(currentPost);
      setRelatedPosts(relatedData.posts.filter((item) => item.slug !== slug).slice(0, 3));
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-20">
            <div className="w-8 h-8 rounded-full border-2 border-[#FB1A0E] border-t-transparent animate-spin"/>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-[#1a1a1a]">Post not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  const featuredImage = getFeaturedImage(post) || undefined;
  const sanitizedContent = sanitizeArticleContent(post.content.rendered);
  const date = new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const isoDate = new Date(post.date).toISOString();
  const title = post.title.rendered.replace(/<[^>]+>/g, "");
  const category = getCategory(post);

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
              <Link href="/" className="hover:text-[#FB1A0E] transition-colors">Home</Link>
              <svg width="10" height="10" viewBox="0 0 20 20" fill="none" className="text-[#ddd]"><path d="M8 5L13 10L8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <Link href="/blog" className="hover:text-[#FB1A0E] transition-colors">Blog</Link>
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
                  <ReadingTime content={sanitizedContent} />
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
                  .wp-content-wrapper a { color: #FB1A0E; text-decoration: underline; text-underline-offset: 4px; border-radius: 2px; transition: opacity 0.2s; }
                  .wp-content-wrapper a:hover { opacity: 0.8; }
                  .wp-content-wrapper ul { list-style-type: disc; margin-bottom: 1.5em; padding-left: 1.5em; color: #374151; }
                  .wp-content-wrapper ol { list-style-type: decimal; margin-bottom: 1.5em; padding-left: 1.5em; color: #374151; }
                  .wp-content-wrapper li { margin-bottom: 0.5em; line-height: 1.7; }
                  .wp-content-wrapper blockquote { border-left: 4px solid #FB1A0E; padding-left: 1.5em; margin-left: 0; margin-right: 0; font-style: italic; color: #555; background: #f8fcfb; padding: 1.25em; border-radius: 0 8px 8px 0; }
                  .wp-content-wrapper img { width: 100%; height: auto; border-radius: 12px; margin: 2em 0; }
                  .wp-content-wrapper .wp-block-image { margin: 2em 0; }
                  .wp-content-wrapper .wp-block-image figcaption { text-align: center; font-size: 0.85rem; color: #888; margin-top: 0.75em; }
                `}</style>
                <div className="wp-content" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
              </motion.article>

              <div className="pb-20">
                <div className="xl:hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6 border-t border-b border-[#e8e5e0]">
                  <span className="text-[13px] font-semibold text-[#999] uppercase tracking-[0.1em]">Share this article</span>
                  <InlineShareBar title={post.title.rendered} />
                </div>
                <div className="mt-10 xl:mt-0">
                  <Link href="/blog" className="inline-flex items-center gap-2.5 text-[#FB1A0E] font-semibold text-[14px] hover:gap-3.5 transition-all group">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="group-hover:-translate-x-1 transition-transform"><path d="M19 12H5M5 12L11 6M5 12L11 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Back to all articles
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
