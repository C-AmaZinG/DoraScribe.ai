"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useTranslations } from "@/lib/translations/translations-context";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { fetchPosts, getFeaturedImage, getCategories, formatDate, stripHtml } from '@/lib/wordpress';
import type { WPPost } from '@/lib/wordpress';

const categoryColors: Record<string, string> = {
  "Uncategorized": "#000000",
  "Media": "#000000",
  "Newsletter": "var(--secondary, #FF6F00)",
  "Guide": "var(--secondary, #FF6F00)",
  "Webinar": "#7c3aed",
  "News": "#16a34a",
};

export default function BlogSection() {
  const t = useTranslations();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await fetchPosts(1, 3);
      setPosts(data.posts);
      setLoading(false);
    })();
  }, []);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 340;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
    setTimeout(checkScroll, 400);
  };

  return (
    <section style={{ padding: '100px 24px', background: '#FDFCFA', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header with nav arrows */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '48px'
        }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(2rem, 4.5vw, 2.8rem)',
              fontWeight: 400,
              color: '#000000',
              lineHeight: 1.2,
              maxWidth: '600px'
            }}
          >
            {t("Everything you need to lead the way in clinical AI")}
          </motion.h2>

          <div style={{ display: 'flex', gap: '8px', flexShrink: 0, marginTop: '8px' }}>
            <button
              onClick={() => scroll('left')}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid rgba(0,0,0,0.12)',
                background: canScrollLeft ? '#ffffff' : '#F8FAFC',
                cursor: canScrollLeft ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: canScrollLeft ? 1 : 0.4,
                transition: 'all 0.2s ease'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid rgba(0,0,0,0.12)',
                background: canScrollRight ? '#ffffff' : '#F8FAFC',
                cursor: canScrollRight ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: canScrollRight ? 1 : 0.4,
                transition: 'all 0.2s ease'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable cards */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          style={{
            display: 'flex',
            gap: '20px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            paddingBottom: '16px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {loading ? (
            // Skeleton loading
            [1, 2, 3].map(i => (
              <div key={i} className="blog-item blog-item-wrap">
                <div style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  background: '#ffffff',
                }}>
                  <div style={{ height: '200px', background: '#e2e8f0', animation: 'pulse 1.5s ease-in-out infinite' }} />
                  <div style={{ padding: '30px' }}>
                    <div style={{ height: '12px', width: '50px', background: '#e2e8f0', borderRadius: '4px', marginBottom: '14px', animation: 'pulse 1.5s ease-in-out infinite' }} />
                    <div style={{ height: '18px', width: '90%', background: '#e2e8f0', borderRadius: '4px', marginBottom: '8px', animation: 'pulse 1.5s ease-in-out infinite' }} />
                    <div style={{ height: '18px', width: '60%', background: '#e2e8f0', borderRadius: '4px', marginBottom: '14px', animation: 'pulse 1.5s ease-in-out infinite' }} />
                    <div style={{ height: '14px', width: '100%', background: '#e2e8f0', borderRadius: '4px', marginBottom: '6px', animation: 'pulse 1.5s ease-in-out infinite' }} />
                    <div style={{ height: '14px', width: '80%', background: '#e2e8f0', borderRadius: '4px', animation: 'pulse 1.5s ease-in-out infinite' }} />
                  </div>
                </div>
              </div>
            ))
          ) : posts.length === 0 ? (
            // Empty state
            <div style={{ textAlign: 'center', padding: '60px 24px', width: '100%' }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#64748b', fontSize: '1rem' }}>
                {t("Blog posts coming soon. Check back for insights on clinical AI.")}
              </p>
            </div>
          ) : (
            posts.map((post, i) => {
              const image = getFeaturedImage(post);
              const categories = getCategories(post);
              const catName = categories[0]?.name || 'Article';
              const catColor = categoryColors[catName] || '#000000';

              return (
                <div key={post.id} className="blog-item blog-item-wrap">
                  <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  style={{
                    width: '100%',
                    scrollSnapAlign: 'start',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    background: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'border-color 0.3s ease',
                  }}
                  className="blog-card"
                >
                  <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {/* Image */}
                    <div style={{
                      height: '200px',
                      overflow: 'hidden',
                      background: '#f1f5f9',
                    }}>
                      {image ? (
                        <img
                          src={image}
                          alt={stripHtml(post.title.rendered)}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'linear-gradient(135deg, #000000, #1e3a5f)',
                          color: '#fff',
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '2rem'
                        }}>{t("dora")}</div>
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '14px',
                        width: '100%'
                      }}>
                        <div style={{
                          padding: '4px 12px',
                          border: `1px solid ${catColor}`,
                          borderRadius: '6px',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          fontFamily: "'DM Sans', sans-serif",
                          color: catColor,
                          width: 'fit-content'
                        }}>{catName}</div>
                        <div style={{
                          display: 'flex',
                          gap: '8px',
                          alignItems: 'center',
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '0.75rem',
                          color: '#94a3b8'
                        }}>
                          <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                          <span style={{ opacity: 0.3 }}>•</span>
                          <span>{Math.max(1, Math.round(post.content.rendered.replace(/<[^>]+>/g, "").trim().split(/\s+/).length / 230))} {t("min read")}</span>
                        </div>
                      </div>

                      <h3 style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        color: '#000000',
                        lineHeight: 1.4,
                        marginBottom: '12px',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

                      <p style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.95rem',
                        color: '#64748b',
                        lineHeight: 1.6,
                        marginBottom: '20px',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {post.excerpt.rendered.replace(/<[^>]+>/g, "")
                          .replace(/Written by.*?(?=[\.!?]|$)/i, '')
                          .replace(/Updated on.*?(?=[\.!?]|$)/i, '')
                          .replace(/Read more.*?(?=[\.!?]|$)/i, '')
                          .trim()}
                      </p>

                      <div style={{
                        marginTop: 'auto',
                        paddingTop: '16px',
                        borderTop: '1px solid #f1f5f9',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        paddingBottom: '4px'
                      }}>
                        <div className="story-cta" style={{ margin: 0, padding: 0 }}>
                          {t("Read article")}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                  </motion.div>
                </div>
              );
            })
          )}
        </div>

        {/* See all link */}
        {posts.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/blog" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              background: '#000000',
              color: '#fff',
              borderRadius: '100px',
              textDecoration: 'none',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'all 0.3s ease'
            }}>
              {t("See all articles")}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
        .blog-card {
          height: 100%;
          transition: border-color 0.3s ease;
        }
        .blog-card:hover {
          border-color: rgba(41, 105, 183, 0.3) !important;
        }
        .blog-card:hover img {
          transform: scale(1.05);
        }
        .story-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #000000;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
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
        .blog-card:hover .story-cta {
          color: #2969b7;
        }
        .blog-card:hover .story-cta::after {
          width: 100%;
        }
        .blog-item {
          flex: 0 0 calc((100% - 40px) / 3);
          max-width: calc((100% - 40px) / 3);
          min-width: calc((100% - 40px) / 3);
        }
        .blog-item-wrap {
          padding: 12px;
          border-radius: 24px;
          background: #ffffff;
          border: 1px solid rgba(0, 170, 170, 0.06);
          display: flex;
        }
        @media (max-width: 980px) {
          .blog-item {
            flex: 0 0 calc((100% - 20px) / 2);
            max-width: calc((100% - 20px) / 2);
            min-width: calc((100% - 20px) / 2);
          }
        }
        @media (max-width: 640px) {
          .blog-item {
            flex: 0 0 100%;
            max-width: 100%;
            min-width: 100%;
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}




