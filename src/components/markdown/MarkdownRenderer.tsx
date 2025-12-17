import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";

interface MarkdownRendererProps {
    content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <ReactMarkdown
            components={{
                h1: ({ node, ...props }) => <h1 className="text-accent text-3xl font-bold mt-8 mb-4" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-accent text-2xl font-bold mt-8 mb-4" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-accent text-xl font-bold mt-6 mb-3" {...props} />,
                h4: ({ node, ...props }) => <h4 className="text-accent text-lg font-bold mt-6 mb-3" {...props} />,
                h5: ({ node, ...props }) => <h5 className="text-accent text-base font-bold mt-4 mb-2" {...props} />,
                h6: ({ node, ...props }) => <h6 className="text-accent text-sm font-bold mt-4 mb-2" {...props} />,
                a: ({ node, ...props }) => (
                    <a
                        className="text-accent hover:text-white no-underline transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                    />
                ),
                p: ({ node, ...props }) => <p className="text-muted-foreground leading-relaxed mb-6" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-6 text-muted-foreground" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-6 text-muted-foreground" {...props} />,
                li: ({ node, ...props }) => <li className="mb-2" {...props} />,
                blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-accent pl-4 italic my-6 text-muted-foreground" {...props} />
                ),
                code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                        <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                        >
                            {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                    ) : (
                        <code className="bg-muted px-1 py-0.5 rounded text-sm text-accent" {...props}>
                            {children}
                        </code>
                    );
                },
                img: ({ node, src, alt, ...props }) => {
                    // Check for layout modifiers in the alt text
                    // e.g., "alt text | half" or "alt text | full"
                    const [altText, modifier] = (alt || "").split("|").map((s) => s.trim());

                    let containerClass = "w-full my-8 mx-auto block"; // Default full width

                    if (modifier === "half") {
                        // Use inline-block and slightly less than 50% to fit two in a row with margins
                        containerClass = "md:w-[45%] inline-block mx-[2%] my-4 align-top";
                    } else if (modifier === "third") {
                        containerClass = "md:w-[30%] inline-block mx-[1.5%] my-4 align-top";
                    }

                    // If it's a relative path (starting with /), use Next.js Image
                    // Otherwise use standard img tag (for external images)
                    const imageSrc = typeof src === 'string' ? src : "";
                    if (imageSrc.startsWith("/")) {
                        return (
                            <span className={containerClass}>
                                <Image
                                    src={imageSrc}
                                    alt={altText || ""}
                                    width={800}
                                    height={400}
                                    className="rounded-lg object-cover w-full h-auto"
                                />
                                {altText && <span className="text-sm text-muted-foreground mt-2 text-center block">{altText}</span>}
                            </span>
                        );
                    }

                    return (
                        <span className={containerClass}>
                            <img src={src} alt={altText} className="rounded-lg w-full h-auto" {...props} />
                            {altText && <span className="text-sm text-muted-foreground mt-2 text-center block">{altText}</span>}
                        </span>
                    );
                },
            }}
        >
            {content}
        </ReactMarkdown>
    );
}
