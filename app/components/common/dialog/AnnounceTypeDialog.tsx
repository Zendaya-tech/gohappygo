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
            description: 'Je voyage et j\'ai de l\'espace',
            icon: PaperAirplaneIcon,
            color: 'text-blue-600'
        },
        {
            id: 'package',
            title: 'Annonce de colis',
            description: 'J\'ai un colis à transporter',
            icon: TruckIcon,
            color: 'text-green-600'
        }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div
                ref={ref}
                className="relative w-full max-w-sm mx-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg"
            >
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Type d'annonce</h2>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                    {announceTypes.map((type) => {
                        const IconComponent = type.icon;
                        return (
                            <button
                                key={type.id}
                                onClick={() => onSelectType(type.id as 'travel' | 'package')}
                                className="w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 group"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className={`w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}>
                                        <IconComponent className={`w-5 h-5 ${type.color}`} />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h3 className="font-medium text-gray-900 dark:text-white">
                                            {type.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                            {type.description}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={onClose}
                        className="w-full px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium transition-colors"
                    >
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    );
}
