export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  modified: string;
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
    const res = await fetch(
      `${API_URL}/posts?per_page=${perPage}&page=${page}&_embed`,
      { next: { revalidate: 300 } } // Revalidate every 5 minutes
    );

    if (!res.ok) {
      if (res.status === 400) {
        return { posts: [], totalPosts: 0, totalPages: 0 };
      }
      throw new Error(`Failed to fetch posts: ${res.status}`);
    }

    const totalPosts = parseInt(res.headers.get('X-WP-Total') || '0');
    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '0');
    const posts: WPPost[] = await res.json();

    return { posts, totalPosts, totalPages };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], totalPosts: 0, totalPages: 0 };
  }
}

export async function fetchPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(
      `${API_URL}/posts?slug=${slug}&_embed`,
      { next: { revalidate: 300 } }
    );

    if (!res.ok) throw new Error(`Failed to fetch post: ${res.status}`);

    const posts: WPPost[] = await res.json();
    return posts.length > 0 ? posts[0] : null;
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

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}
