"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    User,
    Mail,
    MapPin,
    GraduationCap,
    Github,
    Linkedin,
    Globe,
    ArrowRight,
    Plus,
    X,
    Check,
} from "lucide-react";
// // import { createClient } from "@/lib/supabase/client";npm 

const availableSkills = [
    "React", "Node.js", "Python", "TypeScript", "PostgreSQL",
    "MongoDB", "Firebase", "TensorFlow", "FastAPI", "React Native",
    "Flutter", "AWS", "Docker", "Figma", "UI/UX",
];

const skillLevels = ["Beginner", "Intermediate", "Advanced"] as const;

type SkillLevel = typeof skillLevels[number];

interface SelectedSkill {
    name: string;
    level: SkillLevel;
}

function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
                        <span className="text-background font-bold text-sm">CO</span>
                    </div>
                    <span className="font-semibold text-lg tracking-tight">Collab</span>
                </Link>
            </div>
        </nav>
    );
}

export default function CreateProfilePage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const [profile, setProfile] = useState({
        fullName: "",
        email: "",
        university: "",
        location: "",
        bio: "",
        availability: "Part-time",
        github: "",
        linkedin: "",
        website: "",
    });

    const [selectedSkills, setSelectedSkills] = useState<SelectedSkill[]>([]);
    const [skillToAdd, setSkillToAdd] = useState("");
    const [levelToAdd, setLevelToAdd] = useState<SkillLevel>("Intermediate");

    const addSkill = () => {
        if (skillToAdd && !selectedSkills.find((s) => s.name === skillToAdd)) {
            setSelectedSkills([...selectedSkills, { name: skillToAdd, level: levelToAdd }]);
            setSkillToAdd("");
        }
    };

    const removeSkill = (skillName: string) => {
        setSelectedSkills(selectedSkills.filter((s) => s.name !== skillName));
    };

    const updateSkillLevel = (skillName: string, level: SkillLevel) => {
        setSelectedSkills(
            selectedSkills.map((s) => (s.name === skillName ? { ...s, level } : s))
        );
    };

    // Load existing profile from localStorage on mount
    useEffect(() => {
        const savedProfile = localStorage.getItem("userProfile");
        if (savedProfile) {
            try {
                const data = JSON.parse(savedProfile);
                setProfile({
                    fullName: data.fullName || "",
                    email: data.email || "",
                    university: data.university || "",
                    location: data.location || "",
                    bio: data.bio || "",
                    availability: data.availability || "Part-time",
                    github: data.github || "",
                    linkedin: data.linkedin || "",
                    website: data.website || "",
                });
                if (data.skills) {
                    setSelectedSkills(data.skills);
                }
            } catch (err) {
                console.error("Failed to load profile from localStorage:", err);
            }
        }
    }, []);


    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError("");

        try {
            // Create profile data object
            const profileData = {
                fullName: profile.fullName,
                email: profile.email,
                university: profile.university,
                location: profile.location,
                bio: profile.bio,
                availability: profile.availability,
                github: profile.github || null,
                linkedin: profile.linkedin || null,
                website: profile.website || null,
                skills: selectedSkills,
                createdAt: new Date().toISOString(),
            };

            // Save to localStorage
            localStorage.setItem("userProfile", JSON.stringify(profileData));

            // Simulate a small delay for better UX
            await new Promise((resolve) => setTimeout(resolve, 500));

            router.push("/dashboard");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create profile");
        } finally {
            setIsSubmitting(false);
        }
    };

    const levelColors: Record<string, string> = {
        Beginner: "bg-amber-500/10 text-amber-600 border-amber-500/20",
        Intermediate: "bg-blue-500/10 text-blue-600 border-blue-500/20",
        Advanced: "bg-green-500/10 text-green-600 border-green-500/20",
    };

    const canProceedStep1 = profile.fullName && profile.email && profile.university;
    const canProceedStep2 = selectedSkills.length > 0;

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-24 pb-16 px-6">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold tracking-tight mb-2">Create Your Profile</h1>
                        <p className="text-muted-foreground">
                            Let&apos;s set up your profile so you can start collaborating
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-2 mb-8">
                        {[1, 2, 3].map((step) => (
                            <div key={step} className="flex items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${currentStep >= step
                                        ? "bg-foreground text-background"
                                        : "bg-secondary text-muted-foreground"
                                        }`}
                                >
                                    {currentStep > step ? <Check className="w-4 h-4" /> : step}
                                </div>
                                {step < 3 && (
                                    <div
                                        className={`w-16 h-0.5 mx-2 ${currentStep > step ? "bg-foreground" : "bg-secondary"
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-8">
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold mb-1">Basic Information</h2>
                                    <p className="text-sm text-muted-foreground">
                                        Tell us a bit about yourself
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <input
                                                type="text"
                                                value={profile.fullName}
                                                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                                                placeholder="John Doe"
                                                className="w-full h-11 pl-10 pr-4 bg-background border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <input
                                                type="email"
                                                value={profile.email}
                                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                                placeholder="you@university.edu"
                                                className="w-full h-11 pl-10 pr-4 bg-background border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            University <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <input
                                                type="text"
                                                value={profile.university}
                                                onChange={(e) => setProfile({ ...profile, university: e.target.value })}
                                                placeholder="Stanford University"
                                                className="w-full h-11 pl-10 pr-4 bg-background border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Location</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <input
                                                type="text"
                                                value={profile.location}
                                                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                                placeholder="San Francisco, CA"
                                                className="w-full h-11 pl-10 pr-4 bg-background border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Bio</label>
                                        <textarea
                                            value={profile.bio}
                                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                            placeholder="Tell others about yourself, your interests, and what you're looking to build..."
                                            rows={4}
                                            className="w-full p-3 bg-background border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button
                                        onClick={() => setCurrentStep(2)}
                                        disabled={!canProceedStep1}
                                        className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold mb-1">Your Skills</h2>
                                    <p className="text-sm text-muted-foreground">
                                        Add skills to help teammates find you
                                    </p>
                                </div>

                                <div className="flex gap-2">
                                    <select
                                        value={skillToAdd}
                                        onChange={(e) => setSkillToAdd(e.target.value)}
                                        className="flex-1 h-11 px-4 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                    >
                                        <option value="">Select a skill...</option>
                                        {availableSkills
                                            .filter((s) => !selectedSkills.find((ss) => ss.name === s))
                                            .map((skill) => (
                                                <option key={skill} value={skill}>
                                                    {skill}
                                                </option>
                                            ))}
                                    </select>
                                    <select
                                        value={levelToAdd}
                                        onChange={(e) => setLevelToAdd(e.target.value as SkillLevel)}
                                        className="w-36 h-11 px-4 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                    >
                                        {skillLevels.map((level) => (
                                            <option key={level} value={level}>
                                                {level}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={addSkill}
                                        disabled={!skillToAdd}
                                        className="h-11 px-4 bg-foreground text-background rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>

                                {selectedSkills.length > 0 ? (
                                    <div className="space-y-3">
                                        {selectedSkills.map((skill) => (
                                            <div
                                                key={skill.name}
                                                className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl"
                                            >
                                                <span className="font-medium">{skill.name}</span>
                                                <div className="flex items-center gap-2">
                                                    <select
                                                        value={skill.level}
                                                        onChange={(e) =>
                                                            updateSkillLevel(skill.name, e.target.value as SkillLevel)
                                                        }
                                                        className={`text-xs px-3 py-1.5 rounded-full border font-medium ${levelColors[skill.level]}`}
                                                    >
                                                        {skillLevels.map((level) => (
                                                            <option key={level} value={level}>
                                                                {level}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <button
                                                        onClick={() => removeSkill(skill.name)}
                                                        className="text-muted-foreground hover:text-foreground transition-colors p-1"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        <p>No skills added yet</p>
                                        <p className="text-sm">Add at least one skill to continue</p>
                                    </div>
                                )}

                                <div className="flex justify-between pt-4">
                                    <button
                                        onClick={() => setCurrentStep(1)}
                                        className="px-6 py-2.5 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={() => setCurrentStep(3)}
                                        disabled={!canProceedStep2}
                                        className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold mb-1">Final Details</h2>
                                    <p className="text-sm text-muted-foreground">
                                        Set your availability and social links
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-3">Availability</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {["Full-time", "Part-time", "Flexible"].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => setProfile({ ...profile, availability: option })}
                                                className={`p-3 rounded-xl border text-sm font-medium transition-colors ${profile.availability === option
                                                    ? "border-foreground bg-foreground/5"
                                                    : "border-border hover:bg-secondary"
                                                    }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-sm font-medium">Social Links (Optional)</p>

                                    <div className="relative">
                                        <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <input
                                            type="text"
                                            value={profile.github}
                                            onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                                            placeholder="GitHub username"
                                            className="w-full h-11 pl-10 pr-4 bg-background border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                        />
                                    </div>

                                    <div className="relative">
                                        <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <input
                                            type="text"
                                            value={profile.linkedin}
                                            onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                                            placeholder="LinkedIn username"
                                            className="w-full h-11 pl-10 pr-4 bg-background border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                        />
                                    </div>

                                    <div className="relative">
                                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <input
                                            type="text"
                                            value={profile.website}
                                            onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                                            placeholder="Personal website (e.g., yourname.dev)"
                                            className="w-full h-11 pl-10 pr-4 bg-background border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 text-sm">
                                        {error}
                                    </div>
                                )}

                                <div className="flex justify-between pt-4">
                                    <button
                                        onClick={() => setCurrentStep(2)}
                                        className="px-6 py-2.5 rounded-xl text-sm font-medium border border-border hover:bg-secondary transition-colors"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50"
                                    >
                                        {isSubmitting ? "Creating..." : "Create Profile"}
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
