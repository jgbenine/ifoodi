"use client";
import React from "react";
import CardProduct from "./CardProduct";
import { Prisma } from "@prisma/client";
import { Swiper, SwiperSlide } from "swiper/react";
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
      <Swiper className="flex" spaceBetween={10} freeMode={true}  breakpoints={{
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
