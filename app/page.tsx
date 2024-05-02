import { ProductsList } from "./components/Products";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "./components/ui/button";
import { db } from "./_lib/prisma";
import { BannerPromo } from "./components/BannerPromo";
import { Restaurants } from "./components/Restaurants";
import Categories from "./components/Categories";
import Header from "./components/Header";
import Search from "./components/Search";
import Link from "next/link";

export default async function Home() {
  const products = await db.product.findMany({
    where: {
      discount: {
        gt: 0,
      },
    },
    take: 10,
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
      <div className="px-3">
        <Header />
        <div className="pt-4">
          <Search />
        </div>
        <Categories />
        <BannerPromo src="/img/banner-1.png" alt="Descontos em pizzas" />
      </div>
      <div className="space-y-2 py-3">
        <div className="flex items-center justify-between">
          <h2 className="px-3">Mais Pedidos</h2>
          <Button
            variant="ghost"
            className="h-fit px-3 hover:bg-transparent"
            asChild
          >
            <Link href="/product/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <ProductsList products={products} />
      </div>
      <div className="p-3">
        <BannerPromo src="/img/banner-2.png" alt="Descontos em Hamburgers" />
      </div>
      <div className="flex items-center justify-between">
        <h2 className="px-3">Restaurantes</h2>
        <Button
          variant="ghost"
          className="h-fit px-3 hover:bg-transparent"
          asChild
        >
          <Link href="/restaurant/recommended">
            Ver todos
            <ChevronRightIcon size={16} />
          </Link>
        </Button>
      </div>
      <Restaurants />
    </>
  );
}
