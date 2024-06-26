"use client";
import React from "react";
import Logo, { LogoMobile } from "./Logo";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { ThemeSwitcherBtn } from "./ThemeSwitcherBtn";
import { UserButton } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

function Navbar() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
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

function MobileNavbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="block border-seperate bg-background md:hidden">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]" side="left">
            <Logo />
            <div className="flex flex-col gap-1 pt-4">
              {items.map((item) => (
                <NavbarItem
                  key={item.label}
                  link={item.link}
                  label={item.label}
                  onClick={() => setIsOpen((prev) => !prev)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <LogoMobile />
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcherBtn />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
    </div>
  );
}

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

function NavbarItem({
  link,
  label,
  // mobile navbar will close the menu when a route is clicked
  onClick,
}: {
  link: string;
  label: string;
  // mobile navbar will close the menu when a route is clicked
  onClick?: () => void;
}) {
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
        onClick={()=>{
          if(onClick) onClick();
        }}
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
