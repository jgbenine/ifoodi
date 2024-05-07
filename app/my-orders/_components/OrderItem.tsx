"use client";
import { formatCurrency } from "@/app/_helpers/price";
import { Avatar, AvatarImage } from "@/app/components/ui/avatar";
import { Card, CardContent } from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const getOrderStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case "CANCELED":
      return "Cancelado";
    case "CONFIRMED":
      return "Confirmado";
    case "DELIVERING":
      return "Enviado";
    case "PREPARING":
      return "Em preparo";
    case "FINISHED":
      return "Finalizado";
  }
};

const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <Card>
      <CardContent className="py-5">
        <div className="rounded-full text-muted-foreground">
          <span className={`rounded-full bg-muted py-2 px-4 text-xs font-semibold ${order.status !== 'FINISHED' && "bg-green-500 text-white"}`}>
            {getOrderStatusLabel(order.status)}
          </span>
        </div>

        <article className="my-2 flex items-center justify-between gap-2">
          <div className="flex w-full items-center justify-between">
            <span className="flex gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={order.restaurant?.imageUrl} />
              </Avatar>
              <p className="font-semibold">{order.restaurant?.name}</p>
            </span>
            <Link href={`/restaurants/${order.restaurantId}`} className="h-5 w-5 py-4" >
              <ChevronRight />
            </Link>
          </div>
        </article>
        <div className="py-2">
          <Separator />
        </div>

        <>
          {order.products.map((product) => (
            <div className="flex items-center gap-1 space-x-1" key={product.id}>
              <div className="flex my-3 h-5 w-5 items-center justify-center rounded-full bg-muted">
                <span className="block text-xs font-semibold">
                  {product.quantity}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {product.product.name}
              </p>
            </div>
          ))}
          <div className="py-2">
            <Separator />
          </div>
          <p className="text-muted-foreground font-semibold">R${formatCurrency(Number(order.totalPrice))}</p>
        </>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
