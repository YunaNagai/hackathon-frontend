import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Product = {
  id: string;
  title: string;
  price: number;
  sellerId: string;
  imageUrl?: string;
  description?:string;
};

export default function ProductDetail() {
  const { id } = useParams(); // /products/:id の id を取得
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!id) {
      setError("商品IDが不正です");
      setLoading(false);
      return;
    }

    fetch(`https://hackathon-backend-1002011225238.us-central1.run.app/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("商品が見つかりません");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>商品が見つかりませんでした。</p>;

  const goMessage = () => {
    navigate(`/products/${id}/messages-pre`, {
      state: { product }
    });
  };


  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>{product.title}</h1>

      <div
        style={{
          width: "100%",
          height: 200,
          backgroundColor: product.imageUrl ? "transparent" : "#eee",
          backgroundImage: product.imageUrl ? `url(${product.imageUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 8,
          marginBottom: 20,
        }}
      />

      <p>価格: ¥{product.price.toLocaleString()}</p>
      <p style={{ marginTop: 20 }}>{product.description}</p>
      <button
        onClick={goMessage}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          backgroundColor: "#1976d2",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        購入前メッセージへ
      </button>
    </div>
  );
}