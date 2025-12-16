import Link from "next/link";
import { Section } from "@/components/layout/Section";

const posts = [
    { date: "2025-02-10", title: "vad-eval", slug: "vad-eval" },
    { date: "2025-01-26", title: "me?", slug: "me" },
    { date: "2024-08-21", title: "maths&ml", slug: "maths-ml" },
];

export function RecentPosts() {
    return (
        <Section>
            <h2 className="text-2xl font-bold mb-8">Recent Posts</h2>
            <div className="space-y-6">
                {posts.map((post) => (
                    <div key={post.slug} className="flex items-baseline gap-4 group">
                        <span className="text-sm text-muted-foreground font-mono w-24 shrink-0">{post.date}</span>
                        <Link href={`/blog/${post.slug}`} className="text-lg font-medium group-hover:text-accent transition-colors">
                            {post.title}
                        </Link>
                    </div>
                ))}
            </div>
        </Section>
    );
}

