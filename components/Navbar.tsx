"use client";
import React from "react";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { ThemeSwitcherBtn } from "./ThemeSwitcherBtn";
import { UserButton } from "@clerk/nextjs";

function Navbar() {
  return (
    <>
      <DesktopNavbar />
    </>
  );
}
// defining the routes for the navbar
const items = [
  {
    label: "Dasboard",
    link: "/",
  },
  {
    label: "Transactions",
    link: "/transaction",
  },
  {
    label: "Manage",
    link: "/manage",
  },
];

function DesktopNavbar() {
  return (
    <div className="hidden border-seperate border-b bg-background md:block">
      <nav className="container flex items-center justify-between px-8">
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <Logo />
          <div className="flex h-full">
            {items.map((item) => (
              <NavbarItem
                key={item.label}
                link={item.link}
                label={item.label}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcherBtn />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
    </div>
  );
}

function NavbarItem({ link, label }: { link: string; label: string }) {
  //which route is active
  const pathname = usePathname();
  // for example, if the current route is /transaction, the isActive will be true
  const isActive = pathname === link;

  return (
    <div className="relative flex items-center gap-4">
      <Link
        href={link}
        className={cn(
          buttonVariants({
            variant: "ghost",
          }),
          "w-full justify-start text-lg text-muted-foreground hover:text-primary-foreground",
          isActive && "text-foreground"
        )}
      >
        {" "}
        {label}
      </Link>
      {
        // if the route is active, we will show a line under the route
        isActive && (
          <div className="absolute -bottom-[2px]  left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block" />
        )
      }
    </div>
  );
}

export default Navbar;
