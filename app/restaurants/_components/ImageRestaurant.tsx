"use client";
import { Button } from "@/app/components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeft, HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useToggleFavoriteRestaurants from "@/app/_hooks/useToggleFavoriteRestaurants";
import { useSession } from "next-auth/react";

interface PropsRestaurant {
  restaurant: Pick<Restaurant, "id" | "name" | "imageUrl">;
}

export const ImageRestaurant = ({ restaurant }: PropsRestaurant) => {
  const router = useRouter();
  const {data} = useSession();
  
  const { handleFavoriteClick } = useToggleFavoriteRestaurants({
    restaurantId: restaurant.id,
    userId: data?.user.id,
  });

  const handleBackClick = () => router.back();
  return (
    <div className="realtive h-[215px] w-full">
      <Image
        src={restaurant?.imageUrl}
        alt={restaurant?.name}
        width={0}
        height={0}
        sizes="100vw"
        className="h-full w-full object-cover"
      />

      <div className="absolute left-0 px-2 top-2 w-full flex justify-between">
        <Button
          onClick={handleBackClick}
          className="rounded-full border border-gray-100 bg-white text-foreground shadow-lg hover:text-white"
          size="icon"
        >
          <ChevronLeft size={18} />
        </Button>
        <Button className="flex items-center gap-1 rounded-full bg-white px-2 text-xs font-bold" size="icon" onClick={handleFavoriteClick}>
          <HeartIcon size={18} className="fill-red-500 text-red-500" />
        </Button>
      </div>
    </div>
  );
};
