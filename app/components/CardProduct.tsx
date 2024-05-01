import { Prisma, Product } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { formatCurrency, totalPriceCalculator } from "../_helpers/price";
import { ArrowDownIcon } from "lucide-react";

interface PropsProduct {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
}

const CardProduct = ({ product }: PropsProduct) => {
  return (
    <div className="w-[150px] min-w-[150px] space-y-2">
      <div className="relative h-[150px]">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="shadown-md rounded-lg object-cover"
        />
        {product.discount && (
          <div className="absolute right-2 top-2 flex  items-center rounded-full bg-primary px-2 py-[2px]">
            <span className="flex items-center gap-0.5 text-sm font-semibold text-white">
              <ArrowDownIcon size={12} className="fill-white text-white" />
              {product.discount}%
            </span>
          </div>
        )}
      </div>
      <div>
        <h2 className="truncate text-sm"> {product.name}</h2>
        <span className="flex items-center gap-1">
          <h3 className="font-bold">
            R$
            {formatCurrency(totalPriceCalculator(product))}
          </h3>
          {product.discount > 0 && (
            <p className="text-xs text-muted-foreground line-through">
              {formatCurrency(Number(product.price))}
            </p>
          )}
        </span>
        <span className="text-muted-foregoround mt-0 text-xs">
          {product.restaurant.name}
        </span>
      </div>
    </div>
  );
};

export default CardProduct;
