"use client";
import { Button } from "@/app/components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface PropsProduct {
  product: Pick<Product, "name" | "imageUrl">;
}

export const ImageProduct = ({ product }: PropsProduct) => {
  const router = useRouter();

  const handleBackClick = () => router.back();
  return (
    <div className="realtive h-[360px] w-full">
      <Image
        src={product?.imageUrl}
        alt={product?.name}
        width={0}
        height={0}
        sizes="100vw"
        className="h-full w-full object-cover"
      />
      <Button
        onClick={handleBackClick}
        className="absolute left-2 top-2 rounded-full bg-white text-foreground shadow-lg border border-gray-100 hover:text-white"
        size="icon"
      >
        <ChevronLeft size={18} />
      </Button>
    </div>
  );
};
