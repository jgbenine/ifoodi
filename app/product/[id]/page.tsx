import { db } from '@/app/_lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react'


interface PropsProduct{
  params:{
    id: string;
  }
}

const ProductPage = async ({params: {id} }: PropsProduct) => {
  const product = await db.product.findUnique({
    where:{
      id,
    },
  })

  if(!product){
    return notFound();
  }
    

  return (
    <section>
        <div>
            <Image src={product?.imageUrl} alt={product?.name}  />
        </div>
    </section>
  )
}

export default ProductPage
