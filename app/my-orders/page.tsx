import React from "react";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { redirect } from "next/navigation";
import Header from "../components/Header";

const MyOrders = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const orders = await db.order.findMany({});
  return (
    <div>
      <Header />
      <div className="py-6">
        <h2 className="font-semibold">Meus pedidos</h2>
        {orders.map((order, i)=>(
            <p key={i}>{order.id}</p>
        ))}
        <>
        </>
      </div>
    </div>
  );
};

export default MyOrders;
