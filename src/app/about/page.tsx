import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 pb-20">
            <h1 className="text-4xl font-bold mb-12 text-white tracking-tight">
                readme_<span className="text-accent">.md</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Content - Col Span 2 */}
                <div className="md:col-span-2 space-y-12">

                    {/* Basic Info */}
                    <section className="glass-panel p-8 rounded-2xl">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-accent">#</span> whoami
                        </h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed font-mono">
                            <p>
                                I am <span className="text-white">Saurabh Kushwaha</span> from India.
                            </p>
                            <p>
                                A technologist in preparation and an explorer by intent. I use extreme environments—mountains, cold, altitude, silence—as tools for self-understanding.
                            </p>
                            <p>
                                Currently working with <span className="text-white">IBM</span> on Data & ML, focusing on Speech Processing and Computer Vision.
                            </p>
                        </div>
                    </section>

                    {/* Philosophy */}
                    <section className="glass-panel p-8 rounded-2xl">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-accent">#</span> operating_principle
                        </h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed font-mono italic border-l-2 border-accent/30 pl-4">
                            <p>"Live beyond life. Be beyond being. Exist beyond existence."</p>
                        </div>
                        <div className="mt-6 space-y-2 font-mono text-sm text-white/80">
                            <p>• Not to judge</p>
                            <p>• Not to get offended</p>
                            <p>• Not to react</p>
                        </div>
                    </section>

                    {/* Tech Stack Details */}
                    <section className="glass-panel p-8 rounded-2xl">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="text-accent">#</span> technical_domain
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wider">AI / ML Core</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Speech Processing', 'VAD', 'Audio Segmentation', 'Computer Vision', 'TFLite', 'PyTorch'].map(tech => (
                                        <span key={tech} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-muted-foreground transition-colors hover:text-white cursor-default">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wider">Engineering</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Python', 'Next.js', 'Typescript', 'Linux', 'Git', 'Docker'].map(tech => (
                                        <span key={tech} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-muted-foreground transition-colors hover:text-white cursor-default">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Adventures */}
                    <section className="glass-panel p-8 rounded-2xl border-accent/20">
                        <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <span className="text-accent">#</span> ultimate_objective
                        </h2>
                        <p className="text-sm text-muted-foreground mb-6 font-mono">
                            To become capable of climbing all 14 peaks above 8,000 meters.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                            <div className="space-y-2">
                                <h3 className="text-white font-bold opacity-50">Operations: India</h3>
                                <ul className="space-y-1 text-muted-foreground">
                                    <li>[ ] Kuari Pass (Garhwal)</li>
                                    <li>[ ] Kashmir Great Lakes</li>
                                    <li>[ ] Rupin Pass</li>
                                    <li>[ ] Goecha La (Sikkim)</li>
                                    <li>[ ] Chadar Trek (Frozen River)</li>
                                    <li>[ ] Stok Kangri</li>
                                </ul>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-white font-bold opacity-50">Operations: Global</h3>
                                <ul className="space-y-1 text-muted-foreground">
                                    <li>[ ] Aurora Borealis (Nordic)</li>
                                    <li>[ ] Aurora Australis (Antarctica)</li>
                                    <li>[ ] Solo Scuba (Bali/Gili)</li>
                                    <li>[ ] Solo Skydiving (Thailand)</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar - Col Span 1 */}
                <div className="space-y-6">
                    <section className="glass-panel p-6 rounded-2xl">
                        <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider text-muted-foreground">Connect</h3>
                        <ul className="space-y-3 font-mono text-sm">
                            <li>
                                <Link href="https://linkedin.com/in/sorohere" target="_blank" className="flex items-center justify-between group text-muted-foreground hover:text-accent transition-colors">
                                    <span>LinkedIn</span>
                                    <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                                </Link>
                            </li>
                            <li>
                                <Link href="https://github.com/sorohere" target="_blank" className="flex items-center justify-between group text-muted-foreground hover:text-accent transition-colors">
                                    <span>GitHub</span>
                                    <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                                </Link>
                            </li>
                        </ul>
                    </section>

                    <section className="glass-panel p-6 rounded-2xl">
                        <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider text-muted-foreground">Traits</h3>
                        <div className="flex flex-wrap gap-2">
                            {['Curious', 'Depth-Oriented', 'Disciplined', 'Stoic'].map(trait => (
                                <span key={trait} className="px-2 py-1 bg-accent/10 text-accent text-xs rounded border border-accent/20">
                                    {trait}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="glass-panel p-6 rounded-2xl">
                        <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider text-muted-foreground">Status</h3>
                        <div className="flex items-center gap-3">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                            </span>
                            <span className="text-sm text-white font-medium">Training & Deploying</span>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
