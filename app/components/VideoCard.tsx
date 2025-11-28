import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlayCircleIcon } from '@heroicons/react/24/outline';

interface RecommendationCardProps {
    title: string;
    subtitle: string;
    image: string;
    videoUrl?: string;
    videoId?: string;
}

export default function VideoCard({ title, subtitle, image, videoUrl, videoId }: RecommendationCardProps) {
    const { t } = useTranslation();
    const [videoModalOpen, setVideoModalOpen] = useState(false);

    const openVideoModal = () => {
        setVideoModalOpen(true);
    };

    const closeVideoModal = () => {
        setVideoModalOpen(false);
    };

    return (
        <>
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden h-80 group cursor-pointer">
                <img
                    src={'https://img.youtube.com/vi/wyTfWvtGSSY/0.jpg' || `https://img.youtube.com/vi/${videoId}/0.jpg`}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 flex flex-col justify-between py-3 px-3 bg-black/40 group-hover:bg-black/30 transition-colors">
                    <div className="text-white">
                        <h3 className="font-light mb-2 text-3xl">{title}</h3>

                    </div>

                    <div className="flex gap-2">
                        {/* <button className="bg-blue-600 hover:bg-blue-700 text-sm  text-white px-4 py-2 rounded-lg">
                            Explorer
                        </button> */}
                        <button
                            onClick={openVideoModal}
                            className="bg-white/40 backdrop-blur-2xl text-sm w-32 relative text-white px-4 py-2 rounded-lg hover:bg-white/50 transition-colors"
                        >
                            <PlayCircleIcon className="size-4 absolute left-1 top-1/2 -translate-y-1/2 " />  {t('home.recommendations.watchVideo')}
                        </button>
                    </div>
                </div>

            </div>

            {/* Video Modal */}
            {videoModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={closeVideoModal} />

                    {/* Modal */}
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="relative w-full max-w-4xl bg-black rounded-2xl shadow-xl">
                            {/* Header */}
                            {/* <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                                <button
                                    onClick={closeVideoModal}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div> */}

                            {/* Video Content */}
                            <div className="">
                                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                    <iframe className="absolute top-0 left-0 w-full h-full" src={ /*videoUrl || */ "https://www.youtube.com/embed/wyTfWvtGSSY?si=A8pZ_Bisr8_CUSlK&autoplay=1"} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
} 