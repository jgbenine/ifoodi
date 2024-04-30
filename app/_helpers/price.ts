import { Product } from "@prisma/client";

export const totalPriceCalculator = (product: Product): number => {
  if(product.discount === 0){
    return Number(product.price);
  }
  const discount = Number(product.price) * (product.discount / 100);
  return Number(product.price) - discount;
}

export const formatCurrency= (value: number): string =>{
  return `R${Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format((value))}`

}
