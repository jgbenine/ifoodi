import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import { formatCurrency } from "../_helpers/price";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

interface PropsCardRestaurant {
  restaurant: Restaurant;
}

export const CardRestaurant = ({ restaurant }: PropsCardRestaurant) => {
  return (
    <Link href={`/restaurants/${restaurant.id}`} className="relative min-w-[266px] space-y-1 py-2">
      <div className="relative h-[136px] w-full">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="rounded-lg object-cover"
        />
        <div className="absolute top-0 flex w-full items-center justify-between p-2">
          <span className="flex items-center gap-1 rounded-full bg-white p-1">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
            <p className="text-xs font-bold"> 5.0</p>
          </span>
          <Button className="flex items-center gap-1 bg-white rounded-full h-[28px] px-2 text-xs font-bold">
            <HeartIcon size={12} className="fill-red-500 text-red-500" />
          </Button>
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
    </Link>
  );
};

export default CardRestaurant;
