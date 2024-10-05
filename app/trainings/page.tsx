import MyTrainings from "@/components/trainings/myTrainings";
import TrainingsList from "@/components/trainings/trainingsList";

export default function TrainingsPage() {
  return (
    <section className="flex flex-col w-full items-center">
      <div className="flex flex-col gap-8 w-[70%] p-4">
        <MyTrainings />
        <TrainingsList />
      </div>
    </section>
  );
}
