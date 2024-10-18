import TrainingHeader from "@/components/trainings/trainingHeader";
import TrainingTimeline from "@/components/trainings/trainingTimeline";
import { Separator } from "@/components/ui/separator";

export default async function TrainingDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return (
    <div className="flex justify-center">
      <section className="w-[70%] flex flex-row p-5 gap-5">
        <div className="w-[30%] p-5 rounded-lg">
          <TrainingTimeline id={id} />
        </div>
        <Separator className="h-full" orientation="vertical" />
        <div className="w-[70%] flex flex-row">
          <TrainingHeader id={id} />
        </div>
      </section>
    </div>
  );
}
