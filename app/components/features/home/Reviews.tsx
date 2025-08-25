import ReviewCard from './ReviewCard';

export default function Reviews() {
    const reviews = [
        {
            review: "J'ai envoyé un cadeau à ma famille à Londres. Le transporteur était très professionnel et le colis est arrivé en parfait état !",
            name: "Marie D.",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face",
            rating: 5,
            location: "europe"
        },
        {
            review: "Excellent service ! J'ai pu rentabiliser mon voyage en transportant des colis. Interface simple et paiement rapide.",
            name: "Thomas L.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            rating: 5,
            location: "south america"
        },
        {
            review: "Excellent service ! J'ai pu rentabiliser mon voyage en transportant des colis. Interface simple et paiement rapide.",
            name: "Thomas L.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            rating: 5,
            location: "north america"
        },
        {
            review: "service très rapide et efficace. Je recommande vivement Go Happy Go !",
            name: "Thomas L.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            rating: 5,
            location: "asia"
        },
        {
            review: "J'ai transporté des colis en Afrique. Le service était très rapide et le prix était très abordable.",
            name: "Thierry M.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            rating: 5,
            location: "africa"
        },
        {
            review: "Beaucoup moins cher que les services de livraison traditionnels. Je recommande vivement Go Happy Go !",
            name: "Sophie M.",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
            rating: 5,
            location: "oceania"
        }
    ];

    return (
        <section className="px-4 py-12 mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Témoignages de nos utilisateurs</h2>

            <div className='flex gap-4'>


                {/*worl map reviews*/}
                <div className="relative max-h-min flex-1 ">

                    <img src="/images/map.svg" alt="world map" className="object-fit w-full" />
                    {//show user avatar on map with the location of the review
                        reviews.map((review, index) => {
                            // in percentage
                            const position = function () {
                                if (review.location == "europe") {

                                    return {
                                        lat: "45.227638%",
                                        lng: "70.213749%"
                                    }
                                }
                                if (review.location == "south america") {
                                    return {
                                        lat: "70%",
                                        lng: "30.7129%"
                                    }
                                }
                                if (review.location == "north america") {
                                    return {
                                        lat: "40%",
                                        lng: "15%"
                                    }
                                }
                                if (review.location == "asia") {
                                    return {
                                        lat: "30%",
                                        lng: "85%"
                                    }
                                }
                                if (review.location == "africa") {
                                    return {
                                        lat: "58%",
                                        lng: "48%"
                                    }
                                }
                                if (review.location == "oceania") {
                                    return {
                                        lat: "20%",
                                        lng: "35%"
                                    }
                                }

                                return {
                                    lat: "0%",
                                    lng: "0%"
                                }
                            }()
                            return (
                                <div className="size-10 object-cover overflow-hidden  border-2 border-blue-700 rounded-full absolute"
                                    style={{
                                        top: position.lat,
                                        left: position.lng
                                    }}>
                                    <img src={review.avatar} className="size-full object-cover" alt={review.name}
                                    />
                                </div>
                            )

                        })
                    }
                </div>
                {/* review one by one with fade in and fade out animation */}
                {/* <div className='w-96'>
                    {reviews.map((review, index) => (
                        <div key={index} className="top-0 left-0  bg-white ">
                            <ReviewCard {...review} />
                        </div>
                    ))}
                </div> */}

            </div>
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {reviews.map((review, index) => (
                    <ReviewCard key={index} {...review} />
                ))}
            </div> */}
        </section>
    );
} 