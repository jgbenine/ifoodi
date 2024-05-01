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
    <article className="space-y-2 px-3 py-3">
      <div className="flex items-center gap-2">
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
        <div className="flex justify-between">
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
          <div className="flex items-center gap-1">
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
        <Card className="my-6 flex justify-around py-3">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <BikeIcon size={14} />
              <p>Entrega</p>
            </div>
            <span>
              {Number(product.restaurant.deliveryPrice) > 0 ? (
                <p className="text-sm font-semibold">
                  R${formatCurrency(Number(product.restaurant.deliveryPrice))}
                </p>
              ) : (
                <p className="text-sm font-semibold">Gratis</p>
              )}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <TimerIcon size={14} />
              <p>Entrega</p>
            </div>
            <span>
              {Number(product.restaurant.deliveryPrice) > 0 ? (
                <p className="text-sm font-semibold">
                  R${formatCurrency(Number(product.restaurant.deliveryPrice))}
                </p>
              ) : (
                <p className="text-sm font-semibold">Gratis</p>
              )}
            </span>
          </div>
        </Card>

        <div className="mb-3 space-y-3">
          <h3 className="font-semibold">Sobre</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>
        <div className="mb-3 space-y-3 mt-4">
        <h3 className="font-semibold">Sucos</h3>
          <ProductsList products={outersProducts} />
        </div>
      </div>
    </article>
  );
};
