import Categories from "./components/Categories";
import Header from "./components/Header";
import Search from "./components/Search";
import { ProductsList } from "./components/Products";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "./components/ui/button";
import { db } from "./_lib/prisma";
import { BannerPromo } from "./components/BannerPromo";
import { Restaurants } from "./components/Restaurants";
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
      <div className="px-2">
        <Header />
        <Search />
        <Categories />
        <BannerPromo src="/img/banner-1.png" alt="Descontos em pizzas" />
      </div>
      <div className="space-y-2 py-2">
        <div className="flex items-center justify-between">
          <h2 className="px-2">Mais Pedidos</h2>
          <Button variant="ghost" className="h-fit px-0 hover:bg-transparent">
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <ProductsList products={products} />
      </div>
      <div className="px-2">
        <BannerPromo src="/img/banner-2.png" alt="Descontos em Hamburgers" />
      </div>

      <div className="py-2">
        <div className="flex items-center justify-between">
          <h2 className="px-2">Restaurantes</h2>
          <Link href="/restaurant/recommended">
            <Button variant="ghost" className="h-fit px-0 hover:bg-transparent">
              Ver todos
              <ChevronRightIcon size={16} />
            </Button>
          </Link>
        </div>
        <Restaurants />
      </div>
    </>
  );
}
