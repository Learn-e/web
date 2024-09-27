import HeroHeaderVideo from "@/components/home/heroHeaderVIdeo";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Globe } from "@/components/home/globe";
import { Button } from "@/components/ui/button";
import { FlipWords } from "@/components/ui/flip-words";
import OrbitingCircle from "@/components/home/orbitingCircle";
import AnimatedNotificationsList from "@/components/home/animatedNotificationsList";
import GridBackground from "@/components/home/gridBackground";
import BusinessCard from "@/components/home/businessCard";
import {
  ChartNoAxesCombined,
  ShoppingCart,
  Award,
  Waypoints,
  MessageSquareQuote,
} from "lucide-react";
import Footer from "@/components/global/footer";

export default async function Home() {
  return (
    <main className="flex flex-col min-h-[85vh]">
      <div className="flex flex-col items-center justify-center my-auto text-center">
        <HeroHeader />
        <GlobalKnowledge />
        <FlexibleLearning />
        <TechnologyInnovation />
        <MoreSells />
        <Footer />
      </div>
      <BackgroundBeams className="absolute -z-50" />
    </main>
  );
}

function HeroHeader() {
  return (
    <div className="flex flex-col w-1/2 py-8">
      <h1 className="text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-6xl">
        Apprenez à votre rythme, de n'importe où, à tout moment.
      </h1>
      <div className="w-3/4 mx-auto">
        <p className="mt-2 text-xl leading-7">
          Avec <strong>Learn-E</strong>, le monde est votre salle de classe.
          Profitez d'une flexibilité totale pour apprendre ce qui vous
          passionne, soutenu par des experts du domaine.
        </p>
      </div>
      <HeroHeaderVideo />
    </div>
  );
}

function GlobalKnowledge() {
  const words = ["apprendre", "s'améliorer", "se développer", "s'épanouir"];

  return (
    <>
      <div className="w-[40%] mx-auto mt-12">
        <h1 className="mt-12 text-4xl font-extrabold tracking-tight text-center scroll-m-20 lg:text-5xl">
          Pourquoi Learn-E est la meilleure solution pour{" "}
          <FlipWords words={words} />?
        </h1>
      </div>
      <div className="flex flex-row w-[60%] gap-24 items-center mx-auto">
        <div className="flex flex-col justify-start w-1/2">
          <h1 className="mt-12 text-4xl font-extrabold tracking-tight text-left scroll-m-20 lg:text-3xl">
            Accédez au savoir et à la connaissance du monde entier
          </h1>
          <p className="mt-3 leading-6 text-justify">
            Découvrez des perspectives uniques et enrichissez votre éducation
            avec Learn-E. Notre plateforme vous relie aux meilleurs enseignants
            et professionnels du monde entier, vous offrant des cours variés et
            approfondis dans de multiples langues. Que vous cherchiez à
            comprendre les complexités de l'économie asiatique, à maîtriser
            l'art culinaire français, ou à plonger dans la littérature
            sud-américaine, Learn-E rend tout cela accessible en quelques clics.
            Profitez d'un apprentissage sans limites et bâtissez des compétences
            qui sont véritablement globales
          </p>
          <Button
            className="mt-3 text-lg font-bold w-fit"
            size={"lg"}
            variant={"outline"}
          >
            Rejoignez Learn-E
          </Button>
        </div>
        <div className="w-[55%]">
          <Globe />
        </div>
      </div>
    </>
  );
}

function FlexibleLearning() {
  return (
    <div className="flex flex-row-reverse w-[60%] py-24 gap-24 items-center mx-auto">
      <div className="flex flex-col items-end justify-start w-1/2">
        <h1 className="text-4xl font-extrabold tracking-tight text-right scroll-m-20 lg:text-3xl">
          Adaptez votre apprentissage à vos besoins
        </h1>
        <p className="mt-3 leading-6 text-justify" style={{ direction: "rtl" }}>
          Chez Learn-E, nous comprenons que chaque apprenant est unique, avec
          ses propres horaires et engagements. C'est pourquoi nous vous offrons
          la possibilité d'apprendre selon vos termes. Que vous soyez un
          lève-tôt ou un noctambule, nos ressources sont disponibles 24/7, vous
          permettant de vous former à des moments qui vous conviennent. Notre
          plateforme s'adapte non seulement à votre emploi du temps, mais aussi
          à votre rythme d'apprentissage, avec des cours pouvant être mis en
          pause et repris à tout moment. Maximisez votre potentiel sans
          compromettre votre style de vie actuel
        </p>
        <Button
          className="mt-3 text-lg font-bold w-fit"
          size={"lg"}
          variant={"outline"}
        >
          Rejoignez Learn-E
        </Button>
      </div>
      <div className="w-1/2">
        <OrbitingCircle />
      </div>
    </div>
  );
}

function TechnologyInnovation() {
  return (
    <div className="flex flex-row w-[60%] py-24 gap-24 items-center mx-auto">
      <div className="flex flex-col justify-start w-1/2">
        <h1 className="text-4xl font-extrabold tracking-tight text-left scroll-m-20 lg:text-3xl">
          L'innovation technologique au service de l'éducation
        </h1>
        <p className="mt-3 leading-6 text-justify">
          Découvrez des perspectives uniques et enrichissez votre éducation avec
          Learn-E. Notre plateforme vous relie aux meilleurs enseignants et
          professionnels du monde entier, vous offrant des cours variés et
          approfondis dans de multiples langues. Que vous cherchiez à comprendre
          les complexités de l'économie asiatique, à maîtriser l'art culinaire
          français, ou à plonger dans la littérature sud-américaine, Learn-E
          rend tout cela accessible en quelques clics. Profitez de un
          apprentissage sans limites et bâtissez des compétences qui sont
          véritablement globales
        </p>
        <Button
          className="mt-3 text-lg font-bold w-fit"
          size={"lg"}
          variant={"outline"}
        >
          Rejoignez Learn-E
        </Button>
      </div>
      <div className="w-1/2">
        <AnimatedNotificationsList />
      </div>
    </div>
  );
}

function MoreSells() {
  return (
    <div className="relative w-full h-full">
      <div className="absolute top-0 left-0 z-10 flex flex-col items-center w-full h-full mx-auto mt-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-center scroll-m-20 lg:text-6xl">
          Maximisez Votre Impact avec Learn-E{" "}
        </h1>
        <p className="w-[55%] mt-5 mb-12 text-xl leading-7 text-center">
          Transformez vos connaissances en succès commercial. Chez Learn-E, nous
          comprenons que la qualité de l'expérience utilisateur est aussi
          importante que la performance de vos tunnels de vente. C'est pourquoi
          nous vous offrons les outils pour améliorer les deux, assurant ainsi
          une croissance continue de vos ventes.{" "}
        </p>
        <div className="grid grid-cols-2 gap-4">
          <BusinessCard
            title="Augmentez vos ventes"
            description="Attirez et fidélisez plus de clients en leur offrant une expérience d'apprentissage inégalée qui les incite à compléter vos cours et à revenir pour plus."
            icon={ChartNoAxesCombined}
          />
          <BusinessCard
            title="Profitez des ventes additionnelles"
            description="Utilisez notre plateforme pour présenter des offres complémentaires pertinentes à vos clients existants, augmentant ainsi la valeur moyenne par utilisateur."
            icon={ShoppingCart}
          />
          <BusinessCard
            title="Proposez des formations premiums"
            description="Enrichissez vos cours avec des fonctionnalités exclusives telles que des espaces membres, des forums actifs, et du coaching personnalisé pour justifier un tarif plus élevé."
            icon={Award}
          />
          <BusinessCard
            title="User d'un marketing viral"
            description="Faites que chaque apprenant devienne un porte-parole de votre marque grâce à des expériences transformationnelles qui incitent au partage sur les réseaux sociaux."
            icon={Waypoints}
          />
          <div className="flex justify-center col-span-2">
            <BusinessCard
              title="Récoltez des témoignages"
              description="Capturez et mettez en avant les récits de réussite de vos apprenants pour renforcer la confiance et améliorer les conversions."
              icon={MessageSquareQuote}
            />
          </div>
        </div>
      </div>
      <div>
        <GridBackground />
      </div>
    </div>
  );
}
