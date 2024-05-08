"use server"
import { db } from "../_lib/prisma"

export const favoritesRestaurants = (restaurantId: string, userId: string) => {
  return db.userFavoriteRestaurants.create({
    data: {
      userId,
      restaurantId,
    },
  })
}