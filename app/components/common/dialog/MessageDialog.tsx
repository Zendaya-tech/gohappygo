import { useEffect, useState } from "react";

export default function MessageDialog({
    open,
    onClose,
    title,
    hostName,
    hostAvatar,
    onSend
}: {
    open: boolean;
    onClose: () => void;
    title: string;
    hostName: string;
    hostAvatar: string;
    onSend: (message: string) => void;
}) {
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    useEffect(() => {
        if (!open) return;
        setMessage("");
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/40" onClick={onClose} />
            <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white shadow-2xl ring-1 ring-black/10">
                {/* Header */}
                <div className="flex items-start justify-between p-6 pb-4">
                    <div className="flex items-center gap-4">
                        <img src={hostAvatar} alt={hostName} className="h-12 w-12 rounded-full object-cover" />
                        <div>
                            <div className="text-lg font-semibold text-gray-900">{title}</div>
                            <div className="text-sm text-gray-500">{hostName}</div>
                        </div>
                    </div>
                    <button onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-gray-700">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 pb-6">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Your message here ..."
                        rows={5}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        onClick={() => { if (message.trim()) { onSend(message.trim()); onClose(); } }}
                        className="mt-4 w-full rounded-lg bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-700"
                    >
                        Send message
                    </button>
                </div>
            </div>
        </div>
    );
}


