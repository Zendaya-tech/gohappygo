interface RecommendationCardProps {
    title: string;
    subtitle: string;
    image: string;
}

export default function RecommendationCard({ title, subtitle, image }: RecommendationCardProps) {
    return (
        <div className="relative bg-gray-900 rounded-2xl overflow-hidden h-64 group cursor-pointer">
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-gray-200">{subtitle}</p>
            </div>
        </div>
    );
} 