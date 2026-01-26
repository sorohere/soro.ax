import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "soro | about",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
