import React from 'react'
import { db } from '../_lib/prisma'
import CardRestaurant from './CardRestaurant'
import { getServerSession } from 'next-auth'
import { authOptions } from '../_lib/auth'

export const Restaurants = async () => {
  const session = await getServerSession(authOptions)
  const restaurants = await db.restaurant.findMany({take: 10})

  return (
    <div className="flex gap-2 overflow-x-scroll [&::-webkit-scrollbar]:hidden px-3">
    {restaurants.map((restaurants)=> (
      <CardRestaurant key={restaurants.id}  restaurant={restaurants} userId={session?.user?.id} />
    ))}
  </div>
  )
}

