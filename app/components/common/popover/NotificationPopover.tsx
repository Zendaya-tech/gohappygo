import { useEffect, useRef } from "react";

type NotificationItem = {
    id: string;
    title: string;
    message: string;
    time: string;
    unread?: boolean;
};

const sampleNotifications: NotificationItem[] = [
    {
        id: "n1",
        title: "Nouvelle demande",
        message: "Sophie a demandé 2.5 kg sur votre trajet CDG → JFK",
        time: "il y a 5 min",
        unread: true,
    },
    {
        id: "n2",
        title: "Message",
        message: "Thomas: Merci, à demain à 10h au Terminal 2!",
        time: "il y a 1 h",
    },
    {
        id: "n3",
        title: "Mise à jour",
        message: "Votre annonce MRS → LHR a été publiée",
        time: "hier",
    },
];

export default function NotificationPopover({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        const onClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                onClose();
            }
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
            ref={containerRef}
            className="absolute right-0 top-full mt-2 w-80 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl ring-1 ring-black/5"
            role="dialog"
            aria-label="Notifications"
        >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                <button
                    onClick={onClose}
                    className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
                    aria-label="Fermer"
                >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
                    </svg>
                </button>
            </div>

            <ul className="max-h-80 overflow-y-auto p-2">
                {sampleNotifications.map((n) => (
                    <li key={n.id}>
                        <button
                            className={`w-full text-left rounded-xl px-3 py-3 transition hover:bg-gray-50 ${n.unread ? "bg-indigo-50/60" : "bg-white"
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`mt-0.5 h-2.5 w-2.5 rounded-full ${n.unread ? "bg-indigo-600" : "bg-gray-300"}`} />
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="truncate text-sm font-medium text-gray-900">{n.title}</p>
                                        <span className="shrink-0 text-xs text-gray-500">{n.time}</span>
                                    </div>
                                    <p className="mt-0.5 line-clamp-2 text-sm text-gray-600">{n.message}</p>
                                </div>
                            </div>
                        </button>
                    </li>
                ))}
            </ul>

            <div className="border-t border-gray-200 p-2">
                <a
                    href="#"
                    className="block rounded-lg px-3 py-2 text-center text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                >
                    Voir toutes les notifications
                </a>
            </div>
        </div>
    );
}
