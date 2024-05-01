"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BadgeDiscount } from "./BadgeDiscount";
import { Prisma } from "@prisma/client";
import { formatCurrency, totalPriceCalculator } from "../_helpers/price";
import { Button } from "./ui/button";
import { BikeIcon, MinusIcon, Plus, TimerIcon } from "lucide-react";
import { Card } from "./ui/card";
import { ProductsList } from "./Products";
import { DeliveryInfo } from "./DeliveryInfo";

interface PropsProductDetails {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  outersProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

export const ProductDetails = ({
  product,
  outersProducts,
}: PropsProductDetails) => {
  const [quantidade, setQuantidade] = useState(1);

  const handleAddQuantidade = () =>
    setQuantidade((quantidadeAtual) => quantidadeAtual + 1);

  const handleRemoveQuantidade = () =>
    setQuantidade((quantidadeAtual) => {
      if (quantidadeAtual === 1) return 1;
      return quantidadeAtual - 1;
    });

  return (
    <article className="relative z-50 mt-[-1.5rem] space-y-2 rounded-tl-2xl rounded-tr-2xl bg-white pt-4">
      <div className="flex items-center gap-2 px-3">
        <span className="relative h-10 w-10">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </span>
        <p className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </p>
      </div>
      <div>
        <div className="flex justify-between px-3">
          <div>
            <h1 className="text-xl font-semibold">{product.name}</h1>
            <div className="flex gap-2">
              <h2 className="text-xl font-semibold">
                R${formatCurrency(totalPriceCalculator(product))}
              </h2>
              {product.discount > 0 && <BadgeDiscount product={product} />}
            </div>
            {product.discount > 0 && (
              <p className="text-sm text-muted-foreground">
                De: {formatCurrency(Number(product.price))}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 px-3">
            <Button
              className="rounded-full bg-primary shadow-md"
              size="icon"
              variant="ghost"
              onClick={handleRemoveQuantidade}
            >
              <MinusIcon className="" />
            </Button>
            <p className="min-w-[25px] text-center font-semibold">
              {quantidade}
            </p>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full border border-gray-100 shadow-md focus:border-0"
              onClick={handleAddQuantidade}
            >
              <Plus />
            </Button>
          </div>
        </div>
        <DeliveryInfo restaurant={product.restaurant} />
        <div className="mx-3 mb-3 space-y-3">
          <h3 className="font-semibold">Sobre</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>

        <div className="mb-3 space-y-3">
          <h3 className="mx-3 font-semibold">Sucos</h3>
          <ProductsList products={outersProducts} />
        </div>
      </div>
    </article>
  );
};
