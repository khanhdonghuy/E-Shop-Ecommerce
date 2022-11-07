import { useEffect, useState } from "react";
import api from "../API/api";

function MenuLeft() {
  const [brandCateList, setBrandCateList] = useState<any>({});

  const listCategory = () => {
    if (brandCateList.message === "success") {
      if (brandCateList.category.length > 0) {
        return brandCateList.category.map((value: any, key: number) => {
          return (
            <div key={key} className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <a href="# ">{value.category}</a>
                </h4>
              </div>
            </div>
          );
        });
      }
    }
  };

  const listBrand = () => {
    if (brandCateList.message === "success") {
      if (brandCateList.brand.length > 0) {
        return brandCateList.brand.map((value: any, key: number) => {
          return (
            <li key={key}>
              <a href="# ">
                {" "}
                <span className="pull-right"></span>
                {value.brand}
              </a>
            </li>
          );
        });
      }
    }
  };

  useEffect(() => {
    api
      .get("/category-brand")
      .then((res) => {
        setBrandCateList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className="col-sm-3">
        <div className="left-sidebar">
          <h2>Category</h2>
          <div className="panel-group category-products" id="accordion">
            {listCategory()}
          </div>
          <div className="brands_products">
            <h2>Brands</h2>
            <div className="brands-name">
              <ul className="nav nav-pills nav-stacked">{listBrand()}</ul>
            </div>
          </div>
          <div className="shipping text-center">
            <img
              src="http://localhost/laravel/laravel/public/frontend/images/home/shipping.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default MenuLeft;
