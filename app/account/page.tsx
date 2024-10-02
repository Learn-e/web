import ModifyAccount from "@/components/account/modifyAccount";

export default function Account() {
  return (
    <section className="flex flex-row justify-center w-full">
      <div className="w-[70%] mt-3 p-4">
        <div className="flex flex-col">
          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
            Mon compte
          </h1>
          <p className="text-muted-foreground">
            Vous pouvez modifier les informations de votre compte en modifiant
            les champs ci-dessous.
          </p>
        </div>
        <div className="mt-3">
          <ModifyAccount />
        </div>
      </div>
    </section>
  );
}
