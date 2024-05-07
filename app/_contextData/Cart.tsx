"use client";
import { Prisma, Product } from "@prisma/client";
import { ReactNode, createContext, useMemo, useState } from "react";
import { totalPriceCalculator } from "../_helpers/price";

export interface ProductItem
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          id: true;
          deliveryPrice: true;
          deliveryMinutes: true;
        };
      };
    };
  }> {
  quantity: number;
}

interface PropsCartContext {
  products: ProductItem[];
  subTotalPrice: number;
  totalPrice: number;
  totalDiscounts: number;
  totalQuantityProductsInCart: number;
  addProductToCart: (
    product: Prisma.ProductGetPayload<{
      include: {
        restaurant: {
          select: {
            id: true;
            deliveryPrice: true;
            deliveryMinutes: true;
          };
        };
      };
    }>,
    quantity: number,
  ) => void;
  decreaseQuantityProductCart: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
  increaseQuantityProductCart: (productId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<PropsCartContext>({
  products: [],
  subTotalPrice: 0,
  totalPrice: 0,
  totalDiscounts: 0,
  totalQuantityProductsInCart: 0,
  addProductToCart: () => {},
  decreaseQuantityProductCart: () => {},
  removeProductFromCart: () => {},
  increaseQuantityProductCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductItem[]>([]);

  const subTotalPrice = useMemo<number>(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity;
    }, 0);
  }, [products]);

  const totalPrice = useMemo<number>(() => {
    return (
      products.reduce((acc, product) => {
        return acc + totalPriceCalculator(product) * product.quantity;
      }, 0) + Number(products[0]?.restaurant?.deliveryPrice)
    );
  }, [products]);

  //Total dos descontos
  const totalDiscounts =
    totalPrice - subTotalPrice + Number(products[0]?.restaurant?.deliveryPrice);

  //Total de produtos no carrinho
  const totalQuantityProductsInCart = useMemo<number>(() => {
    return products.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);
  }, [products]);

  function decreaseQuantityProductCart(productId: string) {
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
  }

  function increaseQuantityProductCart(productId: string) {
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
  }

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

  function addProductToCart(
    product: Prisma.ProductGetPayload<{
      include: {
        restaurant: {
          select: {
            id: true;
            deliveryPrice: true;
            deliveryMinutes: true;
          };
        };
      };
    }>,
    quantity: number,
  ) {
    const hasDifferentRestaurantProduct = products.some(
      (selectedProducted) =>
        selectedProducted.restaurantId !== product.restaurantId,
    );

    if (hasDifferentRestaurantProduct) {
      setProducts([]);
    }

    const isProductAlreadyAdded = products.some((p) => p.id === product.id);
    setProducts((prevProducts) => {
      if (isProductAlreadyAdded) {
        return prevProducts.map((cartProduct) =>
          cartProduct.id === product.id
            ? { ...cartProduct, quantity: cartProduct.quantity + quantity }
            : cartProduct,
        );
      } else {
        return [...prevProducts, { ...product, quantity }];
      }
    });
  }

  function clearCart() {
    return setProducts([]);
  }

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        removeProductFromCart,
        decreaseQuantityProductCart,
        increaseQuantityProductCart,
        totalDiscounts,
        totalPrice,
        subTotalPrice,
        totalQuantityProductsInCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
