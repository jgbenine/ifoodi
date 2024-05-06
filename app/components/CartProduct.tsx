import React, { useContext } from "react";
import {
  CartContext,
  CartProduct,
} from "../_contextData/Cart";
import Image from "next/image";
import { formatCurrency, totalPriceCalculator } from "../_helpers/price";
import { Button } from "./ui/button";
import { MinusIcon, Plus, TrashIcon } from "lucide-react";

export interface PropsCartProduct {
  cartProduct: CartProduct;
}

const CartProduct = ({ cartProduct }: PropsCartProduct) => {
  const { decreaseQuantityProductCart, removeProductFromCart, increaseQuantityProductCart, } = useContext(CartContext);
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-4 ">
        <div className="relative h-20 w-20">
          <Image
            className="rounded-lg object-cover"
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
          />
        </div>
        <article className="space-y-1 ">
          <h3 className="text-xs">{cartProduct.name}</h3>
          <span className="flex items-center gap-1">
            <h4 className="text-sm font-bold">
              R${formatCurrency(totalPriceCalculator(cartProduct) * cartProduct.quantity)}
            </h4>
            {cartProduct.discount > 0 && (
              <p className="text-xs text-muted-foreground line-through">
                {formatCurrency(Number(cartProduct.price) * cartProduct.quantity)}
              </p>
            )}
          </span>
          <div className="flex items-center gap-0.5">
            <Button
              className="h-8 w-8 rounded-full bg-primary shadow-md"
              size="icon"
              variant="ghost"
              onClick={() => decreaseQuantityProductCart(cartProduct.id)}
            >
              <MinusIcon size={16} />
            </Button>
            <p className="min-w-[25px] text-center font-semibold">
              {cartProduct.quantity}
            </p>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full border border-gray-100 shadow-md focus:border-0"
              onClick={() => increaseQuantityProductCart(cartProduct.id)}
            >
              <Plus size={16} />
            </Button>
          </div>
        </article>
      </div>
      <Button onClick={() => removeProductFromCart(cartProduct.id)}>
        <TrashIcon size={16} />
      </Button>
    </div>
  );
};

export default CartProduct;
