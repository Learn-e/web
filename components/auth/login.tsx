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
import { useAuthStore } from "@/store/authStore";

export default function Login() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-fit">
          Connexion
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Se connecter</DialogTitle>
          <DialogDescription>
            Veuillez vous connecter pour accéder à votre compte.
          </DialogDescription>
        </DialogHeader>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}

function LoginForm() {
  const AuthAPI = new Auth();
  const { getUser } = useAuthStore();
  const login = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => AuthAPI.login({ email: email, password: password }),
    mutationKey: ["login"],
    onSuccess: async () => {
      await getUser();
      setTimeout(() => {
        toast.success("Vous êtes maintenant connecté à Learn-E.", {
          position: "top-center",
          duration: 1500,
        });
      }, 300);
    },
    onError: () => {
      setTimeout(() => {
        toast.error("Une erreur est survenue lors de la connexion.", {
          position: "top-center",
          duration: 1500,
        });
      }, 300);
    },
  });

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    login.mutate({
      email: values.email,
      password: values.password,
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
        <DialogFooter>
          <DialogClose asChild>
            <Button className="w-fit" variant={"outline"} type="button">
              Annuler
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button className="w-fit" type="submit">
              Se connecter
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
}
