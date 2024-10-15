"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function CreateStep() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Créer une nouvelle étape</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer une étape</DialogTitle>
          <DialogDescription>
            Créez une nouvelle étape pour votre formation.
          </DialogDescription>
        </DialogHeader>
        <CreateStepForm />
      </DialogContent>
    </Dialog>
  );
}

function CreateStepForm() {
  const createStepSchema = z.object({
    title: z.string(),
    description: z.string(),
    content: z.string(),
  });

  const form = useForm<z.infer<typeof createStepSchema>>({
    resolver: zodResolver(createStepSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
    },
  });

  async function onSubmit() {
    console.log("submitted");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre de la formation</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  required
                  placeholder="Titre de la formation"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  required
                  placeholder="Description"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contenu</FormLabel>
              <FormControl>
                <Textarea required placeholder="Contenu" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <DialogFooter className="mt-5">
          <DialogClose asChild>
            <Button variant={"outline"}>Annuler</Button>
          </DialogClose>
          <Button type="submit">Créer</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
