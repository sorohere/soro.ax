"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";
import { X, Calendar, Maximize2 } from "lucide-react";
import { TimelineEvent } from "@/lib/timeline";

interface FilmStripProps {
    events: TimelineEvent[];
}

export function FilmStrip({ events }: FilmStripProps) {
    const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Horizontal Scroll Logic
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            }
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => container.removeEventListener("wheel", handleWheel);
    }, []);

    // Keyboard navigation for modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && selectedEvent) {
                setSelectedEvent(null);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedEvent]);

    return (
        <>
            <div className="w-full min-h-screen flex flex-col justify-center overflow-hidden bg-[#050505]">

                {/* Header / Intro - Positioned absolutely or fixed could work, but let's keep it simple top-left */}
                <div className="container mx-auto px-6 mb-8 md:mb-12 pt-20">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white/90">
                        contact<span className="text-accent">_sheet</span>
                    </h1>
                    <p className="font-mono text-sm text-muted-foreground mt-2 max-w-md">
                        A chronological sequence of events, exposures, and developments.
                    </p>
                </div>

                {/* Film Strip Container */}
                <div
                    ref={containerRef}
                    className="flex w-full overflow-x-auto pb-12 pt-4 px-6 md:px-12 scrollbar-hide items-center gap-0"
                    style={{ scrollBehavior: 'smooth' }}
                >
                    {/* Spacer for start */}
                    <div className="w-4 md:w-12 flex-shrink-0" />

                    {events.map((event, index) => (
                        <FilmFrame
                            key={event.slug}
                            event={event}
                            index={index}
                            onClick={() => setSelectedEvent(event)}
                        />
                    ))}

                    {/* Spacer for end */}
                    <div className="w-4 md:w-12 flex-shrink-0" />
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedEvent && (
                    <Lightbox event={selectedEvent} onClose={() => setSelectedEvent(null)} />
                )}
            </AnimatePresence>
        </>
    );
}

function FilmFrame({ event, index, onClick }: { event: TimelineEvent, index: number, onClick: () => void }) {
    // Format index for "frame number"
    const frameNumber = (index + 1).toString().padStart(2, '0') + "A";

    return (
        <motion.div
            className="flex flex-col flex-shrink-0 group cursor-pointer relative mx-1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            onClick={onClick}
        >
            {/* Top Perforations */}
            <div className="h-6 md:h-8 flex ml-1 mb-1">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-3 w-3 md:h-4 md:w-4 rounded-[2px] bg-white/10 mx-auto my-auto" />
                ))}
            </div>

            {/* The Frame Itself */}
            <div className="relative w-[280px] md:w-[360px] aspect-[3/2] bg-black border-[4px] border-black shadow-lg overflow-hidden group-hover:scale-[1.02] transition-transform duration-300 ring-1 ring-white/10 group-hover:ring-accent/50">

                {/* Image Placeholder or Actual Image */}
                {event.image ? (
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-[#111] flex items-center justify-center relative overflow-hidden">
                        {/* Abstract noise or pattern */}
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("/noise.png")' }}></div>
                        <Calendar className="w-12 h-12 text-white/5" />
                        <span className="absolute bottom-4 right-4 font-mono text-xs text-white/20">NO IMAGE</span>
                    </div>
                )}

                {/* Overlay Info (appears on hover) */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-accent text-xs font-mono uppercase tracking-widest mb-1">
                        {event.year} // {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <h3 className="text-white font-bold text-lg leading-tight">{event.title}</h3>
                    <div className="flex items-center gap-2 mt-4 text-white/70 text-xs font-mono">
                        <Maximize2 size={12} />
                        <span>EXPAND</span>
                    </div>
                </div>
            </div>

            {/* Bottom Meta & Perforations */}
            <div className="h-10 md:h-12 flex justify-between items-center px-2 mt-1 relative">
                {/* Frame Number */}
                <span className="text-[10px] font-mono text-white/40 font-bold -rotate-90 origin-left absolute left-1 bottom-1">
                    KODAK PORTRA 400
                </span>

                {/* Perforations */}
                <div className="flex gap-8 mx-auto opacity-30">
                    <div className="h-3 w-3 md:h-4 md:w-4 rounded-[2px] bg-white mx-1 my-auto" />
                    <div className="h-3 w-3 md:h-4 md:w-4 rounded-[2px] bg-white mx-1 my-auto" />
                    <div className="h-3 w-3 md:h-4 md:w-4 rounded-[2px] bg-white mx-1 my-auto" />
                    <div className="h-3 w-3 md:h-4 md:w-4 rounded-[2px] bg-white mx-1 my-auto" />
                </div>

                <span className="text-xs font-mono text-accent font-bold absolute right-2">
                    {frameNumber}
                </span>
            </div>
        </motion.div>
    );
}

function Lightbox({ event, onClose }: { event: TimelineEvent, onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-5xl h-[85vh] bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-white/10 rounded-full text-white transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Left: Image Area */}
                <div className="w-full md:w-1/2 h-48 md:h-full relative bg-black">
                    {event.image ? (
                        <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                            <Calendar className="w-16 h-16 text-white/10" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:hidden" />

                    <div className="absolute bottom-4 left-4 md:hidden">
                        <h2 className="text-2xl font-bold text-white mb-1">{event.title}</h2>
                        <p className="text-accent font-mono text-sm">{event.year}</p>
                    </div>
                </div>

                {/* Right: Content Area */}
                <div className="w-full md:w-1/2 flex flex-col h-full bg-[#0a0a0a]">
                    <div className="hidden md:block p-8 pb-0">
                        <div className="flex items-center gap-3 text-accent font-mono text-xs tracking-widest uppercase mb-4">
                            <span>{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long' })}</span>
                            <span className="w-px h-3 bg-white/20" />
                            <span>{event.year}</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white leading-tight mb-2">{event.title}</h2>
                        <div className="h-px w-20 bg-accent mt-4" />
                    </div>

                    <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-grow">
                        <div className="prose prose-invert prose-sm md:prose-base max-w-none text-muted-foreground/90">
                            <MarkdownRenderer content={event.description} />
                        </div>
                    </div>

                    {/* Footer Meta */}
                    <div className="p-6 border-t border-white/5 bg-black/20 flex justify-between items-center text-[10px] font-mono text-white/30 uppercase">
                        <span>REF: {event.slug}</span>
                        <span>SORO.AX ARCHIVE</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
