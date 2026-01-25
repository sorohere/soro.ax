import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function BlogPage() {
    const posts = getAllPosts().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-12 text-white tracking-tight">
                system_<span className="text-accent">logs</span>
            </h1>

            <div className="space-y-3 font-mono">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-xl glass-panel hover:bg-white/5 transition-all duration-300 border border-white/5 hover:border-accent/30"
                    >
                        <div className="flex flex-col gap-1">
                            <span className="text-xl font-bold text-white group-hover:text-accent transition-colors">
                                {post.title || post.slug}
                            </span>
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">
                                /dev/blog/{post.slug}
                            </span>
                        </div>

                        <div className="mt-4 md:mt-0 flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 group-hover:border-accent/20 transition-colors">
                                {post.date}
                            </span>
                            <span className="hidden md:inline text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                                {'->'} read_
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
