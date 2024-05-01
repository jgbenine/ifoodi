import React from 'react'
import { db } from '../_lib/prisma'
import CardRestaurant from './CardRestaurant'

export const Restaurants = async () => {
  const restaurants = await db.restaurant.findMany({take: 10})

  return (
    <div className="flex gap-2 overflow-x-scroll [&::-webkit-scrollbar]:hidden px-2">
    {restaurants.map((restaurants)=> (
      <CardRestaurant key={restaurants.id}  restaurant={restaurants} />
    ))}
  </div>
  )
}

