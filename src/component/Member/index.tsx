import Login from "./Login";
import Register from "./Register";

function LoginRegis(props:any) {
  return (
    <>
      <Login />
      <div className="col-sm-9 padding-right">
        <h2 className="or">OR</h2>
      </div>
      <Register />
    </>
  );
}
export default LoginRegis;
