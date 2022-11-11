import React, { useState } from "react";
import { useEffect } from "react";
import api from "../API/api";
import { Link } from "react-router-dom";

function MyProduct() {
  interface dataType {
    [key: string]: {
      image: any;
      id: number;
      name: string;
      id_user: string;
      price: number;
    };
  }
  const [data, setData] = useState<dataType>();
  console.log(data);

  const userData = JSON.parse(localStorage["checkInfo"]);

  const listProduct = () => {
    if (data) {
      return Object.keys(data).map((item, i) => {
        const avatar = JSON.parse(data[item].image.split(","));
        return (
          <tr key={data[item].id}>
            <th scope="row">{data[item].id}</th>
            <td>{data[item].name}</td>
            <td>
              {avatar.length > 1 ? (
                <img
                  style={{ width: "80px", height: "80px" }}
                  src={`http://localhost/laravel/laravel/public/upload/user/product/${data[item].id_user}/${avatar[0]}`}
                  alt=""
                />
              ) : (
                <img
                  style={{ width: "80px", height: "80px" }}
                  src={`http://localhost/laravel/laravel/public/upload/user/product/${
                    data[item].id_user
                  }/${JSON.parse(data[item].image)}`}
                  alt=""
                />
              )}
            </td>
            <td>${data[item].price}</td>
            <td>
              <Link
                className="btn btn-primary"
                to={"/EditProduct/" + data[item].id}
                aria-expanded="false"
              >
                View
              </Link>
            </td>
            <td>
              <a
                className="btn btn-primary"
                href="# "
                id={String(data[item].id)}
                onClick={handleDelete}
                aria-expanded="false"
              >
                Delete
              </a>
            </td>
          </tr>
        );
      });
    }
  };
  const accessToken = userData.tokenUser;
  const url = "/user/my-product";
  const config = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  };
  const handleDelete = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = event.target as typeof event.target & { id: string };
    const idCmt = target.id;
    api
      .get("/user/delete-product/" + idCmt, config)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    api
      .get(url, config)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="col-sm-9 padding-right">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h3>Your Product</h3>
              <div className="card">
                <div className="table-responsive">
                  <table className="table">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>{listProduct()}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProduct;
