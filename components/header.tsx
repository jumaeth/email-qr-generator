"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem, NavigationMenuLink,
  NavigationMenuList, NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import * as React from "react"
import {Separator} from "@/components/ui/separator";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Icons} from "@/components/icons";
import {useState} from "react";
import Logo from "@/components/logo";

const navItems = [
  {
    name: "Mail",
    href: "/mail",
    subNav: [
      {
        name: "QR-Generator",
        href: "/qr-generator"
      },
      {
        name: "MX Lookup",
        href: "/mx-lookup"
      },
    ]
  },
]

export const Header = () => {
  const [open, setOpen] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <header>
      <div className="hidden md:block">
        <div className="flex justify-between lg:w-1/2 md:w-2/3 pl-5 pr-5 mx-auto pt-2 pb-2">
          <Link href={"/home"} className="flex items-center">
            <Logo/>
          </Link>
          <NavigationMenu className="ml-5">
            <NavigationMenuList>
              {navItems.map((item, index) => {
                if (item.subNav) {
                  return (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid grid-cols-1 gap-1 w-[200px]">
                          {item.subNav.map((subItem, subIndex) => (
                            <ListItem key={subIndex} href={item.href + "/" + subItem.href} title={subItem.name}/>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }

                return (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink asChild>
                      <Link href={item.href}>{item.name}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
          <div/>
        </div>
        <Separator/>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <div className="flex items-center justify-between p-4">
            <Link href={"/home"} className="flex items-center">
              <Logo/>
            </Link>
            <SheetTrigger asChild>
              <Icons.menu className="h-8 w-8"/>
            </SheetTrigger>
          </div>

          <SheetContent side="right" className="w-64">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="m-4 flex flex-col space-y-4">
              {navItems.map((item, index) => {
                if (item.subNav) {
                  const isOpen = openIndex === index;

                  return (
                    <div key={index}>
                      <button
                        onClick={() => {
                          toggleDropdown(index)
                        }}
                        className="flex items-center text-base font-medium text-muted-foreground hover:text-foreground"
                      >
                        Mail
                        {isOpen ? (
                          <Icons.up className="ml-1 h-4 w-4"/>
                        ) : (
                          <Icons.down className="ml-1 h-4 w-4"/>
                        )}
                      </button>
                      {isOpen && (
                        <div className="ml-4 mt-1 flex flex-col gap-1">
                          {item.subNav.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={item.href + "/" + subItem.href}
                              onClick={() => {
                                setOpenIndex(null)
                                setOpen(false)
                              }}
                              className="text-base font-medium text-muted-foreground hover:text-foreground"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-base font-medium text-muted-foreground hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

function ListItem({
                    title,
                    children,
                    href,
                    ...props
                  }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}