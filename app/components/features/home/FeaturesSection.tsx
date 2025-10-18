import { useTranslation } from "react-i18next";

export default function FeaturesSection() {
  const { t } = useTranslation();

  const features = [
    {
      id: 1,
      title: t("home.features.profitability.title"),
      description: t("home.features.profitability.description"),
      image: "/images/renta.jpg",
    },
    {
      id: 2,
      title: t("home.features.security.title"),
      description: t("home.features.security.description"),
      image: "/images/voyage.jpg",
    },
    {
      id: 3,
      title: t("home.features.simplicity.title"),
      description: t("home.features.simplicity.description"),
      image: "/images/bonheur.jpg",
    },
  ];

  return (
    <section className="py-20  ">
      <div className=" mx-auto px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature) => {
            const IconComponent = feature.image;
            return (
              <div key={feature.id} className="group relative h-full">
                <div className=" rounded-2xl p-8  transition-all duration-300 transform hover:-translate-y-2  h-full flex flex-col">
                  <div className="relative">
                    <div className="mb-8">
                      <div className={` relative text-center`}>
                        <img
                          src={feature.image}
                          alt={feature.title}
                          className=" text-white h-36 m-auto  object-cover"
                        />

                        {/* Petites icônes flottantes */}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-gray-600  text-justify leading-relaxed text-sm">
                      {feature.description}
                    </p>

                    {/* Indicateur visuel */}
                    {/* <div className="mt-6 flex items-center justify-center mt-auto">
                                            <div className={`w-12 h-1 bg-gradient-to-r ${feature.indicatorGradientFrom} ${feature.indicatorGradientTo} rounded-full`}></div>
                                        </div> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
