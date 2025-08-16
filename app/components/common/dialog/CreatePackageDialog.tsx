import { useEffect, useState } from "react";

export default function CreatePackageDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [weight, setWeight] = useState<string>("");
    const [deadline, setDeadline] = useState("");

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    useEffect(() => {
        if (open) {
            setDescription("");
            setCategory("");
            setWeight("");
            setDeadline("");
        }
    }, [open]);

    if (!open) return null;

    const canSubmit = Boolean(description) && Boolean(category) && Boolean(weight) && Boolean(deadline);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px]" onClick={onClose} />
            <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-black/10 dark:ring-white/10">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-5 py-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Créer un colis</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Renseignez les informations du colis</p>
                    </div>
                    <button onClick={onClose} className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Fermer">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" /></svg>
                    </button>
                </div>

                <form
                    className="px-5 py-4 space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (!canSubmit) return;
                        onClose();
                    }}
                >
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Décrivez brièvement le contenu"
                            className="w-full resize-none rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Catégorie</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option value="">Choisir une catégorie</option>
                            <option value="documents">Documents</option>
                            <option value="cadeaux">Cadeaux</option>
                            <option value="electronique">Électronique</option>
                            <option value="vetements">Vêtements</option>
                            <option value="autre">Autre</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Poids (kg)</label>
                            <input type="number" min={0} step={0.1} value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="ex: 2.5"
                                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Date max de livraison</label>
                            <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)}
                                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-2">
                        <button type="button" onClick={onClose} className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">Annuler</button>
                        <button type="submit" disabled={!canSubmit} className={`rounded-lg px-4 py-2 text-sm font-semibold text-white ${canSubmit ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300 cursor-not-allowed'}`}>Créer</button>
                    </div>
                </form>
            </div>
        </div>
    );
}


