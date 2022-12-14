import React, { FormEvent, useState } from "react";
import api from "../API/api";
import FormErrors from "../Layout/FormErrors";

function Account() {
  interface file {
    name?: string;
    size?: number;
  }
  interface errorSubmit {
    name?: string;
    phone?: string;
    address?: string;
    avatar?: string;
  }
  const userData = JSON.parse(localStorage["checkInfo"]);
  const [inputs, setInputs] = useState({
    name: userData.name,
    phone: userData.phone,
    address: userData.address,
    password: "",
    level: "0",
  });
  const [errors, setErrors] = useState({});
  const [avatarFile, setAvatarFile] = useState<string>();
  const [fileImage, setFileImage] = useState<file>({});
  const arrayType = ["png", "jpg", "jpeg", "PNG", "JPG"];

  const handleInput = (event: { target: HTMLInputElement }) => {
    const nameInput = event.target.name;
    const value = event.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };

  const handleUserInputFile = (event: { target: HTMLInputElement }) => {
    const file = event.target.files;
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const { result } = event.target as typeof event.target & {
        result: string;
      };
      setAvatarFile(result);
      setFileImage(file![0]);
    };
    reader.readAsDataURL(file![0]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const idUser = userData.authUser.id;
    const url = `/user/update/${idUser}`;
    const accessToken = userData.tokenUser;
    const config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    const formData = new FormData();
    formData.append("email", userData.authUser.email);
    formData.append("name", inputs.name);
    formData.append("password", inputs.password);
    formData.append("phone", inputs.phone);
    formData.append("address", inputs.address);
    formData.append("avatar", avatarFile!);

    const errorSubmits: errorSubmit = {};
    let flag = true;
    if (inputs.name === "") {
      flag = false;
      errorSubmits.name = "Name: Kh??ng ???????c ????? tr???ng";
    }
    if (inputs.phone === "") {
      flag = false;
      errorSubmits.phone = "Phone: Kh??ng ???????c ????? tr???ng";
    }
    if (inputs.address === "") {
      flag = false;
      errorSubmits.address = "Address: Kh??ng ???????c ????? tr???ng";
    }
    let errorImg = false;
    if (avatarFile !== "") {
      const getNameFile = fileImage.name || "";
      const getSizeFile = fileImage.size || "";
      const typeImg = getNameFile.split(".")[1];
      const checkType = arrayType.includes(typeImg);
      const errorImgFile = checkType === false || getSizeFile > 1024 * 1024;
      errorImg = errorImgFile;
    }
    if (errorImg === true) {
      flag = false;
      errorSubmits.avatar =
        "Avatar: dung l?????ng ???nh ph???i l???n h??n 1MB ho???c kh??ng ????ng ?????nh d???ng ???nh";
    }
    if (!flag) {
      setErrors(errorSubmits);
    } else {
      api.post(url, formData, config).then((res) => {
        if (res.data.errors) {
          setErrors(res.data.errors);
        } else {
          setErrors({});
          alert("C???p nh???t th??nh c??ng");
          const infoUser = {
            tokenUser: res.data.success.token,
            authUser: res.data.Auth,
          };
          localStorage.setItem("checkInfo", JSON.stringify(infoUser));
        }
      });
    }
  };

  const fetchData = () => {
    return (
      <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
        <input type="hidden" name="_token" defaultValue={userData.tokenUser} />
        <div className="form-group row">
          <label
            htmlFor="email"
            className="col-md-4 col-form-label text-md-right"
          >
            Full Name (*)
          </label>
          <div className="col-md-8">
            <input
              type="text"
              className="form-control "
              name="name"
              defaultValue={userData.authUser.name}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="email"
            className="col-md-4 col-form-label text-md-right"
          >
            Email (*)
          </label>
          <div className="col-md-8">
            <input
              readOnly
              type="text"
              className="form-control "
              name="email"
              defaultValue={userData.authUser.email}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="email"
            className="col-md-4 col-form-label text-md-right"
          >
            Password (*)
          </label>
          <div className="col-md-8">
            <input
              type="password"
              className="form-control "
              name="password"
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="email"
            className="col-md-4 col-form-label text-md-right"
          >
            Phone
          </label>
          <div className="col-md-8">
            <input
              type="text"
              className="form-control "
              name="phone"
              defaultValue={userData.authUser.phone}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="email"
            className="col-md-4 col-form-label text-md-right"
          >
            Address
          </label>
          <div className="col-md-8">
            <input
              type="text"
              className="form-control "
              name="address"
              defaultValue={userData.authUser.address}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="form-group row">
          <label
            htmlFor="email"
            className="col-md-4 col-form-label text-md-right"
          >
            Avatar (*)
          </label>
          <div className="col-md-8">
            <input
              id="avatar"
              type="file"
              className="form-control "
              name="avatar"
              onChange={handleUserInputFile}
            />
          </div>
        </div>
        <div className="form-group row mb-0">
          <div className="col-md-8 offset-md-4">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </div>
      </form>
    );
  };

  return (
    <div>
      <div className="col-sm-9 padding-right">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h3>User Update</h3>
              </div>
              <div className="card-body">
                <br />
                <FormErrors errors={errors} />
                <br />
                {fetchData()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
