"use client";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data } = useSession();
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
      {data?.user?.name ? (
        <>
          {data?.user?.name}
          <Button
            onClick={() => {
              signOut();
            }}
            size="icon"
            variant="outline"
            className="border-nopne bg-transparent"
          >
            Sair
          </Button>
        </>
      ) : (
        <Button
          onClick={() => {
            signIn();
          }}
          size="icon"
          variant="outline"
          className="border-nopne bg-transparent"
        >
          logar
        </Button>
      )}
      <Button
        size="icon"
        variant="outline"
        className="border-nopne bg-transparent"
      >
        <MenuIcon />
      </Button>
    </header>
  );
};

export default Header;
