import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import api from "../API/api";

function Home(props: any) {
  let order: any = {};
  let wishList: any = {};
  let amountCartHeader = 0;
  let amountWishListHeader = 0;
  const user: any = useContext(UserContext);
  const [dataProduct, setDataProduct] = useState<any[]>([]);
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
  user.showAmountCart(countCart);

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
  user.showAmountWishList(countWishList);

  const addProduct = (e: any) => {
    if (dataProduct) {
      const idOrder: string = e.target.id;
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

  const addWishList = (e: any) => {
    if (dataProduct) {
      const idWishList: string = e.target.id;
      let itemWishList = 1;
      const infoWishList = localStorage.getItem("infoWishList");
      if (amountWishListHeader === 0) {
        setCountWishList(1);
      }
      if (infoWishList) {
        wishList = JSON.parse(infoWishList);
        Object.keys(wishList).map((key) => {
          if (idWishList === key) {
            return (wishList = wishList[idWishList]);
          }
        });
      }
      if (infoWishList) {
        const checkWishList: string[] = [];
        wishList = JSON.parse(infoWishList);
        Object.keys(wishList).map((key) => {
          return checkWishList.push(key);
        });
        if (!checkWishList.includes(idWishList)) {
          setCountWishList(amountWishListHeader + 1);
        }
      }
      wishList[idWishList] = itemWishList;
      localStorage.setItem("infoWishList", JSON.stringify(wishList));
    }
  };
  const productItem = () => {
    if (dataProduct) {
      return dataProduct.map((value, key) => {
        const avatar = JSON.parse(value.image.split(","));
        return (
          <div key={key} className="col-sm-4 home">
            <div className="product-image-wrapper">
              <div className="single-products">
                <div className="productinfo text-center">
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
                    id={value.id}
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
                      id={value.id}
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
                    <Link to={"/Product/Detail/" + value.id}>
                      <i className="fa fa-plus-square" />
                      Product detail
                    </Link>
                  </li>
                  <li>
                    <a onClick={addWishList} id={value.id} href="#/">
                      <i className="fa fa-plus-square" />
                      Add to wishlist
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      });
    }
  };
  useEffect(() => {
    api
      .get("/product")
      .then((res) => {
        setDataProduct(res.data.data);
        setCountCart(amountCartHeader);
        setCountWishList(amountWishListHeader);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className="col-sm-9 padding-right">
        <div className="features_items">
          <h2 className="title text-center">Features Items</h2>
          {productItem()}
          <p className="result_price" />
        </div>
      </div>
    </>
  );
}
export default Home;
