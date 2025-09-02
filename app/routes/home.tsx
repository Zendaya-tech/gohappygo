import type { Route } from "./+types/home";
import Header from "../components/Header";
import HeroSection from "../components/features/home/HeroSection";
import FeaturesSection from "../components/features/home/FeaturesSection";
import PlacesByCategory from "../components/PlacesByCategory";
import FeaturedProperties from "../components/FeaturedProperties";
import Recommendations from "../components/Recommendations";
import PopularPlaces from "../components/PopularPlaces";
import HostSection from "../components/HostSection";
import SelectedPlaces from "../components/SelectedPlaces";
import Reviews from "../components/features/home/Reviews";
import SupportSection from "../components/SupportSection";
import Footer from "../components/Footer";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "GoHappyGo - Expédiez vos colis avec des voyageurs" },
    { name: "description", content: "Connectez-vous avec des voyageurs qui ont de l'espace dans leurs bagages. Expédiez vos colis de manière économique et écologique." },
  ];
}

export default function Home() {
  return (
    <>
      <Header />

      <div className="min-h-screen max-w-7xl mx-auto relative bg-white dark:bg-gray-950">

        <HeroSection />
        <FeaturesSection />
        {/* <PlacesByCategory /> */}
        <FeaturedProperties />
        <Recommendations />
        <PopularPlaces />
        <HostSection />
        <SelectedPlaces />
        <Reviews />
        <SupportSection />

      </div>

      <Footer />
    </>

  );
}
