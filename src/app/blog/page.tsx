"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MakroButton from "@/components/ui/MakroButton";
import {
  fetchPosts,
  getFeaturedImage,
  getCategories,
  formatDate,
  stripHtml,
} from "@/lib/wordpress";
import type { WPPost } from "@/lib/wordpress";

type CategoryOption = {
  key: string;
  label: string;
  count: number;
};

function getReadTime(content: string) {
  const words = stripHtml(content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

function getPrimaryCategory(post: WPPost) {
  return getCategories(post)[0] ?? null;
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
  const [activeCategory, setActiveCategory] = useState("all");

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

  const categoryOptions = useMemo(() => {
    const counts = new Map<string, CategoryOption>();

    posts.forEach((post) => {
      getCategories(post).forEach((category) => {
        const existing = counts.get(category.slug);
        counts.set(category.slug, {
          key: category.slug,
          label: category.name,
          count: (existing?.count ?? 0) + 1,
        });
      });
    });

    const ranked = Array.from(counts.values())
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
      .slice(0, 4);

    return [{ key: "all", label: "Blog", count: posts.length }, ...ranked];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return posts;
    return posts.filter((post) =>
      getCategories(post).some((category) => category.slug === activeCategory)
    );
  }, [posts, activeCategory]);

  const featuredPost = filteredPosts[0] ?? null;
  const sidePosts = filteredPosts.slice(1, 5);
  const gridPosts = filteredPosts.slice(5);

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
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="blog-head"
            >
              <p className="blog-kicker">DoraScribe Blog</p>
              <h1>Latest Stories</h1>
              <p className="blog-subtitle">
                Practical insights, product updates, and clinical AI perspectives for
                healthcare teams building better documentation workflows.
              </p>
            </motion.div>

            {loading ? (
              <div className="blog-loading">
                <div className="blog-tabs">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="tab-skeleton shimmer" />
                  ))}
                </div>
                <div className="featured-skeleton-wrap">
                  <div className="featured-skeleton shimmer" />
                  <div className="stack-skeleton">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="stack-card-skeleton shimmer" />
                    ))}
                  </div>
                </div>
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
                <div className="blog-tabs" role="tablist" aria-label="Blog categories">
                  {categoryOptions.map((category) => (
                    <button
                      key={category.key}
                      type="button"
                      className={
                        activeCategory === category.key ? "blog-tab is-active" : "blog-tab"
                      }
                      onClick={() => setActiveCategory(category.key)}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>

                {featuredPost && (
                  <section className="stories-showcase">
                    <motion.article
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45 }}
                      className="featured-story"
                    >
                      <Link href={`/blog/${featuredPost.slug}`} className="featured-link">
                        <div className="featured-image-wrap">
                          {getFeaturedImage(featuredPost) ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={getFeaturedImage(featuredPost) ?? ""}
                              alt={stripHtml(featuredPost.title.rendered)}
                              className="featured-image"
                            />
                          ) : (
                            <ArticleFallback />
                          )}
                        </div>

                        <div className="featured-copy">
                          <span className="featured-label">Featured</span>
                          <div className="featured-meta">
                            {getPrimaryCategory(featuredPost) && (
                              <span className="story-category">
                                {getPrimaryCategory(featuredPost)?.name}
                              </span>
                            )}
                            <time>{formatDate(featuredPost.date)}</time>
                          </div>
                          <h2
                            className="featured-title"
                            dangerouslySetInnerHTML={{ __html: featuredPost.title.rendered }}
                          />
                          <p className="featured-excerpt">
                            {stripHtml(featuredPost.excerpt.rendered)}
                          </p>
                          <span className="featured-cta">
                            Read full article
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </Link>
                    </motion.article>

                    <div className="story-stack">
                      {sidePosts.map((post, index) => {
                        const category = getPrimaryCategory(post);
                        return (
                          <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.06 }}
                            className="stack-story"
                          >
                            <Link href={`/blog/${post.slug}`} className="stack-link">
                              <div className="stack-meta">
                                {category ? <span className="story-category subtle">{category.name}</span> : <span />}
                                <time>{formatDate(post.date)}</time>
                              </div>
                              <h3
                                className="stack-title"
                                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                              />
                              <p className="stack-excerpt">{stripHtml(post.excerpt.rendered)}</p>
                            </Link>
                          </motion.article>
                        );
                      })}
                    </div>
                  </section>
                )}

                {gridPosts.length > 0 && (
                  <section className="stories-grid">
                    {gridPosts.map((post, index) => {
                      const image = getFeaturedImage(post);
                      const category = getPrimaryCategory(post);
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
                                {category ? (
                                  <span className="story-category subtle">{category.name}</span>
                                ) : (
                                  <span />
                                )}
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
                                <span className="grid-arrow">
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
                      Showing {filteredPosts.length} of {totalPosts} stories
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <section className="blog-cta-section">
          <div className="blog-shell">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45 }}
              className="blog-cta-panel"
            >
              <div className="blog-cta-copy">
                <span className="cta-kicker">Explore DoraScribe</span>
                <h2>Realize the full potential of clinical AI with DoraScribe.</h2>
                <p>
                  See how our ambient medical documentation workflow can help you
                  save time, reduce admin, and stay more present with patients.
                </p>
              </div>

              <div className="blog-cta-actions">
                <MakroButton
                  text="Start a free trial"
                  href="https://app.dorascribe.ai/signUp"
                />
                <Link href="/contact" className="cta-secondary-link">
                  Get in touch
                </Link>
              </div>
            </motion.div>
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
          max-width: 760px;
          margin-bottom: 34px;
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
          max-width: 44ch;
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

        .featured-meta,
        .stack-meta,
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

        .featured-meta {
          margin-top: 18px;
        }

        .story-category {
          display: inline-flex;
          align-items: center;
          padding: 5px 10px;
          border-radius: 999px;
          background: #171717;
          color: #ffffff;
          font-family: "Inter", sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
        }

        .story-category.subtle {
          background: rgba(41, 105, 183, 0.08);
          color: #2969b7;
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

        .featured-cta {
          margin-top: 24px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #171717;
          font-family: "Inter", sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
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
          margin-top: 28px;
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
          padding: 20px;
        }

        .grid-title {
          margin-top: 14px;
          font-family: "Inter", sans-serif;
          font-size: 1.04rem;
          font-weight: 700;
          line-height: 1.4;
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
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid #f0ece6;
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
