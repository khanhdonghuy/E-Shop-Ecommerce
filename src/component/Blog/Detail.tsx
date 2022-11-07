import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../API/api";
import Comment from "./Comment";
import ListComment from "./ListComment";
import Foo from "./Rate";

function Detail(props: any) {
  interface state {
    data: {
      title: string;
      content: string;
      image: string;
      created_at: string;
    };
  }
  const params = useParams();
  const idBlog = params.id;
  const [data, setData] = useState<state["data"]>();
  const [comments, setComments] = useState([]);
  const [idCmt, setIdCmt] = useState<string | undefined>();

  const getIdCmt = (id: string) => {
    setIdCmt(id);
  }

  const getCmt = (data: any) => {
    const dataCmt = comments.concat(data);
    setComments(dataCmt);
  }
  useEffect(() => {
    api
      .get("/blog/detail/" + idBlog)
      .then((res) => {
        setData(res.data.data);
        setComments(res.data.data.comment);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [comments.length]);
  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Latest From our Blog</h2>
        <div className="single-blog-post">
          <h3>{data ? data.title : ""}</h3>
          <div className="post-meta">
            <ul>
              <li>
                <i className="fa fa-user" /> Mac Doe
              </li>
              <li>
                <i className="fa fa-clock-o" />{" "}
                {data ? data.created_at.split(" ")[1] : ""}
              </li>
              <li>
                <i className="fa fa-calendar" />{" "}
                {data ? data.created_at.split(" ")[0] : ""}
              </li>
            </ul>
          </div>
          <a href="# ">
            <img
              src={`http://localhost/laravel/laravel/public/upload/Blog/image/${
                data ? data.image : ""
              }`}
              alt=""
            />
          </a>
          <p>{data ? data.content : ""}</p>
          <div className="pager-area">
          </div>
        </div>
      </div>
      <Foo idBlog={idBlog} />
      <div className="socials-share">
        <a href="# ">
          <img src="images/blog/socials.png" alt="" />
        </a>
      </div>
      <div className="response-area">
        <h2>RESPONSES</h2>
        <ul className="media-list">
          <ListComment comments={comments} getIdCmt={getIdCmt} />
        </ul>
      </div>
      <div className="replay-box">
        <div className="row">
          <Comment idBlog={idBlog} getCmt={getCmt} idCmt={idCmt} />
        </div>
      </div>
    </div>
  );
}
export default Detail;
