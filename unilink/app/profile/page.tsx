"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    User,
    Mail,
    GraduationCap,
    MapPin,
    Github,
    Linkedin,
    Globe,
    Pencil,
    ArrowRight,
} from "lucide-react";

interface Skill {
    name: string;
    level: string;
}

export default function ProfilePage() {
    const router = useRouter();
    const [profile, setProfile] = useState<any>(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("userProfile");
        if (!saved) {
            router.push("/profile/create");
            return;
        }
        setProfile(JSON.parse(saved));
    }, [router]);

    if (!profile) return null;

    const saveChanges = () => {
        localStorage.setItem("userProfile", JSON.stringify(profile));
        setEditing(false);
    };

    return (
        <div className="min-h-screen bg-white px-6 py-12">
            <div className="max-w-3xl mx-auto">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-black">Your Profile</h1>

                    {/* 🔥 EDIT BUTTON — NOW BLACK */}
                    <button
                        onClick={() => setEditing(!editing)}
                        className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-xl hover:bg-black/90 transition"
                    >
                        <Pencil className="w-4 h-4" />
                        {editing ? "Cancel" : "Edit Profile"}
                    </button>
                </div>

                {/* PROFILE CARD */}
                <div className="border border-black rounded-2xl p-8 space-y-6">

                    <ProfileField
                        icon={User}
                        label="Full Name"
                        value={profile.fullName}
                        editing={editing}
                        onChange={(v) => setProfile({ ...profile, fullName: v })}
                    />

                    <ProfileField
                        icon={Mail}
                        label="Email"
                        value={profile.email}
                        editing={editing}
                        onChange={(v) => setProfile({ ...profile, email: v })}
                    />

                    <ProfileField
                        icon={GraduationCap}
                        label="University"
                        value={profile.university}
                        editing={editing}
                        onChange={(v) => setProfile({ ...profile, university: v })}
                    />

                    <ProfileField
                        icon={MapPin}
                        label="Location"
                        value={profile.location}
                        editing={editing}
                        onChange={(v) => setProfile({ ...profile, location: v })}
                    />

                    {/* BIO */}
                    <div>
                        <p className="text-sm font-medium text-black mb-1">Bio</p>
                        {editing ? (
                            <textarea
                                value={profile.bio || ""}
                                onChange={(e) =>
                                    setProfile({ ...profile, bio: e.target.value })
                                }
                                className="w-full border rounded-xl p-3 text-sm text-black"
                                rows={4}
                            />
                        ) : (
                            <p className="text-gray-700 text-sm">
                                {profile.bio || "—"}
                            </p>
                        )}
                    </div>

                    {/* SKILLS */}
                    <div>
                        <p className="text-sm font-medium text-black mb-2">Skills</p>
                        <div className="flex flex-wrap gap-2">
                            {profile.skills?.length > 0 ? (
                                profile.skills.map((s: Skill) => (
                                    <span
                                        key={s.name}
                                        className="px-3 py-1 rounded-full border text-xs"
                                    >
                                        {s.name} · {s.level}
                                    </span>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">No skills added</p>
                            )}
                        </div>
                    </div>

                    {/* LINKS */}
                    <ProfileField
                        icon={Github}
                        label="GitHub"
                        value={profile.github}
                        editing={editing}
                        onChange={(v) => setProfile({ ...profile, github: v })}
                    />

                    <ProfileField
                        icon={Linkedin}
                        label="LinkedIn"
                        value={profile.linkedin}
                        editing={editing}
                        onChange={(v) => setProfile({ ...profile, linkedin: v })}
                    />

                    <ProfileField
                        icon={Globe}
                        label="Website"
                        value={profile.website}
                        editing={editing}
                        onChange={(v) => setProfile({ ...profile, website: v })}
                    />

                    {/* ACTIONS */}
                    <div className="flex justify-between pt-4">
                        {editing ? (
                            <button
                                onClick={saveChanges}
                                className="bg-black text-white px-6 py-2.5 rounded-xl"
                            >
                                Save Changes
                            </button>
                        ) : (
                            <div />
                        )}

                        <button
                            onClick={() => router.push("/")}
                            className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-xl"
                        >
                            Continue
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

/* ---------------- COMPONENT ---------------- */

function ProfileField({
    icon: Icon,
    label,
    value,
    editing,
    onChange,
}: {
    icon: any;
    label: string;
    value: string;
    editing: boolean;
    onChange: (v: string) => void;
}) {
    return (
        <div>
            <p className="text-sm font-medium text-black mb-1">{label}</p>
            <div className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                {editing ? (
                    <input
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full h-11 pl-10 pr-4 border rounded-xl text-sm text-black"
                    />
                ) : (
                    <p className="pl-10 text-sm text-gray-700 py-2">
                        {value || "—"}
                    </p>
                )}
            </div>
        </div>
    );
}
