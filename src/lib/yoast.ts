import type { Metadata } from 'next';

export interface YoastHeadJson {
  title: string;
  description: string;
  robots: {
    index: string;
    follow: string;
    'max-snippet'?: string;
    'max-image-preview'?: string;
    'max-video-preview'?: string;
  };
  canonical?: string;
  og_locale?: string;
  og_type?: string;
  og_title?: string;
  og_description?: string;
  og_url?: string;
  og_site_name?: string;
  og_image?: Array<{
    url: string;
    width?: number;
    height?: number;
    type?: string;
  }>;
  twitter_card?: string;
  twitter_misc?: Record<string, string>;
  article_published_time?: string;
  article_modified_time?: string;
  author?: string;
  schema?: {
    '@context': string;
    '@graph': Array<Record<string, unknown>>;
  };
}

// WordPress and site are on the same domain for dorascribe — no rewriting needed,
// but we keep the helper for structural consistency with zoemed pattern.
const WP_HOST = 'dorascribe.ai';
const SITE_HOST = 'dorascribe.ai';

export function rewritePageUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === WP_HOST && !parsed.pathname.startsWith('/wp-content/')) {
      parsed.hostname = SITE_HOST;
      return parsed.toString();
    }
  } catch {
    // Not a valid URL
  }
  return url;
}

function rewritePageUrlsInJson(json: string): string {
  return json.replace(
    new RegExp(`https?://${WP_HOST.replace('.', '\\.')}(/[^"]*)?`, 'g'),
    (match) => {
      if (match.includes('/wp-content/')) return match;
      return match.replace(WP_HOST, SITE_HOST);
    }
  );
}

const MIN_OG_IMAGE_WIDTH = 600;
const MIN_OG_IMAGE_HEIGHT = 300;

interface YoastMetadataOptions {
  forceIndex?: boolean;
  forceOgType?: 'website' | 'article';
  fallbackOgImage?: string;
}

export function yoastToMetadata(
  yoast: YoastHeadJson,
  options?: YoastMetadataOptions
): Metadata {
  const title = yoast.title;
  const description = yoast.og_description || yoast.description;

  const robots = options?.forceIndex
    ? {
        index: true,
        follow: true,
        'max-snippet': -1 as const,
        'max-image-preview': 'large' as const,
        'max-video-preview': -1 as const,
      }
    : {
        index: yoast.robots.index === 'index',
        follow: yoast.robots.follow === 'follow',
      };

  const yoastImage = yoast.og_image?.[0];
  const yoastImageLargeEnough =
    yoastImage &&
    yoastImage.width &&
    yoastImage.height &&
    yoastImage.width >= MIN_OG_IMAGE_WIDTH &&
    yoastImage.height >= MIN_OG_IMAGE_HEIGHT;

  const ogImages = yoastImageLargeEnough
    ? yoast.og_image!.map((img) => ({
        url: img.url,
        width: img.width,
        height: img.height,
        type: img.type,
      }))
    : options?.fallbackOgImage
      ? [{ url: options.fallbackOgImage, width: 1200, height: 630 }]
      : yoastImage
        ? [{ url: yoastImage.url, width: yoastImage.width, height: yoastImage.height, type: yoastImage.type }]
        : undefined;

  const canonical = yoast.canonical
    ? rewritePageUrl(yoast.canonical)
    : yoast.og_url
      ? rewritePageUrl(yoast.og_url)
      : undefined;

  const metadata: Metadata = {
    title: { absolute: title },
    description,
    robots,
    openGraph: {
      title: yoast.og_title || title,
      description: yoast.og_description || description,
      type: options?.forceOgType || (yoast.og_type as 'website' | 'article') || 'website',
      ...(yoast.og_url && { url: rewritePageUrl(yoast.og_url) }),
      ...(yoast.og_site_name && { siteName: yoast.og_site_name }),
      ...(yoast.og_locale && { locale: yoast.og_locale }),
      ...(ogImages && { images: ogImages }),
      ...(yoast.article_published_time && { publishedTime: yoast.article_published_time }),
      ...(yoast.article_modified_time && { modifiedTime: yoast.article_modified_time }),
    },
    twitter: {
      card: (yoast.twitter_card as 'summary_large_image' | 'summary') || 'summary_large_image',
      title: yoast.og_title || title,
      description: yoast.og_description || description,
      ...(ogImages && { images: ogImages.map((img) => img.url) }),
    },
    ...(canonical && { alternates: { canonical } }),
  };

  return metadata;
}

export function getYoastJsonLd(
  yoast: YoastHeadJson,
  additionalSchemas?: Record<string, unknown>[]
): Record<string, unknown> | null {
  if (!yoast.schema) return null;

  const rewritten = JSON.parse(
    rewritePageUrlsInJson(JSON.stringify(yoast.schema))
  ) as { '@context': string; '@graph': Array<Record<string, unknown>> };

  if (additionalSchemas && additionalSchemas.length > 0) {
    rewritten['@graph'].push(...additionalSchemas);
  }

  return rewritten;
}
