export default function SupportSection() {
    return (
        <section className="px-6 py-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-blue-600 text-white p-8 rounded-2xl">
                    <h3 className="text-xl font-bold mb-4">Support 24/7</h3>
                    <p className="text-blue-100 mb-6">Notre équipe est là pour vous accompagner dans tous vos envois de colis. Assistance garantie !</p>
                    <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
                        Nous contacter
                    </button>
                </div>

                <div className="bg-gray-900 text-white p-8 rounded-2xl">
                    <h3 className="text-xl font-bold mb-4">Assurance et sécurité</h3>
                    <p className="text-gray-300 mb-6">Tous vos colis sont assurés et trackés. Voyagez l'esprit tranquille avec Go Happy Go.</p>
                    <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
                        En savoir plus
                    </button>
                </div>
            </div>
        </section>
    );
} 