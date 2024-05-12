"use client";
import { Button } from "./ui/button";
import {
  Heart,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Sheet, SheetTrigger, SheetTitle, SheetContent } from "./ui/sheet";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "./ui/separator";

const Header = () => {
  const { data, status } = useSession();

  function handleLogInClick() {
    signIn();
  }
  function handleLogOutClick() {
    signOut();
  }

  return (
    <header className="flex items-center justify-between py-3 pb-5 pt-3">
      <Link href="/">
        <Image
          src="/img/logo.png"
          alt="ifoodi"
          height={60}
          width={90}
          sizes="100vw"
        />
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="border-nopne bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle className="flex items-center gap-2">Menu</SheetTitle>

          <div className="mt-6">
            {data?.user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={data?.user?.image as string | undefined}>
                      {/* <AvatarFallback>
                      {data?.user?.name?.split("")[0][0]}
                      {data?.user?.name?.split("")[0][1]}
                    </AvatarFallback> */}
                    </AvatarImage>
                  </Avatar>
                  <span className="flex flex-col">
                    <p className="text-xs font-semibold">{data?.user?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {data?.user?.email}
                    </p>
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Olá, Faça seu login!</h2>
                <Button size="icon" onClick={handleLogInClick}>
                  <LogInIcon />
                </Button>
              </div>
            )}

            {data?.user && (
              <>
                <div className="mt-6">
                  <Separator />
                </div>
                <nav className="mt-4 flex flex-col gap-3">
                  <Button
                    variant="ghost"
                    className="flex w-full items-center justify-start gap-4 rounded-full px-2"
                  >
                    <HomeIcon size={22} />
                    <p>Inicio</p>
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex w-full items-center justify-start gap-4 rounded-full px-2"
                    asChild
                  >
                    <Link href="/my-orders">
                      <ScrollTextIcon size={22} />
                      <p>Meus Pedidos</p>
                    </Link>
                  </Button>
                  <Link
                    className="flex w-full items-center justify-start gap-4 rounded-full px-2"
                    href="/favorite-restaurants"
                  >
                    <Heart size={22} />
                    <p>Favoritos</p>
                  </Link>
                </nav>
              </>
            )}
            <div className="mt-6">
              <Separator />
            </div>
            {data?.user && (
              <Button
                variant="ghost"
                className="mt-6 flex w-full items-center justify-start gap-4 rounded-full px-2"
                onClick={handleLogOutClick}
              >
                <LogOutIcon size={22} />
                <p>Sair da conta</p>
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
