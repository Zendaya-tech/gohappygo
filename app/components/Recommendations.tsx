import RecommendationCard from './RecommendationCard';

export default function Recommendations() {
    const recommendations = [
        {
            title: "Explorez de nouvelles destinations",
            subtitle: "Routes populaires",
            image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop"
        },
        {
            title: "Transportez en toute sécurité",
            subtitle: "Colis fragiles",
            image: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=400&h=300&fit=crop"
        },
        {
            title: "Économisez sur vos envois",
            subtitle: "Tarifs avantageux",
            image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop"
        },
        {
            title: "Livraison express",
            subtitle: "Colis urgents",
            image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop"
        }
    ];

    return (
        <section className="py-12 px-4 mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Nos <span className="text-blue-600">Recommandations</span></h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendations.map((recommendation, index) => (
                    <RecommendationCard key={index} {...recommendation} />
                ))}
            </div>
        </section>
    );
} 