import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { div } from "framer-motion/client";
import { Key } from "react";

interface NavbarItems {
  text: string;
  href: string;
}

export default function Navbar({
  left,
  right,
}: {
  left: NavbarItems[];
  right: NavbarItems[];
}) {
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
          <div className="flex flex-row items-center">
            {right.map((item: NavbarItems, key: Key) => {
              return (
                <NavigationMenuItem key={key}>
                  <NavigationMenuLink
                    href={`/${item}`}
                    className={navigationMenuTriggerStyle()}
                  >
                    {item.text}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
