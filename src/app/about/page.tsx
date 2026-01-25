"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-8 font-sans selection:bg-purple-500/30 selection:text-white">

            {/* Name + Quiet Anchor */}
            <motion.header
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-10"
            >
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        <span className="text-accent">Saurabh</span> Kushwaha
                    </h1>
                    <p className="text-xs text-muted-foreground/60 mt-1 font-mono tracking-wider">
                        Systems Engineer
                    </p>
                </div>
            </motion.header>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-10"
            >
                {/* WORK Section */}
                <section className="space-y-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/30 font-mono">
                        Work
                    </span>

                    <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                        <p>
                            I'm interested in how systems behave when conditions are <span className="text-white">no longer ideal</span>. Most of what I work on lives where clarity has to be earned.
                        </p>
                        <p>
                            My focus is on building and evaluating things that need to work outside controlled environments. I spend time examining edge cases, trade-offs, and long-term behavior. I'm comfortable moving slowly if it leads to more reliable outcomes. I care more about durability than visibility.
                        </p>
                    </div>
                </section>

                {/* OUTSIDE WORK Section */}
                <section className="space-y-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/30 font-mono">
                        Outside Work
                    </span>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                        I'm drawn to places that strip life down to essentials. Mountains and open skies give me a sense of scale and perspective. I actively seek situations that carry real risk, effort, and uncertainty. The thrill isn't about escape—it sharpens focus and keeps me present.
                    </p>
                </section>

                {/* OPEN INVITE Section */}
                <section className="space-y-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/30 font-mono">
                        Open Invite
                    </span>

                    <div className="space-y-4 text-base text-muted-foreground/70 leading-relaxed">
                        <p>
                            If any of this sounds unreasonable, uncomfortable, or unnecessary to most people, it's probably the right kind of thing.
                        </p>
                        <p className="text-muted-foreground/50">
                            If that resonates, we'll probably get along.
                        </p>
                    </div>
                </section>

            </motion.div>

        </div>
    );
}
