import ReviewCard from './ReviewCard';

export default function Reviews() {
    const reviews = [
        {
            review: "J'ai envoyé un cadeau à ma famille à Londres. Le transporteur était très professionnel et le colis est arrivé en parfait état !",
            name: "Marie D.",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face",
            rating: 5
        },
        {
            review: "Excellent service ! J'ai pu rentabiliser mon voyage en transportant des colis. Interface simple et paiement rapide.",
            name: "Thomas L.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            rating: 5
        },
        {
            review: "Beaucoup moins cher que les services de livraison traditionnels. Je recommande vivement Go Happy Go !",
            name: "Sophie M.",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
            rating: 5
        }
    ];

    return (
        <section className="px-6 py-12 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Témoignages de nos utilisateurs</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {reviews.map((review, index) => (
                    <ReviewCard key={index} {...review} />
                ))}
            </div>
        </section>
    );
} 