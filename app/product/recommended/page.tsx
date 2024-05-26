import { db } from "@/app/_lib/prisma";
import CardProduct from "@/app/components/CardProduct";
import Header from "@/app/components/Header";
import React from "react";

const ProductsRecommended = async () => {
  const products = await db.product.findMany({
    where: {
      discount: {
        gt: 0,
      },
    },
    take: 20,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <Header />
      <section className="px-6 py-5">
        <h2 className="mb-3 text-lg font-semibold">Mais recomendados</h2>
        <div className="w-full grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {products.map((product) => (
            <CardProduct product={product} key={product.name} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductsRecommended;
