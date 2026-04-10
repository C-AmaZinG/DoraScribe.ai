"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  fetchPosts,
  getFeaturedImage,
  formatDate,
  stripHtml,
} from "@/lib/wordpress";
import type { WPPost } from "@/lib/wordpress";

function getReadTime(content: string) {
  const words = stripHtml(content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

function ArticleFallback() {
  return <div className="blog-image-fallback">dora</div>;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadPosts = useCallback(async (pageNum: number, append = false) => {
    if (append) setLoadingMore(true);
    else setLoading(true);

    const data = await fetchPosts(pageNum, 9);

    if (append) {
      setPosts((prev) => [...prev, ...data.posts]);
    } else {
      setPosts(data.posts);
    }

    setTotalPages(data.totalPages);
    setTotalPosts(data.totalPosts);
    setLoading(false);
    setLoadingMore(false);
  }, []);

  useEffect(() => {
    loadPosts(1);
  }, [loadPosts]);

  const displayPosts = posts;

  const handleLoadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadPosts(nextPage, true);
    }
  };

  return (
    <div className="blog-page">
      <Header />
      <main className="blog-main">
        <section className="blog-top">
          <div className="blog-shell">
            <div className="blog-head">
              <h1>Clinical AI insights for modern healthcare teams.</h1>
              <p className="blog-subtitle">
                Explore practical guidance, product updates, and real-world workflows to
                help clinicians reduce admin burden and document with confidence.
              </p>
            </div>

            {loading ? (
              <div className="blog-loading">
                <div className="grid-skeleton">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="grid-card-skeleton shimmer" />
                  ))}
                </div>
              </div>
            ) : posts.length === 0 ? (
              <div className="blog-empty">
                <h2>No stories yet</h2>
                <p>Check back soon for articles, guides, and new clinical AI updates.</p>
              </div>
            ) : (
              <>
                {displayPosts.length > 0 && (
                  <section className="stories-grid">
                    {displayPosts.map((post, index) => {
                      const image = getFeaturedImage(post);
                      const minutes = getReadTime(post.content.rendered);

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
                              {image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={image}
                                  alt={stripHtml(post.title.rendered)}
                                  className="grid-image"
                                />
                              ) : (
                                <ArticleFallback />
                              )}
                            </div>

                            <div className="grid-copy">
                              <div className="grid-meta">
                                <time>{formatDate(post.date)}</time>
                              </div>

                              <h3
                                className="grid-title"
                                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                              />
                              <p className="grid-excerpt">
                                {stripHtml(post.excerpt.rendered)}
                              </p>

                              <div className="grid-footer">
                                <span>{minutes} min read</span>
                                <span className="story-cta">
                                  Read article
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
                )}

                {page < totalPages && (
                  <div className="load-more-wrap">
                    <button
                      type="button"
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="load-more-button"
                    >
                      {loadingMore ? "Loading..." : "Load more"}
                    </button>
                    <p className="load-more-meta">
                      Showing {posts.length} of {totalPosts} stories
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .blog-page {
          min-height: 100vh;
          background: #fafaf8;
        }

        .blog-main {
          padding-top: 112px;
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(41, 105, 183, 0.08), transparent 22%),
            #fafaf8;
        }

        .blog-shell {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .blog-top {
          padding: 28px 0 96px;
        }

        .blog-head {
          width: 100%;
          margin-bottom: 0;
        }

        .blog-kicker,
        .cta-kicker {
          margin: 0 0 14px;
          font-family: "Inter", sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .blog-kicker {
          color: #2969b7;
        }

        .blog-head h1,
        .blog-cta-copy h2 {
          margin: 0;
          font-family: "Playfair Display", Georgia, serif;
          font-weight: 400;
          line-height: 1.02;
          letter-spacing: -0.04em;
          color: #171717;
        }

        .blog-head h1 {
          font-size: clamp(3rem, 6vw, 5.2rem);
        }

        .blog-subtitle,
        .blog-cta-copy p {
          margin: 18px 0 0;
          max-width: 100%;
          font-family: "Inter", sans-serif;
          font-size: 1.04rem;
          line-height: 1.7;
          color: #6b7280;
        }

        .blog-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 28px;
        }

        .blog-tab,
        .tab-skeleton {
          min-height: 42px;
          border-radius: 999px;
        }

        .blog-tab {
          border: 1px solid #e5e7eb;
          background: #ffffff;
          color: #4b5563;
          padding: 0 16px;
          font-family: "Inter", sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .blog-tab:hover,
        .blog-tab.is-active {
          background: #171717;
          border-color: #171717;
          color: #ffffff;
        }

        .stories-showcase {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
          gap: 22px;
          align-items: start;
        }

        .featured-story,
        .stack-story,
        .grid-story,
        .featured-skeleton,
        .stack-card-skeleton,
        .grid-card-skeleton,
        .blog-cta-panel {
          border: 1px solid #e5e1d9;
          background: #ffffff;
          box-shadow: 0 6px 24px rgba(15, 23, 42, 0.05);
        }

        .featured-story {
          border-radius: 26px;
          overflow: hidden;
          min-height: 100%;
        }

        .featured-link,
        .stack-link,
        .grid-link {
          color: inherit;
          text-decoration: none;
        }

        .featured-image-wrap {
          height: 360px;
          overflow: hidden;
          background: #eff3f8;
        }

        .featured-image,
        .grid-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.45s ease;
        }

        .featured-story:hover .featured-image,
        .grid-story:hover .grid-image {
          transform: scale(1.04);
        }

        .blog-image-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0b1d33, #2969b7);
          color: #ffffff;
          font-family: "Playfair Display", Georgia, serif;
          font-size: 2.2rem;
        }

        .featured-copy {
          padding: 28px;
        }

        .featured-label {
          display: inline-flex;
          align-items: center;
          padding: 7px 12px;
          border-radius: 999px;
          background: rgba(41, 105, 183, 0.08);
          color: #2969b7;
          font-family: "Inter", sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .grid-meta,
        .grid-footer,
        .load-more-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          font-family: "Inter", sans-serif;
          font-size: 0.8rem;
          color: #9ca3af;
        }

        .grid-meta {
          justify-content: flex-start;
        }

        .featured-title,
        .stack-title,
        .grid-title,
        .blog-empty h2 {
          margin: 0;
          color: #171717;
        }

        .featured-title {
          margin-top: 18px;
          font-family: "Playfair Display", Georgia, serif;
          font-size: clamp(2rem, 3vw, 2.8rem);
          font-weight: 400;
          line-height: 1.08;
          letter-spacing: -0.03em;
        }

        .featured-excerpt,
        .stack-excerpt,
        .grid-excerpt,
        .blog-empty p {
          font-family: "Inter", sans-serif;
          line-height: 1.7;
          color: #6b7280;
        }

        .featured-excerpt {
          margin: 16px 0 0;
          font-size: 0.98rem;
        }

        .story-cta {
          margin-top: 24px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #171717;
          font-family: "Inter", sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          position: relative;
          width: fit-content;
          transition: color 0.3s ease;
        }

        .story-cta::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: #2969b7;
          transition: width 0.3s ease;
        }

        .featured-story:hover .story-cta,
        .stack-story:hover .story-cta,
        .grid-story:hover .story-cta {
          color: #2969b7;
        }

        .featured-story:hover .story-cta::after,
        .stack-story:hover .story-cta::after,
        .grid-story:hover .story-cta::after {
          width: 100%;
        }

        .stack-story .story-cta {
          margin-top: 16px;
          font-size: 0.85rem;
        }

        .grid-story .story-cta {
          margin-top: 0;
          font-size: 0.85rem;
          line-height: 1;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .story-stack {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .stack-story {
          border-radius: 22px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .stack-story:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
        }

        .stack-link {
          display: block;
          padding: 22px;
        }

        .stack-title {
          margin-top: 14px;
          font-family: "Inter", sans-serif;
          font-size: 1.08rem;
          font-weight: 700;
          line-height: 1.35;
        }

        .stack-excerpt {
          margin: 10px 0 0;
          font-size: 0.92rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .stories-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          margin-top: -30px;
        }

        .grid-story {
          border-radius: 18px;
          overflow: hidden;
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
        }

        .grid-story:hover {
          transform: translateY(-3px);
          border-color: rgba(41, 105, 183, 0.24);
          box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);
        }

        .grid-image-wrap {
          height: 210px;
          overflow: hidden;
          background: #eff3f8;
        }

        .grid-copy {
          display: flex;
          flex-direction: column;
          min-height: 250px;
          height: 250px;
          padding: 20px;
        }

        .grid-title {
          margin-top: 14px;
          font-family: "Inter", sans-serif;
          font-size: 1.04rem;
          font-weight: 700;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .grid-excerpt {
          margin-top: 10px;
          font-size: 0.9rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .grid-footer {
          display: flex !important;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid #f0ece6;
          align-items: center;
          gap: 10px;
        }

        .grid-footer > span:first-child {
          white-space: nowrap;
          line-height: 1;
        }

        .grid-arrow {
          width: 32px;
          height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          border: 1px solid #ece8e1;
          color: #b8bcc4;
        }

        .load-more-wrap {
          margin-top: 42px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .load-more-button {
          min-height: 46px;
          padding: 0 24px;
          border: 1px solid #171717;
          border-radius: 999px;
          background: #171717;
          color: #ffffff;
          font-family: "Inter", sans-serif;
          font-size: 0.92rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .load-more-button:hover:not(:disabled) {
          transform: translateY(-1px);
        }

        .load-more-button:disabled {
          opacity: 0.7;
          cursor: wait;
        }

        .blog-empty {
          padding: 72px 24px 32px;
          text-align: center;
        }

        .blog-empty h2 {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 2rem;
          font-weight: 400;
        }

        .blog-empty p {
          margin: 12px auto 0;
          max-width: 34ch;
        }

        .blog-loading {
          display: flex;
          flex-direction: column;
          gap: 28px;
          margin-top: -30px;
        }

        .tab-skeleton {
          width: 120px;
          background: #e8edf3;
        }

        .featured-skeleton-wrap {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
          gap: 22px;
        }

        .featured-skeleton {
          min-height: 520px;
          border-radius: 26px;
          background: #e8edf3;
        }

        .stack-skeleton {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .stack-card-skeleton {
          min-height: 156px;
          border-radius: 22px;
          background: #e8edf3;
        }

        .grid-skeleton {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .grid-card-skeleton {
          min-height: 430px;
          border-radius: 18px;
          background: #e8edf3;
        }

        .blog-cta-section {
          padding: 0 0 96px;
        }

        .blog-cta-panel {
          border-radius: 34px;
          padding: 40px;
          background:
            linear-gradient(135deg, rgba(11, 29, 51, 0.96), rgba(41, 105, 183, 0.88)),
            #0b1d33;
          color: #ffffff;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 24px;
          align-items: end;
        }

        .cta-kicker {
          color: rgba(255, 255, 255, 0.78);
        }

        .blog-cta-copy h2 {
          font-size: clamp(2.3rem, 4vw, 3.4rem);
          color: #ffffff;
        }

        .blog-cta-copy p {
          color: rgba(255, 255, 255, 0.74);
          max-width: 44ch;
        }

        .blog-cta-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
          justify-content: flex-start;
        }

        .cta-secondary-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          padding: 0 18px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #ffffff;
          text-decoration: none;
          font-family: "Inter", sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          transition: border-color 0.2s ease, background 0.2s ease;
        }

        .cta-secondary-link:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.34);
        }

        .shimmer {
          animation: pulse 1.5s ease-in-out infinite;
        }

        @media (max-width: 1040px) {
          .stories-showcase,
          .featured-skeleton-wrap,
          .blog-cta-panel {
            grid-template-columns: 1fr;
          }

          .stories-grid,
          .grid-skeleton {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 760px) {
          .blog-shell {
            padding: 0 16px;
          }

          .blog-main {
            padding-top: 104px;
          }

          .featured-image-wrap {
            height: 260px;
          }

          .stories-grid,
          .grid-skeleton {
            grid-template-columns: 1fr;
          }

          .featured-copy,
          .stack-link,
          .grid-copy,
          .blog-cta-panel {
            padding: 22px;
          }

          .grid-copy {
            height: 250px;
          }

          .blog-top {
            padding-bottom: 72px;
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
