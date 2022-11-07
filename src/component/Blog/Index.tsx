import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../API/api";

function Blog() {
  const [getItem, setItem] = useState([]);
  useEffect(() => {
    api
      .get("/blog")
      .then((response) => {
        setItem(response.data.blog.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const fetchData = () => {
    if (getItem && getItem.length > 0) {
      return getItem.map((value: any, index) => {
        return (
          <div key={index} className="single-blog-post">
            <h3>{value.title}</h3>
            <div className="post-meta">
              <ul>
                <li>
                  <i className="fa fa-user" /> Mac Doe
                </li>
                <li>
                  <i className="fa fa-clock-o" />{" "}
                  {value.created_at.split(" ")[1]}
                </li>
                <li>
                  <i className="fa fa-calendar" />{" "}
                  {value.created_at.split(" ")[0]}
                </li>
              </ul>
              <span>
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star-half-o" />
              </span>
            </div>
            <a href="# ">
              <img
                key={index}
                src={`http://localhost/laravel/laravel/public/upload/Blog/image/${value.image}`}
                alt=""
              />
            </a>
            <p>{value.description}</p>
            <Link to={`/blog/detail/${value.id}`} className="btn btn-primary">
              Read More
            </Link>
          </div>
        );
      });
    }
  }
  return (
    <>
      <div className="col-sm-9">
        <div className="blog-post-area">
          <h2 className="title text-center">Latest From our Blog</h2>
          {fetchData()}
          <div className="pagination-area">
            <ul className="pagination">
              <li>
                <a href="# " className="active">
                  1
                </a>
              </li>
              <li>
                <a href="# ">2</a>
              </li>
              <li>
                <a href="# ">3</a>
              </li>
              <li>
                <a href="# ">
                  <i className="fa fa-angle-double-right" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
export default Blog;
