import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../API/api";
import FormErrors from "../Layout/FormErrors";
let deleteImage: any[] = [];
function EditProduct(props: any) {
  interface state {
    dataProducts?: {
      id_category: number;
      id_brand: number;
      id_user: string;
      status: number;
      name: string;
      price: number;
      sale: number;
      image: string[];
      company: string;
      detail: string;
    };
    input?: {
      category?: number;
      brand?: number;
      name?: string;
      price?: number;
      company?: string;
      detail?: string;
      sale?: number;
      status?: number;
    };
  }
  interface errorSubmit {
    name?: string;
    phone?: string;
    address?: string;
    avatar?: string;
  }
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [dataProduct, setDataProduct] = useState<state["dataProducts"]>();
  const [dataCate_Brand, setDataCate_Brand] = useState<any>("");
  const [inputs, setInputs] = useState<state["input"]>();
  const [avatar, setAvatar] = useState<any>("");
  const arrayType = ["png", "jpg", "jpeg", "PNG", "JPG"];

  const userData = JSON.parse(localStorage["checkInfo"]);
  const params = useParams();
  const idProduct = params.id;

  const accessToken = userData.tokenUser;
  const url = "/user/product/" + idProduct;
  const config = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  };

  const handleInput = (e: any) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };

  const categoryItem = () => {
    if (dataCate_Brand.message === "success") {
      if (dataCate_Brand.category.length > 0) {
        const listCategory = dataCate_Brand.category.map(
          (value: any, key: number) => {
            return (
              <option key={key} value={value.id}>
                {value.category}
              </option>
            );
          }
        );
        return (
          <div className="form-group col-md-10">
            <select
              name="category"
              value={
                dataProduct && inputs?.category === undefined
                  ? dataProduct.id_category
                  : inputs?.category
              }
              onChange={handleInput}
              className="form-control form-control-line"
            >
              {listCategory}
            </select>
          </div>
        );
      }
    }
  };

  const brandItem = () => {
    if (dataCate_Brand.message === "success") {
      if (dataCate_Brand.category.length > 0) {
        const listBrand = dataCate_Brand.brand.map(
          (value: any, key: number) => {
            return (
              <option key={key} value={value.id}>
                {value.brand}
              </option>
            );
          }
        );
        return (
          <div className="form-group col-md-10">
            <select
              name="brand"
              value={
                dataProduct && inputs?.brand === undefined
                  ? dataProduct.id_brand
                  : inputs?.brand
              }
              onChange={handleInput}
              className="form-control form-control-line"
            >
              {listBrand}
            </select>
          </div>
        );
      }
    }
  };

  const sale = () => {
    return (
      <>
        <div>
          <select
            value={
              dataProduct && inputs?.status === undefined
                ? dataProduct.status
                : inputs?.status
            }
            onChange={handleInput}
            name="status"
            className="form-control form-control-line"
          >
            <option id="new" className="status" value="1">
              New
            </option>
            <option id="sale" className="status" value="0">
              Sale
            </option>
          </select>
        </div>
      </>
    );
  };

  const haveSale = () => {
    if (dataProduct) {
      if (dataProduct.status === 0 || inputs?.status === 0) {
        return (
          <>
            <div className="col-md-2">
              <label>Sale</label>
            </div>
            <div className="form-group col-md-10">
              <input
                onChange={handleInput}
                className="form-control"
                type="number"
                name="sale"
                defaultValue={
                  dataProduct && inputs?.sale === undefined
                    ? dataProduct.sale
                    : inputs?.sale
                }
              />
            </div>
          </>
        );
      }
    }
  };

  const handleUserInputFile = (e: any) => {
    const avatar = e.target.files;
    setAvatar(avatar);
  };
  const showAvatar = () => {
    if (dataProduct) {
      return dataProduct.image.map((value, key) => {
        return (
          <div
            key={key}
            style={{
              position: "relative",
              display: "inline-block",
            }}
          >
            <img
              className="imageProduct"
              style={{ width: "100px", height: "100px" }}
              src={
                "http://localhost/laravel/laravel/public/upload/user/product/" +
                dataProduct.id_user +
                "/" +
                value
              }
              alt=""
            />
            <input
              type="checkbox"
              name="avatarCheckBox[]"
              onClick={deleteImg}
              style={{
                position: "absolute",
                top: "3px",
                right: "3px",
              }}
              value={value}
            />
          </div>
        );
      });
    }
  };

  const deleteImg = (e: any) => {
    const valueImg = e.target.value;
    if (deleteImage.length === 0) {
      deleteImage.push(valueImg);
    } else {
      if (deleteImage.includes(valueImg)) {
        deleteImage = deleteImage.filter((img) => img !== valueImg);
      } else {
        deleteImage.push(valueImg);
      }
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const urlEdit = "/user/edit-product/" + idProduct;
    const formData = new FormData();
    formData.append(
      "name",
      String(
        dataProduct && inputs?.name === undefined
          ? dataProduct.name
          : inputs?.name
      )
    );
    formData.append(
      "price",
      String(
        dataProduct && inputs?.price === undefined
          ? dataProduct.price
          : inputs?.price
      )
    );
    formData.append(
      "category",
      String(
        dataProduct && inputs?.category === undefined
          ? dataProduct.id_category
          : inputs?.category
      )
    );
    formData.append(
      "brand",
      String(
        dataProduct && inputs?.brand === undefined
          ? dataProduct.id_brand
          : inputs?.brand
      )
    );
    formData.append(
      "company",
      String(
        dataProduct && inputs?.company === undefined
          ? dataProduct.company
          : inputs?.company
      )
    );
    formData.append(
      "detail",
      String(
        dataProduct && inputs?.detail === undefined
          ? dataProduct.detail
          : inputs?.detail
      )
    );
    formData.append(
      "status",
      String(
        dataProduct && inputs?.status === undefined
          ? dataProduct.status
          : inputs?.status
      )
    );
    formData.append(
      "sale",
      String(
        dataProduct && inputs?.sale === undefined
          ? dataProduct.sale
          : inputs?.sale
      )
    );
    deleteImage.map((value, key) => {
      formData.append("avatarCheckBox[]", value);
    });
    Object.keys(avatar).map((item, i) => {
      formData.append("file[]", avatar[item]);
    });
    let errorSubmits: errorSubmit = {};
    let flag = true;
    if (avatar === "") {
      flag = false;
      errorSubmits.avatar = "Avatar upload: Không được để trống";
    } else {
      if (dataProduct && deleteImage) {
        if (avatar.length + dataProduct.image.length - deleteImage.length > 3) {
          flag = false;
          errorSubmits.avatar = "Avatar product: Không được quá 3 hình";
        } else {
          Object.keys(avatar).map((item: any, i: number) => {
            const getNameFile = avatar[item].name;
            const getSizeFile = avatar[item].size;
            const typeImg = getNameFile.split(".")[1];
            const checkType = arrayType.includes(typeImg);
            const errorImgFile =
              checkType === false || getSizeFile > 1024 * 1024;
            if (errorImgFile === true) {
              flag = false;
              errorSubmits.avatar =
                "Avatar: dung lượng ảnh phải lớn hơn 1MB hoặc không đúng định dạng ảnh";
            }
          });
        }
      }
    }
    if (!flag) {
      setErrors(errorSubmits);
    } else {
      setErrors({});
      api
        .post(urlEdit, formData, config)
        .then((res) => {
          if (res.data.errors) {
            setErrors(res.data.errors);
          } else {
            deleteImage = [];
            alert("Cập nhập sản phẩm thành công");
            navigate("/MyProduct");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    api
      .get(url, config)
      .then((res) => {
        setDataProduct(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    api
      .get("/category-brand")
      .then((res) => {
        setDataCate_Brand(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className="col-sm-9 padding-right">
        <div className="container-fluid">
          <div className="product-details">
            <div className="product-information" style={{ paddingLeft: 0 }}>
              <div className="contact-form">
                <h2 className="title text-center">Product Information</h2>
                <form
                  id="main-contact-form"
                  className="contact-form row"
                  name="contact-form"
                  encType="multipart/form-data"
                  method="POST"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue={userData.tokenUser}
                  />
                  <FormErrors errors={errors} />
                  <div className="col-md-2">
                    <label>Name</label>
                  </div>
                  <div className="form-group col-md-10">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={handleInput}
                      defaultValue={
                        dataProduct && inputs?.name === undefined
                          ? dataProduct.name
                          : inputs?.name
                      }
                    />
                  </div>
                  <div className="col-md-2">
                    <label>Price</label>
                  </div>
                  <div className="form-group col-md-10">
                    <input
                      onChange={handleInput}
                      type="number"
                      className="form-control"
                      name="price"
                      defaultValue={
                        dataProduct && inputs?.price === undefined
                          ? dataProduct.price
                          : inputs?.price
                      }
                    />
                  </div>
                  <div className="col-md-2">
                    <label>Category</label>
                  </div>
                  {categoryItem()}

                  <div className="col-md-2">
                    <label>Brand</label>
                  </div>
                  {brandItem()}
                  <div className="form-group col-md-2">
                    <label>Status</label>
                  </div>
                  <div className="form-group col-md-10">{sale()}</div>
                  {haveSale()}
                  <div className="col-md-2">
                    <label>Detail</label>
                  </div>
                  <div className="form-group col-md-10">
                    <textarea
                      className="form-control"
                      onChange={handleInput}
                      name="detail"
                      defaultValue={
                        dataProduct && inputs?.detail === undefined
                          ? dataProduct.detail
                          : inputs?.detail
                      }
                      rows={9}
                    />
                  </div>

                  <div className="form-group col-md-12">
                    <input
                      type="file"
                      name="file[]"
                      className="form-control"
                      multiple
                      onChange={handleUserInputFile}
                    />
                  </div>
                  <div className="col-sm-12">
                    <div className="view-product">
                      <h4>Choose image you want to delete</h4>
                      {showAvatar()}
                    </div>
                  </div>
                  <div className="form-group col-md-10">
                    <button
                      style={{ marginLeft: 0, marginTop: "50px" }}
                      type="submit"
                      className="btn btn-default cart"
                    >
                      Update your product
                    </button>
                    <Link
                      className="btn btn-default"
                      style={{
                        color: "#fff",
                        background: "#989898",
                        display: "inline-block",
                        margin: "50px 0 10px 10px",
                        border: "0 none",
                        fontSize: "15px",
                        borderRadius: 0,
                      }}
                      to="/MyProduct"
                    >
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProduct;
