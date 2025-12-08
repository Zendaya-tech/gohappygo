import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { notificationService, type Notification } from "~/services/notificationService";

function formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "à l'instant";
    if (diffInSeconds < 3600) return `il y a ${Math.floor(diffInSeconds / 60)} min`;
    if (diffInSeconds < 86400) return `il y a ${Math.floor(diffInSeconds / 3600)} h`;
    if (diffInSeconds < 172800) return "hier";
    if (diffInSeconds < 604800) return `il y a ${Math.floor(diffInSeconds / 86400)} j`;
    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

export default function NotificationPopover({
    open,
    onClose,
    onCountChange,
}: {
    open: boolean;
    onClose: () => void;
    onCountChange?: (count: number) => void;
}) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            loadNotifications();
        }
    }, [open]);

    const loadNotifications = async () => {
        try {
            setLoading(true);
            const response = await notificationService.getNotifications({ limit: 10 });
            setNotifications(response.items);
        } catch (error) {
            console.error("Failed to load notifications:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (id: number) => {
        try {
            await notificationService.markAsRead(id);
            setNotifications((prev) => {
                const updated = prev.map((n) => (n.id === id ? { ...n, isRead: true } : n));
                const unreadCount = updated.filter((n) => !n.isRead).length;
                onCountChange?.(unreadCount);
                return updated;
            });
        } catch (error) {
            console.error("Failed to mark notification as read:", error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await notificationService.markAllAsRead();
            setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
            onCountChange?.(0);
        } catch (error) {
            console.error("Failed to mark all as read:", error);
        }
    };

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
        
        // Delay adding the click listener to avoid immediate closure
        const timeoutId = setTimeout(() => {
            window.addEventListener("mousedown", onClickOutside);
        }, 0);
        
        window.addEventListener("keydown", onKey);
        
        return () => {
            clearTimeout(timeoutId);
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
            onMouseDown={(e) => e.stopPropagation()}
        >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                <div className="flex items-center gap-2">
                    {notifications && notifications.some((n) => !n.isRead) && (
                        <button
                            onClick={handleMarkAllAsRead}
                            className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                            Tout marquer lu
                        </button>
                    )}
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
            </div>

            <ul className="max-h-80 overflow-y-auto p-2">
                {loading ? (
                    <li className="px-3 py-8 text-center text-sm text-gray-500">
                        Chargement...
                    </li>
                ) : notifications.length === 0 ? (
                    <li className="px-3 py-8 text-center text-sm text-gray-500">
                        Aucune notification
                    </li>
                ) : (
                    notifications.map((n) => (
                        <li key={n.id}>
                            <button
                                onClick={() => !n.isRead && handleMarkAsRead(n.id)}
                                className={`w-full text-left rounded-xl px-3 py-3 transition hover:bg-gray-50 ${!n.isRead ? "bg-indigo-50/60" : "bg-white"
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`mt-0.5 h-2.5 w-2.5 rounded-full ${!n.isRead ? "bg-indigo-600" : "bg-gray-300"}`} />
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="truncate text-sm font-medium text-gray-900">{n.title}</p>
                                            <span className="shrink-0 text-xs text-gray-500">{formatTimeAgo(n.createdAt)}</span>
                                        </div>
                                        <p className="mt-0.5 line-clamp-2 text-sm text-gray-600">{n.message}</p>
                                    </div>
                                </div>
                            </button>
                        </li>
                    ))
                )}
            </ul>

            <div className="border-t border-gray-200 p-2">
                <Link
                    to="/notifications"
                    onClick={onClose}
                    className="block rounded-lg px-3 py-2 text-center text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                >
                    Voir toutes les notifications
                </Link>
            </div>
        </div>
    );
}
