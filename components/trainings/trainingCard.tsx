import dayjs from "dayjs";
import { IconsOptions, IconsOptionsType } from "@/data/icons";

export default function TrainingCard({ training }: { training: any }) {
  return (
    <div className="flex flex-col p-4 border rounded-lg w-[300px]">
      <div>
        <div className="flex justify-center px-5 py-8 mb-3 rounded-lg dark:bg-muted">
          <span>
            {
              IconsOptions.find(
                (option: IconsOptionsType) => option.value === training.icon
              )?.icon
            }
          </span>
        </div>
        <p className="text-muted-foreground">
          Posté le {dayjs(training.created_at).format("DD/MM/YYYY")}
        </p>
        <h1 className="text-lg font-semibold text-left">{training.title}</h1>
      </div>
    </div>
  );
}
