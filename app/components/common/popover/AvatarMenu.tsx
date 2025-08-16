import { useEffect, useRef } from "react";

export default function AvatarMenu({
    open,
    onClose,
    onOpenSettings,
}: {
    open: boolean;
    onClose: () => void;
    onOpenSettings: () => void;
}) {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        const onClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) onClose();
        };
        window.addEventListener("keydown", onKey);
        window.addEventListener("mousedown", onClickOutside);
        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("mousedown", onClickOutside);
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            ref={ref}
            className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl ring-1 ring-black/5"
            role="menu"
            aria-label="Menu du compte"
        >
            <div className="py-1">
                <button
                    onClick={() => {
                        onClose();
                        onOpenSettings();
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    role="menuitem"
                >
                    Paramètres
                </button>
                <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" role="menuitem">
                    Mon profil
                </a>
                <a href="/logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50" role="menuitem">
                    Se déconnecter
                </a>
            </div>
        </div>
    );
}

