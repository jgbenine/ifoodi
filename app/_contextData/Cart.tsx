'use client'
import { Prisma, Product } from "@prisma/client";
import { ReactNode, createContext, useMemo, useState } from "react";
import { totalPriceCalculator } from "../_helpers/price";

export interface CartProduct extends Prisma.ProductGetPayload<{include: {
  restaurant: {
    select: {
      deliveryPrice: true;
    };
  };
}}> {
  quantity: number;
}

interface PropsCartContext{
  products: CartProduct[];
  subTotalPrice: number;
  totalPrice: number;
  totalDiscounts: number;
  addProductToCart: (product: Prisma.ProductGetPayload<{include: {
    restaurant: {
      select: {
        deliveryPrice: true;
      };
    };
   }}>, quantity: number) => void;
  decreaseQuantityProductCart: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
  increaseQuantityProductCart: (productId: string) => void;
}

export const CartContext = createContext<PropsCartContext>({
  products: [],
  subTotalPrice: 0,
  totalPrice: 0,
  totalDiscounts: 0,
  addProductToCart: () => {},
  decreaseQuantityProductCart: () => {},
  removeProductFromCart: () => {},
  increaseQuantityProductCart: () => {},
});

export const CartProvider = ({children}: {children: ReactNode}) =>{
   const [products, setProducts]= useState<CartProduct[]>([]);

   const subTotalPrice = useMemo<number>(()=>{
     return products.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity;
     }, 0)
   }, [products])

   const totalPrice = useMemo<number>(()=>{
     return products.reduce((acc, product) => {
      return acc + totalPriceCalculator(product) * product.quantity;
     }, 0) + Number(products[0]?.restaurant?.deliveryPrice)
   }, [products])

   //Total dos descontos
   const totalDiscounts = totalPrice - subTotalPrice  + Number(products[0]?.restaurant?.deliveryPrice); 

   function decreaseQuantityProductCart(productId: string){
    setProducts((prevProducts) => {
      if (!prevProducts) {
        console.log("Carrinho vazio");
        return [];
      }
      return prevProducts.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return cartProduct.quantity === 1
            ? cartProduct
            : { ...cartProduct, quantity: cartProduct.quantity - 1 };
        }
        return cartProduct;
      });
    });
  };

   function increaseQuantityProductCart(productId: string){
    setProducts((prevProducts) => {
      if (!prevProducts) {
        console.log("Carrinho vazio");
        return [];
      }
      return prevProducts.map((cartProduct) => {
        if (cartProduct.id === productId) {
        return { ...cartProduct, quantity: cartProduct.quantity + 1 };
        }
        return cartProduct;
      });
    });
  };

  function removeProductFromCart(productId: string) {
    setProducts((prevProducts) => {
      if (!prevProducts) {
        console.log("Carrinho vazio");
        return [];
      }
      // Filtrando todos os produtos menos o com id selecionado
      return prevProducts.filter((product) => product.id !== productId);
    });
  }

   function addProductToCart(product: Prisma.ProductGetPayload<{include: {
    restaurant: {
      select: {
        deliveryPrice: true;
      };
    };
   }}>, quantity: number){
    const hasDifferentRestaurantProduct = products.some(
      (selectedProducted) =>
        selectedProducted.restaurantId !== product.restaurantId,
    );

    if(hasDifferentRestaurantProduct){
      setProducts([]);
    }



    //Verificando se produto esta no carrinho
    const isProductAlreadyAdded = products.some(p => p.id === product.id);
    setProducts((prevProducts) => {
      if (isProductAlreadyAdded) {
   
        return prevProducts.map((cartProduct) =>
          cartProduct.id === product.id
            ? { ...cartProduct, quantity: cartProduct.quantity + quantity }
            : cartProduct
        );
      } else {
        return [...prevProducts, { ...product, quantity }];
      }
    });
  };


  return (
    <CartContext.Provider value={{products, addProductToCart, removeProductFromCart, decreaseQuantityProductCart, increaseQuantityProductCart, totalDiscounts, totalPrice, subTotalPrice}}>
      {children}
    </CartContext.Provider>
  )
}