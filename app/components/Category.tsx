import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface PropsCategory {
  category: Category;
}

export const CardCategory = ({ category }: PropsCategory) => {
  return (
    <Link href={`/categories/${category.id}/products`} className="flex items-center gap-3 bg-white px-3 py-3 rounded-2xl border border-gray-100 shadow-md">
      <Image
        src={category.imageUrl}
        alt={category.name}
        width={30}
        height={30}
      />
      <div className="text-sm font-semibold">{category.name}</div>
    </Link>
  );
};

