import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('per_page') || '10';
  const slug = searchParams.get('slug');

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

    const data = await res.json();
    
    // Extract headers for pagination
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
