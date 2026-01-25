"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";
import { X, Calendar, MapPin } from "lucide-react";

export type TimelineEvent = {
    year: string;
    date: string;
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
        return events.find(e => e.pinned) || events[0] || null;
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEventClick = (event: TimelineEvent) => {
        if (selectedEvent === event && !isModalOpen) {
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

    // Group events by year
    const eventsByYear = events.reduce((acc, event) => {
        const year = event.year;
        if (!acc[year]) acc[year] = [];
        acc[year].push(event);
        return acc;
    }, {} as Record<string, TimelineEvent[]>);

    const years = Object.keys(eventsByYear).sort((a, b) => parseInt(b) - parseInt(a));

    return (
        <>
            <div className="max-w-5xl mx-auto px-6 py-12">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Field <span className="text-accent">Notes</span>
                    </h1>
                    <p className="text-sm text-muted-foreground font-mono">
                        Events, thoughts, and moments worth remembering.
                    </p>
                </motion.div>

                {/* Timeline by Year */}
                <div className="space-y-16">
                    {years.map((year, yearIndex) => (
                        <motion.div
                            key={year}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: yearIndex * 0.1 }}
                            className="relative"
                        >
                            {/* Year Label */}
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-2xl font-bold text-white/90 font-mono">{year}</h2>
                                <div className="h-px flex-1 bg-white/5" />
                            </div>

                            {/* Events Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {eventsByYear[year].map((event, eventIndex) => (
                                    <motion.div
                                        key={event.date + event.title}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: yearIndex * 0.1 + eventIndex * 0.05 }}
                                        onClick={() => handleEventClick(event)}
                                        className={cn(
                                            "glass-panel rounded-xl overflow-hidden cursor-pointer transition-all duration-300 group relative",
                                            selectedEvent === event
                                                ? "ring-2 ring-accent/50 shadow-lg shadow-accent/20"
                                                : "hover:ring-1 hover:ring-white/20"
                                        )}
                                    >
                                        {/* Image or Colored Block */}
                                        {event.image ? (
                                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/20">
                                                <Image
                                                    src={event.image}
                                                    alt={event.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                            </div>
                                        ) : (
                                            <div className="aspect-[4/3] w-full bg-gradient-to-br from-accent/10 to-blue-500/5 flex items-center justify-center">
                                                <Calendar className="w-12 h-12 text-white/10" />
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="p-5">
                                            <div className="text-[10px] uppercase tracking-wider text-accent/80 font-mono mb-2">
                                                {new Date(event.date).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    timeZone: "UTC"
                                                })}
                                            </div>
                                            <h3 className="text-base font-bold text-white mb-2 leading-tight line-clamp-2">
                                                {event.title}
                                            </h3>
                                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                                                {event.description.replace(/[#*_`]/g, '').substring(0, 120)}...
                                            </p>
                                        </div>

                                        {/* Pinned Badge */}
                                        {event.pinned && (
                                            <div className="absolute top-3 right-3 px-2 py-1 bg-accent/90 rounded text-[9px] font-bold text-white uppercase tracking-wider">
                                                Pinned
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
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
                            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl max-h-[90vh] bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 z-50 p-2 bg-black/80 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-md border border-white/10"
                            >
                                <X size={20} />
                            </button>

                            {/* Scrollable Container */}
                            <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
                                {/* Header */}
                                <div className="relative h-64 md:h-80 w-full">
                                    {selectedEvent.image ? (
                                        <Image
                                            src={selectedEvent.image}
                                            alt={selectedEvent.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-accent/20 to-blue-500/10 flex items-center justify-center">
                                            <Calendar className="w-24 h-24 text-white/10" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                                    <div className="absolute bottom-8 left-8 right-8">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="flex items-center gap-2 text-accent font-mono text-sm">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(selectedEvent.date).toLocaleDateString("en-US", {
                                                    month: "long",
                                                    day: "numeric",
                                                    year: "numeric",
                                                    timeZone: "UTC"
                                                })}
                                            </div>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                                            {selectedEvent.title}
                                        </h2>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 md:p-12">
                                    <div className="prose prose-invert prose-lg max-w-none">
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
