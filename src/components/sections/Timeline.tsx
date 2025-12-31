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
            <div className="flex flex-col md:flex-row gap-8 relative">
                {/* Timeline Line & Nodes */}
                <div className="relative md:w-1/3">
                    {/* Desktop Line */}
                    <div className="hidden md:block absolute right-8 top-0 bottom-0 w-[2px] bg-white/10" />

                    {/* Mobile Line */}
                    <div className="md:hidden absolute left-0 top-0 bottom-0 w-[2px] bg-white/10 ml-4" />

                    <div className="flex flex-col gap-12 py-4 max-h-[380px] md:max-h-none md:absolute md:inset-0 overflow-y-auto scrollbar-hide pl-12 md:pl-0 md:pr-16">
                        {events.map((event, index) => (
                            <div key={index} className="relative group">
                                {/* Dot */}
                                <div
                                    className={cn(
                                        "absolute -left-[51px] md:-right-[42px] md:left-auto top-1.5 w-5 h-5 rounded-full border-2 transition-colors cursor-pointer z-10",
                                        selectedEvent === event ? "bg-accent border-accent" : "bg-background border-white group-hover:border-accent"
                                    )}
                                    onClick={() => handleEventClick(event)}
                                />

                                {/* Content */}
                                <div
                                    className="cursor-pointer"
                                    onClick={() => handleEventClick(event)}
                                >
                                    <span className="text-accent font-mono text-xs md:text-sm">
                                        {new Date(event.date).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })}
                                    </span>
                                    <h3 className={cn(
                                        "text-lg font-bold transition-colors",
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
                <div className="flex-1 min-h-[300px]">
                    <AnimatePresence mode="wait">
                        {selectedEvent ? (
                            <motion.div
                                key={selectedEvent.year}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                {selectedEvent.image && (
                                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10">
                                        <Image
                                            src={selectedEvent.image}
                                            alt={selectedEvent.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-2">{selectedEvent.title}</h2>
                                    <p className="text-muted-foreground leading-relaxed font-mono line-clamp-4">
                                        {selectedEvent.description}
                                    </p>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="text-accent hover:text-white text-sm mt-2 underline decoration-accent/50 hover:decoration-white transition-all"
                                    >
                                        Read more
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="h-full flex items-center justify-center text-muted-foreground/50 italic font-mono">
                                Select an event to view details...
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
