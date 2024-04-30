import Image from "next/image";
import Categories from "./components/Categories";
import Header from "./components/Header";
import Search from "./components/Search";
import { ProductsList } from "./components/Products";
import { ChevronRight, ChevronRightIcon, Link } from "lucide-react";
import { Button } from "./components/ui/button";
import { db } from "./_lib/prisma";

export default async function Home() {
  const products = await db.product.findMany({
    where: {
      discount: {
        gt: 0,
      },
    },
    take: 10,
    include:{
      restaurant: {
        select:{
          name: true,
        },
      }
    }
  })

  return (
    <div className="px-5 pt-6">
      <Header />
      <Search />
      <Categories />
      <div>
        <Image
          src="/img/banner-1.png"
          alt="Descontos em pizzas"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full"
          quality={100}
        />
      </div>
      <div className="py-2">
        <div className="flex items-center justify-between">
          <h2>Mais Pedidos</h2>
          <Button variant="ghost" className="px-0 h-fit hover:bg-transparent" >Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <ProductsList products={products} />
      </div>
    </div>
  );
}
