import { NextResponse } from "next/server";
import { savePost, getAllPosts, deletePost } from "@/lib/posts";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get("admin") === "true";
    const posts = getAllPosts({ includeDrafts: isAdmin });
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

export async function DELETE(request: Request) {
    try {
        const { slug } = await request.json();

        if (!slug) {
            return NextResponse.json(
                { error: "Slug is required" },
                { status: 400 }
            );
        }

        // 1. Get the post before deleting to find images
        const { getPostBySlug } = await import("@/lib/posts");
        const post = getPostBySlug(slug);

        // 2. Delete the post
        const success = deletePost(slug);

        if (success) {
            // 3. Cleanup unused images if the post was found and deleted
            if (post) {
                const { deleteUnusedImages, extractImageReferences } = await import("@/lib/image-cleanup");
                const imagesToCheck = extractImageReferences(post.content, post);
                // Run cleanup asynchronously (fire and forget) to not block response? 
                // Or await it? Awaiting is safer to ensure it completes.
                deleteUnusedImages(imagesToCheck);
            }

            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json(
                { error: "Post not found" },
                { status: 404 }
            );
        }

    } catch (error) {
        console.error("Error deleting post:", error);
        return NextResponse.json(
            { error: "Failed to delete post" },
            { status: 500 }
        );
    }
}
