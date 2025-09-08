import { useTranslation } from 'react-i18next';

export default function SupportSection() {
    const { t } = useTranslation();
    return (
        <section className="px-4 py-12 mx-auto">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-600 flex flex-col justify-between text-white p-8 rounded-2xl min-h-[220px]">
                    <h3 className="text-xl font-bold mb-4">{t('home.supportSection.support247.title')}</h3>
                    <p className="text-blue-100 text-2xl mb-6">{t('home.supportSection.support247.description')}</p>
                    <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
                        {t('home.supportSection.support247.cta')}
                    </button>
                </div>

                <div className="bg-gray-900 flex flex-col justify-between text-white p-8 rounded-2xl min-h-[220px]">
                    <h3 className="text-xl font-bold mb-4">{t('home.supportSection.insurance.title')}</h3>
                    <p className="text-gray-300 text-2xl mb-6">{t('home.supportSection.insurance.description')}</p>

                </div>

                <div className="bg-gray-100 col-span-1 md:col-span-2 flex flex-col justify-between text-gray-900 p-6 md:p-8 rounded-2xl">
                    <h3 className="text-xl font-bold mb-4 uppercase">{t('home.supportSection.online.title')}</h3>
                    <p className="text-gray-800 mb-6 text-xl md:text-2xl">{t('home.supportSection.online.description')}</p>
                    <form className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <label htmlFor="support-email" className="sr-only">{t('home.supportSection.online.placeholder')}</label>
                        <input id="support-email" type="email" placeholder={t('home.supportSection.online.placeholder')} className="flex-1 px-4 py-3 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <button type="submit" className="bg-slate-800 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700">
                            {t('home.supportSection.online.send')}
                        </button>
                    </form>

                </div>
            </div>
        </section>
    );
} 