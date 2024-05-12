'use client'
import { Restaurant, UserFavoriteRestaurants } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "../_actions/search";
import Header from "@/app/components/Header";
import CardRestaurant from "../../components/CardRestaurant";

interface RestaurantProps {
  userFavoritesRestaurants: UserFavoriteRestaurants[];
}

const Restaurants = ({userFavoritesRestaurants}: RestaurantProps) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const searchParams = useSearchParams();
  const searchFor = searchParams.get("search");
  
  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurants(searchFor);
      setRestaurants(foundRestaurants);
    };
    fetchRestaurants();
  },[searchFor]);

  if(!searchFor) return notFound();

  return (
    <section className="p-2">
      <span className="mb-3 flex flex-col gap-1">
        <Header />
      </span>
      <h2 className="mb-0.5 font-semibold">Restaurantes Encontrados</h2>
      <div className="flex flex-col gap-2">
        {restaurants.map((restaurant) => (
          <CardRestaurant key={restaurant.id} restaurant={restaurant} userFavoritesRestaurants={userFavoritesRestaurants} />
        ))}
      </div>
    </section>
  );
};

export default Restaurants;
