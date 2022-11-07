import { FormEvent, useState } from "react";
import api from "../API/api";
import FormErrors from "../Layout/FormErrors";

function Register(props: any) {
  interface file {
    name?: string;
    size?: number;
  }
  interface errorSubmit {
    name?: string;
    phone?: string;
    address?: string;
    avatar?: string;
    email?: string;
    password?: string;
  }
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
    phone: "",
    address: "",
    level: "0",
  });
  const [errors, setErrors] = useState({});
  const [avatar, setAvatar] = useState<any>();
  const [fileImage, setFileImage] = useState<file>({});
  const arrayType = ["png", "jpg", "jpeg", "PNG", "JPG"];

  const handleInput = (e: any) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };

  const handleUserInputFile = (e: { target: HTMLInputElement }) => {
    const file = e.target.files;
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target ? e.target.result : "");
      setFileImage(file![0]);
    };
    reader.readAsDataURL(file![0]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email: inputs.email,
      password: inputs.password,
      phone: inputs.phone,
      address: inputs.address,
      name: inputs.name,
      level: inputs.level,
      avatar: avatar,
    };
    const errorSubmits: errorSubmit = {};

    let flag = true;

    if (inputs.name === "") {
      flag = false;
      errorSubmits.name = "Name: Không được để trống";
    }
    if (inputs.email === "") {
      flag = false;
      errorSubmits.email = "Email: Không được để trống";
    }
    if (inputs.password === "") {
      flag = false;
      errorSubmits.password = "Password: Không được để trống";
    }
    if (inputs.phone === "") {
      flag = false;
      errorSubmits.phone = "Phone: Không được để trống";
    }
    if (inputs.address === "") {
      flag = false;
      errorSubmits.address = "Address: Không được để trống";
    }
    let errorImg = {};
    if (avatar === "") {
      flag = false;
      errorSubmits.avatar = "Avatar: Không được để trống";
    } else {
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
        "Avatar: dung lượng ảnh phải lớn hơn 1MB hoặc không đúng định dạng ảnh";
    }

    if (!flag) {
      setErrors(errorSubmits);
    } else {
      api
        .post("/register", data)
        .then((res) => {
          // console.log(res);
          if (res.data.errors) {
            setErrors(res.data.errors);
          } else {
            setErrors({});
            alert("Đăng ký thành công");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <FormErrors errors={errors} />
      <div className="col-sm-9 padding-right">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Register Member</div>
              <div className="card-body">
                <br />
                <form
                  method="POST"
                  encType="multipart/form-data"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="5xPbDXuqOHy6BhTHHPdkIIHM0WsLek37VmtNOaUi"
                  />
                  <div className="form-group row">
                    <label
                      htmlFor="email"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Name (*)
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className="form-control "
                        name="name"
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
                        type="text"
                        className="form-control "
                        name="email"
                        onChange={handleInput}
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
                        id="phone"
                        type="text"
                        className="form-control "
                        name="phone"
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
                        id="address"
                        type="text"
                        className="form-control "
                        name="address"
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
                  <div className="form-group row">
                    <label
                      htmlFor="email"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Level (*)
                    </label>
                    <div className="col-md-8">
                      <select
                        name="level"
                        className="form-control form-control-line"
                        onChange={handleInput}
                      >
                        <option value={0}>Member</option>
                        <option value={1}>Admin</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row mb-0">
                    <div className="col-md-8 offset-md-4">
                      <button type="submit" className="btn btn-primary">
                        Register
                      </button>
                    </div>
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
export default Register;
