import fs from "fs";
import path from "path";
import matter from "gray-matter";

const timelineDirectory = path.join(process.cwd(), "src/content/timeline");

export type TimelineEvent = {
    year: string; // Keeps backwards compatibility for now, derived from date
    date: string; // ISO string 2024-01-01
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

    // Date fallback logic
    let eventDate = data.date;
    if (!eventDate) {
        // If slug is just a year (e.g. "2024"), default to Jan 1st
        if (/^\d{4}$/.test(realSlug)) {
            eventDate = `${realSlug}-01-01`;
        } else {
            // Try to parse realSlug as date or default to now
            eventDate = new Date().toISOString().split('T')[0];
        }
    }

    // Derive year from date
    const year = eventDate.split("-")[0];

    return {
        year,
        date: eventDate,
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
        .sort((a, b) => {
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }); // Sort by pinned first, then date descending
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
