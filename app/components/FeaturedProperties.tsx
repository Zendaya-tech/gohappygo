import PropertyCard from './PropertyCard';

// mock data  font write fullname   just name+ cropped lastname exemple  patrick  olong = patrick O
export default function FeaturedProperties() {
    const travelers = [
        {
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face",
            name: "Marie L",
            location: "Paris → New York",
            price: "15",
            rating: "4.8",
            image: "https://images.planefinder.net/api/logo-square/BYD/w/396",
            weight: "8kg",
            departure: "15 Mars 2024",
            type: "transporter"
        },
        {
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400&h=300&fit=crop&crop=face",
            name: "Thomas D",
            location: "Lyon → Tokyo",
            price: "12",
            rating: "4.9",
            image: "https://images.planefinder.net/api/logo-square/NTB/w/396",
            weight: "5kg",
            departure: "20 Mars 2024",
            type: "transporter"
        },
        {
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop&crop=face",
            name: "Sophie E",
            location: "Marseille → Londres",
            price: "8",
            rating: "4.7",
            image: "https://images.planefinder.net/api/logo-square/AFB/w/396",
            weight: "12kg",
            departure: "18 Mars 2024",
            type: "transporter"
        }
    ];

    return (
        <section className="pb-12 pt-4 px-4 mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Transporteurs <span className="text-blue-600">vérifiés</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {travelers.map((traveler, index) => (
                    <PropertyCard key={index} id={index.toString()} {...traveler} featured={true} type={traveler.type as 'transporter' | 'traveler'} />
                ))}
            </div>
        </section>
    );
} 