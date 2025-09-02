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
    airline?: string; // Logo de la compagnie aérienne
    isRequest?: boolean; // Si c'est une demande de transport
}

export const listings: Listing[] = [
    {
        id: "1",
        traveler: {
            name: "Marie Dubois",
            avatar: "https://images.planefinder.net/api/logo-square/CFE/w/396",
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
        description: "Voyage d'affaires, espace disponible dans ma valise pour vos colis",
        airline: "Air France"
    },
    {
        id: "2",
        traveler: {
            name: "Thomas Martin",
            avatar: "https://images.planefinder.net/api/logo-square/EFW/w/396",
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
        description: "Vacances au Japon, je peux transporter vos colis avec plaisir",
        airline: "United Airlines"
    },
    {
        id: "3",
        traveler: {
            name: "Sophie Laurent",
            avatar: "https://images.planefinder.net/api/logo-square/BDR/w/396",
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
        description: "Étudiant en échange, beaucoup d'espace disponible",
        airline: "Qatar Airways"
    },
    {
        id: "4",
        traveler: {
            name: "Pierre Moreau",
            avatar: "https://images.planefinder.net/api/logo-square/BRU/w/396",
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
            avatar: "https://images.planefinder.net/api/logo-square/BDR/w/396",
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
    },
    {
        id: "7",
        traveler: {
            name: "Jack Black",
            avatar: "https://images.planefinder.net/api/logo-square/BRU/w/396",
            rating: 4.8,
            verified: true
        },
        departure: {
            city: "Paris",
            country: "France",
            airport: "Paris CDG (CDG)",
            date: "2024-03-15",
            time: "10:30"
        },
        destination: {
            city: "New York",
            country: "États-Unis",
            airport: "JFK New York (JFK)"
        },
        price: 15,
        availableWeight: 8,
        maxWeight: 10,
        description: "Besoin de transporter un sac en cuir",
        isRequest: true
    },
    {
        id: "8",
        traveler: {
            name: "Bob Brown",
            avatar: "https://images.planefinder.net/api/logo-square/BRU/w/396",
            rating: 4.9,
            verified: true
        },
        departure: {
            city: "Lyon",
            country: "France",
            airport: "Lyon–Saint-Exupéry (LYS)",
            date: "2024-03-20",
            time: "14:15"
        },
        destination: {
            city: "Tokyo",
            country: "Japon",
            airport: "Tokyo Haneda (HND)"
        },
        price: 12,
        availableWeight: 5,
        maxWeight: 8,
        description: "Recherche transport pour chaussures plates",
        isRequest: true
    },
    {
        id: "9",
        traveler: {
            name: "Patrick Olongo",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
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
        description: "Transport nécessaire pour sac de voyage",
        isRequest: true
    }
];

export function getListingById(id: string): Listing | undefined {
    return listings.find((l) => l.id === id);
}


