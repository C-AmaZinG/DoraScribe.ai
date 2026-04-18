import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchPostBySlug, fetchPosts, getAllSlugs, getFeaturedImage } from "@/lib/wordpress";
import { yoastToMetadata, getYoastJsonLd } from "@/lib/yoast";
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
    const [translatedTitle, translatedExcerpt, translatedContent] = await translateBatch(
      [post.title.rendered, post.excerpt.rendered, post.content.rendered],
      locale,
      "en",
      { html: true }
    );
    post = {
      ...post,
      title: { rendered: translatedTitle },
      excerpt: { rendered: translatedExcerpt },
      content: { rendered: translatedContent },
    };
  }

  const relatedRaw = relatedData.posts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  let relatedPosts = relatedRaw;
  if (locale !== defaultLocale && relatedRaw.length > 0) {
    const texts = relatedRaw.flatMap((p) => [p.title.rendered, p.excerpt.rendered]);
    const translated = await translateBatch(texts, locale, "en", { html: true });
    relatedPosts = relatedRaw.map((p, i) => ({
      ...p,
      title: { rendered: translated[i * 2] },
      excerpt: { rendered: translated[i * 2 + 1] },
    }));
  }

  const yoastJsonLd = postData.yoast_head_json
    ? getYoastJsonLd(postData.yoast_head_json)
    : null;

  const fallbackJsonLd = !yoastJsonLd
    ? buildFallbackJsonLd(postData, slug, locale)
    : null;

  const jsonLd = yoastJsonLd || fallbackJsonLd;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BlogPostContent post={post} relatedPosts={relatedPosts} />
    </>
  );
}

function buildFallbackJsonLd(
  post: Awaited<ReturnType<typeof fetchPostBySlug>>,
  slug: string,
  locale: Locale
): Record<string, unknown> | null {
  if (!post) return null;
  const url = `${config.siteUrl}${locale === defaultLocale ? "" : `/${locale}`}/blog/${slug}`;
  const title = post.title.rendered.replace(/<[^>]+>/g, "");
  const description = post.excerpt.rendered.replace(/<[^>]+>/g, "").trim().slice(0, 160);
  const image = getFeaturedImage(post) || `${config.siteUrl}/og-image.png`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: title,
        description,
        image,
        datePublished: post.date,
        dateModified: post.modified || post.date,
        author: { "@type": "Organization", name: "Dorascribe" },
        publisher: {
          "@type": "Organization",
          name: "Dorascribe",
          logo: { "@type": "ImageObject", url: `${config.siteUrl}/favicon.png` },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        url,
        inLanguage: locale,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: config.siteUrl },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${config.siteUrl}/blog` },
          { "@type": "ListItem", position: 3, name: title, item: url },
        ],
      },
      {
        "@type": "MedicalWebPage",
        url,
        name: title,
        description,
        inLanguage: locale,
        audience: { "@type": "MedicalAudience", audienceType: "Clinician" },
      },
    ],
  };
}
