"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export function Section({ children, className, delay = 0 }: SectionProps) {
    return (
        <section className={cn("py-20", className)}>
            <div className="max-w-3xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay }}
                >
                    {children}
                </motion.div>
            </div>
        </section>
    );
}
