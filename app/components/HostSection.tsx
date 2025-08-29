export default function HostSection() {
    return (
        <section className="py-12 px-4 mx-auto">
            <div className="bg-slate-950 rounded-3xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="p-12 text-white">
                        <h2 className="text-4xl font-bold mb-6">Devenez <span className="text-blue-600 uppercase ">transporteur</span> et gagnez de l'argent</h2>
                        <p className="text-blue-100 mb-8">
                            Rentabilisez vos voyages en transportant des colis pour d'autres personnes. Simple, sécurisé et rémunérateur.
                        </p>
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
                            Commencer maintenant
                        </button>
                    </div>
                    <div className="h-64 lg:h-auto">
                        <img
                            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop"
                            alt="Devenir transporteur"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
} 