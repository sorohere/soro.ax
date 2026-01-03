import fs from "fs";
import path from "path";
import { getAllPosts } from "./posts";
import { getAllTimelineEvents } from "./timeline";

const UPLOADS_DIR = path.join(process.cwd(), "public/uploads");

/**
 * Extracts image references from a markdown string and frontmatter.
 * Looks for:
 * 1. Markdown images: ![alt](/uploads/filename)
 * 2. Frontmatter 'image' field
 */
export function extractImageReferences(content: string, frontmatter: any): string[] {
    const images: string[] = [];

    // Check frontmatter
    if (frontmatter.image && typeof frontmatter.image === "string") {
        images.push(frontmatter.image);
    }

    // Regex for markdown images: ![description](/uploads/filename)
    // We only care about local uploads starting with /uploads/
    const markdownImageRegex = /!\[.*?\]\((\/uploads\/[^)]+)\)/g;
    let match;
    while ((match = markdownImageRegex.exec(content)) !== null) {
        images.push(match[1]);
    }

    // Return unique values
    return Array.from(new Set(images));
}

/**
 * Scans all known content (posts, timeline) and builds a Set of all used image URLs.
 */
export function getAllUsedImages(): Set<string> {
    const usedImages = new Set<string>();

    const posts = getAllPosts();
    posts.forEach(post => {
        const refs = extractImageReferences(post.content, post);
        refs.forEach(img => usedImages.add(img));
    });

    const timelineEvents = getAllTimelineEvents();
    timelineEvents.forEach(event => {
        const refs = extractImageReferences(event.description, event); // Timeline uses 'description' as content
        refs.forEach(img => usedImages.add(img));
    });

    return usedImages;
}

/**
 * Deletes images if they are NOT present in the currently used set.
 * @param candidates A list of image URLs (e.g. ['/uploads/img1.png']) to potentially delete.
 */
export function deleteUnusedImages(candidates: string[]) {
    if (!candidates || candidates.length === 0) return;

    const usedImages = getAllUsedImages();

    candidates.forEach(imagePath => {
        if (!usedImages.has(imagePath)) {
            // It's unused, let's delete it.
            // imagePath is like "/uploads/my-image.png"
            // We need to resolve to filesystem path.

            // Remove leading slash for path joining if present
            const relativePath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;

            // Only proceed if it is actually in the uploads directory
            if (!relativePath.startsWith("uploads/")) {
                return;
            }

            const fullPath = path.join(process.cwd(), "public", relativePath);

            try {
                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                    console.log(`[Image Cleanup] Deleted unused image: ${imagePath}`);
                }
            } catch (error) {
                console.error(`[Image Cleanup] Failed to delete ${imagePath}:`, error);
            }
        } else {
            console.log(`[Image Cleanup] Image ${imagePath} is still in use. Keeping it.`);
        }
    });
}
