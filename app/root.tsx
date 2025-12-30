import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { useEffect } from "react";
import { useThemeStore } from "./store/theme";
import { useAuth } from "./hooks/useAuth";
import ChatWidget from "./components/ChatWidget";
import CookieConsent from "./components/common/dialog/CookieConsent";
import "./i18n";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Sacramento&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
        
        {/* SEO Meta Tags */}
        <title>GoHappyGo - Transport de bagages entre voyageurs</title>
        <meta name="description" content="Plateforme de transport de bagages entre voyageurs. Trouvez des transporteurs fiables ou proposez vos services de transport lors de vos voyages." />
        <meta name="keywords" content="transport bagages, voyage, transporteur, livraison, bagages voyage, transport collaboratif" />
        <meta name="author" content="GoHappyGo" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gohappygo.com/" />
        <meta property="og:title" content="GoHappyGo - Transport de bagages entre voyageurs" />
        <meta property="og:description" content="Plateforme de transport de bagages entre voyageurs. Trouvez des transporteurs fiables ou proposez vos services de transport lors de vos voyages." />
        <meta property="og:image" content="https://gohappygo.com/logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="GoHappyGo" />
        <meta property="og:locale" content="fr_FR" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://gohappygo.com/" />
        <meta property="twitter:title" content="GoHappyGo - Transport de bagages entre voyageurs" />
        <meta property="twitter:description" content="Plateforme de transport de bagages entre voyageurs. Trouvez des transporteurs fiables ou proposez vos services de transport lors de vos voyages." />
        <meta property="twitter:image" content="https://gohappygo.com/og-image.jpg" />
        <meta property="twitter:creator" content="@gohappygo" />
        
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="application-name" content="GoHappyGo" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://gohappygo.com/" />
        
        {/* Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Early theme apply to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');var d=(t==='dark')||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})();",
          }}
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { authenticate } = useAuth();
  const hydrateTheme = useThemeStore((s: { hydrate: () => void }) => s.hydrate);

  useEffect(() => {
    authenticate();
    hydrateTheme();
  }, [authenticate, hydrateTheme]);

  return (
    <>
      <Outlet />
      {/* <ChatWidget /> */}
      <CookieConsent />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
