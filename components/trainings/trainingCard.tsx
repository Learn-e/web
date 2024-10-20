import dayjs from "dayjs";
import { IconsOptions, IconsOptionsType } from "@/data/icons";
import Link from "next/link";
import SubscribeButton from "./subscribeButton";

export default function TrainingCard({ training }: { training: any }) {
  return (
    <Link href={`/trainings/${training.id}`} legacyBehavior passHref>
      <div className="flex flex-col cursor-pointer p-4 border rounded-lg w-[300px] h-[400px] hover:border-gray-500">
        <div>
          <div className="flex justify-center px-5 py-8 mb-3 rounded-lg dark:bg-muted">
            <span>
              {
                IconsOptions.find(
                  (icon: IconsOptionsType) => icon.value === training.icon,
                )?.icon
              }
            </span>
          </div>
          <div className="flex flex-row justify-between items-center">
            <p className="text-muted-foreground">
              Posté le {dayjs(training.created_at).format("DD/MM/YYYY")}
            </p>
            <SubscribeButton training_id={training.id} />
          </div>

          <h1 className="text-lg font-semibold text-left hover:underline">
            {training.title}
          </h1>
          <p className="text-muted-foreground mt-1 text-justify">
            {training.description.length > 125
              ? training.description.substring(0, 125) + "..."
              : training.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
