"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MakroButton from '@/components/ui/MakroButton';
import { fetchPosts, getFeaturedImage, getAuthorName, getCategories, formatDate, stripHtml } from '@/lib/wordpress';
import type { WPPost } from '@/lib/wordpress';

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
      setPosts(prev => [...prev, ...data.posts]);
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

  const handleLoadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadPosts(nextPage, true);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <main style={{ paddingTop: '120px', background: '#EBEFF5', minHeight: '100vh' }}>
        {/* Hero */}
        <section style={{ padding: '60px 24px 80px', textAlign: 'center' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.06)',
              borderRadius: '100px',
              padding: '8px 20px',
              marginBottom: '24px'
            }}>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 500,
                color: '#000000'
              }}>📝 Blog</span>
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 400,
              color: '#000000',
              lineHeight: 1.15,
              marginBottom: '20px'
            }}>
              Insights & Resources
            </h1>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.1rem',
              color: '#64748b',
              lineHeight: 1.6,
              maxWidth: '560px',
              margin: '0 auto'
            }}>
              Expert articles, guides, and updates on clinical AI, medical documentation, and healthcare technology.
            </p>
          </div>
        </section>

        {/* Posts grid */}
        <section style={{ padding: '0 24px 100px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {loading ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} style={{
                    background: '#ffffff',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    minHeight: '420px',
                    animation: 'pulse 1.5s ease-in-out infinite'
                  }}>
                    <div style={{ height: '200px', background: '#e2e8f0' }} />
                    <div style={{ padding: '24px' }}>
                      <div style={{ height: '14px', width: '60px', background: '#e2e8f0', borderRadius: '4px', marginBottom: '16px' }} />
                      <div style={{ height: '20px', width: '90%', background: '#e2e8f0', borderRadius: '4px', marginBottom: '8px' }} />
                      <div style={{ height: '20px', width: '70%', background: '#e2e8f0', borderRadius: '4px', marginBottom: '16px' }} />
                      <div style={{ height: '14px', width: '100%', background: '#e2e8f0', borderRadius: '4px', marginBottom: '6px' }} />
                      <div style={{ height: '14px', width: '80%', background: '#e2e8f0', borderRadius: '4px' }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 24px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#000000', marginBottom: '16px' }}>
                  No posts yet
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", color: '#64748b', fontSize: '1rem' }}>
                  Check back soon for new articles and insights.
                </p>
              </div>
            ) : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
                  {posts.map((post, i) => {
                    const image = getFeaturedImage(post);
                    const author = getAuthorName(post);
                    const categories = getCategories(post);
                    
                    return (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (i % 9) * 0.05 }}
                      >
                        <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <div style={{
                            background: '#ffffff',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            border: '1px solid rgba(0,0,0,0.04)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                          className="blog-card-hover"
                          >
                            {/* Image */}
                            <div style={{
                              height: '200px',
                              overflow: 'hidden',
                              background: '#f1f5f9'
                            }}>
                              {image ? (
                                <img src={image} alt={stripHtml(post.title.rendered)} style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  transition: 'transform 0.5s ease'
                                }} />
                              ) : (
                                <div style={{
                                  width: '100%',
                                  height: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  background: 'linear-gradient(135deg, #000000, #1e3a5f)',
                                  color: '#fff',
                                  fontFamily: "'Playfair Display', serif",
                                  fontSize: '2rem'
                                }}>
                                  dora
                                </div>
                              )}
                            </div>

                            {/* Content */}
                            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                              {/* Categories */}
                              <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
                                {categories.slice(0, 2).map(cat => (
                                  <span key={cat.slug} style={{
                                    padding: '3px 10px',
                                    border: '1px solid #FF6F00',
                                    borderRadius: '6px',
                                    fontSize: '0.7rem',
                                    fontWeight: 600,
                                    fontFamily: "'Inter', sans-serif",
                                    color: '#FF6F00'
                                  }}>{cat.name}</span>
                                ))}
                              </div>

                              <h3 style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                color: '#000000',
                                lineHeight: 1.3,
                                marginBottom: '10px'
                              }} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

                              <p style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '0.85rem',
                                color: '#64748b',
                                lineHeight: 1.6,
                                marginBottom: '16px',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                              }} dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />

                              {/* Footer */}
                              <div style={{
                                marginTop: 'auto',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingTop: '16px',
                                borderTop: '1px solid rgba(0,0,0,0.04)'
                              }}>
                                <span style={{
                                  fontFamily: "'Inter', sans-serif",
                                  fontSize: '0.75rem',
                                  color: '#94a3b8'
                                }}>{formatDate(post.date)}</span>
                                <span style={{
                                  fontFamily: "'Inter', sans-serif",
                                  fontSize: '0.75rem',
                                  color: '#94a3b8'
                                }}>{author}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Load More */}
                {page < totalPages && (
                  <div style={{ textAlign: 'center', marginTop: '56px' }}>
                    <button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '14px 36px',
                        background: '#000000',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '100px',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        cursor: loadingMore ? 'wait' : 'pointer',
                        opacity: loadingMore ? 0.7 : 1,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {loadingMore ? 'Loading...' : 'Load more articles'}
                      {!loadingMore && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 5v14M5 12l7 7 7-7" />
                        </svg>
                      )}
                    </button>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.8rem',
                      color: '#94a3b8',
                      marginTop: '12px'
                    }}>
                      Showing {posts.length} of {totalPosts} articles
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
        .blog-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
          border-color: #FF6F00 !important;
        }
        .blog-card-hover:hover img {
          transform: scale(1.05);
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}



