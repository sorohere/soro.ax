import { Timeline } from "@/components/sections/Timeline";

export default function MePage() {
    return (
        <div className="flex flex-col gap-0 pb-0">
            <section className="flex flex-col justify-start pb-4">
                <div className="max-w-3xl mx-auto px-6 w-full">

                    <Timeline />
                </div>
            </section>
        </div>
    );
}
