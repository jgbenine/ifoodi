import { db } from "../_lib/prisma";
import { CardCategory } from "./Category";

const Categories = async () => {
  const categories = await db.category.findMany({});

  return <>
    <div className="flex flex-wrap gap-2 pt-3 pb-5">
    {categories.map((category)=>(
      <CardCategory key={category.id} category={category} />
    ))}
    </div>
  </>;
};

export default Categories;
