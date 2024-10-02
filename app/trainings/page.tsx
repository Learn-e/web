import TrainingList from "@/components/trainings/trainingList";

export default function TrainingsPage() {
  return (
    <section className="flex flex-col w-full items-center">
      <div className="flex flex-col w-[70%] p-4">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
          Mes formations
        </h1>
      </div>
      <div className="flex flex-col w-[70%] p-4 gap-5">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
          Découvrir plus de formations
        </h1>
        <TrainingList />
      </div>
    </section>
  );
}
