import React from 'react';
import { db } from '../_lib/prisma';
import CardProduct from './CardProduct';
import { Prisma } from '@prisma/client';


interface PropsProductList {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>[];
}

export const ProductsList = async ({products}: PropsProductList) => {  
  return (
    <div className="flex gap-2 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
      {products.map((product)=> (
        <CardProduct key={product.id} product={product} />
      ))}
    </div>
  )
}

