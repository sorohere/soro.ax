"use client";

import Link from "next/link";

const posts = [
    { date: "2025-02-10", title: "vad-eval", slug: "vad-eval" },
    { date: "2024-08-21", title: "maths&ml", slug: "maths-ml" },
    { date: "2025-01-26", title: "me?", slug: "me" },
];

export default function BlogPage() {
    return (
        <div className="max-w-3xl mx-auto px-6 pb-20">
            <div className="space-y-4 font-mono">
                {posts.map((post) => (
                    <div key={post.slug} className="flex items-baseline gap-3 text-base">
                        <span className="text-accent">•</span>
                        <span className="text-muted-foreground">{post.date}</span>
                        <span className="text-muted-foreground">:</span>
                        <Link
                            href={`/blog/${post.slug}`}
                            className="text-accent hover:text-white transition-colors"
                        >
                            {post.title}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
