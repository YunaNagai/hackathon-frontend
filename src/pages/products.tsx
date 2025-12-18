import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useProducts, Product } from "../contexts/ProductsContexts";
import { useState } from "react";
import { useTransactions } from "../contexts/TransactionContext";


export default function Products() {
  const { createTransaction } = useTransactions();
  const { user, login } = useAuth();
  const { products }=useProducts();
  const navigate = useNavigate();

  const [keyword, setKeyword] =useState("");
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(keyword.toLowerCase())
  );
  const startTransaction = (p: Product) => {
    if (!user) return;

    createTransaction({
      id: Date.now(),
      productId: p.id,
      buyerId: user.uid,
      sellerId: p.sellerId,
      status: "requested",
      createdAt: new Date().toISOString(),
    });
    navigate(`/products/${p.id}`);    
  }


  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() =>
            login({
              uid: "dummy-buyer",
              email: "buyer@example.com",
              name: "Yuna", 
              role: "buyer"
            })
          }
        >
          購入者として操作
        </button>

        <button
          onClick={() =>{
            login({
              uid: "dummy-seller",
              email: "seller@example.com",
              name: "Yuna",
              role: "seller" 
            });
            navigate("/sell");
          }}
        >
          出品者として操作
        </button>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
        <h1>商品一覧</h1>

      {/* 検索バー */}
        <div style={{ marginBottom: 20 }}>
          <input
            type="text"
            placeholder="商品名で検索"
            value={keyword}
            onChange={(e)=>setKeyword(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

      {/* 商品カード一覧 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 20,
          }}
        >
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              onClick={()=>startTransaction(p)}
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 12,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 120,
                  backgroundColor: p.imageUrl ? "transparent" : "#eee",
                  backgroundImage: p.imageUrl ? `url(${p.imageUrl})` :undefined,
                  marginBottom: 20,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 8,
                }}
              >
              {/* 画像は後で API から取得 */}
              </div>
              <h3 style={{ margin: "8px 0" }}>{p.title}</h3>
              <p>¥{p.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}