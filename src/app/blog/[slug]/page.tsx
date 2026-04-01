"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { fetchPostBySlug, getFeaturedImage, getAuthorName, getCategories, formatDate } from '@/lib/wordpress';
import type { WPPost } from '@/lib/wordpress';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<WPPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      setLoading(true);
      const data = await fetchPostBySlug(slug);
      setPost(data);
      setLoading(false);
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="app-container">
        <Header />
        <main style={{ paddingTop: '120px', background: '#EBEFF5', minHeight: '100vh' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px' }}>
            <div style={{ height: '24px', width: '120px', background: '#e2e8f0', borderRadius: '6px', marginBottom: '24px', animation: 'pulse 1.5s ease-in-out infinite' }} />
            <div style={{ height: '48px', width: '90%', background: '#e2e8f0', borderRadius: '8px', marginBottom: '12px', animation: 'pulse 1.5s ease-in-out infinite' }} />
            <div style={{ height: '48px', width: '70%', background: '#e2e8f0', borderRadius: '8px', marginBottom: '32px', animation: 'pulse 1.5s ease-in-out infinite' }} />
            <div style={{ height: '400px', width: '100%', background: '#e2e8f0', borderRadius: '20px', marginBottom: '40px', animation: 'pulse 1.5s ease-in-out infinite' }} />
            {[1,2,3,4,5].map(i => (
              <div key={i} style={{ height: '16px', width: i % 2 === 0 ? '85%' : '100%', background: '#e2e8f0', borderRadius: '4px', marginBottom: '12px', animation: 'pulse 1.5s ease-in-out infinite' }} />
            ))}
          </div>
        </main>
        <Footer />
        <style jsx>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="app-container">
        <Header />
        <main style={{ paddingTop: '120px', background: '#EBEFF5', minHeight: '100vh' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', padding: '120px 24px', textAlign: 'center' }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 400, color: '#0B1D33', marginBottom: '16px' }}>
              Post not found
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", color: '#64748b', marginBottom: '32px' }}>
              The article you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link href="/blog" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 28px',
              background: '#0B1D33',
              color: '#fff',
              borderRadius: '100px',
              textDecoration: 'none',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.9rem',
              fontWeight: 500
            }}>
              â† Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const image = getFeaturedImage(post);
  const author = getAuthorName(post);
  const categories = getCategories(post);

  return (
    <div className="app-container">
      <Header />
      <main style={{ paddingTop: '120px', background: '#EBEFF5', minHeight: '100vh' }}>
        <article>
          {/* Header */}
          <section style={{ padding: '60px 24px 40px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              {/* Back link */}
              <Link href="/blog" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                color: '#64748b',
                textDecoration: 'none',
                marginBottom: '32px'
              }}>
                â† Back to Blog
              </Link>

              {/* Categories */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {categories.map(cat => (
                  <span key={cat.slug} style={{
                    padding: '4px 12px',
                    border: '1px solid #FF6F00',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                    color: '#FF6F00'
                  }}>{cat.name}</span>
                ))}
              </div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: 400,
                  color: '#0B1D33',
                  lineHeight: 1.2,
                  marginBottom: '24px'
                }}
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />

              {/* Meta */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                color: '#64748b'
              }}>
                <span>{author}</span>
                <span>Â·</span>
                <span>{formatDate(post.date)}</span>
              </div>
            </div>
          </section>

          {/* Featured Image */}
          {image && (
            <section style={{ padding: '0 24px 48px' }}>
              <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  style={{
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.08)'
                  }}
                >
                  <img
                    src={image}
                    alt={post.title.rendered.replace(/<[^>]*>/g, '')}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </motion.div>
              </div>
            </section>
          )}

          {/* Content */}
          <section style={{ padding: '0 24px 100px' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              style={{
                maxWidth: '740px',
                margin: '0 auto',
                background: '#ffffff',
                borderRadius: '24px',
                padding: 'clamp(32px, 5vw, 56px)',
                border: '1px solid rgba(0,0,0,0.04)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
              }}
            >
              <div
                className="wp-content"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />
            </motion.div>
          </section>
        </article>
      </main>
      <Footer />

      <style jsx global>{`
        .wp-content {
          font-family: 'Inter', sans-serif;
          font-size: 1.05rem;
          line-height: 1.8;
          color: #334155;
        }
        .wp-content h1, .wp-content h2, .wp-content h3, .wp-content h4 {
          font-family: 'Playfair Display', serif;
          font-weight: 400;
          color: #0B1D33;
          margin-top: 2em;
          margin-bottom: 0.75em;
          line-height: 1.3;
        }
        .wp-content h2 { font-size: 1.75rem; }
        .wp-content h3 { font-size: 1.4rem; }
        .wp-content h4 { font-size: 1.15rem; }
        .wp-content p { margin-bottom: 1.5em; }
        .wp-content a {
          color: #FF6F00;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .wp-content a:hover { opacity: 0.8; }
        .wp-content img {
          max-width: 100%;
          height: auto;
          border-radius: 16px;
          margin: 1.5em 0;
        }
        .wp-content ul, .wp-content ol {
          padding-left: 1.5em;
          margin-bottom: 1.5em;
        }
        .wp-content li { margin-bottom: 0.5em; }
        .wp-content blockquote {
          border-left: 3px solid #FF6F00;
          margin: 2em 0;
          padding: 1em 1.5em;
          background: #FFF7ED;
          border-radius: 0 12px 12px 0;
          font-style: italic;
          color: #78350f;
        }
        .wp-content pre {
          background: #1e293b;
          color: #e2e8f0;
          padding: 1.5em;
          border-radius: 12px;
          overflow-x: auto;
          margin: 1.5em 0;
          font-size: 0.9rem;
        }
        .wp-content code {
          background: #f1f5f9;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.9em;
        }
        .wp-content pre code {
          background: none;
          padding: 0;
        }
        .wp-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5em 0;
        }
        .wp-content th, .wp-content td {
          border: 1px solid #e2e8f0;
          padding: 10px 16px;
          text-align: left;
        }
        .wp-content th {
          background: #f8fafc;
          font-weight: 600;
        }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
    </div>
  );
}


