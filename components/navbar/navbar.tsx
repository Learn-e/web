"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Login from "../auth/login";
import Logout from "../auth/logout";
import Register from "../auth/register";
import CreateTrainings from "../trainings/createTrainings";
import { Skeleton } from "../ui/skeleton";

export default function Navbar() {
  const { isLoggedIn, isLoading, logout } = useAuthStore();
  const router = useRouter();

  if (isLoading) {
    return <NavbarSkeleton />;
  }

  function onLogout() {
    logout();
    router.push("/");
  }

  return (
    <div className="border-b border-accent">
      <NavigationMenu className="justify-center max-w-full p-4 bg-card">
        <NavigationMenuList className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-3">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Accueil
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {isLoggedIn && (
              <div className="flex flex-row gap-3">
                <NavigationMenuItem>
                  <CreateTrainings />
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/trainings" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Mes formations
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/all_trainings" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Formations à découvrir
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </div>
            )}
          </div>
          {!isLoggedIn ? (
            <div className="flex flex-row items-center">
              <Login />
              <Register />
            </div>
          ) : (
            <div className="flex flex-row items-center gap-3">
              <NavigationMenuItem>
                <Link href="/account" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Mon compte
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Logout onClick={onLogout} />
              </NavigationMenuItem>
            </div>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

function NavbarSkeleton() {
  return (
    <div className="border-b border-accent py-1.5">
      <NavigationMenu className="justify-center max-w-full p-4 bg-card">
        <NavigationMenuList className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-5">
            <Skeleton className={`w-20 h-7`} />
            <Skeleton className={`w-40 h-7`} />
            <Skeleton className={`w-32 h-7`} />
          </div>
          <div className="flex flex-row items-center gap-5">
            <Skeleton className={`w-32 h-7`} />
            <Skeleton className={`w-32 h-7`} />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
