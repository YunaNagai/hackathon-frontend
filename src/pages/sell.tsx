import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../contexts/ProductsContexts";
import { useAuth } from "../contexts/AuthContext";

export default function Sell() {
  const navigate =useNavigate();
  const { user } =useAuth();
  const { addProduct } = useProducts();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  if (!user) {
  return <p>ログインしてください。</p>;
  }

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  addProduct({
    id: String(Date.now()),
    title,
    price: Number(price),
    description,
    imageUrl: image ? URL.createObjectURL(image) : undefined,
    sellerId: user!.uid,
  });
  navigate("/products");
};

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>商品を出品する</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* 商品名 */}
        <input
          type="text"
          placeholder="商品名"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: 8 }}
        />

        {/* 価格 */}
        <input
          type="number"
          placeholder="価格（円）"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ padding: 8 }}
        />

        {/* 商品説明 */}
        <textarea
          placeholder="商品の説明"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: 8, height: 120 }}
        />

        {/* 画像アップロード */}
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {/* プレビュー（仮） */}
        {image && (
          <p style={{ fontSize: 14, color: "#555" }}>
            選択された画像: {image.name}
          </p>
        )}

        {/* 出品ボタン */}
        <button
          style={{
            padding: "10px 20px",
            fontSize: 16,
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
          type="submit"
        >
          出品する
        </button>
        </form>
    </div>
  );
}