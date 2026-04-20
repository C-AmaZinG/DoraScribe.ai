import type { YoastHeadJson } from './yoast';

export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  modified: string;
  yoast_head_json?: YoastHeadJson;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    author?: Array<{
      name: string;
      avatar_urls: { [key: string]: string };
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

export interface WPPaginatedResponse {
  posts: WPPost[];
  totalPosts: number;
  totalPages: number;
}

const API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://dorascribe.ai/wp-json/wp/v2';

export async function fetchPosts(page = 1, perPage = 10): Promise<WPPaginatedResponse> {
  try {
    const isClient = typeof window !== 'undefined';
    const baseUrl = isClient ? '/api/blog' : API_URL;
    const url = isClient
      ? `${baseUrl}?page=${page}&per_page=${perPage}`
      : `${baseUrl}/posts?per_page=${perPage}&page=${page}&_embed`;

    const res = await fetch(url, { next: { revalidate: 300 } });

    if (!res.ok) {
      if (res.status === 400) return { posts: [], totalPosts: 0, totalPages: 0 };
      throw new Error(`Failed to fetch posts: ${res.status}`);
    }

    const json = await res.json();
    const posts = isClient ? json.data : json;
    const totalPosts = isClient ? json.totalPosts : parseInt(res.headers.get('X-WP-Total') || '0');
    const totalPages = isClient ? json.totalPages : parseInt(res.headers.get('X-WP-TotalPages') || '0');

    return { posts, totalPosts, totalPages };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], totalPosts: 0, totalPages: 0 };
  }
}

export async function fetchPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const isClient = typeof window !== 'undefined';
    const baseUrl = isClient ? '/api/blog' : API_URL;
    const url = isClient
      ? `${baseUrl}?slug=${encodeURIComponent(slug)}`
      : `${baseUrl}/posts?slug=${encodeURIComponent(slug)}&_embed`;

    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`Failed to fetch post: ${res.status}`);

    const json = await res.json();
    const posts = isClient ? (json.data || []) : json;
    
    return Array.isArray(posts) && posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export function getFeaturedImage(post: WPPost): string | null {
  return post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
}

export function getAuthorName(post: WPPost): string {
  return post._embedded?.author?.[0]?.name || 'Dorascribe Team';
}

export function getCategories(post: WPPost): Array<{ name: string; slug: string }> {
  return post._embedded?.['wp:term']?.[0] || [];
}

const DATE_LOCALE_MAP: Record<string, string> = {
  en: 'en-US', fr: 'fr-FR', es: 'es-ES', pt: 'pt-PT', de: 'de-DE',
};

export function formatDate(dateStr: string, locale: string = 'en'): string {
  return new Date(dateStr).toLocaleDateString(DATE_LOCALE_MAP[locale] || 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    const res = await fetch(
      `${API_URL}/posts?per_page=100&_fields=slug`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const posts: { slug: string }[] = await res.json();
    return posts.map((p) => p.slug);
  } catch {
    return [];
  }
}
