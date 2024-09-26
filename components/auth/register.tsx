"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useMutation } from "@tanstack/react-query";
import { Auth } from "@/api/auth";
import { toast } from "sonner";

export default function Register() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-fit">
          S'inscrire
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>S'inscrire</DialogTitle>
          <DialogDescription>
            Veuillez vous inscrire pour accéder à la plateforme.
          </DialogDescription>
        </DialogHeader>
        <RegisterForm />
      </DialogContent>
    </Dialog>
  );
}

function RegisterForm() {
  const AuthAPI = new Auth();
  const register = useMutation({
    mutationFn: async ({
      email,
      username,
      password,
      firstname,
      lastname,
    }: {
      email: string;
      password: string;
      username: string;
      firstname: string;
      lastname: string;
    }) =>
      AuthAPI.register({
        email: email,
        password: password,
        username: username,
        firstname: firstname,
        lastname: lastname,
      }),
    mutationKey: ["register"],
    onSuccess: () => {
      setTimeout(() => {
        toast.success("Vous êtes maintenant inscrit à Learn-E.", {
          position: "top-center",
          duration: 1500,
        })
      }, 300);
    },
    onError: () => {
      setTimeout(() => {
        toast.error("Une erreur est survenue lors de l'inscription.", {
          position: "top-center",
          duration: 1500,
        })
      }, 300);
    },
  });

  const registerSchema = z.object({
    email: z.string().email(),
    username: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    password: z.string(),
    confirm: z.string(),
  });

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      firstname: "",
      lastname: "",
      password: "",
      confirm: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    register.mutate({
      email: values.email,
      password: values.password,
      username: values.username,
      firstname: values.firstname,
      lastname: values.lastname,
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel> E-mail </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@example.com"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Nom d'utilisateur </FormLabel>
              <FormControl>
                <Input type="text" placeholder="johndoe" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Prénom </FormLabel>
              <FormControl>
                <Input type="text" placeholder="John" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Nom </FormLabel>
              <FormControl>
                <Input type="text" placeholder="Doe" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Mot de passe </FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Confirmer mot de passe </FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button className="w-fit" variant={"outline"} type="button">
              Annuler
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button className="w-fit" type="submit">
              S'inscrire
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
}
