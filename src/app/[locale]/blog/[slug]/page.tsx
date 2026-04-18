import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchPostBySlug, fetchPosts, getAllSlugs } from "@/lib/wordpress";
import { yoastToMetadata } from "@/lib/yoast";
import { translateBatch, translateMetadata } from "@/lib/translation";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { locales, buildAlternates, defaultLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { config } from "@/lib/config";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) return {};

  const { canonical, languages } = buildAlternates(`/blog/${slug}`);

  let base: Metadata;
  if (post.yoast_head_json) {
    base = yoastToMetadata(post.yoast_head_json, {
      forceIndex: true,
      forceOgType: "article",
      fallbackOgImage: "/og-image.png",
    });
  } else {
    const title = post.title.rendered;
    const description = post.excerpt.rendered.replace(/<[^>]*>/g, "").trim().slice(0, 160);
    base = {
      title: { absolute: title },
      description,
      openGraph: {
        title,
        description,
        type: "article",
        url: `${config.siteUrl}/blog/${slug}`,
        siteName: "Dorascribe",
        images: [{ url: "/og-image.png", width: 2588, height: 1620 }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/og-image.png"],
      },
    };
  }

  const translated = locale !== defaultLocale ? await translateMetadata(base, locale) : base;
  return { ...translated, alternates: { canonical, languages } };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const [postData, relatedData] = await Promise.all([
    fetchPostBySlug(slug),
    fetchPosts(1, 4),
  ]);

  if (!postData) notFound();

  let post = postData;
  if (locale !== defaultLocale) {
    const [translatedContent] = await translateBatch(
      [post.content.rendered],
      locale,
      "en",
      { html: true }
    );
    post = { ...post, content: { rendered: translatedContent } };
  }

  const relatedPosts = relatedData.posts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return <BlogPostContent post={post} relatedPosts={relatedPosts} />;
}
