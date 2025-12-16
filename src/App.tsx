import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Products from "./pages/products";
import ProductDetail from "./pages/productdetail";
import MessagesPre from "./pages/messagepre";
import Sell from "./pages/sell";
import Transaction from "./pages/transaction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products/:id/messages-pre" element={<MessagesPre />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/transaction/:id" element={<Transaction />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
