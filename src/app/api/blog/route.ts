import { NextResponse } from 'next/server';
import { translateBatch } from '@/lib/translation';

type WPPostLite = {
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  [key: string]: unknown;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('per_page') || '10';
  const slug = searchParams.get('slug');
  const locale = searchParams.get('locale') || 'en';

  const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || "https://dorascribe.ai/wp-json/wp/v2";

  let url = `${WP_API_URL}/posts?_embed&status=publish`;

  if (slug) {
    url = `${WP_API_URL}/posts?slug=${slug}&_embed`;
  } else {
    url += `&page=${page}&per_page=${perPage}`;
  }

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: `WP API error: ${res.statusText}` }, { status: res.status });
    }

    let data = (await res.json()) as WPPostLite[];

    if (locale !== 'en' && Array.isArray(data) && data.length > 0) {
      const texts = data.flatMap((p) => [
        p.title?.rendered ?? '',
        p.excerpt?.rendered ?? '',
      ]);
      try {
        const translated = await translateBatch(texts, locale, 'en', { html: true });
        data = data.map((p, i) => ({
          ...p,
          title: { ...(p.title ?? {}), rendered: translated[i * 2] },
          excerpt: { ...(p.excerpt ?? {}), rendered: translated[i * 2 + 1] },
        }));
      } catch (err) {
        console.error('[api/blog] translation failed', err);
      }
    }

    const totalPages = res.headers.get("X-WP-TotalPages");
    const totalPosts = res.headers.get("X-WP-Total");

    return NextResponse.json({
      data,
      totalPages: totalPages ? parseInt(totalPages) : 1,
      totalPosts: totalPosts ? parseInt(totalPosts) : data.length
    });
  } catch (error) {
    console.error('Proxy Error:', error);
    return NextResponse.json({ data: [], error: 'Failed to fetch from WordPress' }, { status: 500 });
  }
}
