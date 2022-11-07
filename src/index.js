import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./component/Layout/Home";
import Account from "./component/Account/Account";
import Blog from "./component/Blog/Index";
import Detail from "./component/Blog/Detail";
import LoginRegis from "./component/Member";
import MyProduct from "./component/Product/MyProduct";
import AddProduct from "./component/Product/AddProduct";
import EditProduct from "./component/Product/EditProduct";
import DetailProduct from "./component/Product/DetailProduct";
import Cart from "./component/Cart/cart";
import WishList from "./component/WishList/WishList";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Login" element={<LoginRegis />} />
          <Route path="/MyProduct" element={<MyProduct />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/EditProduct/:id" element={<EditProduct />} />
          <Route path="/WishList" element={<WishList />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/Product/Detail/:id" element={<DetailProduct />} />
          <Route path="/blog/list" element={<Blog />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/blog/detail/:id" element={<Detail />} />
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);
reportWebVitals();
