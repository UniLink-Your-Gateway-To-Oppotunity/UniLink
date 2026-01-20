export default function Hero() {
    return (
        <section className="flex flex-col items-center text-center px-6 py-32">
            <h1 className="text-5xl font-bold tracking-tight max-w-3xl">
                Find the right teammates.
                <br />
                Build real projects.
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-xl">
                Connect with students who share your skills and interests.
                Collaborate, learn, and ship together.
            </p>

            <div className="mt-10 flex gap-4">
                <button className="px-6 py-3 bg-black text-white rounded-lg">
                    Get Started
                </button>
                <button className="px-6 py-3 border rounded-lg">
                    Learn More
                </button>
            </div>
        </section>
    );
}
