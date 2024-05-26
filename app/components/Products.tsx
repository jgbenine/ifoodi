"use client";
import React from "react";
import CardProduct from "./CardProduct";
import { Prisma } from "@prisma/client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay} from 'swiper/modules';
import "swiper/css";

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

export const ProductsList = ({ products }: PropsProductList) => {
  return (
    <>
      <Swiper className="flex" modules={[Autoplay]} loop={true} spaceBetween={10} freeMode={true}
        autoplay={{
          delay: 3000,
        }}
        breakpoints={{
          420: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
        }}>
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <CardProduct product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
