import StepBody from "@/components/trainings/stepBody";
import StepHeader from "@/components/trainings/stepHeader";
import { Separator } from "@/components/ui/separator";

export default function Step({ params }: { params: { id: string } }) {
  return (
    <section className="flex flex-col items-center w-full">
      <div className="flex flex-col w-[70%] p-6">
        <StepHeader id={params.id} />
        <Separator className="w-full my-6" orientation="horizontal" />
        <StepBody id={params.id} />
      </div>
    </section>
  );
}
