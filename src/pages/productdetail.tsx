import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams(); // /products/:id の id を取得
  const navigate =useNavigate();
  // 仮データ（API をつなぐまではこれで OK）
  const [product] = useState({
    id,
    title: "サンプル商品A",
    price: 1200,
    description: "これはサンプル商品の説明です。",
    imageUrl: "",
    sellerName: "出品者 太郎",
  });
  const goMessagesPre = () =>{
    navigate(`/products/${id}/messages-pre`);
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h1>商品詳細</h1>

      {/* 商品画像 */}
      <div
        style={{
          width: "100%",
          height: 300,
          backgroundColor: "#eee",
          marginBottom: 20,
        }}
      >
        {/* 画像は後で API から取得 */}
      </div>

      {/* 商品名・価格 */}
      <h2>{product.title}</h2>
      <p style={{ fontSize: 20, fontWeight: "bold" }}>
        ¥{product.price.toLocaleString()}
      </p>

      {/* 商品説明 */}
      <div style={{ marginTop: 20 }}>
        <h3>商品説明</h3>
        <p>{product.description}</p>
      </div>

      {/* 出品者情報 */}
      <div style={{ marginTop: 20 }}>
        <h3>出品者</h3>
        <p>{product.sellerName}</p>
      </div>

      {/* 購入前DMボタン */}
      <button
        style={{
          marginTop: 30,
          padding: "10px 20px",
          fontSize: 16,
          cursor: "pointer",
        }}
        onClick={goMessagesPre}
      >
        質問する（購入前DM）
      </button>
    </div>
  );
}