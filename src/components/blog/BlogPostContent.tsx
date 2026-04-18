"use client";

import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { WPPost } from "@/lib/wordpress";
import { getFeaturedImage } from "@/lib/wordpress";
import { Mail, Link as LinkIcon, Check, MoreHorizontal, MoreVertical, Sparkles, List } from "lucide-react";
import {
  SiClaude, SiOpenai, SiPerplexity, SiGooglegemini,
  SiX, SiFacebook, SiReddit, SiThreads, SiWhatsapp,
} from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
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

const AI_PLATFORMS: ShareItem[] = [
  { id: "claude", label: "Claude", icon: <SiClaude size={15} />, getUrl: (url, title) => `https://claude.ai/new?q=${encodeURIComponent(`Summarize this medical article: ${title}\n${url}`)}` },
  { id: "chatgpt", label: "ChatGPT", icon: <SiOpenai size={15} />, getUrl: (url, title) => `https://chatgpt.com/?q=${encodeURIComponent(`Summarize this medical article: ${title}\n${url}`)}` },
  { id: "perplexity", label: "Perplexity", icon: <SiPerplexity size={15} />, getUrl: (url, title) => `https://www.perplexity.ai/search?q=${encodeURIComponent(`Summarize this medical article: ${title} ${url}`)}` },
  { id: "gemini", label: "Gemini", icon: <SiGooglegemini size={15} />, getUrl: (url, title) => `https://gemini.google.com/app?q=${encodeURIComponent(`Summarize this medical article: ${title}\n${url}`)}` },
];

const SOCIAL_PLATFORMS: ShareItem[] = [
  { id: "x", label: "X", icon: <SiX size={13} />, getUrl: (url, title) => `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}` },
  { id: "linkedin", label: "LinkedIn", icon: <FaLinkedinIn size={14} />, getUrl: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
  { id: "facebook", label: "Facebook", icon: <SiFacebook size={15} />, getUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  { id: "reddit", label: "Reddit", icon: <SiReddit size={15} />, getUrl: (url, title) => `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}` },
  { id: "threads", label: "Threads", icon: <SiThreads size={14} />, getUrl: (url, title) => `https://www.threads.net/intent/post?text=${encodeURIComponent(`${title}\n${url}`)}` },
  { id: "whatsapp", label: "WhatsApp", icon: <SiWhatsapp size={15} />, getUrl: (url, title) => `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}` },
  { id: "email", label: "Email", icon: <Mail size={15} />, getUrl: (url, title) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}` },
];

// ── Share dropdown menu content ──────────────────────────────
function ShareOverflowMenu({ onShare, overflowAI, overflowSocial }: { onShare: (item: ShareItem) => void; overflowAI: ShareItem[]; overflowSocial: ShareItem[] }) {
  const t = useTranslations();
  return (
    <div style={{ padding: "10px 0" }}>
      <div
        className="flex items-center uppercase text-[#999]"
        style={{
          padding: "10px 20px 8px",
          gap: "8px",
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: "0.14em",
        }}
      >
        <Sparkles size={12} />
        {t("Discuss with AI")}
      </div>
      {overflowAI.map((item) => (
        <button
          key={item.id}
          onClick={() => onShare(item)}
          className="w-full flex items-center text-[#555] hover:text-[#1a1a1a] hover:bg-[#fafaf8] transition-colors"
          style={{ padding: "12px 20px", gap: "14px", fontSize: "13px", fontWeight: 500 }}
        >
          <span className="flex-shrink-0 flex items-center justify-center text-[#666]" style={{ width: "20px" }}>{item.icon}</span>
          {item.label}
        </button>
      ))}
      <div className="bg-[#f0efeb]" style={{ height: "1px", margin: "10px 20px" }} />
      <div
        className="uppercase text-[#999]"
        style={{
          padding: "8px 20px",
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: "0.14em",
        }}
      >
        {t("Share on Social")}
      </div>
      {overflowSocial.map((item) => (
        <button
          key={item.id}
          onClick={() => onShare(item)}
          className="w-full flex items-center text-[#555] hover:text-[#1a1a1a] hover:bg-[#fafaf8] transition-colors"
          style={{ padding: "12px 20px", gap: "14px", fontSize: "13px", fontWeight: 500 }}
        >
          <span className="flex-shrink-0 flex items-center justify-center text-[#666]" style={{ width: "20px" }}>{item.icon}</span>
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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between hover:bg-[#fafaf8] transition-colors"
        style={{ padding: "20px 28px" }}
      >
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
            <div style={{ padding: "16px 28px 28px" }}>
              <div className="border-l-2 border-[#f0efeb]" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    onClick={(e) => { e.preventDefault(); const el = document.getElementById(heading.id); if (el) { window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: "smooth" }); } }}
                    className={`block transition-all duration-200 border-l-2 leading-relaxed ${activeId === heading.id ? "border-[#3d8183] text-[#1a1a1a] font-medium" : "border-transparent text-[#777] hover:text-[#1a1a1a] hover:border-[#ddd]"}`}
                    style={{
                      padding: heading.level === 3 ? "12px 16px 12px 36px" : "12px 16px 12px 24px",
                      fontSize: heading.level === 3 ? "13px" : "13.5px",
                      marginLeft: "-2px",
                    }}
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
