export default function SupportSection() {
    return (
        <section className="px-4 py-12 mx-auto">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-600 flex flex-col justify-between text-white p-8 rounded-2xl">
                    <h3 className="text-xl font-bold mb-4">Support 24/7</h3>
                    <p className="text-blue-100 text-2xl mb-6">Comprenez l'essentiel avant de commencer!</p>
                    <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
                        En savoir plus
                    </button>
                </div>

                <div className="bg-gray-900 flex flex-col justify-between text-white p-8 rounded-2xl">
                    <h3 className="text-xl font-bold mb-4">Assurance et sécurité</h3>
                    <p className="text-gray-300 text-2xl mb-6">assurés et trackés. Voyagez l'esprit tranquille!</p>

                </div>

                <div className="bg-gray-100 col-span-2 flex flex-col justify-between text-gray-900 p-8 rounded-2xl">
                    <h3 className="text-xl font-bold mb-4 uppercase">en ligne</h3>
                    <p className="text-gray-800 mb-6 text-2xl">posez n'importe quel question a notre support</p>
                    <div className="flex items-center gap-2">
                        <input type="text" placeholder="votre question" className="flex-1 px-4 py-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <button className="bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">
                            Envoyer
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
} 