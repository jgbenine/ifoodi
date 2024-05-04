'use client'
import { Product } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";

export interface CartProduct extends Product {
  quantity: number;
}

interface PropsCartContext{
  products: CartProduct[];
  addProductToCart: (product: Product, quantity: number) => void;
  decreaseQuantityProductCart: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
  increaseQuantityProductCart: (productId: string) => void;
}

export const CartContext = createContext<PropsCartContext>({
  products: [],
  addProductToCart: () => {},
  decreaseQuantityProductCart: () => {},
  removeProductFromCart: () => {},
  increaseQuantityProductCart: () => {}
});

export const CartProvider = ({children}: {children: ReactNode}) =>{
   const [products, setProducts]= useState<CartProduct[]>([])

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

  function removeProductFromCart(productId: string){
    setProducts((prevProducts) => {
      if (!prevProducts) {
        console.log("Carrinho vazio");
        return [];
      }
      return prevProducts.filter((product) =>{product.id !== productId});
    });
   }

   function addProductToCart(product: Product, quantity: number){
    const isProductAlreadyAdded = products.some(p => p.id === product.id);
  
    setProducts((prevProducts) => {
      if (isProductAlreadyAdded) {
        // Update quantity for existing product
        return prevProducts.map((cartProduct) =>
          cartProduct.id === product.id
            ? { ...cartProduct, quantity: cartProduct.quantity + quantity }
            : cartProduct
        );
      } else {
        // Add new product to cart
        return [...prevProducts, { ...product, quantity }];
      }
    });
  };


  return (
    <CartContext.Provider value={{products, addProductToCart, removeProductFromCart, decreaseQuantityProductCart, increaseQuantityProductCart}}>
      {children}
    </CartContext.Provider>
  )
}