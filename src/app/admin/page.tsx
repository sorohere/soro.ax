"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Post = {
    slug: string;
    title: string;
    content: string;
    date: string;
};

type TimelineEvent = {
    year: string;
    title: string;
    description: string;
    image?: string;
};

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const [activeTab, setActiveTab] = useState<"posts" | "timeline">("posts");

    // Posts State
    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    // Timeline State
    const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

    // Editor State
    const [slug, setSlug] = useState(""); // Used for Post Slug or Timeline Year
    const [title, setTitle] = useState("");
    const [content, setContent] = useState(""); // Post Content or Timeline Description
    const [date, setDate] = useState("");
    const [image, setImage] = useState(""); // Timeline Image URL

    const [message, setMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated, activeTab]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (usernameInput === "soro" && passwordInput === "sorohere") {
            setIsAuthenticated(true);
        } else {
            alert("Incorrect username or password");
        }
    };

    const fetchData = async () => {
        if (activeTab === "posts") {
            const res = await fetch("/api/posts");
            const data = await res.json();
            setPosts(data);
        } else {
            const res = await fetch("/api/timeline");
            const data = await res.json();
            setTimelineEvents(data);
        }
    };

    // --- Post Handlers ---
    const handleSelectPost = (post: Post) => {
        setSelectedPost(post);
        setSelectedEvent(null);
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

    // --- Timeline Handlers ---
    const handleSelectEvent = (event: TimelineEvent) => {
        setSelectedEvent(event);
        setSelectedPost(null);
        setSlug(event.year); // Year acts as slug
        setTitle(event.title);
        setContent(event.description);
        setImage(event.image || "");
        setMessage("");
    };

    const handleNewEvent = () => {
        setSelectedEvent(null);
        setSlug(""); // Year
        setTitle("");
        setContent(""); // Description
        setImage("");
        setMessage("");
    };

    const handleSave = async () => {
        if (!slug || !content) {
            setMessage("Slug/Year and Content/Description are required.");
            return;
        }

        const endpoint = activeTab === "posts" ? "/api/posts" : "/api/timeline";

        let body: any = {
            slug,
            content,
        };

        if (activeTab === "posts") {
            body.frontmatter = {
                title,
                date: date || new Date().toISOString().split("T")[0],
            };
        } else {
            // Timeline
            body.frontmatter = {
                title,
                image,
            };
        }

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                setMessage("Saved successfully!");
                fetchData();
            } else {
                setMessage("Failed to save.");
            }
        } catch (error) {
            setMessage("Error saving.");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 font-mono">
                <div className="w-full max-w-md bg-black border border-white/10 rounded-xl p-8 shadow-2xl">
                    <h1 className="text-3xl font-bold text-center mb-8 text-white">
                        <span className="text-accent">soro</span> Access
                    </h1>
                    <form onSubmit={handleLogin} className="flex flex-col gap-6">
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Username</label>
                            <input
                                type="text"
                                placeholder="Enter username..."
                                value={usernameInput}
                                onChange={(e) => setUsernameInput(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:bg-accent/5 outline-none transition-all placeholder:text-white/20"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Password</label>
                            <input
                                type="password"
                                placeholder="Enter password..."
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:bg-accent/5 outline-none transition-all placeholder:text-white/20"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-accent text-white py-3 px-4 rounded-lg font-bold hover:bg-accent/80 transition-all shadow-[0_0_20px_rgba(124,58,237,0.2)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] mt-2"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-60px)] pt-24 max-w-7xl mx-auto px-6 font-mono flex flex-col overflow-hidden">
            <div className="flex justify-between items-center mb-8 shrink-0">
                <h1 className="text-3xl font-bold text-white"><Link href="/home" className="text-accent hover:text-white transition-colors">soro</Link> Dashboard</h1>
                <div className="flex gap-4">
                    <button
                        onClick={() => setActiveTab("posts")}
                        className={`px-6 py-2 rounded-full border transition-all ${activeTab === "posts" ? "bg-accent border-accent text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]" : "border-white/10 text-muted-foreground hover:text-white hover:border-white/30"}`}
                    >
                        Blog Posts
                    </button>
                    <button
                        onClick={() => setActiveTab("timeline")}
                        className={`px-6 py-2 rounded-full border transition-all ${activeTab === "timeline" ? "bg-accent border-accent text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]" : "border-white/10 text-muted-foreground hover:text-white hover:border-white/30"}`}
                    >
                        Timeline
                    </button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-8 min-h-0">
                {/* Sidebar: List */}
                <div className="md:col-span-1 border-r border-white/10 pr-6 flex flex-col min-h-0">
                    <button
                        onClick={activeTab === "posts" ? handleNewPost : handleNewEvent}
                        className="w-full bg-white text-black py-3 px-4 rounded-lg mb-6 hover:bg-gray-200 transition-colors font-bold flex items-center justify-center gap-2"
                    >
                        <span>+</span> New {activeTab === "posts" ? "Post" : "Event"}
                    </button>
                    <div className="space-y-2 overflow-y-auto pr-2 custom-scrollbar flex-1">
                        {activeTab === "posts"
                            ? posts.map((post) => (
                                <button
                                    key={post.slug}
                                    onClick={() => handleSelectPost(post)}
                                    className={`w-full text-left p-3 rounded-lg text-sm truncate transition-all ${selectedPost?.slug === post.slug
                                        ? "bg-accent/10 text-accent border border-accent/20"
                                        : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    {post.title || post.slug}
                                </button>
                            ))
                            : timelineEvents.map((event) => (
                                <button
                                    key={event.year}
                                    onClick={() => handleSelectEvent(event)}
                                    className={`w-full text-left p-3 rounded-lg text-sm truncate transition-all ${selectedEvent?.year === event.year
                                        ? "bg-accent/10 text-accent border border-accent/20"
                                        : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    {event.year} - {event.title}
                                </button>
                            ))}
                    </div>
                </div>

                {/* Editor Area */}
                <div className="md:col-span-3 flex flex-col min-h-0">
                    <div className="grid grid-cols-2 gap-6 mb-6 shrink-0">
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:bg-accent/5 outline-none transition-all placeholder:text-white/20"
                                placeholder="Enter title..."
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                                {activeTab === "posts" ? "Slug" : "Year"}
                            </label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:bg-accent/5 outline-none transition-all placeholder:text-white/20"
                                placeholder={activeTab === "posts" ? "post-slug" : "2024"}
                            />
                        </div>
                    </div>

                    {activeTab === "posts" && (
                        <div className="mb-6 shrink-0">
                            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:bg-accent/5 outline-none transition-all"
                            />
                        </div>
                    )}

                    {activeTab === "timeline" && (
                        <div className="mb-6 shrink-0">
                            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Image URL</label>
                            <input
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:bg-accent/5 outline-none transition-all placeholder:text-white/20"
                                placeholder="https://..."
                            />
                        </div>
                    )}

                    <div className="mb-6 flex-1 flex flex-col min-h-0">
                        <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 shrink-0">
                            {activeTab === "posts" ? "Content (Markdown)" : "Description"}
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full flex-1 bg-white/5 border border-white/10 rounded-lg p-4 text-white font-mono focus:border-accent focus:bg-accent/5 outline-none resize-none custom-scrollbar leading-relaxed"
                            placeholder="Start typing..."
                        />
                    </div>

                    <div className="flex items-center justify-between shrink-0 pt-4 border-t border-white/10">
                        <p className={`text-sm font-medium ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>
                            {message}
                        </p>
                        <button
                            onClick={handleSave}
                            className="bg-accent text-white py-2 px-8 rounded-lg font-bold hover:bg-accent/80 transition-all shadow-[0_0_20px_rgba(124,58,237,0.2)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
