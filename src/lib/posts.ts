import { ContentService, ContentItem } from "./content-service";

const postsService = new ContentService("posts");

export type Post = ContentItem & {
    title: string;
    date: string;
    content: string;
    published?: boolean;
};

export function getPostSlugs() {
    return postsService.getSlugs();
}

export function getPostBySlug(slug: string): Post | null {
    const result = postsService.getBySlug(slug);
    if (!result) return null;

    const { data, content, realSlug } = result;

    return {
        slug: realSlug,
        title: data.title || "Untitled",
        date: data.date || new Date().toISOString(),
        content,
        published: data.published ?? true, // Default to true for backward compatibility
        ...data,
    };
}

export function getAllPosts(options: { includeDrafts?: boolean } = {}): Post[] {
    return postsService.getAll((slug) => getPostBySlug(slug))
        .filter(post => options.includeDrafts || post.published)
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}

export function savePost(slug: string, content: string, frontmatter: any = {}) {
    return postsService.save(slug, content, frontmatter);
}

export function deletePost(slug: string): boolean {
    return postsService.delete(slug);
}
