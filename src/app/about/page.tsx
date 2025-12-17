export default function AboutPage() {
    return (
        <div className="max-w-3xl mx-auto px-6 pb-4">
            <div className="prose prose-invert max-w-none font-mono">
                <p className="text-base text-muted-foreground leading-relaxed">
                    안녕! i&apos;m soro <br />just a regular CS student figuring out life, one debug
                    at a time. part-time movie buff and occasional existential crisis haver.
                    i&apos;m out here trying to make my neurons and neural networks fire in sync.
                </p>

                <div className="text-base text-muted-foreground leading-relaxed mt-6">
                    currently fine-tuning my skills in:
                    <div>{'->'}<a href="https://docs.python.org/3/" target="_blank" className="text-accent hover:text-white no-underline"> python</a> – the snek that does math</div>
                    <div>{'->'}<a href="https://www.learncpp.com/" target="_blank" className="text-accent hover:text-white no-underline"> c/c++</a> – for when Python needs speed</div>
                    <div>{'->'}<a href="https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/" target="_blank" className="text-accent hover:text-white no-underline"> algorithms</a> – fancy ways to organize my chaos</div>
                    <div>{'->'}<a href="https://pages.cs.wisc.edu/~remzi/OSTEP/" target="_blank" className="text-accent hover:text-white no-underline"> os</a> – making computers talk to themselves</div>
                    <div>{'->'}<a href="https://cs229.stanford.edu/" target="_blank" className="text-accent hover:text-white no-underline"> ml</a> – teaching robots to think for me</div>

                </div>

                <p className="text-base text-muted-foreground leading-relaxed mt-6 italic">
                    last updated: whenever my coffee cup is empty.
                </p>

                <p className="text-base text-muted-foreground leading-relaxed mt-6">
                    when not coding: lost in movies that make me question reality, listening
                    to music that fuels my soul, and and enjoying the <a href="https://www.youtube.com/watch?v=k7X7sZzSXYs" target="_blank" className="text-accent hover:text-white no-underline">little things</a>.
                </p>


                <div className="mt-0 pt-0 text-center text-[#888888]">
                    <p className="text-base italic hover:text-white transition-colors">
                        my code and my life, both are works in progress, iterating and<br />
                        adjusting weights along the way.
                    </p>
                    <p className="mt-4 text-sm">
                        &copy; 2025 built with: love, GPTs, and caffeine.
                    </p>
                </div>
            </div>
        </div>
    );
}
