"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/magicui/animated-list";

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

let notifications = [
  {
    name: "Cours Terminé",
    description:
      "Félicitations ! Vous avez réussi le cours 'IA pour Débutants'.",
    time: "il y a 3h",
    icon: "🎓",
    color: "#4CAF50",
  },
  {
    name: "Nouveau Cours Disponible",
    description:
      "Découvrez notre nouveau cours sur les Tendances en Cybersécurité pour 2024 !",
    time: "il y a 2h",
    icon: "🆕",
    color: "#007BFF",
  },
  {
    name: "Rappel de Quiz",
    description:
      "N'oubliez pas de compléter le quiz pour votre cours de Stratégie d'Entreprise avant ce soir !",
    time: "il y a 1h",
    icon: "📝",
    color: "#FFC107",
  },
  {
    name: "Session en Direct Bientôt",
    description:
      "Votre session en direct sur 'Pensée Créative en Design' commence dans 30 minutes.",
    time: "il y a 45m",
    icon: "⏰",
    color: "#FF5722",
  },
  {
    name: "Retour sur Soumission",
    description: "Vous avez reçu un nouveau retour sur votre projet soumis.",
    time: "il y a 20m",
    icon: "📬",
    color: "#9C27B0",
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full  cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex items-center justify-center size-10 rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="p-4 text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center text-lg font-medium whitespace-pre dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal text-left dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export default function AnimatedNotificationsList({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col p-6 overflow-hidden rounded-lg bg-background md:shadow-xl",
        className
      )}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
