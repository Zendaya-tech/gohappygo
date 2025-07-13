export default function Footer() {
    return (
        <footer className="bg-blue-600 text-white px-6 py-12">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </div>
                            <span className="font-bold text-lg">Go Happy Go</span>
                        </div>
                        <p className="text-blue-100 text-sm">
                            La plateforme qui connecte voyageurs et expéditeurs pour des envois économiques et écologiques.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Expédier</h4>
                        <ul className="space-y-2 text-sm text-blue-100">
                            <li><a href="#" className="hover:text-white">Poster une demande</a></li>
                            <li><a href="#" className="hover:text-white">Tarifs</a></li>
                            <li><a href="#" className="hover:text-white">Assurance colis</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Transporter</h4>
                        <ul className="space-y-2 text-sm text-blue-100">
                            <li><a href="#" className="hover:text-white">Devenir transporteur</a></li>
                            <li><a href="#" className="hover:text-white">Règles de sécurité</a></li>
                            <li><a href="#" className="hover:text-white">Vérification d'identité</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-blue-100">
                            <li><a href="#" className="hover:text-white">Centre d'aide</a></li>
                            <li><a href="#" className="hover:text-white">Comment ça marche</a></li>
                            <li><a href="#" className="hover:text-white">Conditions générales</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-blue-500 mt-8 pt-8 text-center text-sm text-blue-100">
                    <p>&copy; 2024 Go Happy Go. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
} 