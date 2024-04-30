import { Restaurant } from '@prisma/client'

interface PropsCardRestaurant {
  restaurant: Restaurant
}

export const CardRestaurant = ({restaurant}: PropsCardRestaurant) => {
  return (
    <div>
      {restaurant.name}
    </div>
  )
}

export default CardRestaurant
