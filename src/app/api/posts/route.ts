import { NextResponse } from "next/server";
import { savePost, getAllPosts } from "@/lib/posts";

export async function GET() {
    const posts = getAllPosts();
    return NextResponse.json(posts);
}

export async function POST(request: Request) {
    try {
        const { slug, content, frontmatter } = await request.json();

        if (!slug || !content) {
            return NextResponse.json(
                { error: "Slug and content are required" },
                { status: 400 }
            );
        }

        const savedSlug = savePost(slug, content, frontmatter);

        return NextResponse.json({ success: true, slug: savedSlug });
    } catch (error) {
        console.error("Error saving post:", error);
        return NextResponse.json(
            { error: "Failed to save post" },
            { status: 500 }
        );
    }
}
