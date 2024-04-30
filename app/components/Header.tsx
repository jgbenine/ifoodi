import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between pt-6 px-5">
      <Image
        src="/img/logo.png"
        alt="ifoodi"
        height={60}
        width={90}
        sizes="100vw"
      />

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
