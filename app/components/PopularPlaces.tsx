import { useTranslation } from 'react-i18next';

export default function PopularPlaces() {
    const { t } = useTranslation();
    const routes = [
        { name: "PARIS → NEW YORK", price: "15€/kg", image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop" },
        { name: "LYON → TOKYO", price: "18€/kg", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop" },
        { name: "MARSEILLE → LONDRES", price: "8€/kg", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop" },
        { name: "NICE → BARCELONE", price: "6€/kg", image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300&fit=crop" }
    ];

    return (
        <section className="py-12 px-4 mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{t('home.popularRoutes.title')}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {routes.map((route, index) => (
                    <div key={index} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden ">
                        <div className="relative overflow-hidden rounded-2xl">
                            <img src={route.image} alt={route.name} className="w-full h-48 object-cover" />
                        </div>
                        <div className="mt-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">{route.name}</h3>
                            <p className="text-blue-600 font-semibold text-xs">{t('home.popularRoutes.startingFrom')} {route.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
} 