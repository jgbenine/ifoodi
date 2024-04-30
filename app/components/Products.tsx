import React from 'react';
import { db } from '../_lib/prisma';
import CardProduct from './CardProduct';

export const ProductsList = async () => {
  const products = await db.product.findMany({
    where: {
      discount: {
        gt: 0,
      },
    },
    take: 10,
    include:{
      restaurant: {
        select:{
          name: true,
        },
      }
    }
  })
  
  console.log(products);

  return (
    <div className="flex gap-2 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
      {products.map((product)=> (
        <CardProduct key={product.id} product={product} />
      ))}
    </div>
  )
}

