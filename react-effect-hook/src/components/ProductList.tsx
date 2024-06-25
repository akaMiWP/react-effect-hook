import React, { useEffect, useState } from "react";

const ProductList = ({ category }: { category: string }) => {
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    console.log("Run side effects");
    setProducts(["Sports", "Kitchen"]);
  }, [category]);

  return (
    <div>
      <p className="text-start">Hello</p>
    </div>
  );
};

export default ProductList;
