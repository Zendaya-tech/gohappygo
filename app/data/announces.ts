export interface Listing {
    id: string;
    type: "traveler" | "transporter";
    traveler: {
        name: string;
        avatar: string;
        rating: number;
        verified: boolean;
    };
    //departure airport
    departure: {
        name: string; // e.g. "Paris CDG (CDG)"
        city: string;
        country: string;
        date: string;
        time: string;
        airline: string; // Logo de la compagnie aérienne
    };
    //departure  airport
    destination: {
        city: string;
        country: string;
        name: string; // e.g. "JFK New York (JFK)"
        airline: string; // Logo de la compagnie aérienne
    };
    price: number;
    availableWeight: number;
    maxWeight: number;
    description: string;
    isRequest?: boolean; // Si c'est une demande de transport
}

export const listings: Listing[] = [
    {
        id: "1",
        type: "traveler",
        traveler: {
            name: "Marie Dubois",
            avatar: "https://images.planefinder.net/api/logo-square/CFE/w/396",
            rating: 4.8,
            verified: true
        },
        departure: {
            city: "Paris",
            country: "France",
            name: "Paris CDG (CDG)",
            date: "2024-03-20",
            time: "14:30",
            airline: "Air France"
        },
        destination: {
            city: "New York",
            country: "États-Unis",
            name: "JFK New York (JFK)",
            airline: "United Airlines"
        },
        price: 15,
        availableWeight: 8,
        maxWeight: 10,
        description: "Voyage d'affaires, espace disponible dans ma valise pour vos colis",
    },
    {
        id: "2",
        type: "traveler",
        traveler: {
            name: "Thomas Martin",
            avatar: "https://images.planefinder.net/api/logo-square/EFW/w/396",
            rating: 4.9,
            verified: true
        },
        departure: {
            city: "Lyon",
            country: "France",
            name: "Lyon–Saint-Exupéry (LYS)",
            date: "2024-03-22",
            time: "09:15",
            airline: "United Airlines"
        },
        destination: {
            city: "Tokyo",
            country: "Japon",
            name: "Tokyo Haneda (HND)",
            airline: "United Airlines"
        },
        price: 18,
        availableWeight: 5,
        maxWeight: 8,
        description: "Vacances au Japon, je peux transporter vos colis avec plaisir",
    },
    {
        id: "3",
        type: "traveler",
        traveler: {
            name: "Sophie Laurent",
            avatar: "https://images.planefinder.net/api/logo-square/BDR/w/396",
            rating: 4.7,
            verified: true
        },
        departure: {
            city: "Marseille",
            country: "France",
            name: "Marseille Provence (MRS)",
            date: "2024-03-18",
            time: "16:45",
            airline: "Qatar Airways"
        },
        destination: {
            city: "Londres",
            country: "Royaume-Uni",
            name: "London Heathrow (LHR)",
            airline: "Qatar Airways"
        },
        price: 8,
        availableWeight: 12,
        maxWeight: 15,
        description: "Étudiant en échange, beaucoup d'espace disponible",
    },
    {
        id: "4",
        type: "traveler",
        traveler: {
            name: "Pierre Moreau",
            avatar: "https://images.planefinder.net/api/logo-square/BRU/w/396",
            rating: 4.6,
            verified: false
        },
        departure: {
            airline: "Air France",
            city: "Nice",
            country: "France",
            name: "Nice Côte d'Azur (NCE)",
            date: "2024-03-25",
            time: "11:20"
        },
        destination: {
            airline: "Air France",
            city: "Barcelone",
            country: "Espagne",
            name: "Barcelona El Prat (BCN)"
        },
        price: 6,
        availableWeight: 7,
        maxWeight: 10,
        description: "Week-end à Barcelone, espace libre dans mes bagages",
        airline: "Air France"
    },
    {
        id: "5",
        type: "traveler",
        traveler: {
            name: "Emma Bernard",
            avatar: "https://images.planefinder.net/api/logo-square/BDR/w/396",
            rating: 4.9,
            verified: true
        },
        departure: {
            airline: "Air France",
            city: "Toulouse",
            country: "France",
            name: "Toulouse-Blagnac (TLS)",
            date: "2024-03-28",
            time: "07:50"
        },
        destination: {
            airline: "Air France",
            city: "Berlin",
            country: "Allemagne",
            name: "Berlin Brandenburg (BER)",
        },
        price: 12,
        availableWeight: 6,
        maxWeight: 8,
        description: "Conférence professionnelle, transport sécurisé garanti",
    },
    {
        id: "6",
        type: "traveler",
        traveler: {
            name: "Lucas Petit",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
            rating: 4.5,
            verified: true
        },
        departure: {
            city: "Bordeaux",
            country: "France",
            name: "Bordeaux–Mérignac (BOD)",
            date: "2024-03-30",
            time: "13:10",
            airline: "Air France"
        },
        destination: {
            city: "Amsterdam",
            country: "Pays-Bas",
            name: "Amsterdam Schiphol (AMS)",
            airline: "Air France"
        },
        price: 10,
        availableWeight: 9,
        maxWeight: 12,
        description: "Voyage personnel, flexible sur les types de colis",
    },
    {
        id: "7",
        type: "traveler",
        traveler: {
            name: "Jack Black",
            avatar: "https://images.planefinder.net/api/logo-square/BRU/w/396",
            rating: 4.8,
            verified: true
        },
        departure: {
            city: "Paris",
            country: "France",
            name: "Paris CDG (CDG)",
            date: "2024-03-15",
            time: "10:30",
            airline: "Air France"
        },
        destination: {
            city: "New York",
            country: "États-Unis",
            name: "JFK New York (JFK)",
            airline: "Air France"
        },
        price: 15,
        availableWeight: 8,
        maxWeight: 10,
        description: "Besoin de transporter un sac en cuir",
        isRequest: true,
    },
    {
        id: "8",
        type: "traveler",
        traveler: {
            name: "Bob Brown",
            avatar: "https://images.planefinder.net/api/logo-square/BRU/w/396",
            rating: 4.9,
            verified: true
        },
        departure: {
            city: "Lyon",
            country: "France",
            name: "Lyon–Saint-Exupéry (LYS)",
            date: "2024-03-20",
            time: "14:15",
            airline: "Air France"
        },
        destination: {
            city: "Tokyo",
            country: "Japon",
            name: "Tokyo Haneda (HND)",
            airline: "Air France"
        },
        price: 12,
        availableWeight: 5,
        maxWeight: 8,
        description: "Recherche transport pour chaussures plates",
        isRequest: true
    },
    {
        id: "9",
        type: "traveler",
        traveler: {
            name: "Patrick Olongo",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
            rating: 4.7,
            verified: true
        },
        departure: {
            city: "Marseille",
            country: "France",
            name: "Marseille Provence (MRS)",
            date: "2024-03-18",
            time: "16:45",
            airline: "Air France"
        },
        destination: {
            city: "Londres",
            country: "Royaume-Uni",
            name: "London Heathrow (LHR)",
            airline: "Air France"
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


