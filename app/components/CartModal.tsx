import React, { useContext, useState } from "react";
import { CartContext } from "../_contextData/Cart";
import CartProduct from "./CartProduct";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
// import { DeliveryInfo } from "./DeliveryInfo";
import { createOrder } from "../_actions/order";
import { OrderStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogAction,
} from "./ui/alert-dialog";

export const CartModal = () => {
  const [isLoading, setLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const { data } = useSession();
  const { products, subTotalPrice, totalPrice, totalDiscounts, clearCart } =
    useContext(CartContext);

  async function handleFinishOrderClick() {
    if (!data?.user) return;
    const restaurant = products?.[0].restaurant;
    try {
      setLoading(true);
      setConfirmDialog(true);
      await createOrder({
        subTotalPrice,
        totalDiscounts,
        totalPrice,
        deliveryPrice: restaurant.deliveryPrice,
        deliveryMinutes: restaurant.deliveryMinutes,
        status: OrderStatus.CONFIRMED,
        restaurant: {
          connect: {
            id: restaurant.id,
          },
        },
        user: {
          connect: {
            id: data.user.id,
          },
        },
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      });
      clearCart();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex h-full flex-col justify-between py-5">
      <div className="space-y-2">
        {products.map((product) => (
          <CartProduct key={product.id} cartProduct={product} />
        ))}
      </div>
      {products.length > 0 ? (
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
                <p className="font-semibold">
                  -{formatCurrency(totalDiscounts)}
                </p>
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
              <Button
                className="mt-2"
                onClick={() => {
                  setConfirmDialog(true);
                }}
                disabled={isLoading}
              >
                <p>Finalizar Pedido</p>
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <h3 className="px-6 text-center">
            Selecione pelo menos um produto para matar sua fome!
          </h3>
        </div>
      )}

      <>
        <AlertDialog open={confirmDialog} onOpenChange={setConfirmDialog}>
          <AlertDialogContent className="m-2 max-w-[350px] rounded-sm">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-semibold">
                Confirmar pedido?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Seu pedido esta pronto para ir para o restaurante? deseja
                confirmar pedido?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex w-full flex-row justify-center gap-4">
              <AlertDialogAction
                className="rounded-md border border-zinc-200"
                onClick={handleFinishOrderClick}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <p>Confirmar Pedido</p>
                )}
              </AlertDialogAction>
              <AlertDialogCancel className="mt-0 border-0 bg-slate-400 text-white">
                Cancelar
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    </section>
  );
};
