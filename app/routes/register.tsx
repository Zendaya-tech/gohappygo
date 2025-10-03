import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { register as apiRegister } from '../services/authService';

export default function Login() {
    const [step, setStep] = useState<1 | 2>(1);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
        firstName: '',
        lastName: '',
        phoneNumber: ''
    });
    const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    const makeRefHandler = (index: number) => (el: HTMLInputElement | null): void => {
        inputsRef.current[index] = el;
    };

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 1) {
            setSubmitting(true);
            setError(null);
            setMessage(null);
            const res = await apiRegister(
                formData.email,
                formData.password,
                formData.firstName,
                formData.lastName,
                formData.phoneNumber
            );
            if (!res) {
                setError('Échec de l’inscription. Réessayez.');
            } else if (res.message) {
                setMessage(res.message);
            } else {
                setMessage("Inscription réussie. Vérifiez votre email et téléphone.");
            }
            setSubmitting(false);
            setStep(2);
            return;
        }
        if (step === 2) {
            const verification = code.join('');
            console.log('Verify code:', verification);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
            {/* Left visual section */}
            <div className="relative min-h-[40vh] lg:min-h-screen overflow-hidden bg-[url('images/history-converted.webp')] bg-no-repeat bg-black/50 bg-cover">
                <div className="absolute inset-0 " />

                {/* Decorative blurred orbs */}
                <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-purple-500/30 blur-3xl" />

                {/* Content wrapper */}
                <div className="relative z-10 flex h-full w-full items-center justify-center p-8  bg-black/80">
                    <div className="mx-auto max-w-xl text-center">
                        {/* Illustration */}


                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                            Bienvenue, Chez nous !
                        </h1>
                        <p className="mt-4 text-base sm:text-lg text-white/80">
                            Rejoignez notre communauté et accédez à votre espace en toute sécurité.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right form section */}
            <div className="flex items-center justify-center py-12 px-6 lg:px-12 bg-gray-50">
                <div className="w-full max-w-md">
                    {/* Logo / brand */}
                    <div className="flex items-center space-x-3 justify-center lg:justify-start">
                        <img src='/logo.png' />
                    </div>

                    <h2 className="mt-8 text-center lg:text-left text-2xl sm:text-3xl font-bold text-gray-900">
                        {step === 1 ? 'Rejoignez nous !' : 'Vérification'}
                    </h2>

                    <div className="">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {message && (<div className="text-sm text-green-600">{message}</div>)}
                            {error && (<div className="text-sm text-red-600">{error}</div>)}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                        Prénom
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            required
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="block w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition"
                                            placeholder="Prénom"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                        Nom
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            required
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="block w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition"
                                            placeholder="Nom"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                                    Téléphone
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="tel"
                                        required
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        className="block w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition"
                                        placeholder="Ex: +237..."
                                    />
                                </div>
                            </div>
                            {step === 1 ? (
                                <>
                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Adresse email
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="block w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition"
                                                placeholder="votre@email.com"
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Mot de passe
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                autoComplete="new-password"
                                                required
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="block w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>

                                    {/* Password confirmation*/}
                                    <div>
                                        <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">
                                            Mot de passe (confirmation)
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="passwordConfirm"
                                                name="passwordConfirm"
                                                type="password"
                                                autoComplete="new-password"
                                                required
                                                className="block w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>

                                    {/* Remember me */}
                                    <div className="flex items-center justify-between">
                                        <label className="inline-flex items-center gap-2">
                                            <input
                                                id="rememberMe"
                                                name="rememberMe"
                                                type="checkbox"
                                                checked={formData.rememberMe}
                                                onChange={handleChange}
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <span className="text-sm text-gray-900">j'ai lu les conditions d'utilisation</span>
                                        </label>
                                        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                            j'accepte
                                        </a>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className="text-sm text-gray-600">Un code de vérification à 6 chiffres a été envoyé à {formData.email}.</p>
                                    <div className="flex justify-between gap-2" onPaste={(e) => {
                                        const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
                                        if (!text) return;
                                        const next = text.split('');
                                        setCode((prev) => prev.map((_, i) => next[i] ?? ''));
                                        // focus last filled
                                        const idx = Math.min(text.length - 1, 5);
                                        inputsRef.current[idx]?.focus();
                                        e.preventDefault();
                                    }}>
                                        {code.map((value, idx) => (
                                            <input
                                                key={idx}
                                                ref={makeRefHandler(idx)}
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                maxLength={1}
                                                value={value}
                                                onChange={(e) => {
                                                    const v = e.target.value.replace(/\D/g, '').slice(0, 1);
                                                    setCode((prev) => prev.map((p, i) => (i === idx ? v : p)));
                                                    if (v && idx < 5) inputsRef.current[idx + 1]?.focus();
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Backspace' && !code[idx] && idx > 0) {
                                                        inputsRef.current[idx - 1]?.focus();
                                                    }
                                                }}
                                                className="w-12 h-12 text-center text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            />
                                        ))}
                                    </div>
                                    <button type="button" className="text-sm text-indigo-600 hover:text-indigo-700">Renvoyer le code</button>
                                </>
                            )}

                            {/* Submit button */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className={`group relative w-full inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:translate-y-px ${submitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                                >
                                    {submitting ? 'En cours…' : step === 1 ? 'Suivant' : 'Valider'}
                                </button>
                                {step === 2 && (
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="mt-3 w-full inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Retour
                                    </button>
                                )}
                            </div>
                        </form>

                        {/* Links under form */}
                        <div className="mt-6 text-center text-sm">
                            <a href="#" className="text-indigo-500 hover:text-indigo-600">Vous etes déja des notre  ?</a>
                            <span className="mx-2 text-gray-300">•</span>
                            <Link to="/register" className="text-indigo-500 hover:text-indigo-600">Se connecter</Link>
                        </div>
                    </div>

                    {/* Social login (optional) */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-gray-50 text-gray-500">Ou continuer avec</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="ml-2">Google</span>
                            </button>

                            <button className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                <span className="ml-2">Facebook</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
} 