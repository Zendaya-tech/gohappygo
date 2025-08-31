import { CurrencyDollarIcon, ShieldCheckIcon, DevicePhoneMobileIcon, HeartIcon, PlayIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

export default function FeaturesSection() {
    const { t } = useTranslation();

    const features = [
        {
            id: 1,
            title: t('home.features.profitability.title'),
            description: t('home.features.profitability.description'),
            icon: CurrencyDollarIcon,
            gradientFrom: "from-yellow-400",
            gradientTo: "to-orange-500",
            overlayGradientFrom: "from-yellow-400/5",
            overlayGradientTo: "to-orange-500/5",
            indicatorGradientFrom: "from-yellow-400",
            indicatorGradientTo: "to-orange-500",
            floatingIcons: []
        },
        {
            id: 2,
            title: t('home.features.security.title'),
            description: t('home.features.security.description'),
            icon: ShieldCheckIcon,
            gradientFrom: "from-green-400",
            gradientTo: "to-blue-500",
            overlayGradientFrom: "from-green-400/5",
            overlayGradientTo: "to-blue-500/5",
            indicatorGradientFrom: "from-green-400",
            indicatorGradientTo: "to-blue-500",
            floatingIcons: []
        },
        {
            id: 3,
            title: t('home.features.simplicity.title'),
            description: t('home.features.simplicity.description'),
            icon: DevicePhoneMobileIcon,
            gradientFrom: "from-purple-400",
            gradientTo: "to-pink-500",
            overlayGradientFrom: "from-purple-400/5",
            overlayGradientTo: "to-pink-500/5",
            indicatorGradientFrom: "from-purple-400",
            indicatorGradientTo: "to-pink-500",
            floatingIcons: []
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Titre de section */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('home.features.title')}</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {t('home.features.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {features.map((feature) => {
                        const IconComponent = feature.icon;
                        return (
                            <div key={feature.id} className="group relative h-full">
                                <div className="bg-gray-100 rounded-2xl p-8  transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.overlayGradientFrom} ${feature.overlayGradientTo} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                                    <div className="relative">
                                        <div className="mb-8">
                                            <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${feature.gradientFrom} ${feature.gradientTo}  flex items-center justify-center duration-300   rounded-full  relative`}>
                                                <IconComponent className="w-10 h-10 text-white" />

                                                {/* Petites icônes flottantes */}
                                                {feature.floatingIcons.map((floatingIcon, index) => {
                                                    const FloatingIconComponent = floatingIcon.icon;
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={`absolute ${floatingIcon.position} w-6 h-6 ${floatingIcon.bgColor} rounded-full flex items-center justify-center shadow-lg animate-pulse`}
                                                            style={{ animationDelay: floatingIcon.delay }}
                                                        >
                                                            <FloatingIconComponent className="w-3 h-3 text-white" />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                                            {feature.title}
                                        </h3>

                                        <p className="text-gray-600  leading-relaxed text-base">
                                            {feature.description}
                                        </p>

                                        {/* Indicateur visuel */}
                                        {/* <div className="mt-6 flex items-center justify-center mt-auto">
                                            <div className={`w-12 h-1 bg-gradient-to-r ${feature.indicatorGradientFrom} ${feature.indicatorGradientTo} rounded-full`}></div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
