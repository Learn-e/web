import { MagicCard } from "../magicui/magic-card";

export default function BusinessCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: any;
}) {
  const Icon = icon;

  return (
    <MagicCard className="px-6 w-[650px] py-12 cursor-pointer shadow-2xl">
      <div className="flex flex-row gap-5">
        <div className="my-auto">
          <Icon size={72} />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-left">{title}</h1>
          <p className="text-base leading-6 text-left">{description}</p>
        </div>
      </div>
    </MagicCard>
  );
}
