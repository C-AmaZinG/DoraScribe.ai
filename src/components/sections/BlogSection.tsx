"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { fetchPosts, getFeaturedImage, getCategories, formatDate, stripHtml } from '@/lib/wordpress';
import type { WPPost } from '@/lib/wordpress';

const categoryColors: Record<string, string> = {
  "Uncategorized": "#0B1D33",
  "Media": "#0B1D33",
  "Newsletter": "#FF6F00",
  "Guide": "#FF6F00",
  "Webinar": "#7c3aed",
  "News": "#16a34a",
};

export default function BlogSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await fetchPosts(1, 6);
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
    <section style={{ padding: '100px 24px', background: '#ffffff', overflow: 'hidden' }}>
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
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4.5vw, 2.8rem)',
              fontWeight: 400,
              color: '#0B1D33',
              lineHeight: 1.2,
              maxWidth: '600px'
            }}
          >
            Everything you need to lead the way in clinical AI
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B1D33" strokeWidth="2">
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B1D33" strokeWidth="2">
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
            [1, 2, 3, 4].map(i => (
              <div key={i} style={{
                minWidth: '300px',
                maxWidth: '300px',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.06)',
                background: '#ffffff',
              }}>
                <div style={{ height: '200px', background: '#e2e8f0', animation: 'pulse 1.5s ease-in-out infinite' }} />
                <div style={{ padding: '24px' }}>
                  <div style={{ height: '12px', width: '50px', background: '#e2e8f0', borderRadius: '4px', marginBottom: '14px', animation: 'pulse 1.5s ease-in-out infinite' }} />
                  <div style={{ height: '18px', width: '90%', background: '#e2e8f0', borderRadius: '4px', marginBottom: '8px', animation: 'pulse 1.5s ease-in-out infinite' }} />
                  <div style={{ height: '18px', width: '60%', background: '#e2e8f0', borderRadius: '4px', marginBottom: '14px', animation: 'pulse 1.5s ease-in-out infinite' }} />
                  <div style={{ height: '14px', width: '100%', background: '#e2e8f0', borderRadius: '4px', marginBottom: '6px', animation: 'pulse 1.5s ease-in-out infinite' }} />
                  <div style={{ height: '14px', width: '80%', background: '#e2e8f0', borderRadius: '4px', animation: 'pulse 1.5s ease-in-out infinite' }} />
                </div>
              </div>
            ))
          ) : posts.length === 0 ? (
            // Empty state
            <div style={{ textAlign: 'center', padding: '60px 24px', width: '100%' }}>
              <p style={{ fontFamily: "'Inter', sans-serif", color: '#64748b', fontSize: '1rem' }}>
                Blog posts coming soon. Check back for insights on clinical AI.
              </p>
            </div>
          ) : (
            posts.map((post, i) => {
              const image = getFeaturedImage(post);
              const categories = getCategories(post);
              const catName = categories[0]?.name || 'Article';
              const catColor = categoryColors[catName] || '#0B1D33';

              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  style={{
                    minWidth: '300px',
                    maxWidth: '300px',
                    scrollSnapAlign: 'start',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '1px solid rgba(0,0,0,0.06)',
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
                          background: 'linear-gradient(135deg, #0B1D33, #1e3a5f)',
                          color: '#fff',
                          fontFamily: "'Playfair Display', serif",
                          fontSize: '2rem'
                        }}>dora</div>
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <div style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        border: `1px solid ${catColor}`,
                        borderRadius: '6px',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        fontFamily: "'Inter', sans-serif",
                        color: catColor,
                        marginBottom: '14px',
                        width: 'fit-content'
                      }}>{catName}</div>

                      <h3 style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '1.05rem',
                        fontWeight: 600,
                        color: '#0B1D33',
                        lineHeight: 1.3,
                        marginBottom: '10px'
                      }} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

                      <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.85rem',
                        color: '#64748b',
                        lineHeight: 1.6,
                        marginBottom: '20px',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }} dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />

                      <div style={{
                        marginTop: 'auto',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: '#0B1D33',
                      }}>
                        Read article â†’
                      </div>
                    </div>
                  </Link>
                </motion.div>
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
              background: '#0B1D33',
              color: '#fff',
              borderRadius: '100px',
              textDecoration: 'none',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'all 0.3s ease'
            }}>
              See all articles
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
        .blog-card:hover {
          border-color: #FF6F00 !important;
        }
        .blog-card:hover img {
          transform: scale(1.05);
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}


