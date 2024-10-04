import TrainingHeader from "@/components/trainings/trainingheader";

export default async function TrainingDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <div className="flex justify-center">
      <section className="w-[70%] flex flex-row p-5 gap-5">
        <div className="w-[40%] p-5 border rounded-lg">
            
        </div>
        <div className="w-[60%] flex flex-row">
          <TrainingHeader id={id}/>
        </div>
      </section>
    </div>
  );
}