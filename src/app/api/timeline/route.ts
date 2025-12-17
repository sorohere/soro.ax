import { NextResponse } from "next/server";
import { saveTimelineEvent, getAllTimelineEvents } from "@/lib/timeline";

export async function GET() {
    const events = getAllTimelineEvents();
    return NextResponse.json(events);
}

export async function POST(request: Request) {
    try {
        const { slug, content, frontmatter } = await request.json();

        if (!slug || !content) {
            return NextResponse.json(
                { error: "Slug (Year) and content (Description) are required" },
                { status: 400 }
            );
        }

        const savedSlug = saveTimelineEvent(slug, content, frontmatter);

        return NextResponse.json({ success: true, slug: savedSlug });
    } catch (error) {
        console.error("Error saving timeline event:", error);
        return NextResponse.json(
            { error: "Failed to save timeline event" },
            { status: 500 }
        );
    }
}
