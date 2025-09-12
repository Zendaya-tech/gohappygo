import { useState } from 'react';

type Props = {
    initialFrom?: string;
    initialTo?: string;
    initialDate?: string; // ISO string yyyy-mm-dd
    initialFlight?: string;
    initialWeight?: number;
    onChange?: (filters: { from: string; to: string; date: string; flight: string; weight: number }) => void;
};

const AIRPORTS = [
    { code: 'CDG', label: 'Paris Charles de Gaulle (CDG)' },
    { code: 'ORY', label: 'Paris Orly (ORY)' },
    { code: 'JFK', label: 'New York John F. Kennedy (JFK)' },
    { code: 'LHR', label: 'London Heathrow (LHR)' },
];

export default function SearchFiltersBar({
    initialFrom = 'CDG',
    initialTo = 'JFK',
    initialDate = new Date().toISOString().slice(0, 10),
    initialFlight = '',
    initialWeight = 0,
    onChange,
}: Props) {
    const [from, setFrom] = useState(initialFrom);
    const [to, setTo] = useState(initialTo);
    const [date, setDate] = useState(initialDate);
    const [flight, setFlight] = useState(initialFlight);
    const [weight, setWeight] = useState<number>(initialWeight);

    const emit = (next?: Partial<{ from: string; to: string; date: string; flight: string; weight: number }>) => {
        if (!onChange) return;
        const payload = { from, to, date, flight, weight, ...(next || {}) } as any;
        onChange(payload);
    };

    return (
        <div className="bg-white max-w-7xl mx-auto sticky top-52 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl px-4 py-6 mt-7 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
                {/* From */}
                <div className="border-r border-gray-200 dark:border-gray-800 pr-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">De</label>
                    <select
                        value={from}
                        onChange={(e) => { setFrom(e.target.value); emit({ from: e.target.value }); }}
                        className="w-full text-sm text-gray-700 dark:text-gray-200 bg-transparent border-none outline-none truncate"
                    >
                        {AIRPORTS.map(a => (
                            <option key={a.code} value={a.code}>{a.label}</option>
                        ))}
                    </select>
                </div>

                {/* To */}
                <div className="border-r border-gray-200 dark:border-gray-800 pr-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vers</label>
                    <select
                        value={to}
                        onChange={(e) => { setTo(e.target.value); emit({ to: e.target.value }); }}
                        className="w-full text-sm text-gray-700 dark:text-gray-200 bg-transparent border-none outline-none truncate"
                    >
                        {AIRPORTS.map(a => (
                            <option key={a.code} value={a.code}>{a.label}</option>
                        ))}
                    </select>
                </div>

                {/* Date */}
                <div className="border-r border-gray-200 dark:border-gray-800 pr-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => { setDate(e.target.value); emit({ date: e.target.value }); }}
                        className="w-full text-sm text-gray-700 dark:text-gray-200 bg-transparent border-none outline-none truncate"
                    />
                </div>

                {/* Flight */}
                <div className="border-r border-gray-200 dark:border-gray-800 pr-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vol</label>
                    <input
                        type="text"
                        value={flight}
                        onChange={(e) => { setFlight(e.target.value); emit({ flight: e.target.value }); }}
                        placeholder="Numéro de vol"
                        className="w-full text-sm text-gray-700 dark:text-gray-200 bg-transparent border-none outline-none truncate"
                    />
                </div>

                {/* Weight */}
                <div className="border-r border-gray-200 dark:border-gray-800 pr-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Poids dispo (kg)</label>
                    <input
                        type="number"
                        min={0}
                        value={weight}
                        onChange={(e) => { const v = Number(e.target.value); setWeight(v); emit({ weight: v }); }}
                        placeholder="0"
                        className="w-full text-sm text-gray-700 dark:text-gray-200 bg-transparent border-none outline-none truncate"
                    />
                </div>

                {/* Search Button */}
                <div className="flex items-center justify-between">
                    <div className="min-w-0">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 truncate">Rechercher</label>
                        <span className="text-sm text-gray-600 dark:text-gray-300 truncate block">Trouver un voyageur</span>
                    </div>
                    <button className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}


