import type { Metadata } from "next";
import { fetchPosts } from "@/lib/wordpress";
import { BlogPageContent } from "@/components/blog/BlogPageContent";
import { locales, buildAlternates, defaultLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { config } from "@/lib/config";
import { translateBatch, translateMetadata } from "@/lib/translation";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { canonical, languages } = buildAlternates("/blog");

  const base: Metadata = {
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
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: "Clinical AI Blog | Dorascribe",
      description:
        "Explore practical guidance, product updates, and real-world workflows to help clinicians reduce admin burden and document with confidence.",
      images: ["/og-image.png"],
    },
  };

  const translated = locale !== defaultLocale ? await translateMetadata(base, locale) : base;
  return { ...translated, alternates: { canonical, languages } };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const { posts, totalPages, totalPosts } = await fetchPosts(1, 9);

  let translatedPosts = posts;
  if (locale !== defaultLocale && posts.length > 0) {
    const texts = posts.flatMap((p) => [p.title.rendered, p.excerpt.rendered]);
    const translated = await translateBatch(texts, locale, "en", { html: true });
    translatedPosts = posts.map((p, i) => ({
      ...p,
      title: { rendered: translated[i * 2] },
      excerpt: { rendered: translated[i * 2 + 1] },
    }));
  }

  return (
    <BlogPageContent
      initialPosts={translatedPosts}
      totalPages={totalPages}
      totalPosts={totalPosts}
      locale={locale}
    />
  );
}
