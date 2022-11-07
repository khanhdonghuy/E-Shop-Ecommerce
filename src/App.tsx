import { useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./component/Layout/Footer";
import Header from "./component/Layout/Header";
import MenuLeft from "./component/Layout/MenuLeft";
import MenuLeftAccount from "./component/Layout/MenuLeftAccount";
import { UserContext } from "./component/Layout/UserContext";

function App(props: any) {
  const params1 = useLocation();
  const [countCart, setCountCart] = useState(0);
  const [countWishList, setCountWishList] = useState(0);
  const showAmountCart = (data: number) => {
    localStorage.setItem("countCart", String(data));
    setCountCart(data);
  };
  const showAmountWishList = (data: number) => {
    localStorage.setItem("countWishList", String(data));
    setCountWishList(data);
  };
  return (
    <UserContext.Provider
      value={{
        showAmountCart: showAmountCart,
        showAmountWishList: showAmountWishList,
        countCart,
        countWishList,
      }}
    >
      <Header />
      <section>
        <div className="container">
          <div className="row">
            {params1["pathname"].includes("/Account") ||
            params1["pathname"].includes("/MyProduct") ||
            params1["pathname"].includes("/AddProduct") ? (
              <MenuLeftAccount />
            ) : (
              <MenuLeft />
            )}
            {props.children}
          </div>
        </div>
      </section>
      <Footer />
    </UserContext.Provider>
  );
}
export default App;
