import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

export default function RegisterDialog({
  open,
  onClose,
  onSwitchToLogin,
}: {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const makeRefHandler =
    (index: number) =>
    (el: HTMLInputElement | null): void => {
      inputsRef.current[index] = el;
    };
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { register, verifyEmail } = useAuth();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClickOutside);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClickOutside);
    };
  }, [open, onClose]);

  if (!open) return null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (form.password !== form.confirmPassword) {
        setError("Les mots de passe ne correspondent pas");
        return;
      }
      setSubmitting(true);
      setError(null);
      setMessage(null);

      try {
        const res = await register(
          form.email,
          form.password,
          form.firstName,
          form.lastName,
          form.phoneNumber
        );
        setMessage(res.message);
        setStep(2);
      } catch (err: any) {
        setError(err.message || "Échec de l'inscription. Réessayez.");
      } finally {
        setSubmitting(false);
      }
      return;
    }

    if (step === 2) {
      const verification = code.join("");
      if (verification.length !== 6) {
        setError("Veuillez saisir le code de vérification complet");
        return;
      }
      setSubmitting(true);
      setError(null);

      try {
        const verifyRes = await verifyEmail(form.email, verification);
        setMessage(verifyRes.message);

        // Close dialog after successful verification
        setTimeout(() => {
          onClose();
        }, 1500);
      } catch (err: any) {
        setError(err.message || "Code de vérification invalide. Réessayez.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={ref}
        className="relative w-full max-w-4xl max-h-[90vh] mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex">
          {/* Côté gauche - Formulaire */}
          <div className="w-1/2 p-8">
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {step === 1 ? "Inscription" : "Vérification"}
              </h1>
              <p className="text-gray-600">
                {step === 1
                  ? "et profitez de toutes les possibilités"
                  : "Saisissez le code de vérification"}
              </p>
            </div>

            <form className="space-y-6" onSubmit={onSubmit}>
              {message && (
                <div className="text-sm text-green-600">{message}</div>
              )}
              {error && <div className="text-sm text-red-600">{error}</div>}

              {step === 1 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                      placeholder="Prénom"
                      required
                      value={form.firstName}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, firstName: e.target.value }))
                      }
                    />
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                      placeholder="Nom"
                      required
                      value={form.lastName}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, lastName: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      id="phoneNumber"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                      placeholder="Téléphone (ex: +237...)"
                      required
                      value={form.phoneNumber}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, phoneNumber: e.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                      placeholder="Votre email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                    />
                  </div>

                  <div>
                    <input
                      type="password"
                      id="password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                      placeholder="Votre mot de passe"
                      required
                      value={form.password}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, password: e.target.value }))
                      }
                    />
                  </div>

                  <div>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                      placeholder="Confirmez votre mot de passe"
                      required
                      value={form.confirmPassword}
                      onChange={(e) =>
                        setForm((p) => ({
                          ...p,
                          confirmPassword: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1 rounded border-gray-300 text-green-600 focus:ring-green-500"
                      required
                    />
                    <label
                      htmlFor="terms"
                      className="ml-2 text-sm text-gray-600"
                    >
                      En vous inscrivant, vous acceptez la{" "}
                      <a
                        href="/privacy"
                        className="text-green-600 hover:text-green-500"
                      >
                        Politique de confidentialité
                      </a>{" "}
                      et les{" "}
                      <a
                        href="/terms"
                        className="text-green-600 hover:text-green-500"
                      >
                        Conditions d'utilisation
                      </a>
                      .
                    </label>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-600">
                    Un code de vérification à 6 chiffres a été envoyé à{" "}
                    {form.email}.
                  </p>
                  <div
                    className="flex justify-between gap-2"
                    onPaste={(e) => {
                      const text = e.clipboardData
                        .getData("text")
                        .replace(/\D/g, "")
                        .slice(0, 6);
                      if (!text) return;
                      const next = text.split("");
                      setCode((prev) => prev.map((_, i) => next[i] ?? ""));
                      // focus last filled
                      const idx = Math.min(text.length - 1, 5);
                      inputsRef.current[idx]?.focus();
                      e.preventDefault();
                    }}
                  >
                    {code.map((value, idx) => (
                      <input
                        key={idx}
                        ref={makeRefHandler(idx)}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        value={value}
                        onChange={(e) => {
                          const v = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 1);
                          setCode((prev) =>
                            prev.map((p, i) => (i === idx ? v : p))
                          );
                          if (v && idx < 5) inputsRef.current[idx + 1]?.focus();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace" && !code[idx] && idx > 0) {
                            inputsRef.current[idx - 1]?.focus();
                          }
                        }}
                        className="w-12 h-12 text-center text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    className="text-sm text-green-600 hover:text-green-700"
                  >
                    Renvoyer le code
                  </button>
                </>
              )}

              <button
                type="submit"
                disabled={submitting}
                className={`w-full text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                  submitting
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {submitting ? "En cours…" : step === 1 ? "Suivant" : "Valider"}
              </button>

              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Retour
                </button>
              )}
            </form>

            {step === 1 && (
              <>
                {/* Séparateur */}
                <div className="my-6 flex items-center">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <span className="px-4 text-sm text-gray-500">
                    Ou continuer avec
                  </span>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>

                {/* Boutons sociaux */}
                <div className="flex justify-center gap-4">
                  <button className="flex text-sm w-32 items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </button>
                  <button className="text-sm w-32 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="#1877F2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </button>
                </div>

                {/* Lien vers connexion */}
                <div className="mt-6 text-center">
                  <span className="text-sm text-gray-600">
                    Vous avez déjà un compte ?{" "}
                  </span>
                  <button
                    onClick={onSwitchToLogin}
                    className="text-sm text-green-600 hover:text-green-500 font-medium"
                  >
                    Se connecter
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Côté droit - Image */}
          <div className="w-1/2 bg-gradient-to-br from-green-500 to-blue-600 relative">
            <img
              src="/images/login.jpg"
              alt="Register"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
