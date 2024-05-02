import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center pb-5 pt-3 py-3">
      <Link href="/">
        <Image
          src="/img/logo.png"
          alt="ifoodi"
          height={60}
          width={90}
          sizes="100vw"
        />
      </Link>
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
