import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReviewCard from './ReviewCard';

export default function Reviews() {
    const { t } = useTranslation();
    const [selectedReview, setSelectedReview] = useState<number>(0);
    const reviews = [
        {
            review: t('home.reviews.europe.review'),
            name: t('home.reviews.europe.name'),
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face",
            rating: 5,
            location: "europe"
        },
        {
            review: t('home.reviews.southAmerica.review'),
            name: t('home.reviews.southAmerica.name'),
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            rating: 5,
            location: "south america"
        },
        {
            review: t('home.reviews.northAmerica.review'),
            name: t('home.reviews.northAmerica.name'),
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            rating: 5,
            location: "north america"
        },
        {
            review: t('home.reviews.asia.review'),
            name: t('home.reviews.asia.name'),
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            rating: 5,
            location: "asia"
        },
        {
            review: t('home.reviews.africa.review'),
            name: t('home.reviews.africa.name'),
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            rating: 5,
            location: "africa"
        },
        {
            review: t('home.reviews.oceania.review'),
            name: t('home.reviews.oceania.name'),
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
            rating: 5,
            location: "oceania"
        }
    ];

    return (
        <section className="px-4 py-12 mx-auto">
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
                                <div
                                    key={index}
                                    className={`size-10 object-cover overflow-hidden border-2 rounded-full absolute cursor-pointer transition-all duration-200 hover:scale-110 ${selectedReview === index ? 'border-blue-500 shadow-lg' : 'border-transparent'
                                        }`}
                                    style={{
                                        top: position.lat,
                                        left: position.lng
                                    }}
                                    onClick={() => setSelectedReview(index)}
                                >
                                    <img src={review.avatar} className="size-full object-cover" alt={review.name} />
                                </div>
                            )

                        })
                    }
                </div>
                {/* Review display area */}
                <div className='w-96 flex items-center'>
                    <div className="bg-white rounded-lg shadow-lg p-6 animate-fade-in">
                        <ReviewCard {...reviews[selectedReview]} />
                    </div>
                </div>

            </div>
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {reviews.map((review, index) => (
                    <ReviewCard key={index} {...review} />
                ))}
            </div> */}
        </section>
    );
} 