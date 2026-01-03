import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Generic type for content items (Post, TimelineEvent, etc.)
export interface ContentItem {
    slug: string;
    [key: string]: any;
}

export class ContentService {
    private directory: string;

    constructor(subDirectory: string) {
        this.directory = path.join(process.cwd(), "src/content", subDirectory);
    }

    // Ensure the directory exists
    private ensureDirectory() {
        if (!fs.existsSync(this.directory)) {
            fs.mkdirSync(this.directory, { recursive: true });
        }
    }

    public getSlugs(): string[] {
        if (!fs.existsSync(this.directory)) {
            return [];
        }
        return fs.readdirSync(this.directory);
    }

    public getBySlug<T extends ContentItem>(slug: string): { data: any; content: string; realSlug: string } | null {
        const realSlug = slug.replace(/\.md$/, "");
        const fullPath = path.join(this.directory, `${realSlug}.md`);

        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return { data, content, realSlug };
    }

    public getAll<T extends ContentItem>(mapper: (slug: string) => T | null): T[] {
        const slugs = this.getSlugs();
        return slugs
            .map((slug) => mapper(slug))
            .filter((item): item is T => item !== null);
    }

    public save(slug: string, content: string, frontmatter: any = {}): string {
        this.ensureDirectory();

        const realSlug = slug.replace(/\.md$/, "").replace(/[^a-z0-9-]/gi, "-").toLowerCase();
        const fullPath = path.join(this.directory, `${realSlug}.md`);

        const fileContent = matter.stringify(content, frontmatter);
        fs.writeFileSync(fullPath, fileContent, "utf8");

        return realSlug;
    }

    public delete(slug: string): boolean {
        const realSlug = slug.replace(/\.md$/, "");
        const fullPath = path.join(this.directory, `${realSlug}.md`);

        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
            return true;
        }
        return false;
    }

    // Helper to get raw file content (used for cleanup scanning if needed)
    public getRawContent(slug: string): string | null {
        const realSlug = slug.replace(/\.md$/, "");
        const fullPath = path.join(this.directory, `${realSlug}.md`);

        if (!fs.existsSync(fullPath)) {
            return null;
        }
        return fs.readFileSync(fullPath, "utf8");
    }
}
