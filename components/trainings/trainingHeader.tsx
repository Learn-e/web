"use client";

import { Trainings } from "@/api/trainings";
import { Separator } from "@/components/ui/separator";
import { IconsOptionsHeader, IconsOptionsHeaderType } from "@/data/icons";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

export default function TrainingHeader({ id }: { id: string }) {
  const trainingsAPI = new Trainings();

  const training: any = useQuery({
    queryKey: ["getTraining"],
    queryFn: () => trainingsAPI.get_training(id),
  });

  if (training.isLoading || training.data.length > 0) {
    return null;
  }

  return (
    <div className="flex flex-col w-full p-5 rounded-lg">
      <div className="flex flex-row">
        <span className="mt-2">
          {
            IconsOptionsHeader.find(
              (icon: IconsOptionsHeaderType) =>
                icon.value === training.data?.icon,
            )?.icon
          }
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight ms-5 lg:text-4xl">
          {training.data?.title}
        </h1>
      </div>
      <p className="text-muted-foreground">
        Posté le {dayjs(training.data?.created_at).format("DD/MM/YYYY")}
      </p>
      <p className="text-xs text-muted-foreground">
        (dernière mise à jour le{" "}
        {dayjs(training.data?.updated_at).format("DD/MM/YYYY")})
      </p>
      <Separator className="mt-5" />
      <p className="mt-4 text-justify">{training.data?.description}</p>
    </div>
  );
}