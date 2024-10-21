import Footer from "@/components/global/footer";
import Link from "next/link";

export default function Privacy() {
  return (
    <div className="min-h-screen">
      <div className="w-[70%] container px-2 py-4 mx-auto">
        <h1 className="p-4 text-4xl font-bold text-left first-line:underline">
          Politique de Confidentialité
        </h1>

        <section className="p-4">
          <h2 className="mb-4 text-2xl font-semibold">1. Introduction</h2>
          <p className="leading-relaxed">
            Nous accordons une grande importance à la confidentialité de vos
            données personnelles. Cette politique de confidentialité explique
            comment nous collectons, utilisons, et protégeons vos informations
            lorsque vous utilisez notre plateforme de formation en ligne.
          </p>
        </section>

        <section className="p-4">
          <h2 className="mb-4 text-2xl font-semibold">
            2. Collecte des Informations
          </h2>
          <p className="leading-relaxed">
            Nous collectons certaines informations personnelles lorsque vous
            vous inscrivez à notre service, telles que votre nom, adresse
            e-mail, et d'autres informations que vous choisissez de fournir.
          </p>
        </section>

        <section className="p-4">
          <h2 className="mb-4 text-2xl font-semibold">
            3. Utilisation des Données
          </h2>
          <p className="leading-relaxed">
            Les informations collectées sont utilisées pour vous fournir nos
            services, améliorer la plateforme, et communiquer avec vous. Nous ne
            partagerons jamais vos données personnelles avec des tiers sans
            votre consentement explicite, sauf si la loi l'exige.
          </p>
        </section>

        <section className="p-4">
          <h2 className="mb-4 text-2xl font-semibold">
            4. Sécurité des Données
          </h2>
          <p className="leading-relaxed">
            Nous mettons en place des mesures de sécurité appropriées pour
            protéger vos informations contre tout accès non autorisé,
            modification, divulgation ou destruction.
          </p>
        </section>

        <section className="p-4">
          <h2 className="mb-4 text-2xl font-semibold">5. Vos Droits</h2>
          <p className="leading-relaxed">
            Vous avez le droit d'accéder, de corriger, ou de supprimer vos
            informations personnelles à tout moment. Si vous souhaitez exercer
            ces droits, veuillez nous contacter à l'adresse
            support@votresite.com.
          </p>
        </section>

        <section className="p-4">
          <h2 className="mb-4 text-2xl font-semibold">
            6. Modifications de la Politique
          </h2>
          <p className="leading-relaxed">
            Nous nous réservons le droit de modifier cette politique de
            confidentialité à tout moment. Tout changement sera publié sur cette
            page avec une date de mise à jour.
          </p>
        </section>

        <section className="p-4">
          <h2 className="mb-4 text-2xl font-semibold">7. Contact</h2>
          <p className="leading-relaxed">
            Si vous avez des questions concernant notre politique de
            confidentialité, veuillez nous contacter à{" "}
            <Link
              className="font-bold underline"
              href="mailto:support@learne.fr"
            >
              support@learne.fr
            </Link>
            .
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
