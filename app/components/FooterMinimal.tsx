export default function FooterMinimal() {
    const year = new Date().getFullYear();
    return (
        <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="Go Happy Go" className="h-6" />
                    <span className="font-semibold text-gray-900 dark:text-gray-100">Go Happy Go</span>
                </div>
                <nav className="flex items-center gap-4">
                    <a href="/annonces" className="hover:text-gray-900 dark:hover:text-gray-100">Annonces</a>
                    <a href="/transporters" className="hover:text-gray-900 dark:hover:text-gray-100">Transporteurs</a>
                    <a href="/help-center" className="hover:text-gray-900 dark:hover:text-gray-100">Aide</a>
                </nav>
                <p className="text-xs">© {year} Go Happy Go</p>
            </div>
        </footer>
    );
}


