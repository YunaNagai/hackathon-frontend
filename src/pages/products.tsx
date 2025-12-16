import { useState } from "react";

export default function Products() {
  // 仮データ（API をつなぐまではこれで OK）
  const [products] = useState([
    { id: 1, title: "サンプル商品A", price: 1200, imageUrl: "" },
    { id: 2, title: "サンプル商品B", price: 2400, imageUrl: "" },
    { id: 3, title: "サンプル商品C", price: 3600, imageUrl: "" },
  ]);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h1>商品一覧</h1>

      {/* 検索バー */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="商品名で検索"
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
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 12,
              cursor: "pointer",
            }}
            onClick={() => (window.location.href = `/products/${p.id}`)}
          >
            <div
              style={{
                width: "100%",
                height: 120,
                backgroundColor: "#eee",
                marginBottom: 10,
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
  );
}