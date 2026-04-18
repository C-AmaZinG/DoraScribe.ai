import type { Metadata } from "next";
import { fetchPosts } from "@/lib/wordpress";
import { BlogPageContent } from "@/components/blog/BlogPageContent";
import { config } from "@/lib/config";

export const metadata: Metadata = {
  title: "Clinical AI Blog | Dorascribe",
  description:
    "Explore practical guidance, product updates, and real-world workflows to help clinicians reduce admin burden and document with confidence.",
  openGraph: {
    title: "Clinical AI Blog | Dorascribe",
    description:
      "Explore practical guidance, product updates, and real-world workflows to help clinicians reduce admin burden and document with confidence.",
    url: `${config.siteUrl}/blog`,
    siteName: "Dorascribe",
    images: [{ url: "/og-image.png", width: 2588, height: 1620, alt: "Dorascribe Blog" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clinical AI Blog | Dorascribe",
    description:
      "Explore practical guidance, product updates, and real-world workflows to help clinicians reduce admin burden and document with confidence.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: `${config.siteUrl}/blog` },
};

export default async function BlogPage() {
  const { posts, totalPages, totalPosts } = await fetchPosts(1, 9);
  return (
    <BlogPageContent
      initialPosts={posts}
      totalPages={totalPages}
      totalPosts={totalPosts}
    />
  );
}
