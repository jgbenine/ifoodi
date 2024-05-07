import React from "react";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { redirect } from "next/navigation";
import Header from "../components/Header";
import OrderItem from "./_components/OrderItem";

const MyOrders = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
      products: {
        include: {
          product: true,
        },
      }
    },
  });

  console.log(orders);

  return (
    <div>
      <Header />
      <div className="py-6">
        <h2 className="font-semibold">Meus pedidos</h2>
        {orders.map((order) => (
          <div className="space-y-3" key={order.id}>
            <OrderItem order={order} />
          </div>
        ))}
        <></>
      </div>
    </div>
  );
};

export default MyOrders;
