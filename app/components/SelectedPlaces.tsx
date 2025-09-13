import { useTranslation } from 'react-i18next';
import PropertyCard from './PropertyCard';

export default function SelectedPlaces() {
    const { t } = useTranslation();
    // Fonction pour calculer les dates dynamiquement
    const getDateString = (daysFromNow: number) => {
        const date = new Date();
        date.setDate(date.getDate() + daysFromNow);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short'
        });
    };


    //avatar oif boy for boy name 
    const requests = [
        { avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face", name: "Julie i", type: "traveler", location: "Paris → Londres", price: "25€", rating: "Urgent", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop", weight: "2kg", departure: getDateString(1) },
        { avatar: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=300&fit=crop&crop=face", name: "John Doe", type: "traveler", location: "Lyon → Rome", price: "20€", rating: "Fragile", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=300&fit=crop", weight: "1.5kg", departure: getDateString(3) },
        { avatar: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&crop=face", name: "paul d", type: "traveler", location: "Marseille → Madrid", price: "30€", rating: "Priorité", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop", weight: "0.5kg", departure: getDateString(0) },
        { avatar: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop&crop=face", name: "kelly h", type: "traveler", location: "Nice → Milan", price: "15€", rating: "Standard", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop", weight: "3kg", departure: getDateString(7) },
        { avatar: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop&crop=face", name: "kros kik.", type: "traveler", location: "Toulouse → Berlin", price: "35€", rating: "Fragile", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop", weight: "2.5kg", departure: getDateString(5) },
        { avatar: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=face", name: "george k", type: "traveler", location: "Bordeaux → Amsterdam", price: "12€", rating: "Standard", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop", weight: "4kg", departure: getDateString(10) }
    ];



    return (
        <section className="py-12 bg-gray-100 dark:bg-gray-900  px-10 rounded-2xl  mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{t('requests.title')}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests.map((request, index) => (
                    <PropertyCard
                        avatar={request.avatar}
                        key={index}
                        name={request.name}
                        location={request.location}
                        price={request.price}
                        rating={request.rating}
                        image={request.image}
                        weight={request.weight}
                        departure={request.departure}
                        featured={true}
                        type={request.type as 'traveler' | 'transporter'}
                    />
                ))}
            </div>
        </section>
    );
} 