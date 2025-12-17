import { useNavigate,useParams } from "react-router-dom";
import { useProducts } from "../contexts/ProductsContexts";

export default function ProductDetail() {
  const { id } = useParams(); // /products/:id の id を取得
  const { products } = useProducts();
  const navigate = useNavigate();

  // URL の id は string なので number に変換
  const productId = Number(id);

  // Context から該当商品を探す
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <p>商品が見つかりませんでした。</p>;
  }
  const goMessage = () => {
    navigate(`/products/${id}/messages-pre`);
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