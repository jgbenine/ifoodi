import React, { useContext } from "react";
import { CartContext } from "../_contextData/Cart";
import CartProduct from "./CartProduct";

export const CartModal = () => {
  const { products } = useContext(CartContext);

  return (
    <section className="py-5">
      <div className="space-y-2">
        {products.map((product) => (
         <CartProduct key={product.id} cartProduct={product} />
        ))}
      </div>
    </section>
  );
};
