interface PropertyCardProps {
    title: string;
    location: string;
    price: string;
    rating: string;
    image: string;
    featured?: boolean;
    weight?: string;
    departure?: string;
}

export default function PropertyCard({ title, location, price, rating, image, featured = false, weight, departure }: PropertyCardProps) {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden px-2 py-3 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-800">
            <div className="relative overflow-hidden rounded-2xl">
                <img src={image} alt={title} className="w-full h-48 object-cover" />
                {featured && (
                    <div className="absolute top-4 left-4 bg-emerald-950/80 text-white px-4 py-1 rounded-full text-xs">
                        Vérifié
                    </div>
                )}
                <button className="absolute top-4 right-4 bg-white/80 dark:bg-gray-900/70 backdrop-blur-sm p-2 rounded-full hover:bg-white dark:hover:bg-gray-800">
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
            </div>
            <div className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{location}</p>
                {weight && (
                    <p className="text-blue-600 text-sm font-medium mb-2">Espace disponible: {weight}</p>
                )}
                {departure && (
                    <p className="text-gray-500 dark:text-gray-400 text-xs mb-4">Départ: {departure}</p>
                )}
                <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900 dark:text-white">{price}</span>
                    <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{rating}</span>
                    </div>
                </div>
            </div>
        </div>
    );
} 