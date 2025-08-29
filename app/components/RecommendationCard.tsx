interface RecommendationCardProps {
    title: string;
    subtitle: string;
    image: string;
}

export default function RecommendationCard({ title, subtitle, image }: RecommendationCardProps) {
    return (
        <div className="relative bg-gray-900 rounded-2xl overflow-hidden h-80 group cursor-pointer">
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 flex flex-col justify-between py-3 px-3 bg-black/40 group-hover:bg-black/30 transition-colors">
                <div className="text-white">
                    <h3 className="font-light mb-2 text-3xl">{title}</h3>

                </div>

                <div className="flex gap-2">
                    <button className="bg-blue-600 hover:bg-blue-700  text-white px-4 py-2 rounded-lg">
                        Explorer
                    </button>
                    <button className="bg-white/40 backdrop-blur-2xl w-32 text-white px-4 py-2 rounded-lg">
                        Voir
                    </button>
                </div>
            </div>

        </div>
    );
} 