import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export async function generateStaticParams() {
    const posts = getPostSlugs();
    return posts.map((slug) => ({
        slug: slug.replace(/\.md$/, ""),
    }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="max-w-3xl mx-auto px-6 pb-15 font-mono">
            <article className="prose prose-invert max-w-none">
                <MarkdownRenderer content={post.content} />
            </article>
            <div className="mt-6 pt-6 text-center text-[#888888]">
                <p className="text-sm">
                    &copy; 2025 built with: love, GPTs, and caffeine.
                </p>
            </div>
        </div>
    );
}
