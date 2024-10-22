import MyTrainings from "@/components/trainings/myTrainings";

export default function MyTrainingsPage() {
  return (
    <section className="flex flex-col w-full items-center">
      <div className="flex flex-col gap-8 w-[70%] p-4">
        <MyTrainings />
      </div>
    </section>
  );
}
