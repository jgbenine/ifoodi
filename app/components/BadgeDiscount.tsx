import { Product } from '@prisma/client'
import { ArrowDownIcon } from 'lucide-react'
import React from 'react'

interface PropsBadge {
  product: Pick<Product,"discount">
}

export const BadgeDiscount = ({product}: PropsBadge) => {
  return (
    <div className="flex items-center rounded-full bg-primary px-3 py-[2px]">
    <span className="flex items-center gap-0.5 text-xs font-semibold text-white">
      <ArrowDownIcon size={12} className="fill-white text-white" />
      {product.discount}%
    </span>
  </div>
  )
}

