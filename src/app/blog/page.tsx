import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function BlogPage() {
    const posts = getAllPosts();

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
                            {post.slug}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
