import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export type Post = {
    slug: string;
    title: string;
    date: string;
    content: string;
    [key: string]: any;
};

export function getPostSlugs() {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }
    return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string): Post | null {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, `${realSlug}.md`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        slug: realSlug,
        title: data.title || "Untitled",
        date: data.date || new Date().toISOString(),
        content,
        ...data,
    };
}

export function getAllPosts(): Post[] {
    const slugs = getPostSlugs();
    const posts = slugs
        .map((slug) => getPostBySlug(slug))
        .filter((post): post is Post => post !== null)
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
}

export function savePost(slug: string, content: string, frontmatter: any = {}) {
    if (!fs.existsSync(postsDirectory)) {
        fs.mkdirSync(postsDirectory, { recursive: true });
    }

    const realSlug = slug.replace(/\.md$/, "").replace(/[^a-z0-9-]/gi, "-").toLowerCase();
    const fullPath = path.join(postsDirectory, `${realSlug}.md`);

    const fileContent = matter.stringify(content, frontmatter);
    fs.writeFileSync(fullPath, fileContent, "utf8");

    return realSlug;
}
