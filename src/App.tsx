import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import RegisterForm from "./pages/register";
import Products from "./pages/products";
import ProductDetail from "./pages/productdetail";
import MessagesPre from "./pages/messagepre";
import Sell from "./pages/sell";
import Transaction from "./pages/transaction";
import SellerProducts from "./pages/SellerProducts";
import { AuthProvider } from "./contexts/AuthContext";
import { ProductsProvider } from "./contexts/ProductsContexts";
import { TransactionsProvider } from "./contexts/TransactionContext";
import { MessagesProvider } from "./contexts/MessagesContext";
import { ProtectedRoute } from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
    <ProductsProvider>
    <TransactionsProvider>
    <MessagesProvider>
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id" 
          element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id/messages-pre"
          element={
            <ProtectedRoute>
              <MessagesPre />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sell"
          element={
            <ProtectedRoute>
              <Sell />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions/:id"
          element={
            <ProtectedRoute>
              <Transaction />
            </ProtectedRoute>
          }
        />
        <Route path="/seller/products" element={<SellerProducts />} />
        
      </Routes>
    
    </MessagesProvider>
    </TransactionsProvider>
    </ProductsProvider>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
