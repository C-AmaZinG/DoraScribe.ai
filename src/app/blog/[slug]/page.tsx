"use client";

import React, { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  fetchPostBySlug,
  fetchPosts,
  getFeaturedImage,
  stripHtml,
  sanitizeArticleContent,
} from "@/lib/wordpress";
import type { WPPost } from "@/lib/wordpress";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { config } from "@/lib/config";

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
      const [currentPost, relatedData] = await Promise.all([
        fetchPostBySlug(slug),
        fetchPosts(1, 4),
      ]);
      if (cancelled) return;
      
      if (currentPost) {
        setPost(currentPost);
        setRelatedPosts(
          relatedData.posts.filter((item) => item.slug !== slug).slice(0, 3)
        );
      }
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
          <div className="w-8 h-8 rounded-full border-2 border-[#ff7429] border-t-transparent animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return notFound();
  }

  return <BlogPostContent post={post} relatedPosts={relatedPosts} />;
}
