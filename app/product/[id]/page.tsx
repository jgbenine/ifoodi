import { formatCurrency, totalPriceCalculator } from "@/app/_helpers/price";
import { db } from "@/app/_lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { ImageProduct } from "../_components/ImageProduct";
import { BadgeDiscount } from "@/app/components/badgeDiscount";

interface PropsProduct {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: PropsProduct) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <section>
      <ImageProduct product={product} />
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
        <h1 className="text-xl font-semibold">{product.name}</h1>
        <div>
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
      </article>
    </section>
  );
};

export default ProductPage;
