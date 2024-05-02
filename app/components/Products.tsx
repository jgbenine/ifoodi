import React from 'react';
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

export const ProductsList = ({products}: PropsProductList) => {  
  return (
    <div className="flex gap-2 px-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
      {products.map((product)=> (
        <CardProduct key={product.id} product={product} />
      ))}
    </div>
  )
}

