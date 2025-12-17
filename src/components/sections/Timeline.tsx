"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

type TimelineEvent = {
    year: string;
    title: string;
    description: string;
    image?: string;
};

const events: TimelineEvent[] = [
    {
        year: "2024",
        title: "The Beginning of the End (of Undergrad)",
        description: "Started working on my final year project. Realized I know nothing.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    },
    {
        year: "2023",
        title: "Deep Dive into ML",
        description: "Spent sleepless nights debugging tensor shapes. It was fun... mostly.",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    },
    {
        year: "2022",
        title: "Hello World",
        description: "Wrote my first line of Python. It didn't work. I fixed it. It still didn't work.",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80",
    },
];

export function Timeline() {
    const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

    return (
        <div className="flex flex-col md:flex-row gap-8 relative">
            {/* Timeline Line & Nodes */}
            <div className="relative md:w-1/3 border-l-2 border-white/10 ml-4 md:ml-0 pl-8 md:pl-0 md:border-l-0 md:border-r-2 md:pr-8 flex flex-col gap-12 py-4">
                {events.map((event, index) => (
                    <div key={index} className="relative group">
                        {/* Dot */}
                        <div
                            className={cn(
                                "absolute -left-[59px] md:-right-[42px] md:left-auto top-1.5 w-5 h-5 rounded-full border-2 transition-colors cursor-pointer z-10",
                                selectedEvent === event ? "bg-accent border-accent" : "bg-background border-white group-hover:border-accent"
                            )}
                            onClick={() => setSelectedEvent(event)}
                        />

                        {/* Content */}
                        <div
                            className="cursor-pointer"
                            onClick={() => setSelectedEvent(event)}
                        >
                            <span className="text-accent font-mono text-sm">{event.year}</span>
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

            {/* Detail View */}
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
                                <p className="text-muted-foreground leading-relaxed font-mono">
                                    {selectedEvent.description}
                                </p>
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
    );
}
