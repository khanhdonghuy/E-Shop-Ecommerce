import React, { useEffect, useState } from "react";
import api from "../API/api";
import FormErrors from "../Layout/FormErrors";

function AddProduct(props: any) {
  interface errorSubmit {
    name?: string;
    phone?: string;
    address?: string;
    avatar?: string;
    brand?: string;
    category?: string;
    price?: string;
    company?: string;
    detail?: string;
  }
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({
    category: "",
    brand: "",
    name: "",
    price: "",
    company: "",
    detail: "",
    avatar: "",
    sale: "",
    status: "1",
  });
  const [data, setData] = useState<any>("");
  const userData = JSON.parse(localStorage["checkInfo"]);

  const handleInput = (e: any) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };

  const brandItem = () => {
    if (data.message === "success") {
      if (data.category.length > 0) {
        return data.brand.map((value: any, key: number) => {
          return (
            <option key={key} value={value.id}>
              {value.brand}
            </option>
          );
        });
      }
    }
  };

  const categoryItem = () => {
    if (data.message === "success") {
      if (data.category.length > 0) {
        const listCategory = data.category.map((value: any, key: number) => {
          return (
            <option key={key} value={value.id}>
              {value.category}
            </option>
          );
        });
        return (
          <div className="form-group col-md-12">
            <select
              value={inputs.category}
              onChange={handleInput}
              name="category"
            >
              <option>Please select category</option>
              {listCategory}
            </select>
          </div>
        );
      }
    }
  };
  const sale = () => {
    return (
      <div>
        <select value={inputs.status} onChange={handleInput} name="status">
          <option id="new" value="1">
            New
          </option>
          <option id="sale" value="0">
            Sale
          </option>
        </select>
      </div>
    );
  };

  const [avatar, setAvatar] = useState<any>("");
  const arrayType = ["png", "jpg", "jpeg", "PNG", "JPG"];

  const handleUserInputFile = (e: any) => {
    const avatar = e.target.files;
    setAvatar(avatar);
  };

  const accessToken = userData.tokenUser;
  const url = "/user/add-product";
  const config = {
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  };
  const formData = new FormData();
  formData.append("name", inputs.name);
  formData.append("price", inputs.price);
  formData.append("category", inputs.category);
  formData.append("brand", inputs.brand);
  formData.append("company", inputs.company);
  formData.append("detail", inputs.detail);
  formData.append("status", inputs.status);
  formData.append("sale", inputs.sale);

  Object.keys(avatar).map((item: any, i) => {
    formData.append("file[]", String(avatar[item]));
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    let errorSubmits: errorSubmit = {};
    let flag = true;

    if (inputs.name === "") {
      flag = false;
      errorSubmits.name = "Name: Không được để trống";
    }
    if (inputs.brand === "") {
      flag = false;
      errorSubmits.brand = "Brand: Vui lòng chọn ";
    }
    if (inputs.category === "") {
      flag = false;
      errorSubmits.category = "Category: Vui lòng chọn";
    }
    if (inputs.price === "") {
      flag = false;
      errorSubmits.price = "Price: Không được để trống";
    }
    if (inputs.company === "") {
      flag = false;
      errorSubmits.company = "Company: Không được để trống";
    }
    if (inputs.detail === "") {
      flag = false;
      errorSubmits.detail = "Detail: Không được để trống";
    }

    if (avatar === "") {
      flag = false;
      errorSubmits.avatar = "Avatar: Không được để trống";
    } else {
      if (avatar.length > 3) {
        flag = false;
        errorSubmits.avatar = "Avatar: Không được quá 3 hình";
      } else {
        Object.keys(avatar).map((item: any, i) => {
          const getNameFile = avatar[item].name;
          const getSizeFile = avatar[item].size;
          const typeImg = getNameFile.split(".")[1];
          const checkType = arrayType.includes(typeImg);
          const errorImgFile = checkType === false || getSizeFile > 1024 * 1024;
          if (errorImgFile === true) {
            flag = false;
            errorSubmits.avatar =
              "Avatar: dung lượng ảnh phải lớn hơn 1MB hoặc không đúng định dạng ảnh";
          }
        });
      }
    }

    if (!flag) {
      setErrors(errorSubmits);
    } else {
      setErrors({});
      api.post(url, formData, config).then((res) => {
        if (res.data.errors) {
          setErrors(res.data.errors);
        } else {
          alert("Thêm sản phẩm thành công");
        }
      });
    }
  };
  useEffect(() => {
    api
      .get("/category-brand")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className="col-sm-9 padding-right">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h3>Add Product</h3>
            </div>
            <br />
            <div className="card-body">
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
                <div className="form-group col-md-12">
                  <input
                    onChange={handleInput}
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    defaultValue=""
                  />
                </div>
                <div className="form-group col-md-12">
                  <input
                    onChange={handleInput}
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    defaultValue=""
                    placeholder="Price"
                  />
                </div>
                {categoryItem()}
                <div className="form-group col-md-12">
                  <select
                    value={inputs.brand}
                    onChange={handleInput}
                    name="brand"
                  >
                    <option>Please select brand</option>

                    {brandItem()}
                  </select>
                </div>
                <div className="form-group col-md-12">{sale()}</div>
                {inputs.status === "0" ? (
                  <div className="form-group col-md-12">
                    <>
                      <input
                        onChange={handleInput}
                        type="number"
                        id="value_sale"
                        name="sale"
                      />
                      %
                    </>
                  </div>
                ) : (
                  ""
                )}
                <div className="form-group col-md-12">
                  <textarea
                    onChange={handleInput}
                    name="company"
                    id="company_profile"
                    className="form-control"
                    placeholder="Company"
                    defaultValue=""
                  />
                </div>
                <div className="form-group col-md-12">
                  <input
                    onChange={handleUserInputFile}
                    type="file"
                    name="file[]"
                    className="form-control"
                    multiple
                  />
                </div>

                <div className="form-group col-md-12">
                  <textarea
                    onChange={handleInput}
                    name="detail"
                    id="detail"
                    className="form-control"
                    placeholder="Detail"
                    defaultValue=""
                    rows={9}
                  />
                </div>

                <div className="form-group col-md-12">
                  <input
                    type="submit"
                    name="submit"
                    className="btn btn-primary pull-right"
                    defaultValue="Submit"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
