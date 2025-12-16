import { Section } from "@/components/layout/Section";

export function Contact() {
    return (
        <Section>
            <h2 className="text-2xl font-bold mb-8">Contact</h2>
            <p className="text-muted-foreground">
                Feel free to reach out via <a href="mailto:saurabh.kushwaha.dev@gmail.com" className="text-accent hover:underline">email</a> or <a href="https://twitter.com/sorohere" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Twitter</a>.
            </p>
        </Section>
    );
}
