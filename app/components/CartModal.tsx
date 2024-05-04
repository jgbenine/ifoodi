import React, { useContext } from "react";
import { CartContext } from "../_contextData/Cart";
import CartProduct from "./CartProduct";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

export const CartModal = () => {
  const { products, subTotalPrice, totalPrice, totalDiscounts } = useContext(CartContext);

  return (
    <section className="py-5 h-full flex flex-col justify-between">
      <div className="space-y-2">
        {products.map((product) => (
          <CartProduct key={product.id} cartProduct={product} />
        ))}
      </div>

      <div className="mt-6">
        <Card>
          <CardContent className="flex flex-col gap-4 py-5">
            <div className="flex items-center justify-between text-xs">
              <p className="text-muted-foreground">Subtotal</p>
              <p className="font-semibold">{formatCurrency(subTotalPrice)}</p>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-xs">
              <p className="text-muted-foreground">Descontos</p>
              <p className="font-semibold">{formatCurrency(totalDiscounts)}</p>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-xs">
              <p className="text-muted-foreground">Entrega</p>
              <p className="font-semibold">
                {Number(products[0]?.restaurant?.deliveryPrice) === 0
                  ? "Gratis"
                  : formatCurrency(
                      Number(products[0]?.restaurant?.deliveryPrice),
                    )}
              </p>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-xs">
              <p className="text-muted-foreground">Total</p>
              <p className="font-semibold">{formatCurrency(totalPrice)}</p>
            </div>
            <Button className="mt-2">Finalizar Pedido</Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
