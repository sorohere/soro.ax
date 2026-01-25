import { getAllPosts } from "@/lib/posts";
import { TerminalPostList } from "@/components/blog/TerminalPostList";

export const metadata = {
    title: "System Logs | soro.ax",
    description: "Thoughts and logs from the system.",
};

export default function BlogPage() {
    const allPosts = getAllPosts().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <TerminalPostList posts={allPosts} />
        </div>
    );
}
