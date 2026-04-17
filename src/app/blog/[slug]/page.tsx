import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  fetchPostBySlug,
  fetchPosts,
  getAllSlugs,
  getFeaturedImage,
  stripHtml,
} from "@/lib/wordpress";
import { yoastToMetadata } from "@/lib/yoast";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { config } from "@/lib/config";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) return {};

  if (post.yoast_head_json) {
    return yoastToMetadata(post.yoast_head_json, {
      forceIndex: true,
      forceOgType: "article",
      fallbackOgImage:
        getFeaturedImage(post) ?? `${config.siteUrl}/og-image.png`,
    });
  }

  // Fallback: build metadata manually from post fields
  const title = post.title.rendered.replace(/<[^>]+>/g, "");
  const description = stripHtml(post.excerpt.rendered).slice(0, 160);
  const image = getFeaturedImage(post);
  const postUrl = `${config.siteUrl}/blog/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: postUrl },
    openGraph: {
      title,
      description,
      type: "article",
      url: postUrl,
      siteName: "Dorascribe",
      ...(image && { images: [{ url: image, width: 1200, height: 630 }] }),
      publishedTime: post.date,
      modifiedTime: post.modified,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && { images: [image] }),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [post, relatedData] = await Promise.all([
    fetchPostBySlug(slug),
    fetchPosts(1, 4),
  ]);

  if (!post) notFound();

  const relatedPosts = relatedData.posts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return <BlogPostContent post={post} relatedPosts={relatedPosts} />;
}
