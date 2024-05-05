"use client";
import { useContext } from "react";
import { CartContext } from "@/app/_contextData/Cart";
import { Restaurant } from "@prisma/client";
import { formatCurrency } from "@/app/_helpers/price";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import { CartModal } from "@/app/components/CartModal";

interface PropsCartsBanner {
  restaurant: Pick<Restaurant, "id">;
}

export const CartBanner = ({ restaurant }: PropsCartsBanner) => {
  const { products, totalPrice, totalQuantityProductsInCart } =
    useContext(CartContext);

  const restaurantHasProductOnCart = products.some((product) => {
    if (product.restaurant && restaurant.id) {
      return restaurant.id === product.restaurantId;
    }
  });
  console.log({ restaurantHasProductOnCart });
  if (!restaurantHasProductOnCart) return null;

  return (
    <div className="fixed bottom-0 left-0 z-30 flex w-full justify-between bg-white p-5 pt-3 border-t-[1px] border-solid border-muted shadow-md">
      <div className="flex flex-col">
        <p className="text-xs text-muted-foreground">Total sem entrega</p>
        <h3 className="font-semibold">
          RS{formatCurrency(totalPrice)}
          <span className="text-xs font-normal text-muted-foreground">
            / {totalQuantityProductsInCart}{" "}
            {totalQuantityProductsInCart > 1 ? "items" : "item"}
          </span>
        </h3>
      </div>
      <Sheet>
        <SheetTrigger>
          <Button className="flex gap-2">
            Ver sacola <ShoppingBag size={15} />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle className="flex items-center gap-2">
            Sacola
            <ShoppingBag size={20} />
          </SheetTitle>
          <CartModal />
        </SheetContent>
      </Sheet>
    </div>
  );
};
