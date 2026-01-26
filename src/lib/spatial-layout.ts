import { TimelineEvent } from "@/lib/timeline";

export type SpatialNode = TimelineEvent & {
    x: number;
    y: number;
    rotation: number;
};

export function generateSpatialLayout(events: TimelineEvent[]): SpatialNode[] {
    const nodes: SpatialNode[] = [];
    const centerX = 0;
    const centerY = 0;

    // Dynamic spread based on count to prevent overcrowding
    const baseSpread = 300;
    const spreadFactor = Math.min(events.length * 15, 300); // Grow spread with more items, capped
    const maxSpread = baseSpread + spreadFactor;

    events.forEach((event, i) => {
        // Organic "Pile" Scatter
        // Use semi-Gaussian distribution for natural piling (more in center, fewer at edges)

        const angle = Math.random() * Math.PI * 2;
        // Biased random for radius: heavily biased towards center but with long tail
        const rRandom = Math.pow(Math.random(), 0.8); // 0.8 makes it slightly spread out from pure center
        const radius = rRandom * maxSpread;

        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        // Random rotation (messy pile)
        // Reference image shows some heavy tilts
        const rotation = (Math.random() - 0.5) * 60; // -30 to 30 degrees

        nodes.push({
            ...event,
            x,
            y,
            rotation
        });
    });

    return nodes;
}
