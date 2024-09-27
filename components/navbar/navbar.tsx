"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Key, useEffect } from "react";
import Login from "../auth/login";
import Register from "../auth/register";
import { useAuthStore } from "@/store/authStore";
import { Button } from "../ui/button";

interface NavbarItems {
  text: string;
  href: string;
  component?: React.FC;
}

export default function Navbar({
  left,
  right,
}: {
  left: NavbarItems[];
  right: NavbarItems[];
}) {
  const { isLoggedIn, logout } = useAuthStore();

  return (
    <div className="border-b border-accent">
      <NavigationMenu className="justify-center max-w-full p-4 bg-card">
        <NavigationMenuList className="flex flex-row justify-between">
          <div className="flex flex-row items-center">
            {left.map((item: NavbarItems, key: Key) => {
              return (
                <NavigationMenuItem key={key}>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    href={item.href}
                  >
                    {item.text}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </div>
          {!isLoggedIn ? (
            <div className="flex flex-row items-center">
              <Login />
              <Register />
            </div>
          ) : (
            <Button variant={"ghost"} onClick={logout}>
              Se déconnecter
            </Button>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
