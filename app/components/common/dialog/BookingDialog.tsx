import { useEffect, useState } from "react";

export default function BookingDialog({
    open,
    onClose,
    amount,
    email,
    onConfirm
}: {
    open: boolean;
    onClose: () => void;
    amount: number;
    email?: string;
    onConfirm: () => void;
}) {
    const [cardNumber, setCardNumber] = useState("");
    const [exp, setExp] = useState("");
    const [cvc, setCvc] = useState("");

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
        setCardNumber("");
        setExp("");
        setCvc("");
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/40" onClick={onClose} />
            <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl ring-1 ring-black/10">
                {/* Logo badge */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                    <div className="h-16 w-16 rounded-full border-4 border-white shadow-md overflow-hidden bg-gradient-to-br from-indigo-400 to-yellow-400 flex items-center justify-center">
                        <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l7 6v12h-5v-7H10v7H5V9l7-6z" /></svg>
                    </div>
                </div>

                {/* Header */}
                <div className="pt-10 text-center px-6">
                    <h3 className="text-xl font-bold text-gray-900">HomeBnB Template</h3>
                    <p className="mt-1 text-sm text-gray-500">Booking a stay at Perfectly located C…</p>
                </div>

                {/* Email row */}
                <div className="mt-4 border-y bg-gray-50 text-center text-gray-700 text-sm font-medium py-3">{email || "test1@demo.com"}</div>

                {/* Card form */}
                <div className="px-6 py-5">
                    <div className="mb-3">
                        <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-3 focus-within:ring-2 focus-within:ring-indigo-500">
                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
                            <input
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                placeholder="Card number"
                                className="flex-1 outline-none text-gray-900 placeholder-gray-400"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-3 focus-within:ring-2 focus-within:ring-indigo-500">
                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8 7h8M7 11h10M6 15h12" /></svg>
                            <input
                                value={exp}
                                onChange={(e) => setExp(e.target.value)}
                                placeholder="MM / YY"
                                className="flex-1 outline-none text-gray-900 placeholder-gray-400"
                            />
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-3 focus-within:ring-2 focus-within:ring-indigo-500">
                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 17a2 2 0 100-4 2 2 0 000 4z" /><path d="M19 7H5a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2z" /></svg>
                            <input
                                value={cvc}
                                onChange={(e) => setCvc(e.target.value)}
                                placeholder="CVC"
                                className="flex-1 outline-none text-gray-900 placeholder-gray-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Pay button */}
                <div className="px-6 pb-6">
                    <button
                        onClick={() => { onConfirm(); onClose(); }}
                        className="w-full rounded-md bg-blue-600 py-3 text-base font-semibold text-white shadow hover:bg-blue-700"
                    >
                        Pay ${amount.toFixed(2)}
                    </button>
                </div>
            </div>
        </div>
    );
}
