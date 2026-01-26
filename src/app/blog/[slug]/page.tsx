import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

// ... (imports)

export async function generateStaticParams() {
    const posts = getPostSlugs();
    return posts.map((slug) => ({
        slug: slug.replace(/\.md$/, ""),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: "Not Found | soro | blog",
        };
    }

    return {
        title: "soro | blog",
        description: post.excerpt || `Read ${post.title} on soro.ax`,
    };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const wordCount = post.content.split(/\s+/g).length;
    const readTime = Math.ceil(wordCount / 200);

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 font-mono">
            {/* Terminal Header Info */}
            <div className="mb-8 border-b border-white/10 pb-4">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-xs md:text-sm text-muted-foreground/70">
                    <div className="flex items-center gap-2">
                        <span className="text-accent">File:</span>
                        <span className="text-white">/var/logs/thoughts/{slug}.md</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-accent">Size:</span>
                        <span className="text-white">{(wordCount / 1024).toFixed(2)}kb</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-accent">Owner:</span>
                        <span className="text-white">root</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-accent">Perms:</span>
                        <span className="text-white">r--r--r--</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-accent">Date:</span>
                        <span className="text-white">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</span>
                    </div>
                </div>
            </div>

            {/* Title Block */}
            <div className="mb-12">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
                    {post.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="italic">Status: READ_ONLY</span>
                </div>
            </div>

            {/* Content Viewer */}
            <div className="bg-black/20 rounded-xl p-6 md:p-10 border border-white/5 relative overflow-hidden">
                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 p-4 opacity-20">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20" />
                    </div>
                </div>

                <article className="prose prose-invert prose-p:font-mono prose-headings:font-bold prose-a:text-accent max-w-none">
                    <MarkdownRenderer content={post.content} />
                </article>
            </div>

            {/* Footer Signature */}
            <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center text-xs text-muted-foreground/50">
                <div className="flex gap-2">
                    <span>End of file</span>
                    <span className="animate-pulse">_</span>
                </div>
                <div>
                    <span className="text-accent">SHA256:</span> {Math.random().toString(36).substring(7)}...
                </div>
            </div>
        </div>
    );
}
