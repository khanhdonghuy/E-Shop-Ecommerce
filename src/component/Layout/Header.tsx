import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
function Header() {
  const navigate = useNavigate();
  const user: any = useContext(UserContext);
  const renderAccount = () => {
    const checkLogin = localStorage.getItem("checkLogin");
    if (checkLogin) {
      return (
        <li>
          <Link to="/Account">
            <i className="fa fa-user" /> Account
          </Link>
        </li>
      );
    }
  };
  const logOut = () => {
    localStorage.clear();
    navigate("/Login");
  };
  const renderLogin = () => {
    const checkLogin = localStorage.getItem("checkLogin");
    if (checkLogin) {
      return (
        <li onClick={logOut}>
          <Link to="/Login">
            <i className="fa fa-lock" /> Logout
          </Link>
        </li>
      );
    } else {
      return (
        <li>
          <Link to="/Login">
            <i className="fa fa-lock" /> Login
          </Link>
        </li>
      );
    }
  };
  return (
    <>
      <header id="header">
        <div className="header_top">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <div className="contactinfo">
                  <ul className="nav nav-pills">
                    <li>
                      <a href="# ">
                        <i className="fa fa-phone" /> +2 95 01 88 821
                      </a>
                    </li>
                    <li>
                      <a href="# ">
                        <i className="fa fa-envelope" /> info@domain.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="social-icons pull-right">
                  <ul className="nav navbar-nav">
                    <li>
                      <a href="# ">
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="# ">
                        <i className="fa fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="# ">
                        <i className="fa fa-linkedin" />
                      </a>
                    </li>
                    <li>
                      <a href="# ">
                        <i className="fa fa-dribble" />
                      </a>
                    </li>
                    <li>
                      <a href="# ">
                        <i className="fa fa-google-plus" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-middle">
          <div className="container">
            <div className="row">
              <div className="col-md-4 clearfix">
                <div className="logo pull-left">
                  <a href="index.html">
                    <img src="images/home/logo.png" alt="" />
                  </a>
                </div>
                <div className="btn-group pull-right clearfix">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-default dropdown-toggle usa"
                      data-toggle="dropdown"
                    >
                      USA
                      <span className="caret" />
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a href="# ">Canada</a>
                      </li>
                      <li>
                        <a href="# ">UK</a>
                      </li>
                    </ul>
                  </div>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-default dropdown-toggle usa"
                      data-toggle="dropdown"
                    >
                      DOLLAR
                      <span className="caret" />
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a href="# ">Canadian Dollar</a>
                      </li>
                      <li>
                        <a href="# ">Pound</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-8 clearfix">
                <div className="shop-menu clearfix pull-right">
                  <ul className="nav navbar-nav">
                    {renderAccount()}
                    <li>
                      <Link to="/WishList">
                        <i className="fa fa-star" /> Wishlist (
                        {user.countWishList})
                      </Link>
                    </li>
                    <li>
                      <Link to="/Cart">
                        <i className="fa fa-shopping-cart" />
                        Cart ({user.countCart})
                      </Link>
                    </li>
                    {renderLogin()}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-bottom">
          <div className="container">
            <div className="row">
              <div className="col-sm-9">
                <div className="navbar-header">
                  <button
                    type="button"
                    className="navbar-toggle"
                    data-toggle="collapse"
                    data-target=".navbar-collapse"
                  >
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                  </button>
                </div>
                <div className="mainmenu pull-left">
                  <ul className="nav navbar-nav collapse navbar-collapse">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li className="dropdown">
                      <a href="# ">
                        Shop
                        <i className="fa fa-angle-down" />
                      </a>
                      <ul role="menu" className="sub-menu">
                        <li>
                          <Link to="/MyProduct">Products</Link>
                        </li>
                        <li>
                          <Link to="/AddProduct">Add Product</Link>
                        </li>
                        <li>
                          <Link to="/Cart">Cart</Link>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown">
                      <Link to="/blog/list" className="active">
                        Blog
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="search_box pull-right">
                  <input type="text" placeholder="Search" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;
