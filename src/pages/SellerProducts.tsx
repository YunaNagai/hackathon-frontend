import { useProducts } from "../contexts/ProductsContexts";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useTransactions } from "../contexts/TransactionContext";

export default function SellerProducts() {
  const { products } = useProducts();
  const { user } = useAuth();
  const { transactions } = useTransactions();
  const myProducts = (products ?? []).filter(
    (p) => p.sellerId === user?.uid
  );
  return (
    <div style={{ padding: 20 }}>
      <h1>あなたの出品した商品</h1>

      {myProducts.map((p) => {
        const transaction = transactions?.find(
          (t) => t.productId === p.id
        );

        return (
          <div key={p.id} style={{ marginBottom: 20 }}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>

            {transaction && (
              <Link to={`/transactions/${transaction.id}`}>
                取引ページへ
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
