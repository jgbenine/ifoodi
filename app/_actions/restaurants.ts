"use server";
import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

export const toggleUserFavoriteRestaurants = async (
  userId: string,
  restaurantId: string,
) => {
  const favoritos = await db.userFavoriteRestaurants.findFirst({
    where: {
      userId,
      restaurantId,
    },
  });

  if (favoritos) {
    await db.userFavoriteRestaurants.delete({
      where: {
        userId_restaurantId: {
          userId,
          restaurantId,
        },
      },
    });
    revalidatePath("/");
    return;
  }
  await db.userFavoriteRestaurants.create({
    data: {
      userId,
      restaurantId,
    },
  });
  revalidatePath("/")
};