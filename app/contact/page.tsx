import Footer from "@/components/global/footer";
import Link from "next/link";

export default function Contact() {
  return (
    <div className="min-h-screen">
      <div className="w-[70%] container px-2 py-4 mx-auto">
        <h1 className="p-4 text-4xl font-bold text-left first-line:underline">
          Contact
        </h1>

        <section className="p-4">
          <h2 className="mb-4 text-2xl font-semibold">Nous contacter</h2>
          <p className="leading-relaxed">
            Pour toutes vos requêtes, qu'elles soient relatives au RGPD ou à
            tout autre sujet, veuillez nous contacter à l'adresse suivante :{" "}
            <Link
              className="font-bold underline"
              href="mailto:support@learne.fr"
            >
              support@learne.fr
            </Link>
            . Nous ferons de notre mieux pour répondre à vos questions dans les
            meilleurs délais.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
