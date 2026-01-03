import { ContentService, ContentItem } from "./content-service";

const postsService = new ContentService("posts");

export type Post = ContentItem & {
    title: string;
    date: string;
    content: string;
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
        ...data,
    };
}

export function getAllPosts(): Post[] {
    return postsService.getAll((slug) => getPostBySlug(slug))
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}

export function savePost(slug: string, content: string, frontmatter: any = {}) {
    return postsService.save(slug, content, frontmatter);
}

export function deletePost(slug: string): boolean {
    return postsService.delete(slug);
}
