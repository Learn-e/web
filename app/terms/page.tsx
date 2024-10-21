import Footer from "@/components/global/footer";
import Link from "next/link";

export default function Terms() {
  return (
    <div className="min-h-screen">
      <div className="w-[70%] container px-2 py-4 mx-auto">
        <h1 className="p-4 text-4xl font-bold text-left first-line:underline">
          Conditions Générales d'Utilisation
        </h1>

        <section className="p-4">
          <h2 className="mb-4 text-2xl font-semibold">1. Introduction</h2>
          <p className="leading-relaxed">
            Bienvenue sur notre plateforme de formation en ligne. En accédant à
            notre site, vous acceptez nos conditions générales d'utilisation.
            Veuillez lire ces conditions attentivement avant de commencer à
            utiliser nos services.
          </p>
        </section>

        <section className="p-4">
          <h2 className="mb-4 text-2xl font-semibold">2. Accès au Service</h2>
          <p className="leading-relaxed">
            Nous nous réservons le droit de restreindre l'accès à certaines
            parties de notre site ou à l'intégralité du site. L'utilisateur doit
            veiller à la confidentialité de ses identifiants de connexion.
          </p>
        </section>

        <section className="p-4">
          <h2 className="mb-4 text-2xl font-semibold">
            3. Propriété Intellectuelle
          </h2>
          <p className="leading-relaxed">
            Le contenu publié sur notre plateforme est protégé par des droits de
            propriété intellectuelle. Toute reproduction ou diffusion non
            autorisée est interdite.
          </p>
        </section>

        <section className="p-4">
          <h2 className="mb-4 text-2xl font-semibold">
            4. Utilisation des Données
          </h2>
          <p className="leading-relaxed">
            Nous respectons la confidentialité de vos données personnelles. Pour
            en savoir plus, veuillez consulter notre politique de
            confidentialité.
          </p>
        </section>

        <section className="p-4">
          <h2 className="mb-4 text-2xl font-semibold">
            5. Modifications des Conditions
          </h2>
          <p className="leading-relaxed">
            Nous nous réservons le droit de modifier ces conditions à tout
            moment. Nous vous tiendrons informé de tout changement important via
            notre site web.
          </p>
        </section>

        <section className="p-4">
          <h2 className="mb-4 text-2xl font-semibold">6. Contact</h2>
          <p className="leading-relaxed">
            Si vous avez des questions concernant nos conditions générales
            d'utilisation, n'hésitez pas à nous contacter à{" "}
            <Link
              className="font-bold underline"
              href="mailto:support@learne.fr"
            >
              support@learne.fr
            </Link>
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
