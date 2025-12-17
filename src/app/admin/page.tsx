"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
        if (passwordInput === "iamsoro") {
            setIsAuthenticated(true);
        } else {
            alert("Incorrect password");
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
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-accent">Admin Dashboard</h1>
                <div className="flex gap-4">
                    <button
                        onClick={() => setActiveTab("posts")}
                        className={`px-4 py-2 rounded ${activeTab === "posts" ? "bg-accent text-white" : "text-muted-foreground hover:text-white"}`}
                    >
                        Blog Posts
                    </button>
                    <button
                        onClick={() => setActiveTab("timeline")}
                        className={`px-4 py-2 rounded ${activeTab === "timeline" ? "bg-accent text-white" : "text-muted-foreground hover:text-white"}`}
                    >
                        Timeline
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar: List */}
                <div className="md:col-span-1 border-r border-white/10 pr-6">
                    <button
                        onClick={activeTab === "posts" ? handleNewPost : handleNewEvent}
                        className="w-full bg-accent text-white py-2 px-4 rounded mb-6 hover:bg-accent/80 transition-colors"
                    >
                        New {activeTab === "posts" ? "Post" : "Event"}
                    </button>
                    <div className="space-y-2">
                        {activeTab === "posts"
                            ? posts.map((post) => (
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
                            ))
                            : timelineEvents.map((event) => (
                                <button
                                    key={event.year}
                                    onClick={() => handleSelectEvent(event)}
                                    className={`w-full text-left p-2 rounded text-sm truncate ${selectedEvent?.year === event.year
                                        ? "bg-white/10 text-white"
                                        : "text-muted-foreground hover:bg-white/5"
                                        }`}
                                >
                                    {event.year} - {event.title}
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
                            <label className="block text-sm text-muted-foreground mb-1">
                                {activeTab === "posts" ? "Slug" : "Year"}
                            </label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full bg-black border border-white/10 rounded p-2 text-white focus:border-accent outline-none"
                            />
                        </div>
                    </div>

                    {activeTab === "posts" && (
                        <div className="mb-4">
                            <label className="block text-sm text-muted-foreground mb-1">Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full bg-black border border-white/10 rounded p-2 text-white focus:border-accent outline-none"
                            />
                        </div>
                    )}

                    {activeTab === "timeline" && (
                        <div className="mb-4">
                            <label className="block text-sm text-muted-foreground mb-1">Image URL</label>
                            <input
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className="w-full bg-black border border-white/10 rounded p-2 text-white focus:border-accent outline-none"
                            />
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-sm text-muted-foreground mb-1">
                            {activeTab === "posts" ? "Content (Markdown)" : "Description"}
                        </label>
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
