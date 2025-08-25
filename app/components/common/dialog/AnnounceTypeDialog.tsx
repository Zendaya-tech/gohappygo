import { useRef, useEffect } from 'react';
import { TruckIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface AnnounceTypeDialogProps {
    open: boolean;
    onClose: () => void;
    onSelectType: (type: 'travel' | 'package') => void;
}

export default function AnnounceTypeDialog({ open, onClose, onSelectType }: AnnounceTypeDialogProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (open) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [open, onClose]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open, onClose]);

    if (!open) return null;

    const announceTypes = [
        {
            id: 'travel',
            title: 'Annonce de voyage',
            description: 'Je voyage et j\'ai de l\'espace dans mes bagages',
            icon: PaperAirplaneIcon,
            gradient: 'from-blue-500 to-indigo-600',
            bgGradient: 'from-blue-50 to-indigo-50'
        },
        {
            id: 'package',
            title: 'Annonce de colis',
            description: 'J\'ai un colis à faire transporter',
            icon: TruckIcon,
            gradient: 'from-green-500 to-emerald-600',
            bgGradient: 'from-green-50 to-emerald-50'
        }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div
                ref={ref}
                className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                    <h2 className="text-xl font-bold text-white">Choisir le type d'annonce</h2>
                    <p className="text-blue-100 text-sm mt-1">Que souhaitez-vous publier ?</p>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    {announceTypes.map((type) => {
                        const IconComponent = type.icon;
                        return (
                            <button
                                key={type.id}
                                onClick={() => onSelectType(type.id as 'travel' | 'package')}
                                className={`w-full p-4 rounded-xl border-2 border-transparent hover:border-gray-200 transition-all duration-200 bg-gradient-to-r ${type.bgGradient} hover:shadow-lg group`}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${type.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                                        <IconComponent className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                                            {type.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {type.description}
                                        </p>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <button
                        onClick={onClose}
                        className="w-full px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                    >
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    );
}
