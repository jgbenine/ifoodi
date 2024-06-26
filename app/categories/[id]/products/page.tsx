import CardProduct from "@/app/components/CardProduct";
import Header from "@/app/components/Header";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";

interface PropsCategoryProducts {
  params: {
    id: string;
  };
}

const ProductsCategory = async ({ params: { id } }: PropsCategoryProducts) => {
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      Product: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!category) return notFound();

  return (
    <>
      <Header />
      <section className="px-6 py-5">
        <h2 className="mb-3 text-lg font-semibold">{category.name}</h2>
        <div className="w-full grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {category?.Product.map((product) => (
            <CardProduct product={product} key={product.name} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductsCategory;
