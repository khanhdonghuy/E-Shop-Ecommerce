import React from "react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import api from "../API/api";
import { UserContext } from "../Layout/UserContext";

function WishList() {
  interface userType {
    countCart?: number;
    countWishList?: number;
    showAmountCart?: (data: number) => void;
    showAmountWishList?: (data: number) => void;
  }
  interface dataProductType {
    id: number;
    image: any;
    price: number;
    id_user: string;
    name: string;
  }
  let order: { [key: string]: number };
  let wishList: { [key: string]: number };
  let amountCartHeader = 0;
  let amountWishListHeader = 0;
  const user: userType = useContext(UserContext);
  const [dataProduct, setDataProduct] = useState<dataProductType[]>();
  const [countCart, setCountCart] = useState<number>();
  const [countWishList, setCountWishList] = useState<number>();

  const showAmountCart = () => {
    const infoCart = localStorage.getItem("infoCart");
    if (infoCart) {
      if (amountCartHeader === 0) {
        order = JSON.parse(infoCart);
        Object.keys(order).map((key) => {
          return (amountCartHeader += order[key]);
        });
      }
    }
  };
  showAmountCart();
  user.showAmountCart!(countCart!);
  const showAmountWishList = () => {
    const infoWishList = localStorage.getItem("infoWishList");
    if (infoWishList) {
      if (amountWishListHeader === 0) {
        wishList = JSON.parse(infoWishList);
        Object.keys(wishList).map((key) => {
          return (amountWishListHeader += wishList[key]);
        });
      }
    }
  };
  showAmountWishList();
  user.showAmountWishList!(countWishList!);

  const addProduct = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = event.target as typeof event.target & { id: string };
    if (dataProduct) {
      const idOrder = target.id;
      let itemOrder = 1;
      const infoCart = localStorage.getItem("infoCart");
      if (amountCartHeader === 0) {
        setCountCart(1);
      }
      if (infoCart) {
        order = JSON.parse(infoCart);
        Object.keys(order).map((key) => {
          if (idOrder === key) {
            return (itemOrder = order[idOrder] + 1);
          }
          return null;
        });
      }
      amountCart();
      order[idOrder] = itemOrder;
      localStorage.setItem("infoCart", JSON.stringify(order));
    }
  };
  const amountCart = () => {
    const infoCart = localStorage.getItem("infoCart");
    if (infoCart) {
      setCountCart(amountCartHeader + 1);
    }
  };

  const removeWishList = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = event.target as typeof event.target & { id: string };
    if (dataProduct) {
      const idWishList = parseFloat(target.id);
      const infoWishList = localStorage.getItem("infoWishList");
      if (infoWishList) {
        wishList = JSON.parse(infoWishList);
        delete wishList[idWishList];
        setCountWishList(amountWishListHeader - 1);
      }
      localStorage.setItem("infoWishList", JSON.stringify(wishList));
    }
  };

  const productItem = () => {
    if (dataProduct) {
      const infoWishList = localStorage.getItem("infoWishList");
      if (infoWishList) {
        return Object.keys(JSON.parse(infoWishList)).map((item, i) => {
          return dataProduct.map((value, key) => {
            if (item === String(value.id)) {
              const avatar = JSON.parse(value.image.split(","));
              return (
                <div key={key} className="col-sm-4 home">
                  <div className="product-image-wrapper">
                    <div className="single-products">
                      <div className="productnfo text-center">
                        <img
                          style={{ width: "242px", height: "252px" }}
                          src={`http://localhost/laravel/laravel/public/upload/user/product/${value.id_user}/${avatar[0]}`}
                          alt=""
                        />
                        <span className="price overlay">${value.price}</span>
                        <p>{value.name}</p>
                        <a
                          onClick={addProduct}
                          href="# "
                          id={String(value.id)}
                          className="btn btn-default add-to-cart add"
                        >
                          <i className="fa fa-shopping-cart" />
                          Add to cart
                        </a>
                      </div>
                      <div className="product-overlay">
                        <div className="overlay-content">
                          <span className="price overlay">${value.price}</span>
                          <p>{value.name}</p>
                          <a
                            onClick={addProduct}
                            href="# "
                            id={String(value.id)}
                            className="btn btn-default add-to-cart add"
                            data-toggle="modal"
                            data-target="#myModal"
                          >
                            <i className="fa fa-shopping-cart" />
                            Add to cart
                          </a>
                        </div>
                      </div>
                      <img
                        className="new"
                        src="http://localhost/laravel/laravel/public/upload/icon/new.png"
                        alt=""
                      />
                    </div>
                    <div className="choose">
                      <ul className="nav nav-pills nav-justified">
                        <li>
                          <Link to={`/Product/Detail/${value.id}`}>
                            <i className="fa fa-plus-square" />
                            Product detail
                          </Link>
                        </li>
                        <li>
                          <a
                            onClick={removeWishList}
                            id={String(value.id)}
                            href="# "
                          >
                            <i className="fa fa-plus-square" />
                            Remove from wishlist
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          });
        });
      }
    }
  };
  useEffect(() => {
    api
      .get("/product/wishlist")
      .then((res) => {
        setDataProduct(res.data.data);
        setCountCart(amountCartHeader);
        setCountWishList(amountWishListHeader);
      })
      .catch((error) => {
        console.log(error);
      });
    //eslint-disable-next-line
  }, []);
  return (
    <div className="col-sm-9 padding-right">
      <div className="features_items">
        <h2 className="title text-center">Wishlist</h2>
        {productItem()}
        <p className="result_price" />
      </div>
    </div>
  );
}

export default WishList;
