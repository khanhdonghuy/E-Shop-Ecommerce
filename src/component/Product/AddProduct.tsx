import React, { useEffect, useState } from "react";
import api from "../API/api";
import FormErrors from "../Layout/FormErrors";

function AddProduct() {
  interface errorSubmit {
    name?: string;
    phone?: string;
    address?: string;
    image?: string;
    brand?: string;
    category?: string;
    price?: string;
    company?: string;
    detail?: string;
  }
  interface brandCateListType {
    brand: { brand: string; id: number }[];
    category: { category: string; id: number }[];
    message: string;
  }

  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({
    category: "",
    brand: "",
    name: "",
    price: "",
    company: "",
    detail: "",
    sale: "",
    status: "1",
  });
  const [brandCateList, setBrandCateList] = useState<brandCateListType>();
  const userData = JSON.parse(localStorage["checkInfo"]);
  const [imgProduct, setImgProduct] = useState<any>("");
  const arrayType = ["png", "jpg", "jpeg", "PNG", "JPG"];

  const handleInput = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = event.target as typeof event.target & {
      name: string;
      value: string;
    };
    const nameInput = target.name;
    const value = target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };

  const brandItem = () => {
    if (brandCateList?.message === "success") {
      if (brandCateList.category.length > 0) {
        return brandCateList.brand.map((value, key: number) => {
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
    if (brandCateList?.message === "success") {
      if (brandCateList.category.length > 0) {
        return (
          <div className="form-group col-md-12">
            <select
              value={inputs.category}
              onChange={handleInput}
              name="category"
            >
              <option>Please select category</option>
              {brandCateList.category.map((value, key: number) => {
                return (
                  <option key={key} value={value.id}>
                    {value.category}
                  </option>
                );
              })}
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

  const handleUserInputFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as typeof event.target & { files: string };
    const image = target.files;
    setImgProduct(image);
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

  Object.keys(imgProduct).map((key: any, index) => {
    return formData.append("file[]", String(imgProduct[key]));
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let errorSubmits: errorSubmit = {};
    let flag = true;

    if (inputs.name === "") {
      flag = false;
      errorSubmits.name = "Name: Kh??ng ???????c ????? tr???ng";
    }
    if (inputs.brand === "") {
      flag = false;
      errorSubmits.brand = "Brand: Vui l??ng ch???n ";
    }
    if (inputs.category === "") {
      flag = false;
      errorSubmits.category = "Category: Vui l??ng ch???n";
    }
    if (inputs.price === "") {
      flag = false;
      errorSubmits.price = "Price: Kh??ng ???????c ????? tr???ng";
    }
    if (inputs.company === "") {
      flag = false;
      errorSubmits.company = "Company: Kh??ng ???????c ????? tr???ng";
    }
    if (inputs.detail === "") {
      flag = false;
      errorSubmits.detail = "Detail: Kh??ng ???????c ????? tr???ng";
    }

    if (imgProduct === "") {
      flag = false;
      errorSubmits.image = "Image: Kh??ng ???????c ????? tr???ng";
    } else {
      if (imgProduct.length > 3) {
        flag = false;
        errorSubmits.image = "Image: Kh??ng ???????c qu?? 3 h??nh";
      } else {
        Object.keys(imgProduct).map((key: any, index) => {
          const getNameFile = imgProduct[key].name;
          const getSizeFile = imgProduct[key].size;
          const typeImg = getNameFile.split(".")[1];
          const checkType = arrayType.includes(typeImg);
          const errorImgFile = checkType === false || getSizeFile > 1024 * 1024;
          if (errorImgFile === true) {
            flag = false;
            errorSubmits.image =
              "Image: dung l?????ng ???nh ph???i l???n h??n 1MB ho???c kh??ng ????ng ?????nh d???ng ???nh";
          }
          return null;
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
          alert("Th??m s???n ph???m th??nh c??ng");
        }
      });
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
