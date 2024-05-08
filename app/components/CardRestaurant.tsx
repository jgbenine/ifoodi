"use client";
import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import { formatCurrency } from "../_helpers/price";
import { favoritesRestaurants } from "../_actions/restaurants";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import Image from "next/image";
import Link from "next/link";


interface PropsCardRestaurant {
  userId: string;
  restaurant: Restaurant;
}

export const CardRestaurant = ({ restaurant, userId }: PropsCardRestaurant) => {
  const { toast } = useToast()
  const handleFavoritesRestaurant = async () => {
    if (!userId) return;
    try {
      await favoritesRestaurants(userId, restaurant.id);

      toast({
        title: 'Restaurante adicionado aos favoritos',
      })
      console.log('exec')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <article className="relative min-w-[266px] space-y-1 py-2">
      <div className="relative h-[136px] w-full">
        <Link href={`/restaurants/${restaurant.id}`}>
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            className="rounded-lg object-cover"
          />
        </Link>
        <div className="absolute top-0 flex w-full items-center justify-between p-2">
          <span className="flex items-center gap-1 rounded-full bg-white p-1">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
            <p className="text-xs font-bold"> 5.0</p>
          </span>
          {userId && (
            <Button
              className="hover:color-white flex h-[28px] items-center gap-1 rounded-full bg-white px-2 text-xs font-bold"
              onClick={handleFavoritesRestaurant}
            >
              <HeartIcon size={12} className="fill-red-500" />
            </Button>
          )}
        </div>
      </div>
      <div className="pt-1">
        <h3 className="text-sm font-semibold">{restaurant.name}</h3>
        <div className="flex gap-3">
          <p className="flex items-center gap-1">
            <BikeIcon size={14} />
            <span className="text-xs text-muted-foreground">
              {Number(restaurant.deliveryPrice) === 0 ? (
                <>Entrega gratis</>
              ) : (
                <>R${formatCurrency(Number(restaurant.deliveryPrice))}</>
              )}
            </span>
          </p>
          <p className="flex items-center gap-1">
            <TimerIcon size={12} />
            <span className="text-xs text-muted-foreground">
              {restaurant.deliveryMinutes} min
            </span>
          </p>
        </div>
      </div>
    </article>
  );
};

export default CardRestaurant;
