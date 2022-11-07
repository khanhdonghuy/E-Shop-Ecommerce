import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../API/api";
import FormErrors from "../Layout/FormErrors";

function Login(props: any) {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    level: "0",
  });
  const [errors, setErrors] = useState({});
  const handleInput = (e: { target: HTMLInputElement }) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [nameInput]: value }));
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      email: inputs.email,
      password: inputs.password,
      level: inputs.level,
    };
    let errorSubmit: any = {};

    let flag = true;

    if (inputs.email === "") {
      flag = false;
      errorSubmit.email = "Email: Không được để trống";
    }
    if (inputs.password === "") {
      flag = false;
      errorSubmit.password = "Password: Không được để trống";
    }
    if (!flag) {
      setErrors(errorSubmit);
    } else {
      api
        .post("/login", data)
        .then((res) => {
          if (res.data.errors) {
            setErrors(res.data.errors);
          } else {
            setErrors({});
            navigate("/");
            let checkLogin = true;
            const infoUser = {
              tokenUser: res.data.success.token,
              authUser: res.data.Auth,
            };
            localStorage.setItem("checkLogin", JSON.stringify(checkLogin));
            localStorage.setItem("checkInfo", JSON.stringify(infoUser));
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
              <div className="card-header">Login Member</div>
              <div className="card-body">
                <br />
                <form method="POST" onSubmit={handleSubmit}>
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
                      E-Mail Address
                    </label>
                    <div className="col-md-6">
                      <input
                        id="email"
                        type="email"
                        className="form-control "
                        name="email"
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="password"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Password
                    </label>
                    <div className="col-md-6">
                      <input
                        id="password"
                        type="password"
                        className="form-control "
                        name="password"
                        onChange={handleInput}
                      />
                    </div>
                  </div>

                  <div className="form-group row mb-0">
                    <div className="col-md-8 offset-md-4">
                      <button type="submit" className="btn btn-primary">
                        Login
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
export default Login;
