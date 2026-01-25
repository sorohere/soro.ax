"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Post {
    slug: string;
    title: string;
    date: string;
}

const ITEMS_PER_PAGE = 5;

export function TerminalPostList({ posts }: { posts: Post[] }) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const visiblePosts = posts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="w-full font-mono">
            {/* Terminal Header */}
            <div className="mb-6 text-sm text-muted-foreground flex flex-col gap-1">
                <div className="flex gap-2">
                    <span className="text-green-500">root@soro</span>
                    <span className="text-white">:</span>
                    <span className="text-blue-500">~</span>
                    <span className="text-white">$</span>
                    <span className="text-white ml-2">
                        {`ls -lat /var/logs/thoughts | head -n ${ITEMS_PER_PAGE} --page ${currentPage}`}
                    </span>
                </div>
                <div className="text-white/50 text-xs mt-2">
                    total {posts.length} (showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, posts.length)})
                </div>
            </div>

            {/* List Container */}
            <div className="w-full min-h-[300px]">
                {/* Mobile View - Stacked & Touch Friendly */}
                <div className="md:hidden space-y-3">
                    <AnimatePresence mode="wait">
                        {visiblePosts.map((post) => (
                            <motion.div
                                key={post.slug}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="block relative overflow-hidden bg-white/5 p-5 rounded-lg border border-white/5 active:bg-white/10 active:scale-[0.99] transition-all"
                                >
                                    {/* Selection Line decoration */}
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/20" />

                                    <div className="flex justify-between items-start mb-2 pl-2">
                                        <span className="text-xs text-muted-foreground font-mono">{post.date}</span>
                                        <span className="text-[10px] text-accent border border-accent/20 px-1.5 py-0.5 rounded bg-accent/5">r--r--r--</span>
                                    </div>
                                    <div className="text-white font-bold text-lg leading-tight pl-2">
                                        {post.title}
                                    </div>
                                    <div className="mt-2 pl-2 text-xs text-muted-foreground/50 truncate">
                                        /var/logs/thoughts/{post.slug}.md
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Desktop View - Exact Terminal Table */}
                <div className="hidden md:block w-full text-sm">
                    <div className="grid grid-cols-12 gap-4 border-b border-white/10 pb-2 mb-2 text-muted-foreground/50 text-xs uppercase tracking-wider px-2">
                        <div className="col-span-2">Mode</div>
                        <div className="col-span-2 text-right pr-4">Date</div>
                        <div className="col-span-8 pl-2">Name</div>
                    </div>

                    <div className="space-y-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPage}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.2 }}
                            >
                                {visiblePosts.map((post) => (
                                    <Link
                                        key={post.slug}
                                        href={`/blog/${post.slug}`}
                                        className="grid grid-cols-12 gap-4 py-3 px-2 -mx-2 hover:bg-white/5 rounded-md transition-all group cursor-pointer border border-transparent hover:border-white/5 items-center"
                                    >
                                        <div className="col-span-2 text-muted-foreground/70 text-xs font-mono group-hover:text-muted-foreground transition-colors">
                                            -rw-r--r--
                                        </div>
                                        <div className="col-span-2 text-muted-foreground text-xs font-mono text-right pr-4 group-hover:text-white transition-colors">
                                            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                                        </div>
                                        <div className="col-span-8 pl-2 flex items-center">
                                            <span className="text-white font-medium group-hover:text-accent group-hover:underline decoration-accent/30 underline-offset-4 decoration-1 transition-all">
                                                {post.title}
                                            </span>
                                            <span className="text-muted-foreground/20 ml-2 group-hover:opacity-100 opacity-0 transition-opacity text-xs">.md</span>
                                        </div>
                                    </Link>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Pagination Controls & Hints */}
            {totalPages > 1 && (
                <div className="mt-8 flex flex-col gap-2">
                    {/* Controls */}
                    <div className="flex items-center justify-between text-xs font-mono select-none border-t border-white/5 pt-4">
                        {/* Prev Button */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`flex items-center gap-2 group ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:text-white cursor-pointer active:scale-95 transition-transform'}`}
                        >
                            <span className="text-accent">{"<"}</span>
                            <span className="group-hover:underline decoration-white/30 underline-offset-4">Exec_Prev</span>
                        </button>

                        {/* Page Indicator */}
                        <div className="text-muted-foreground bg-white/5 px-3 py-1 rounded">
                            PAGE <span className="text-white">{String(currentPage).padStart(2, '0')}</span> <span className="text-white/30">/</span> {String(totalPages).padStart(2, '0')}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`flex items-center gap-2 group ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:text-white cursor-pointer active:scale-95 transition-transform'}`}
                        >
                            <span className="group-hover:underline decoration-white/30 underline-offset-4">Exec_Next</span>
                            <span className="text-accent">{">"}</span>
                        </button>
                    </div>

                </div>
            )}

            {/* Footer Prompt */}
            {!totalPages || totalPages <= 1 ? (
                <div className="mt-8 flex gap-2 text-sm">
                    <span className="text-green-500">root@soro</span>
                    <span className="text-white">:</span>
                    <span className="text-blue-500">~</span>
                    <span className="text-white">$</span>
                    <span className="animate-pulse w-2 h-5 bg-white ml-1 inline-block align-middle" />
                </div>
            ) : null}
        </div>
    );
}
