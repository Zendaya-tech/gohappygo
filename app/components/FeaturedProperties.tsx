import PropertyCard from './PropertyCard';

export default function FeaturedProperties() {
    const travelers = [
        {
            title: "Marie - Voyage d'affaires",
            location: "Paris → New York",
            price: "15€/kg",
            rating: "4.8",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400&h=300&fit=crop&crop=face",
            weight: "8kg",
            departure: "15 Mars 2024"
        },
        {
            title: "Thomas - Vacances",
            location: "Lyon → Tokyo",
            price: "12€/kg",
            rating: "4.9",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face",
            weight: "5kg",
            departure: "20 Mars 2024"
        },
        {
            title: "Sophie - Étudiant",
            location: "Marseille → Londres",
            price: "8€/kg",
            rating: "4.7",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop&crop=face",
            weight: "12kg",
            departure: "18 Mars 2024"
        }
    ];

    return (
        <section className="px-6 py-12 container mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Transporteurs <span className="text-blue-600">vérifiés</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {travelers.map((traveler, index) => (
                    <PropertyCard key={index} {...traveler} featured={true} />
                ))}
            </div>
        </section>
    );
} 