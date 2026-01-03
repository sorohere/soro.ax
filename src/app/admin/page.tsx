"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Post = {
    slug: string;
    title: string;
    content: string;
    date: string;
    published?: boolean;
};

type TimelineEvent = {
    slug: string;
    year: string;
    title: string;
    description: string;
    image?: string;
    pinned?: boolean;
    date?: string;
    published?: boolean;
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
    const [slug, setSlug] = useState(""); // Used for Post Slug or Timeline Slug (filename)
    const [title, setTitle] = useState("");
    const [content, setContent] = useState(""); // Post Content or Timeline Description
    const [date, setDate] = useState("");
    const [image, setImage] = useState(""); // Timeline Image URL
    // ... (previous code) ...
    const [pinned, setPinned] = useState(false);

    // New state for publish status
    const [isPublished, setIsPublished] = useState(false);

    const [message, setMessage] = useState("");
    const [uploading, setUploading] = useState(false);

    // 0 = idle, 1 = confirm, 2 = really confirm
    const [deleteStage, setDeleteStage] = useState(0);

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
        // Fetch with admin=true to see drafts
        const endpoint = activeTab === "posts" ? "/api/posts?admin=true" : "/api/timeline?admin=true";
        const res = await fetch(endpoint);
        const data = await res.json();

        if (activeTab === "posts") {
            setPosts(data);
        } else {
            setTimelineEvents(data);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: "image" | "content") => {
        // ... (existing implementation) ...
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();

            if (data.success) {
                if (target === "image") {
                    setImage(data.url);
                } else {
                    const markdownImage = `![${file.name.split('.')[0]}](${data.url})`;
                    setContent((prev) => prev ? prev + "\n" + markdownImage : markdownImage);
                }
                setMessage("Image uploaded successfully!");
            } else {
                setMessage("Upload failed.");
            }
        } catch (error) {
            setMessage("Error uploading image.");
        } finally {
            setUploading(false);
            e.target.value = "";
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
        setIsPublished(post.published ?? true); // Default to true if missing
        setMessage("");
        setDeleteStage(0);
    };

    const handleNewPost = () => {
        setSelectedPost(null);
        setSlug("");
        setTitle("");
        setDate(new Date().toISOString().split("T")[0]);
        setContent("");
        setIsPublished(false); // New posts are drafts by default
        setMessage("");
        setDeleteStage(0);
    };

    // --- Timeline Handlers ---
    const handleSelectEvent = (event: TimelineEvent) => {
        setSelectedEvent(event);
        setSelectedPost(null);
        setSlug(event.slug);
        setTitle(event.title);
        setContent(event.description);
        setImage(event.image || "");
        setPinned(event.pinned || false);
        setDate(event.date || "");
        setIsPublished(event.published ?? true);
        setMessage("");
        setDeleteStage(0);
    };

    const handleNewEvent = () => {
        setSelectedEvent(null);
        setSlug("");
        setTitle("");
        setContent("");
        setImage("");
        setPinned(false);
        setDate(new Date().toISOString().split("T")[0]);
        setIsPublished(false);
        setMessage("");
        setDeleteStage(0);
    };

    const saveContent = async (shouldPublish: boolean) => {
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
                published: shouldPublish,
            };
        } else {
            // Timeline
            body.frontmatter = {
                title,
                image,
                pinned,
                date,
                published: shouldPublish,
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
                // Update local state to reflect the new status immediately
                setIsPublished(shouldPublish);

                const status = shouldPublish ? "PUBLISHED" : "SAVED AS DRAFT (Not Visible)";
                setMessage(`${status} successfully!`);

                fetchData();
            } else {
                setMessage("Failed to save.");
            }
        } catch (error) {
            setMessage("Error saving.");
        }
    };

    const handleDelete = async () => {
        // ... (existing implementation) ...
        if (!slug) return;
        if (deleteStage < 1) {
            setDeleteStage(prev => prev + 1);
            return;
        }

        const endpoint = activeTab === "posts" ? "/api/posts" : "/api/timeline";

        try {
            const res = await fetch(endpoint, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ slug }),
            });

            if (res.ok) {
                setMessage("Deleted successfully!");
                if (activeTab === "posts") { handleNewPost(); } else { handleNewEvent(); }
                fetchData();
                setDeleteStage(0);
            } else {
                setMessage("Failed to delete.");
            }
        } catch (error) {
            setMessage("Error deleting.");
        }
    };


    if (!isAuthenticated) {
        // ... (login form remains same) ...
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
                                    className={`w-full text-left p-3 rounded-lg text-sm truncate transition-all flex justify-between items-center ${selectedPost?.slug === post.slug
                                        ? "bg-accent/10 text-accent border border-accent/20"
                                        : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <span>{post.title || post.slug}</span>
                                    {post.published === false && <span className="text-[10px] bg-yellow-500/20 text-yellow-500 px-1.5 py-0.5 rounded ml-2">DRAFT</span>}
                                </button>
                            ))
                            : timelineEvents.map((event) => (
                                <button
                                    key={event.year}
                                    onClick={() => handleSelectEvent(event)}
                                    className={`w-full text-left p-3 rounded-lg text-sm truncate transition-all flex justify-between items-center ${selectedEvent?.year === event.year
                                        ? "bg-accent/10 text-accent border border-accent/20"
                                        : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <span>{event.year} - {event.title}</span>
                                    {event.published === false && <span className="text-[10px] bg-yellow-500/20 text-yellow-500 px-1.5 py-0.5 rounded ml-2">DRAFT</span>}
                                </button>
                            ))}
                    </div>
                </div>

                {/* Editor Area */}
                <div className="md:col-span-3 flex flex-col min-h-0">
                    <div className="grid grid-cols-2 gap-6 mb-6 shrink-0">
                        {/* ... (existing fields) ... */}
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
                                {activeTab === "posts" ? "Slug" : "Slug / ID"}
                            </label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:bg-accent/5 outline-none transition-all placeholder:text-white/20"
                                placeholder={activeTab === "posts" ? "post-slug" : "event-slug"}
                            />
                        </div>
                    </div>


                    <div className="mb-6 shrink-0 flex items-center justify-between">
                        <div className="flex-1 mr-6">
                            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:bg-accent/5 outline-none transition-all"
                            />
                        </div>
                        {/* Status Indicator */}
                        <div className="flex flex-col items-end">
                            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Current Status</label>
                            <div className={`px-4 py-2 rounded-lg text-sm font-bold border ${isPublished ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"}`}>
                                {isPublished ? "● PUBLISHED (LIVE)" : "○ DRAFT (OFFLINE)"}
                            </div>
                        </div>
                    </div>

                    {activeTab === "timeline" && (
                        <div className="mb-6 shrink-0">
                            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                                Image (URL or Upload) {uploading && <span className="text-accent ml-2">Uploading...</span>}
                            </label>
                            <div className="flex flex-col gap-3">
                                <input
                                    type="text"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:bg-accent/5 outline-none transition-all placeholder:text-white/20"
                                    placeholder="https://... or /uploads/..."
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(e, "image")}
                                    className="block w-full text-sm text-muted-foreground
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-accent/10 file:text-accent
                                    hover:file:bg-accent/20 cursor-pointer"
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === "timeline" && (
                        <div className="mb-6 shrink-0 flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="pinned"
                                checked={pinned}
                                onChange={(e) => setPinned(e.target.checked)}
                                className="w-5 h-5 accent-accent cursor-pointer"
                            />
                            <label htmlFor="pinned" className="text-sm uppercase tracking-wider text-muted-foreground cursor-pointer select-none">
                                Pin this event (Default Selection)
                            </label>
                        </div>
                    )}

                    <div className="mb-6 flex-1 flex flex-col min-h-0">
                        <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 shrink-0">
                            {activeTab === "posts" ? "Content (Markdown)" : "Description"}
                        </label>
                        {/* ... (existing textarea code) ... */}
                        <div className="mb-2">
                            <label className="inline-flex items-center gap-2 cursor-pointer bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 text-xs text-muted-foreground transition-colors">
                                <span>📷 Insert Image into Content</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleFileUpload(e, "content")}
                                />
                            </label>
                        </div>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full flex-1 bg-white/5 border border-white/10 rounded-lg p-4 text-white font-mono focus:border-accent focus:bg-accent/5 outline-none resize-none custom-scrollbar leading-relaxed"
                            placeholder="Start typing..."
                        />
                    </div>

                    <div className="flex items-center justify-between shrink-0 pt-4 border-t border-white/10">
                        <p className={`text-sm font-medium ${message.includes("Saved") || message.includes("PUBLISHED") || message.includes("Deleted") ? "text-green-400" : "text-red-400"}`}>
                            {message}
                        </p>
                        <div className="flex gap-4">
                            {slug && (
                                <button
                                    onClick={handleDelete}
                                    className={`py-2 rounded-lg font-bold transition-colors w-28 text-center ${deleteStage === 0
                                        ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                                        : "bg-red-600 text-white hover:bg-red-700 shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                                        }`}
                                >
                                    {deleteStage === 0 ? "Delete" : "Confirm"}
                                </button>
                            )}
                            {/* Save Draft Button */}
                            <button
                                onClick={() => saveContent(false)}
                                className="bg-white/10 text-white border border-white/20 py-2 px-6 rounded-lg font-bold hover:bg-white/20 transition-all"
                            >
                                Save as Draft
                            </button>
                            {/* Publish Button */}
                            <button
                                onClick={() => saveContent(true)}
                                className="bg-accent text-white py-2 px-8 rounded-lg font-bold hover:bg-accent/80 transition-all shadow-[0_0_20px_rgba(124,58,237,0.2)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
                            >
                                Publish (Live)
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );


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
                                {activeTab === "posts" ? "Slug" : "Slug / ID"}
                            </label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:bg-accent/5 outline-none transition-all placeholder:text-white/20"
                                placeholder={activeTab === "posts" ? "post-slug" : "event-slug"}
                            />
                        </div>
                    </div>

                    {/* Date Input for BOTH Post and Timeline */}
                    <div className="mb-6 shrink-0">
                        <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:bg-accent/5 outline-none transition-all"
                        />
                    </div>



                    {activeTab === "timeline" && (
                        <div className="mb-6 shrink-0">
                            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                                Image (URL or Upload) {uploading && <span className="text-accent ml-2">Uploading...</span>}
                            </label>
                            <div className="flex flex-col gap-3">
                                <input
                                    type="text"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:bg-accent/5 outline-none transition-all placeholder:text-white/20"
                                    placeholder="https://... or /uploads/..."
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(e, "image")}
                                    className="block w-full text-sm text-muted-foreground
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-accent/10 file:text-accent
                                    hover:file:bg-accent/20 cursor-pointer"
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === "timeline" && (
                        <div className="mb-6 shrink-0 flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="pinned"
                                checked={pinned}
                                onChange={(e) => setPinned(e.target.checked)}
                                className="w-5 h-5 accent-accent cursor-pointer"
                            />
                            <label htmlFor="pinned" className="text-sm uppercase tracking-wider text-muted-foreground cursor-pointer select-none">
                                Pin this event (Default Selection)
                            </label>
                        </div>
                    )}

                    <div className="mb-6 flex-1 flex flex-col min-h-0">
                        <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 shrink-0">
                            {activeTab === "posts" ? "Content (Markdown)" : "Description"}
                        </label>
                        <div className="mb-2">
                            <label className="inline-flex items-center gap-2 cursor-pointer bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 text-xs text-muted-foreground transition-colors">
                                <span>📷 Insert Image into Content</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleFileUpload(e, "content")}
                                />
                            </label>
                        </div>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full flex-1 bg-white/5 border border-white/10 rounded-lg p-4 text-white font-mono focus:border-accent focus:bg-accent/5 outline-none resize-none custom-scrollbar leading-relaxed"
                            placeholder="Start typing..."
                        />
                    </div>

                    <div className="flex items-center justify-between shrink-0 pt-4 border-t border-white/10">
                        <p className={`text-sm font-medium ${message.includes("Saved") || message.includes("PUBLISHED") || message.includes("Deleted") ? "text-green-400" : "text-red-400"}`}>
                            {message}
                        </p>
                        <div className="flex gap-4">
                            {slug && (
                                <button
                                    onClick={handleDelete}
                                    className={`py-2 rounded-lg font-bold transition-colors w-28 text-center ${deleteStage === 0
                                        ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                                        : "bg-red-600 text-white hover:bg-red-700 shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                                        }`}
                                >
                                    {deleteStage === 0 ? "Delete" : "Confirm"}
                                </button>
                            )}
                            {/* Save Draft Button */}
                            <button
                                onClick={() => saveContent(false)}
                                className="bg-white/10 text-white border border-white/20 py-2 px-6 rounded-lg font-bold hover:bg-white/20 transition-all"
                            >
                                Save as Draft
                            </button>
                            {/* Publish Button */}
                            <button
                                onClick={() => saveContent(true)}
                                className="bg-accent text-white py-2 px-8 rounded-lg font-bold hover:bg-accent/80 transition-all shadow-[0_0_20px_rgba(124,58,237,0.2)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
                            >
                                Publish (Live)
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}
