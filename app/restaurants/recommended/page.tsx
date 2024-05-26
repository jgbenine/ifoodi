import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import CardRestaurant from "@/app/components/CardRestaurant";
import Header from "@/app/components/Header";
import { getServerSession } from "next-auth";
import React from "react";

const RestaurantsRecommended = async () => {
  const session = await getServerSession(authOptions);
  const userFavoriteRestaurants = await db.userFavoriteRestaurants.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      restaurant: true,
    },
  });
  const restaurants = await db.restaurant.findMany({});
  return (
    <section className="p-2">
      <span className="flex flex-col gap-1 mb-3">
        <Header />
      </span>
      <h2 className="font-semibold mb-0.5">Restaurantes Abertos</h2>
      <div className="flex flex-col gap-2 sm:grid grid-cols-2 lg:grid-cols-4">
        {restaurants.map((restaurant) => (
          <CardRestaurant key={restaurant.id} restaurant={restaurant} userFavoritesRestaurants={userFavoriteRestaurants} />
        ))}
      </div>
    </section>
  );
};

export default RestaurantsRecommended;
