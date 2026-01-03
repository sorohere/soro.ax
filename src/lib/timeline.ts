import { ContentService, ContentItem } from "./content-service";

const timelineService = new ContentService("timeline");

export type TimelineEvent = ContentItem & {
    year: string;
    date: string;
    title: string;
    description: string;
    image?: string;
    pinned?: boolean;
    published?: boolean;
};

export function getTimelineEventSlugs() {
    return timelineService.getSlugs();
}

export function getTimelineEventBySlug(slug: string): TimelineEvent | null {
    const result = timelineService.getBySlug(slug);
    if (!result) return null;

    const { data, content, realSlug } = result;

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
        slug: realSlug,
        year,
        date: eventDate,
        title: data.title || "Untitled",
        description: content,
        image: data.image || "",
        pinned: data.pinned || false,
        published: data.published ?? true, // Default true
        ...data,
    };
}

export function getAllTimelineEvents(options: { includeDrafts?: boolean } = {}): TimelineEvent[] {
    return timelineService.getAll((slug) => getTimelineEventBySlug(slug))
        .filter(event => options.includeDrafts || event.published)
        .sort((a, b) => {
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
}

export function saveTimelineEvent(slug: string, content: string, frontmatter: any = {}) {
    return timelineService.save(slug, content, frontmatter);
}

export function deleteTimelineEvent(slug: string): boolean {
    return timelineService.delete(slug);
}
