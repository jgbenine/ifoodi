import { db } from "@/app/_lib/prisma";
import CardRestaurant from "@/app/components/CardRestaurant";
import Header from "@/app/components/Header";
import Search from "@/app/components/Search";
import React from "react";

const RestaurantsRecommended = async () => {
  const restaurants = await db.restaurant.findMany({});
  return (
    <section className="p-2">
      <span className="flex flex-col gap-1 mb-3">
        <Header />
      </span>
      <h2 className="font-semibold mb-0.5">Restaurantes Abertos</h2>
      <div className="flex flex-col gap-2">
        {restaurants.map((restaurant) => (
          <CardRestaurant key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </section>
  );
};

export default RestaurantsRecommended;
