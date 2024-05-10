"use server"
import { db } from "../_lib/prisma"

export const favoritesRestaurants = (userId: string, restaurantId: string, ) => {
  console.log(userId);
  return db.userFavoriteRestaurants.create({
    data: {
      userId,
      restaurantId,
    },
  })
}