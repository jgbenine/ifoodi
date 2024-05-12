import React from "react";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import Header from "../components/Header";
import CardRestaurant from "../components/CardRestaurant";

const FavoriteRestaurants = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  };
  const userFavoriteRestaurants = await db.userFavoriteRestaurants.findMany({
    where: {
      userId: session?.user?.id 
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <section className="p-2">
    <span className="flex flex-col gap-1 mb-3">
      <Header />
    </span>
    <h2 className="font-semibold mb-0.5">Restaurantes Favoritos</h2>
    <div className="flex flex-col gap-2">
      {userFavoriteRestaurants.length > 0 ? (
        userFavoriteRestaurants.map(({restaurant}) => (
          <CardRestaurant key={restaurant.id} restaurant={restaurant} userId={session.user.id} userFavoritesRestaurants={userFavoriteRestaurants} />
        ))
      ): (<h3 className="font-medium"> Voce ainda não favoritou restaurantes</h3>)}
    </div>
  </section>
  );
};

export default FavoriteRestaurants;
