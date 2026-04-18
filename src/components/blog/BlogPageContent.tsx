"use client";

import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { fetchPosts, getFeaturedImage, formatDate, stripHtml } from "@/lib/wordpress";
import type { WPPost } from "@/lib/wordpress";

function getReadTime(content: string) {
  const words = stripHtml(content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

function ArticleFallback() {
  return <div className="blog-image-fallback">dora</div>;
}

interface Props {
  initialPosts: WPPost[];
  totalPages: number;
  totalPosts: number;
}

export function BlogPageContent({ initialPosts, totalPages: initialTotalPages, totalPosts: initialTotalPosts }: Props) {
  const [posts, setPosts] = useState<WPPost[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [totalPosts, setTotalPosts] = useState(initialTotalPosts);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = useCallback(async () => {
    if (page >= totalPages) return;
    const nextPage = page + 1;
    setLoadingMore(true);
    const data = await fetchPosts(nextPage, 9);
    setPosts((prev) => [...prev, ...data.posts]);
    setTotalPages(data.totalPages);
    setTotalPosts(data.totalPosts);
    setPage(nextPage);
    setLoadingMore(false);
  }, [page, totalPages]);

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

            {posts.length === 0 ? (
              <div className="blog-empty">
                <h2>No stories yet</h2>
                <p>Check back soon for articles, guides, and new clinical AI updates.</p>
              </div>
            ) : (
              <>
                <section className="stories-grid">
                  {posts.map((post, index) => {
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
                                loading="lazy"
                                decoding="async"
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
          margin-bottom: 48px;
        }

        .blog-head h1 {
          margin: 0;
          font-family: "Playfair Display", Georgia, serif;
          font-weight: 400;
          line-height: 1.02;
          letter-spacing: -0.04em;
          color: #171717;
          font-size: clamp(3rem, 6vw, 5.2rem);
        }

        .blog-subtitle {
          margin: 18px 0 0;
          max-width: 100%;
          font-family: "Inter", sans-serif;
          font-size: 1.04rem;
          line-height: 1.7;
          color: #6b7280;
        }

        .stories-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          margin-top: 40px;
        }

        .grid-story,
        .blog-empty {
          border: 1px solid #e5e1d9;
          background: #ffffff;
          box-shadow: 0 6px 24px rgba(15, 23, 42, 0.05);
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

        .grid-copy {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 20px;
        }

        .grid-meta {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 10px;
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
          font-size: 0.9rem;
          font-family: "Inter", sans-serif;
          line-height: 1.7;
          color: #6b7280;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .grid-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid #f0ece6;
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
          color: #171717;
          font-family: "Inter", sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          line-height: 1;
          white-space: nowrap;
          flex-shrink: 0;
          transition: color 0.3s ease;
        }

        .grid-story:hover .story-cta {
          color: #2969b7;
        }

        .load-more-wrap {
          margin-top: 42px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .load-more-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          font-family: "Inter", sans-serif;
          font-size: 0.8rem;
          color: #9ca3af;
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
          border-radius: 18px;
          margin-top: 40px;
        }

        .blog-empty h2 {
          margin: 0;
          font-family: "Playfair Display", Georgia, serif;
          font-size: 2rem;
          font-weight: 400;
          color: #171717;
        }

        .blog-empty p {
          margin: 12px auto 0;
          max-width: 34ch;
          font-family: "Inter", sans-serif;
          line-height: 1.7;
          color: #6b7280;
        }

        @media (max-width: 1040px) {
          .stories-grid {
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

          .stories-grid {
            grid-template-columns: 1fr;
          }

          .grid-copy {
            padding: 22px;
          }

          .blog-top {
            padding-bottom: 72px;
          }
        }
      `}</style>
    </div>
  );
}
