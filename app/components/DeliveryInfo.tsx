import React from 'react'
import { Card } from './ui/card'
import { BikeIcon, TimerIcon } from 'lucide-react'
import { formatCurrency } from '../_helpers/price'
import { Restaurant } from '@prisma/client'

interface PropsDelivery {
  restaurant: Pick<Restaurant, 'deliveryPrice' | 'deliveryMinutes'>
}

export const DeliveryInfo = ({restaurant}: PropsDelivery) => {
  return (
    <Card className="my-6 flex justify-around py-3 mx-2">
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center gap-1 text-muted-foreground">
        <BikeIcon size={14} />
        <p>Entrega</p>
      </div>
      <span>
        {Number(restaurant.deliveryPrice) > 0 ? (
          <p className="text-sm font-semibold">
            R${formatCurrency(Number(restaurant.deliveryPrice))}
          </p>
        ) : (
          <p className="text-sm font-semibold">Gratis</p>
        )}
      </span>
    </div>
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center gap-1 text-muted-foreground">
        <TimerIcon size={14} />
        <p>Entrega</p>
      </div>
      <span>
          <p className="text-sm font-semibold">{restaurant.deliveryMinutes}min</p>
      </span>
    </div>
  </Card>
  )
}


