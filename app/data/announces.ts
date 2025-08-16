export interface Listing {
    id: string;
    traveler: {
        name: string;
        avatar: string;
        rating: number;
        verified: boolean;
    };
    departure: {
        city: string;
        country: string;
        airport: string; // e.g. "Paris CDG (CDG)"
        date: string;
        time: string;
    };
    destination: {
        city: string;
        country: string;
        airport: string; // e.g. "JFK New York (JFK)"
    };
    price: number;
    availableWeight: number;
    maxWeight: number;
    description: string;
}

export const listings: Listing[] = [
    {
        id: "1",
        traveler: {
            name: "Marie Dubois",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face",
            rating: 4.8,
            verified: true
        },
        departure: {
            city: "Paris",
            country: "France",
            airport: "Paris CDG (CDG)",
            date: "2024-03-20",
            time: "14:30"
        },
        destination: {
            city: "New York",
            country: "États-Unis",
            airport: "JFK New York (JFK)"
        },
        price: 15,
        availableWeight: 8,
        maxWeight: 10,
        description: "Voyage d'affaires, espace disponible dans ma valise pour vos colis"
    },
    {
        id: "2",
        traveler: {
            name: "Thomas Martin",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            rating: 4.9,
            verified: true
        },
        departure: {
            city: "Lyon",
            country: "France",
            airport: "Lyon–Saint-Exupéry (LYS)",
            date: "2024-03-22",
            time: "09:15"
        },
        destination: {
            city: "Tokyo",
            country: "Japon",
            airport: "Tokyo Haneda (HND)"
        },
        price: 18,
        availableWeight: 5,
        maxWeight: 8,
        description: "Vacances au Japon, je peux transporter vos colis avec plaisir"
    },
    {
        id: "3",
        traveler: {
            name: "Sophie Laurent",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
            rating: 4.7,
            verified: true
        },
        departure: {
            city: "Marseille",
            country: "France",
            airport: "Marseille Provence (MRS)",
            date: "2024-03-18",
            time: "16:45"
        },
        destination: {
            city: "Londres",
            country: "Royaume-Uni",
            airport: "London Heathrow (LHR)"
        },
        price: 8,
        availableWeight: 12,
        maxWeight: 15,
        description: "Étudiant en échange, beaucoup d'espace disponible"
    },
    {
        id: "4",
        traveler: {
            name: "Pierre Moreau",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            rating: 4.6,
            verified: false
        },
        departure: {
            city: "Nice",
            country: "France",
            airport: "Nice Côte d'Azur (NCE)",
            date: "2024-03-25",
            time: "11:20"
        },
        destination: {
            city: "Barcelone",
            country: "Espagne",
            airport: "Barcelona El Prat (BCN)"
        },
        price: 6,
        availableWeight: 7,
        maxWeight: 10,
        description: "Week-end à Barcelone, espace libre dans mes bagages"
    },
    {
        id: "5",
        traveler: {
            name: "Emma Bernard",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
            rating: 4.9,
            verified: true
        },
        departure: {
            city: "Toulouse",
            country: "France",
            airport: "Toulouse-Blagnac (TLS)",
            date: "2024-03-28",
            time: "07:50"
        },
        destination: {
            city: "Berlin",
            country: "Allemagne",
            airport: "Berlin Brandenburg (BER)"
        },
        price: 12,
        availableWeight: 6,
        maxWeight: 8,
        description: "Conférence professionnelle, transport sécurisé garanti"
    },
    {
        id: "6",
        traveler: {
            name: "Lucas Petit",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
            rating: 4.5,
            verified: true
        },
        departure: {
            city: "Bordeaux",
            country: "France",
            airport: "Bordeaux–Mérignac (BOD)",
            date: "2024-03-30",
            time: "13:10"
        },
        destination: {
            city: "Amsterdam",
            country: "Pays-Bas",
            airport: "Amsterdam Schiphol (AMS)"
        },
        price: 10,
        availableWeight: 9,
        maxWeight: 12,
        description: "Voyage personnel, flexible sur les types de colis"
    }
];

export function getListingById(id: string): Listing | undefined {
    return listings.find((l) => l.id === id);
}


