import { useEffect, useState } from "react";
import { useThemeStore, type Theme } from "../../../store/theme";

type TabKey = "profile" | "appearance" | "security" | "carrier";

export default function SettingsDialog({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    const [tab, setTab] = useState<TabKey>("appearance");

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px]" onClick={onClose} />

            {/* Dialog */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Paramètres"
                className="relative z-10 w-full max-w-3xl transform rounded-2xl bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-black/10 dark:ring-white/10 transition-all duration-200 h-[80vh] flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-5 py-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Paramètres</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Personnalisez votre expérience</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        aria-label="Fermer les paramètres"
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
                        </svg>
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] flex-1 overflow-hidden">
                    {/* Tabs */}
                    <nav className="border-b border-gray-200 dark:border-gray-800 sm:border-b-0 sm:border-r overflow-x-auto sm:overflow-visible">
                        <ul className="flex sm:flex-col">
                            <TabButton active={tab === "profile"} onClick={() => setTab("profile")}>Profil</TabButton>
                            <TabButton active={tab === "appearance"} onClick={() => setTab("appearance")}>Apparence</TabButton>
                            <TabButton active={tab === "security"} onClick={() => setTab("security")}>Sécurité</TabButton>
                            <TabButton active={tab === "carrier"} onClick={() => setTab("carrier")}>Devenir HappyVoyageur</TabButton>
                        </ul>
                    </nav>

                    {/* Panels */}
                    <div className="p-5 overflow-y-auto">
                        {tab === "profile" && <ProfilePanel />}
                        {tab === "appearance" && <AppearancePanel />}
                        {tab === "security" && <SecurityPanel />}
                        {tab === "carrier" && <CarrierPanel />}
                    </div>
                </div>
            </div>
        </div>
    );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
        <li>
            <button
                className={`w-full px-4 py-3 text-left text-sm font-medium transition ${active ? "bg-indigo-50 dark:bg-indigo-400/10 text-indigo-700 dark:text-indigo-300" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                onClick={onClick}
                aria-current={active ? "page" : undefined}
            >
                {children}
            </button>
        </li>
    );
}

function AppearancePanel() {
    const theme = useThemeStore((s: { theme: Theme }) => s.theme);
    const setTheme = useThemeStore((s: { setTheme: (t: Theme) => void }) => s.setTheme);
    const [language, setLanguage] = useState<string>("fr");
    useEffect(() => {
        // Keep selection in sync on open
    }, [theme]);

    return (
        <div className="space-y-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Thème</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Choisissez un thème pour l’interface.</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <ThemeCard label="Système" description="Utiliser les préférences du système" value="system" current={theme} onChange={setTheme} />
                <ThemeCard label="Clair" description="Couleurs claires et lumineuses" value="light" current={theme} onChange={setTheme} />
                <ThemeCard label="Sombre" description="Couleurs sombres et confort visuel" value="dark" current={theme} onChange={setTheme} />
            </div>

            <div className="pt-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">Langue de l’application</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Sélectionnez la langue d’affichage.</p>
                <div className="mt-2">
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full sm:w-64 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                    >
                        <option value="fr">Français (FR)</option>
                        <option value="en">English (EN)</option>
                        <option value="es">Español (ES)</option>
                        <option value="de">Deutsch (DE)</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

function ThemeCard({ label, description, value, current, onChange }: { label: string; description: string; value: Theme; current: Theme; onChange: (t: Theme) => void }) {
    return (
        <label className={`group flex cursor-pointer flex-col rounded-xl border p-4 hover:border-indigo-300 ${current === value ? "border-indigo-300 ring-1 ring-indigo-300" : "border-gray-200 dark:border-gray-800"}`}
            onClick={() => onChange(value)}
        >
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-white">{label}</span>
                <span className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${current === value ? "bg-indigo-600" : "bg-gray-200 dark:bg-gray-700"}`}>
                    <span className={`absolute left-0.5 h-4 w-4 rounded-full bg-white shadow transition ${current === value ? "translate-x-4" : "translate-x-0"}`} />
                </span>
            </div>
            <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">{description}</span>
        </label>
    );
}

function SecurityPanel() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">Changer le mot de passe</h3>
                <form className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mot de passe actuel</label>
                        <input type="password" className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nouveau mot de passe</label>
                        <input type="password" className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirmer</label>
                        <input type="password" className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30" />
                    </div>
                    <div className="sm:col-span-2">
                        <button type="button" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">Mettre à jour</button>
                    </div>
                </form>
            </div>

            <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">Authentification à deux facteurs</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Ajoutez une couche de sécurité supplémentaire.</p>
                <div className="mt-3 flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                    <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Activer 2FA</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Utilisez une application d’authentification.</p>
                    </div>
                    <input type="checkbox" className="h-5 w-9 cursor-pointer appearance-none rounded-full bg-gray-300 dark:bg-gray-700 outline-none transition checked:bg-indigo-600" />
                </div>
            </div>
        </div>
    );
}

function CarrierPanel() {
    return (
        <div className="space-y-5">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Devenir HappyVoyageur</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Indiquez vos disponibilités et validez votre identité.</p>

            <form className="space-y-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Poids disponible (kg)</label>
                        <input type="number" min={0} step={0.5} className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Aéroport de départ favori</label>
                        <input type="text" className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30" placeholder="ex: Paris CDG (CDG)" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <input id="agree" type="checkbox" className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="agree" className="text-sm text-gray-700 dark:text-gray-300">J’accepte les règles de sécurité et de conformité.</label>
                </div>

                <div className="flex items-center gap-3">
                    <a href="#" className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">Vérifier mon identité</a>
                    <button type="button" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">Enregistrer</button>
                </div>
            </form>
        </div>
    );
}

function ProfilePanel() {
    const [avatarUrl, setAvatarUrl] = useState<string>("/logo.png");
    const [fileName, setFileName] = useState<string>("");
    const [profile, setProfile] = useState({
        fullname: "",
        bio: "",
        phone: "",
        email: "",
        birthdate: "",
    });
    const [languages, setLanguages] = useState<string[]>([]);
    const [newLang, setNewLang] = useState<string>("");

    const onPickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setAvatarUrl(url);
        setFileName(file.name);
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">Photo de profil</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Téléchargez une image carrée. Aperçu instantané.</p>
                <div className="mt-4 flex items-center gap-4">
                    <img src={avatarUrl} alt="Avatar preview" className="h-20 w-20 rounded-full object-cover ring-2 ring-white dark:ring-gray-900 shadow" />
                    <div>
                        <label className="inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m-7-7h14" /></svg>
                            Importer une photo
                            <input type="file" accept="image/*" className="hidden" onChange={onPickFile} />
                        </label>
                        {fileName && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 truncate">{fileName}</p>}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nom complet</label>
                    <input
                        type="text"
                        value={profile.fullname}
                        onChange={(e) => setProfile({ ...profile, fullname: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Téléphone</label>
                    <input
                        type="tel"
                        placeholder="+33 6 12 34 56 78"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date de naissance</label>
                    <input
                        type="date"
                        value={profile.birthdate}
                        onChange={(e) => setProfile({ ...profile, birthdate: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                    />
                </div>
                <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                    <textarea
                        rows={4}
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                        placeholder="Présentez-vous en quelques lignes..."
                    />
                </div>
            </div>

            <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">Langues parlées</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Ajoutez les langues que vous maîtrisez.</p>
                <div className="mt-3 flex items-center gap-2">
                    <input
                        type="text"
                        value={newLang}
                        onChange={(e) => setNewLang(e.target.value)}
                        placeholder="ex: Français, Anglais"
                        className="w-full sm:w-64 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                    />
                    <button
                        type="button"
                        onClick={() => {
                            const l = newLang.trim();
                            if (!l) return;
                            if (!languages.includes(l)) setLanguages([...languages, l]);
                            setNewLang("");
                        }}
                        className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                        Ajouter
                    </button>
                </div>
                {languages.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {languages.map((l, i) => (
                            <span key={i} className="inline-flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-xs text-gray-800 dark:text-gray-200">
                                {l}
                                <button
                                    type="button"
                                    onClick={() => setLanguages(languages.filter((x) => x !== l))}
                                    className="-mr-1 rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
                                    aria-label={`Retirer ${l}`}
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div>
                <button type="button" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">Enregistrer</button>
            </div>
        </div>
    );
}

