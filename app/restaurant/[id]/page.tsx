import React from "react";
import { ImageRestaurant } from "../_components/ImageRestaurant";
import { db } from "@/app/_lib/prisma";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import { DeliveryInfo } from "@/app/components/DeliveryInfo";
import { notFound } from "next/navigation";
import { ProductsList } from "@/app/components/Products";

interface PropsRestaurant {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: PropsRestaurant) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: true,
      Product: {
        take: 10,
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

  if (!restaurant) {
    return notFound();
  }

  return (
    <section>
      <ImageRestaurant restaurant={restaurant} />
      <div className="flex w-full items-center justify-between px-2 py-4">
        <div className="flex items-center gap-2">
          <div className="relative h-10 w-10">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <p className="text-xs text-muted-foreground">{restaurant.name}</p>
        </div>

        <span className="flex items-center gap-1 rounded-full bg-gray-600 p-2">
          <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
          <p className="text-xs font-bold text-white"> 5.0</p>
        </span>
      </div>
      <DeliveryInfo restaurant={restaurant} />
      <div className="flex justify-center gap-2 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {restaurant.categories.map((category) => (
          <span
            key={category.name}
            className="min-w-[110px] rounded-lg border bg-white py-1 text-center"
          >
            <p className="text-xs text-muted-foreground">{category.name}</p>
          </span>
        ))}
      </div>

      <div className="py-4">
        <h2 className="mb-4 px-2 font-semibold">Mais pedidos</h2>
        <ProductsList products={restaurant.Product} />
      </div>
    </section>
  );
};

export default RestaurantPage;
