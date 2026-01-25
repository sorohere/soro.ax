"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";
import { X } from "lucide-react";

export type TimelineEvent = {
    year: string;
    date: string; // Added date
    title: string;
    description: string;
    image?: string;
    pinned?: boolean;
};

interface TimelineProps {
    events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
    const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(() => {
        // Default to the first pinned event, or null if none
        return events.find(e => e.pinned) || null;
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEventClick = (event: TimelineEvent) => {
        if (selectedEvent === event) {
            setIsModalOpen(true);
        } else {
            setSelectedEvent(event);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isModalOpen) {
                setIsModalOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isModalOpen]);

    return (
        <>
            <div className="flex flex-col md:flex-row gap-8 relative py-12">
                {/* Timeline Line & Nodes */}
                <div className="relative md:w-1/3">
                    {/* Desktop Line - Gradient Fade */}
                    <div className="hidden md:block absolute right-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                    {/* Mobile Line */}
                    <div className="md:hidden absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white/10 to-transparent ml-4" />

                    <div className="flex flex-col gap-12 py-4 max-h-[500px] md:max-h-none md:absolute md:inset-0 overflow-y-auto scrollbar-hide pl-12 md:pl-0 md:pr-16">
                        {events.map((event, index) => (
                            <div key={index} className="relative group">
                                {/* Glowing Dot */}
                                <div
                                    className={cn(
                                        "absolute -left-[51px] md:-right-[42px] md:left-auto top-1.5 w-5 h-5 rounded-full border-2 transition-all duration-300 cursor-pointer z-10",
                                        selectedEvent === event
                                            ? "bg-accent border-accent shadow-[0_0_15px_rgba(116,96,224,0.6)] scale-110"
                                            : "bg-black border-white/20 group-hover:border-accent group-hover:bg-accent/20"
                                    )}
                                    onClick={() => handleEventClick(event)}
                                />

                                {/* Content */}
                                <div
                                    className="cursor-pointer group-hover:translate-x-1 transition-transform duration-300"
                                    onClick={() => handleEventClick(event)}
                                >
                                    <span className={cn(
                                        "font-mono text-xs md:text-sm mb-1 block transition-colors",
                                        selectedEvent === event ? "text-accent" : "text-muted-foreground"
                                    )}>
                                        {new Date(event.date).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })}
                                    </span>
                                    <h3 className={cn(
                                        "text-lg font-bold transition-colors leading-tight",
                                        selectedEvent === event ? "text-white" : "text-muted-foreground group-hover:text-white"
                                    )}>
                                        {event.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detail View (Preview) */}
                <div className="flex-1 min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {selectedEvent ? (
                            <motion.div
                                key={selectedEvent.year}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="glass-panel p-8 rounded-2xl h-full flex flex-col"
                            >
                                {selectedEvent.image && (
                                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 mb-6 group cursor-pointer" onClick={() => setIsModalOpen(true)}>
                                        <Image
                                            src={selectedEvent.image}
                                            alt={selectedEvent.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-white text-sm font-bold uppercase tracking-widest">Expand</span>
                                        </div>
                                    </div>
                                )}
                                <div className="flex-1">
                                    <div className="flex items-baseline justify-between mb-2">
                                        <h2 className="text-2xl font-bold text-white tracking-tight">{selectedEvent.title}</h2>
                                        <span className="font-mono text-accent text-sm">
                                            {new Date(selectedEvent.date).getFullYear()}
                                        </span>
                                    </div>

                                    <p className="text-muted-foreground leading-relaxed font-mono line-clamp-6 text-sm md:text-base">
                                        {selectedEvent.description}
                                    </p>
                                </div>

                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="mt-6 w-full py-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-bold text-white transition-all uppercase tracking-wider"
                                >
                                    Read Full Log
                                </button>
                            </motion.div>
                        ) : (
                            <div className="h-full glass-panel rounded-2xl flex items-center justify-center text-muted-foreground/50 italic font-mono p-8 text-center border-dashed">
                                Select a node from the timeline to decrypt details...
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Detailed Modal */}
            <AnimatePresence>
                {isModalOpen && selectedEvent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl max-h-[90vh] bg-black border border-white/10 rounded-xl overflow-hidden shadow-2xl"
                        >
                            {/* Close Button - Fixed */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-md"
                            >
                                <X size={20} />
                            </button>

                            {/* Scrollable Container */}
                            <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
                                {/* Header / Image */}
                                <div className="relative h-48 md:h-64 w-full">
                                    {selectedEvent.image ? (
                                        <Image
                                            src={selectedEvent.image}
                                            alt={selectedEvent.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-accent/10 flex items-center justify-center">
                                            <span className="text-accent text-4xl font-bold">{selectedEvent.year}</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                                    <div className="absolute bottom-6 left-6 md:left-8 right-6">
                                        <span className="text-accent font-mono mb-2 block">
                                            {new Date(selectedEvent.date).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })}
                                        </span>
                                        <h2 className="text-2xl md:text-4xl font-bold text-white">{selectedEvent.title}</h2>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 md:p-8">
                                    <div className="prose prose-invert max-w-none font-mono">
                                        <MarkdownRenderer content={selectedEvent.description} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
