"use client";
import { Avatar, AvatarImage } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import React from "react";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: true;
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
        <div className="rounded-full px-2 text-muted-foreground">
          <span className="bg-muted text-xs font-semibold">
            {getOrderStatusLabel(order.status)}
          </span>
        </div>

        <article className="flex items-center justify-between">
          <div className="flex justify-between">
            <span>
              <Avatar className="h-6 w-6">
                <AvatarImage src={order.restaurant?.imageUrl} />
              </Avatar>
              <p className="font-semibold">{order.restaurant?.name}</p>
            </span>
            <Button className="h-5 w-5" size="icon" variant="ghost">
              <ChevronRight />
            </Button>
          </div>
        </article>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
