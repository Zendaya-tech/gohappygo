export default function HeroSection() {
    return (
        <section className="relative px-6 py-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        Expédiez vos colis avec <span className="text-blue-600">Go Happy Go</span>
                    </h1>
                    <p className="text-gray-600 text-lg mb-8">
                        Connectez-vous avec des voyageurs qui ont de l'espace dans leurs bagages. Expédiez vos colis de manière économique et écologique.
                    </p>

                    {/* Search Form */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="border-r border-gray-200 pr-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">De</label>
                                <input
                                    type="text"
                                    placeholder="Ville de départ"
                                    className="w-full text-sm text-gray-600 bg-transparent border-none outline-none"
                                />
                            </div>
                            <div className="border-r border-gray-200 pr-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Vers</label>
                                <input
                                    type="text"
                                    placeholder="Ville d'arrivée"
                                    className="w-full text-sm text-gray-600 bg-transparent border-none outline-none"
                                />
                            </div>
                            <div className="border-r border-gray-200 pr-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                <input
                                    type="text"
                                    placeholder="Quand ?"
                                    className="w-full text-sm text-gray-600 bg-transparent border-none outline-none"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Poids</label>
                                    <span className="text-sm text-gray-600">Combien de kg ?</span>
                                </div>
                                <button className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hero Images */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <div className="bg-gray-200 rounded-2xl h-48 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop" alt="Avion en vol" className="w-full h-full object-cover" />
                        </div>
                        <div className="bg-gray-200 rounded-2xl h-32 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=200&fit=crop" alt="Valise" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div className="space-y-4 mt-8">
                        <div className="bg-gray-200 rounded-2xl h-32 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=400&h=200&fit=crop" alt="Colis" className="w-full h-full object-cover" />
                        </div>
                        <div className="bg-gray-200 rounded-2xl h-48 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop" alt="Aéroport" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 