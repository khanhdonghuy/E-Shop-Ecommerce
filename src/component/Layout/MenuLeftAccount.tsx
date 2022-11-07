import { Link, useLocation } from "react-router-dom";

function MenuLeftAccount() {
  const params1 = useLocation();
  const nameComponent = params1["pathname"].split("/")[1];
  return (
    <>
      <div className="col-sm-3">
        <div className="left-sidebar">
          <h2>{nameComponent}</h2>
          <div className="panel-group category-products" id="accordion">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <Link
                    data-toggle="collapse"
                    data-parent="#accordion"
                    to="/Account"
                  >
                    <span className="badge pull-right">
                      <i className="fa fa-plus" />
                    </span>
                    Account
                  </Link>
                </h4>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <Link
                    data-toggle="collapse"
                    data-parent="#accordion"
                    to="/MyProduct"
                  >
                    <span className="badge pull-right">
                      <i className="fa fa-plus" />
                    </span>
                    My Product
                  </Link>
                </h4>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <Link
                    data-toggle="collapse"
                    data-parent="#accordion"
                    to="/AddProduct"
                  >
                    <span className="badge pull-right">
                      <i className="fa fa-plus" />
                    </span>
                    Add Product
                  </Link>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default MenuLeftAccount;
