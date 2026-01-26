import { TimelineEvent } from "@/lib/timeline";

export type SpatialNode = TimelineEvent & {
    x: number;
    y: number;
    rotation: number;
};

export function generateSpatialLayout(events: TimelineEvent[]): SpatialNode[] {
    const nodes: SpatialNode[] = [];

    // 1. Group events by Year
    const eventsByYear: Record<string, TimelineEvent[]> = {};
    events.forEach(event => {
        const year = event.year.toString();
        if (!eventsByYear[year]) eventsByYear[year] = [];
        eventsByYear[year].push(event);
    });

    // 2. Sort years descending (Newest center)
    const sortedYears = Object.keys(eventsByYear).sort((a, b) => Number(b) - Number(a));

    // 3. Layout Configuration
    const clusterGap = 800; // Distance between year centers
    const packingDensity = 120; // How tight items are within a year (smaller = overlaps)

    sortedYears.forEach((year, index) => {
        const yearEvents = eventsByYear[year];

        // Define Center for this Year's Cluster (Spiral Layout)
        // Using a spiral ensures distinctive "zones" that don't drift linearly
        // Index 0 (Newest) is at (0,0) due to radius 0 logic interaction or just handle explicitly
        // Let's use Fermat's spiral or similar: r = c * sqrt(theta)
        // But for distinct clusters, simple increment is fine.

        let clusterX = 0;
        let clusterY = 0;

        if (index > 0) {
            const angle = index * 2.4; // ~137.5 degrees (Golden Angle) * factor to spread nicely
            const radius = 600 * Math.sqrt(index); // Sqrt keeps density uniform-ish
            clusterX = Math.cos(angle) * radius;
            clusterY = Math.sin(angle) * radius;
        }

        // Scatter events AROUND this year's center
        yearEvents.forEach((event, i) => {
            // Tighter pack for same year - "Pile" aesthetic
            // Increase density range to prevent full overlap
            const offsetRadius = (Math.random() * 180) + (Math.random() * 100 * (i % 4));
            const offsetAngle = Math.random() * Math.PI * 2;

            const x = clusterX + (Math.cos(offsetAngle) * offsetRadius);
            const y = clusterY + (Math.sin(offsetAngle) * offsetRadius);

            // Random rotation (messy pile)
            const rotation = (Math.random() - 0.5) * 45;

            nodes.push({
                ...event,
                x,
                y,
                rotation
            });
        });
    });

    return nodes;
}
