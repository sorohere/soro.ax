import { NextResponse } from "next/server";
import { saveTimelineEvent, getAllTimelineEvents, deleteTimelineEvent } from "@/lib/timeline";

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

export async function DELETE(request: Request) {
    try {
        const { slug } = await request.json();

        if (!slug) {
            return NextResponse.json(
                { error: "Slug is required" },
                { status: 400 }
            );
        }

        // 1. Get event before deleting
        const { getTimelineEventBySlug } = await import("@/lib/timeline");
        const event = getTimelineEventBySlug(slug);

        // 2. Delete event
        const success = deleteTimelineEvent(slug);

        if (success) {
            // 3. Cleanup images
            if (event) {
                const { deleteUnusedImages, extractImageReferences } = await import("@/lib/image-cleanup");
                // Timeline uses 'description' for content
                const imagesToCheck = extractImageReferences(event.description, event);
                deleteUnusedImages(imagesToCheck);
            }

            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json(
                { error: "Event not found" },
                { status: 404 }
            );
        }

    } catch (error) {
        console.error("Error deleting timeline event:", error);
        return NextResponse.json(
            { error: "Failed to delete timeline event" },
            { status: 500 }
        );
    }
}
