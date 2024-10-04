"use client";

import { IconsOptionsHeader, IconsOptionsHeaderType } from "@/data/icons";
import { Trainings } from "@/api/trainings";
import { useQuery } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator"
import dayjs from "dayjs";

export default function TrainingHeader({ id }: {id: string;}) {
    const trainingsAPI = new Trainings();

    const training: any = useQuery({
      queryKey: ["getTraining", id],
      queryFn: () => trainingsAPI.getTraining(id),
    });
    console.log("TRAINING",training)
    return (
        <div className="w-full flex flex-col p-5 border rounded-lg">
            <div className="flex flex-row">
                <span className="mt-2">
                    {
                        IconsOptionsHeader.find(
                        (icon: IconsOptionsHeaderType) => icon.value === training.data?.icon,
                        )?.icon
                    }
                </span>
                <h1 className="ms-5 text-3xl font-extrabold tracking-tight lg:text-4xl">
                    {training.data?.title}
                </h1>
            </div>
            <p className="text-muted-foreground">
                Posté le {dayjs(training.data?.created_at).format("DD/MM/YYYY")}
            </p>
            <p className="text-muted-foreground text-xs">
                (dernière mise à jour le {dayjs(training.data?.updated_at).format("DD/MM/YYYY")})
            </p>
            <Separator className="mt-5"/>
            <p className="mt-4 text-justify">
                {training.data?.description}
            </p>
        </div>
    );
  }