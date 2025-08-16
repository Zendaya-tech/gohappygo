import { useEffect, useRef } from "react";

export default function AppDownloadPopover({ open, onClose, pinned, onTogglePin, triggerRef }: { open: boolean; onClose: () => void; pinned: boolean; onTogglePin: () => void; triggerRef?: React.RefObject<HTMLElement> }) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!open) return;
        const onDocClick = (e: MouseEvent) => {
            if (pinned) return;
            const target = e.target as Node;
            const insidePanel = containerRef.current && containerRef.current.contains(target);
            const insideTrigger = triggerRef?.current && triggerRef.current.contains(target);
            if (!insidePanel && !insideTrigger) onClose();
        };
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, [open, pinned, onClose, triggerRef]);
    if (!open) return null;

    return (
        <div
            ref={containerRef}
            className="absolute left-1/2 top-full z-50 mt-2 w-80 -translate-x-1/2 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-[1px] shadow-2xl ring-1 ring-black/5"
            role="dialog"
            aria-label="Télécharger l'application"
        >
            <div className="rounded-2xl bg-white dark:bg-gray-900">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                    <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Téléchargez l’appli</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Choisissez votre plateforme</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={onTogglePin}
                            className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${pinned ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 hover:bg-gray-100'} `}
                            aria-label="Épingler"
                        >
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M16 3l5 5-7 7-4 1 1-4 7-7zM2 22l6-6" /></svg>
                        </button>
                        <button
                            onClick={onClose}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
                            aria-label="Fermer"
                        >
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" /></svg>
                        </button>
                    </div>
                </div>

                <div className="p-4 space-y-3">
                    <StoreButton icon="android" title="Android" subtitle="Disponible sur Google Play" />
                    <StoreButton icon="apple" title="iOS" subtitle="Télécharger sur l’App Store" />
                    <StoreButton icon="chrome" title="Extension Chrome" subtitle="Installer depuis le Web Store" />
                </div>
            </div>
        </div>
    );
}

function StoreButton({ icon, title, subtitle }: { icon: 'android' | 'apple' | 'chrome'; title: string; subtitle: string }) {
    const Icon = () => {
        if (icon === 'android') {
            return <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20l8.5-8.5L3 3v17zm9.5-8.5L21 3H6.5l6 8.5zM6.5 21H21l-8.5-8.5L6.5 21zM21 21V3l-8.5 8.5L21 21z" /></svg>;
        }
        if (icon === 'apple') {
            return <svg className="h-5 w-5 text-gray-900 dark:text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M16.365 1.43c.01 1.16-.43 2.27-1.2 3.09-.77.83-1.87 1.47-3.02 1.38-.13-1.13.46-2.32 1.22-3.09.83-.93 2.25-1.59 3-.38zM20.06 17.21c-.65 1.5-1.43 2.98-2.58 4.49-1 .01-1.74-.29-2.41-.6-.68-.31-1.3-.6-2.11-.6-.85 0-1.41.29-2.12.61-.66.31-1.37.64-2.42.62-1.09-1.52-1.92-3.12-2.54-4.79-1.07-2.82-1.19-5.11-.36-6.72.75-1.42 2.07-2.32 3.61-2.34.85-.02 1.64.31 2.33.62.58.26 1.12.5 1.7.5.53 0 1.04-.23 1.67-.52.75-.35 1.61-.75 2.77-.64 1.03.04 2.73.42 3.54 2.01-3.34 1.82-2.8 6.58-.08 7.96z" /></svg>;
        }
        return <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l4 4h4v4l-4 4 4 4v4h-4l-4-4-4 4H4v-4l4-4-4-4V6h4l4-4z" /></svg>;
    };
    return (
        <a href="#" className="flex items-center justify-between rounded-xl border border-gray-200 px-3 py-3 hover:bg-gray-50 dark:border-gray-800">
            <span className="inline-flex items-center gap-3">
                <Icon />
                <span>
                    <span className="block text-sm font-semibold text-gray-900 dark:text-white">{title}</span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400">{subtitle}</span>
                </span>
            </span>
            <span className="text-indigo-600 text-sm font-medium">Installer</span>
        </a>
    );
}



