import { createContext, useContext, useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  imageUrl?: string;
};

type ProductsContextType = {
  products: Product[];
  addProduct: (p: Product) => void;
};

const ProductsContext = createContext<ProductsContextType | null>(null);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, title: "サンプル商品A", price: 1200, description: "説明A"},
    { id: 2, title: "サンプル商品B", price: 2400, description: "説明B"},
    { id: 3, title: "サンプル商品C", price: 3600, description: "説明C"},
  ]);

  const addProduct = (p: Product) => {
    setProducts((prev) => [...prev, p]);
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("ProductsProvider で囲ってください");
  return ctx;
}