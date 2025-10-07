type ReservationStatus = 'waiting_proposal' | 'waiting_payment' | 'archived';

export type Reservation = {
    id: string;
    originCity: string;
    destinationCity: string;
    travelDate: string; // YYYY-MM-DD
    flightNumber?: string;
    weightKg: number;
    priceEuro: number;
    imageUrl?: string;
    customer?: { name: string; avatar?: string };
    status: ReservationStatus;
};

export default function ReservationCard({ reservation, onApprove, onReject, onContact }: {
    reservation: Reservation;
    onApprove?: (id: string) => void;
    onReject?: (id: string) => void;
    onContact?: (id: string) => void;
}) {
    const route = `${reservation.originCity} → ${reservation.destinationCity}`;
    const date = new Date(reservation.travelDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex">
            <div className="w-40 h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                {reservation.imageUrl ? (
                    <img src={reservation.imageUrl} alt={route} className="w-full h-full object-cover" />
                ) : (
                    <div className="text-gray-400">✈️</div>
                )}
            </div>

            <div className="flex-1 p-4">
                <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">{route}</div>
                <div className="mt-1 text-xs text-gray-500">{date}</div>
                {reservation.flightNumber && (
                    <div className="mt-1 text-xs text-gray-500">Numéro de vol {reservation.flightNumber}</div>
                )}

                <div className="mt-3 flex items-center gap-3">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-sm">
                        {reservation.weightKg.toString().padStart(2, '0')} Kg
                    </span>
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-sm">
                        € {reservation.priceEuro}
                    </span>
                </div>

                {reservation.status === 'waiting_proposal' && (
                    <div className="mt-4 flex items-center gap-3">
                        <button onClick={() => onApprove?.(reservation.id)} className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700">Approve</button>
                        <button onClick={() => onReject?.(reservation.id)} className="px-4 py-2 rounded-lg border border-red-300 text-red-600 text-sm hover:bg-red-50">Reject</button>
                    </div>
                )}
            </div>

            <div className="w-64 p-4 border-l border-gray-200 dark:border-gray-800 hidden md:block">
                <div className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Customer Details</div>
                {reservation.customer ? (
                    <div className="flex items-center gap-3">
                        <img className="w-8 h-8 rounded-full" src={reservation.customer.avatar || '/favicon.ico'} alt={reservation.customer.name} />
                        <div className="text-sm text-gray-700 dark:text-gray-300">{reservation.customer.name}</div>
                    </div>
                ) : (
                    <div className="text-xs text-gray-500">The data will be available after the payment is processed.</div>
                )}

                <button onClick={() => onContact?.(reservation.id)} className="mt-4 w-full px-4 py-2 rounded-lg border text-sm hover:bg-gray-50 dark:hover:bg-gray-800">Contact</button>
            </div>
        </div>
    );
}


