import { createContext, useContext, useEffect, useState } from "react";
import { data } from "react-router-dom";
import { BACKEND_URL } from "../constants";


export type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl?: string;
  sellerId: string;
};

type ProductsContextType = {
  products: Product[];
  addProduct: (p: Product) => Promise<void>;
};

const ProductsContext = createContext<ProductsContextType | null>(null);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch(`${BACKEND_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  },[]);
  const addProduct = async (p: Product) => {
    const res = await fetch(`${BACKEND_URL}/products`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p),
    });
    const newProduct = await res.json();
    setProducts((prev) => [...prev, newProduct]);
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