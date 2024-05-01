import React from "react";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import { ImageProduct } from "../_components/ImageProduct";
import { ProductDetails } from "@/app/components/ProductDetails";

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

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
    },
    include: {
      restaurant: true,
    },
  })


  if (!product) {
    return notFound();
  }

  return (
    <section>
      <ImageProduct product={product} />
      <ProductDetails product={product}  outersProducts={juices}/>
    </section>
  );
};

export default ProductPage;
