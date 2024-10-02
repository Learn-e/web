export default async function TrainingDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <section className="flex flex-row justify-center w-full">
      <div className="w-[70%]">{id}</div>
    </section>
  );
}
