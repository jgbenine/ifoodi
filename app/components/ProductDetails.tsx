"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { BadgeDiscount } from "./BadgeDiscount";
import { Prisma } from "@prisma/client";
import { formatCurrency, totalPriceCalculator } from "../_helpers/price";
import { Button } from "./ui/button";
import {
  BikeIcon,
  CarIcon,
  MinusIcon,
  Plus,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCartIcon,
  TimerIcon,
} from "lucide-react";
import { Card } from "./ui/card";
import { ProductsList } from "./Products";
import { DeliveryInfo } from "./DeliveryInfo";
import { CartContext } from "../_contextData/Cart";
import { Sheet, SheetContent, SheetTitle } from "./ui/sheet";
import { CartModal } from "./CartModal";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogAction,
} from "./ui/alert-dialog";
// import {
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogDescription,
//   AlertDialogTitle,
// } from "@radix-ui/react-alert-dialog";

interface PropsProductDetails {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  outersProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

export const ProductDetails = ({
  product,
  outersProducts,
}: PropsProductDetails) => {
  const [quantidade, setQuantidade] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [modalDialog, setModalDialog] = useState(false);  
  const { addProductToCart, products } = useContext(CartContext);

  function addToCart() {
    addProductToCart(product, quantidade);
    setIsCartOpen(true);
  }

  const handleAddProductClick = () => {
    const hasDifferentRestaurantProduct = products.some(
      (selectedProducted) =>
        selectedProducted.restaurantId !== product.restaurantId,
    );

    if (hasDifferentRestaurantProduct) {
      return setModalDialog(true);
    }
    addToCart();
  };

  const handleAddQuantidade = () =>
    setQuantidade((quantidadeAtual) => quantidadeAtual + 1);

  const handleRemoveQuantidade = () =>
    setQuantidade((quantidadeAtual) => {
      if (quantidadeAtual === 1) return 1;
      return quantidadeAtual - 1;
    });

  return (
    <article className="relative z-50 mt-[-1.5rem] space-y-2 rounded-tl-2xl rounded-tr-2xl bg-white pt-4">
      <>
        <div className="flex items-center gap-2 px-2">
          <span className="relative h-10 w-10">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </span>
          <p className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </p>
        </div>
        <>
          <div className="flex justify-between px-2">
            <div>
              <h1 className="text-xl font-semibold">{product.name}</h1>
              <div className="flex gap-2">
                <h2 className="text-xl font-semibold">
                  R${formatCurrency(totalPriceCalculator(product))}
                </h2>
                {product.discount > 0 && <BadgeDiscount product={product} />}
              </div>
              {product.discount > 0 && (
                <p className="text-sm text-muted-foreground">
                  De: {formatCurrency(Number(product.price))}
                </p>
              )}
            </div>
            <div className="flex items-center gap-1 px-2">
              <Button
                className="rounded-full bg-primary shadow-md"
                size="icon"
                variant="ghost"
                onClick={handleRemoveQuantidade}
              >
                <MinusIcon className="" />
              </Button>
              <p className="min-w-[25px] text-center font-semibold">
                {quantidade}
              </p>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full border border-gray-100 shadow-md focus:border-0"
                onClick={handleAddQuantidade}
              >
                <Plus />
              </Button>
            </div>
          </div>
          <DeliveryInfo restaurant={product.restaurant} />
          <div className="mx-3 mb-3 space-y-3">
            <h3 className="font-semibold">Sobre</h3>
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>

          <div className="mb-3 space-y-3">
            <h3 className="mx-3 font-semibold">Sucos</h3>
            <ProductsList products={outersProducts} />
          </div>

          <div className="mt-6 p-3">
            <Button
              className="flex w-full items-center gap-1 font-semibold"
              onClick={handleAddProductClick}
            >
              Adicionar á sacola
              <ShoppingBag size={20} />
            </Button>
          </div>
        </>
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetContent>
            <SheetTitle className="flex items-center gap-2">
              Sacola
              <ShoppingBag size={20} />
            </SheetTitle>
            <CartModal />
          </SheetContent>
        </Sheet>

        <AlertDialog open={modalDialog} onOpenChange={setModalDialog}>
          <AlertDialogContent className="m-2 max-w-[350px] rounded-sm">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-semibold">
                Deseja limpar sacola?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja limpar sacola e adicionar um novo
                produto?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex w-full flex-row justify-center gap-4">
              <AlertDialogAction
                className="rounded-md border border-zinc-200"
                onClick={addToCart}
              >
                Confirmar
              </AlertDialogAction>
              <AlertDialogCancel className="mt-0 border-0 bg-slate-400 text-white">
                Cancelar
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    </article>
  );
};
