import React from "react";
import CardRestaurant from "./CardRestaurant";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";

export const Restaurants = async () => {
  const session = await getServerSession(authOptions);
  const restaurants = await db.restaurant.findMany({ take: 10 });
  const userFavoritesRestaurants = await db.userFavoriteRestaurants.findMany({
    where: { userId: session?.user?.id },
  });

  return (
    <div className="flex gap-2 overflow-x-scroll px-3 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurants) => (
        <CardRestaurant
          key={restaurants.id}
          restaurant={restaurants}
          userId={session?.user?.id}
          userFavoritesRestaurants={userFavoritesRestaurants}
        />
      ))}
    </div>
  );
};
