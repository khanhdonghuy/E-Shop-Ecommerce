import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../API/api";

function Cart(props: any) {
  const infoCart = localStorage.getItem("infoCart");
  const [dataProduct, setDataProduct] = useState<any[]>([]);
  const [dataCart, setDataCart] = useState<any>({});
  const tax = 2;
  let Orders: any = {};
  let subTotal = 0;

  const handleInput = (e: any) => {
    const idInput = e.target.id;
    const value = parseFloat(e.target.value);
    if (value === 0) {
      delete Orders[idInput];
      setDataCart(Orders);
      localStorage.setItem("infoCart", JSON.stringify(Orders));
    } else {
      setDataCart((state: any) => ({ ...state, [idInput]: value }));
      Orders[idInput] = value;
      localStorage.setItem("infoCart", JSON.stringify(Orders));
    }
  };

  const deleteProduct = (e: any) => {
    const idInput = e.target.id;
    delete Orders[idInput];
    setDataCart(Orders);
    localStorage.setItem("infoCart", JSON.stringify(Orders));
  };

  const upProduct = (e: any) => {
    const idInput = e.target.id;
    Object.keys(Orders).map((key, value) => {
      if (key === idInput) {
        setDataCart((state: any) => ({
          ...state,
          [idInput]: dataCart[idInput] + 1,
        }));
        Orders[idInput] = parseFloat(dataCart[idInput] + 1);
        localStorage.setItem("infoCart", JSON.stringify(Orders));
      }
    });
  };

  const downProduct = (e: any) => {
    const idInput = e.target.id;
    Object.keys(Orders).map((key, value) => {
      if (key === idInput) {
        if (dataCart[idInput] === 1) {
          delete Orders[idInput];
          setDataCart(Orders);
          localStorage.setItem("infoCart", JSON.stringify(Orders));
        } else {
          setDataCart((state: any) => ({
            ...state,
            [idInput]: dataCart[idInput] - 1,
          }));
          Orders[idInput] = dataCart[idInput] - 1;
          localStorage.setItem("infoCart", JSON.stringify(Orders));
        }
      }
    });
  };

  const handleCheckOut = () => {
    api
      .post("/product/cart", dataCart)
      .then((res) => {
        // console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showProduct = () => {
    if (dataProduct !== undefined) {
      if (infoCart) {
        Orders = JSON.parse(infoCart);
        return Object.keys(dataCart).map((key, value) => {
          return dataProduct.map((item: any, i) => {
            const avatar = JSON.parse(item.image.split(","));
            if (key === String(item.id)) {
              subTotal += dataCart[key]
                ? dataCart[key] * item.price
                : item.price * Orders[key];
              return (
                <tr id={key} key={i}>
                  <td className="cart_product">
                    <a href="# ">
                      <img
                        style={{ width: "200px", height: "200px" }}
                        src={`http://localhost/laravel/laravel/public/upload/user/product/${item.id_user}/${avatar[0]}`}
                        alt=""
                      />
                    </a>
                  </td>
                  <td className="cart_description">
                    <h4>
                      <a href="# ">{item.name}</a>
                    </h4>
                    <p>Web ID: 1089772</p>
                  </td>
                  <td className="cart_price">
                    <p>${item.price}</p>
                  </td>
                  <td className="cart_quantity">
                    <div className="cart_quantity_button">
                      <a
                        href="# "
                        id={key}
                        onClick={upProduct}
                        className="cart_quantity_up"
                      >
                        {" "}
                        +{" "}
                      </a>
                      <input
                        id={key}
                        onChange={handleInput}
                        className="cart_quantity_input"
                        type="number"
                        name="quantity"
                        value={dataCart[key] ? dataCart[key] : Orders[key]}
                        autoComplete="off"
                        size={2}
                      />
                      <a
                        href="# "
                        id={key}
                        onClick={downProduct}
                        className="cart_quantity_down"
                      >
                        -
                      </a>
                    </div>
                  </td>
                  <td className="cart_total">
                    <p className="cart_total_price">
                      $
                      {dataCart[key]
                        ? dataCart[key] * item.price
                        : Orders[key] * item.price}
                    </p>
                  </td>
                  <td className="cart_delete">
                    <a
                      href="# "
                      id={key}
                      onClick={deleteProduct}
                      className="cart_quantity_delete"
                    >
                      <i className="fa fa-times" />
                    </a>
                  </td>
                </tr>
              );
            }
          });
        });
      }
    }
  };
  useEffect(() => {
    api
      .get("/product")
      .then((res) => {
        setDataProduct(res.data.data);
        if (infoCart) {
          const Orders = JSON.parse(infoCart);
          setDataCart(Orders);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="col-sm-9 padding-right">
      <section id="cart_items">
        <div className="container">
          <div className="breadcrumbs">
            <ol className="breadcrumb">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li className="active">Shopping Cart</li>
            </ol>
          </div>
          <div className="table-responsive cart_info">
            <table className="table table-condensed">
              <thead>
                <tr className="cart_menu">
                  <td className="image">Item</td>
                  <td className="description" />
                  <td className="price">Price</td>
                  <td className="quantity">Quantity</td>
                  <td className="total">Total</td>
                  <td />
                </tr>
                {showProduct()}
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </section>
      <section id="do_action">
        <div className="container">
          <div className="heading">
            <h3>What would you like to do next?</h3>
            <p>
              Choose if you have a discount code or reward points you want to
              use or would like to estimate your delivery cost.
            </p>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="chose_area">
                <ul className="user_option">
                  <li>
                    <input type="checkbox" />
                    <label>Use Coupon Code</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Use Gift Voucher</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Estimate Shipping &amp; Taxes</label>
                  </li>
                </ul>
                <ul className="user_info">
                  <li className="single_field">
                    <label>Country:</label>
                    <select>
                      <option>United States</option>
                      <option>Bangladesh</option>
                      <option>UK</option>
                      <option>India</option>
                      <option>Pakistan</option>
                      <option>Ukraine</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field">
                    <label>Region / State:</label>
                    <select>
                      <option>Select</option>
                      <option>Dhaka</option>
                      <option>London</option>
                      <option>Dillih</option>
                      <option>Lahore</option>
                      <option>Alaska</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field zip-field">
                    <label>Zip Code:</label>
                    <input type="text" />
                  </li>
                </ul>
                <a className="btn btn-default update" href="# ">
                  Get Quotes
                </a>
                <a className="btn btn-default check_out" href="# ">
                  Continue
                </a>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="total_area">
                <ul>
                  <li>
                    Cart Sub Total <span id="subTotal">${subTotal}</span>
                  </li>
                  <li>
                    Eco Tax <span id="tax">$2</span>
                  </li>
                  <li>
                    Shipping Cost <span>Free</span>
                  </li>
                  <li>
                    Total <span id="total">${subTotal + tax}</span>
                  </li>
                </ul>
                <a className="btn btn-default update" href="# ">
                  Update
                </a>
                <a
                  onClick={handleCheckOut}
                  className="btn btn-default check_out"
                  href="# "
                >
                  Check Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cart;
