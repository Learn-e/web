import StepBody from "@/components/trainings/stepBody";
import StepHeader from "@/components/trainings/stepHeader";
import { Separator } from "@/components/ui/separator";

export default function Step({ params }: { params: { step_id: string } }) {
  return (
    <section className="flex flex-col items-center w-full">
      <div className="flex flex-col w-[70%] p-6">
        <StepHeader id={params.step_id} />
        <Separator className="w-full my-6" orientation="horizontal" />
        <StepBody id={params.step_id} />
      </div>
    </section>
  );
}
