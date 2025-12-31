import fs from "fs";
import path from "path";
import matter from "gray-matter";

const timelineDirectory = path.join(process.cwd(), "src/content/timeline");

export type TimelineEvent = {
    year: string;
    title: string;
    description: string;
    image?: string;
    pinned?: boolean;
    [key: string]: any;
};

export function getTimelineEventSlugs() {
    if (!fs.existsSync(timelineDirectory)) {
        return [];
    }
    return fs.readdirSync(timelineDirectory);
}

export function getTimelineEventBySlug(slug: string): TimelineEvent | null {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = path.join(timelineDirectory, `${realSlug}.md`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        year: realSlug, // Assuming slug is the year
        title: data.title || "Untitled",
        description: content,
        image: data.image || "",
        pinned: data.pinned || false,
        ...data,
    };
}

export function getAllTimelineEvents(): TimelineEvent[] {
    const slugs = getTimelineEventSlugs();
    const events = slugs
        .map((slug) => getTimelineEventBySlug(slug))
        .filter((event): event is TimelineEvent => event !== null)
        .sort((a, b) => (parseInt(b.year) - parseInt(a.year))); // Sort by year descending
    return events;
}

export function saveTimelineEvent(slug: string, content: string, frontmatter: any = {}) {
    if (!fs.existsSync(timelineDirectory)) {
        fs.mkdirSync(timelineDirectory, { recursive: true });
    }

    const realSlug = slug.replace(/\.md$/, "").replace(/[^a-z0-9-]/gi, "-").toLowerCase();
    const fullPath = path.join(timelineDirectory, `${realSlug}.md`);

    const fileContent = matter.stringify(content, frontmatter);
    fs.writeFileSync(fullPath, fileContent, "utf8");

    return realSlug;
}
