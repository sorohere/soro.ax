"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Post = {
    slug: string;
    title: string;
    content: string;
    date: string;
};

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");

    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            fetchPosts();
        }
    }, [isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordInput === "iamsoro") {
            setIsAuthenticated(true);
        } else {
            alert("Incorrect password");
        }
    };

    const fetchPosts = async () => {
        const res = await fetch("/api/posts");
        const data = await res.json();
        setPosts(data);
    };

    const handleSelectPost = (post: Post) => {
        setSelectedPost(post);
        setSlug(post.slug);
        setTitle(post.title);
        setDate(post.date);
        setContent(post.content);
        setMessage("");
    };

    const handleNewPost = () => {
        setSelectedPost(null);
        setSlug("");
        setTitle("");
        setDate(new Date().toISOString().split("T")[0]);
        setContent("");
        setMessage("");
    };

    const handleSave = async () => {
        if (!slug || !content) {
            setMessage("Slug and content are required.");
            return;
        }

        const frontmatter = {
            title,
            date: date || new Date().toISOString().split("T")[0],
        };

        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    slug,
                    content,
                    frontmatter,
                }),
            });

            if (res.ok) {
                setMessage("Post saved successfully!");
                fetchPosts();
            } else {
                setMessage("Failed to save post.");
            }
        } catch (error) {
            setMessage("Error saving post.");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
                <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm">
                    <h1 className="text-2xl font-bold text-center mb-4">Admin Access</h1>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        className="bg-black border border-white/10 rounded p-2 text-white focus:border-accent outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-accent text-white py-2 px-4 rounded hover:bg-accent/80 transition-colors font-bold"
                    >
                        Login
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-20 font-mono">
            <h1 className="text-3xl font-bold mb-8 text-accent">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar: Post List */}
                <div className="md:col-span-1 border-r border-white/10 pr-6">
                    <button
                        onClick={handleNewPost}
                        className="w-full bg-accent text-white py-2 px-4 rounded mb-6 hover:bg-accent/80 transition-colors"
                    >
                        New Post
                    </button>
                    <div className="space-y-2">
                        {posts.map((post) => (
                            <button
                                key={post.slug}
                                onClick={() => handleSelectPost(post)}
                                className={`w-full text-left p-2 rounded text-sm truncate ${selectedPost?.slug === post.slug
                                    ? "bg-white/10 text-white"
                                    : "text-muted-foreground hover:bg-white/5"
                                    }`}
                            >
                                {post.title || post.slug}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Editor Area */}
                <div className="md:col-span-3">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm text-muted-foreground mb-1">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-black border border-white/10 rounded p-2 text-white focus:border-accent outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-muted-foreground mb-1">Slug</label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full bg-black border border-white/10 rounded p-2 text-white focus:border-accent outline-none"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm text-muted-foreground mb-1">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full bg-black border border-white/10 rounded p-2 text-white focus:border-accent outline-none"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm text-muted-foreground mb-1">Content (Markdown)</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-[500px] bg-black border border-white/10 rounded p-4 text-white font-mono focus:border-accent outline-none resize-none"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <p className={`text-sm ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
                            {message}
                        </p>
                        <button
                            onClick={handleSave}
                            className="bg-white text-black py-2 px-6 rounded font-bold hover:bg-gray-200 transition-colors"
                        >
                            Save & Publish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
