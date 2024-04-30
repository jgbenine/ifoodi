import Categories from "./components/Categories";
import Header from "./components/Header";
import Search from "./components/Search";
import { ProductsList } from "./components/Products";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "./components/ui/button";
import { db } from "./_lib/prisma";
import { BannerPromo } from "./components/BannerPromo";
import { Restaurants } from "./components/Restaurants";

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
    <div className="px-5 pt-6">
      <Header />
      <Search />
      <Categories />
      <BannerPromo src="/img/banner-1.png" alt="Descontos em pizzas" />
      <div className="py-2">
        <div className="flex items-center justify-between">
          <h2>Mais Pedidos</h2>
          <Button variant="ghost" className="h-fit px-0 hover:bg-transparent">
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <ProductsList products={products} />
      </div>
      <BannerPromo src="/img/banner-2.png" alt="Descontos em Hamburgers" />

      <Restaurants />
    </div>
  );
}
