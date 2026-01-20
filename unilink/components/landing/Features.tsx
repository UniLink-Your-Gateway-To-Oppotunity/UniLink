const features = [
    {
        title: "Skill-Based Matching",
        description: "Find collaborators based on real skills, not random requests.",
    },
    {
        title: "Project Tickets",
        description: "Post ideas and attract the right teammates instantly.",
    },
    {
        title: "Built for Students",
        description: "Designed for learning, hackathons, and real collaboration.",
    },
];

export default function Features() {
    return (
        <section id="features" className="px-8 py-24 bg-gray-50">
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                {features.map((f) => (
                    <div
                        key={f.title}
                        className="p-6 border rounded-xl bg-white"
                    >
                        <h3 className="text-lg font-semibold">{f.title}</h3>
                        <p className="mt-2 text-gray-600 text-sm">
                            {f.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
