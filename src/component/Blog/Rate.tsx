import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import api from "../API/api";
import FormErrors from "../Layout/FormErrors";

function Foo(props: any) {
  interface errorSubmit {
    login?: string;
  }
  const idBlog = props.idBlog;
  const [rating, setRating] = useState<number>(0);
  const [errors, setErrors] = useState({});
  const [countVote, setCountVote] = useState<number | undefined>();

  useEffect(() => {
    const listRate: number[] = [];
    let totalRate = 0;
    let averageRate = 0;
    api.get(`/blog/rate/${idBlog}`).then((res) => {
      if (res.data.data.length !== 0) {
        Object.keys(res.data.data).map((value) => {
          listRate.push(res.data.data[value].rate);
        });
        for (let i = 0; i < listRate.length; i++) {
          totalRate += listRate[i];
        }
        averageRate = totalRate / listRate.length;
        setRating(averageRate);
        setCountVote(listRate.length);
      } else {
        setRating(0);
        setCountVote(0);
      }
    });
  }, []);

  const checkLogin = (e: any) => {
    e.preventDefault();
    const errorSubmits: errorSubmit = {};
    let flag = true;
    const checkLogin = localStorage.getItem("checkLogin");
    if (!checkLogin) {
      flag = false;
      errorSubmits.login = "Vui lòng đăng nhập";
    }
    if (!flag) {
      setErrors(errorSubmits);
    }
  };

  const changeRating = (newRating: number) => {
    setRating(newRating);
    const userData = JSON.parse(localStorage["checkInfo"]);
    const idUser = userData.authUser.id;
    const url = `/blog/rate/${idBlog}`;
    const accessToken = userData.tokenUser;
    const config = {
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    const formData = new FormData();
    formData.append("blog_id", idBlog);
    formData.append("user_id", idUser);
    formData.append("rate", String(newRating));
    api.post(url, formData, config).then((res) => {});
  };
  return (
    <>
      <div className="rating-area">
        <ul className="ratings">
          <li className="rate-this">Rate this item:</li>
          <li onClick={checkLogin}>
            <StarRatings
              rating={rating}
              starRatedColor="#FE980F"
              changeRating={changeRating}
              numberOfStars={5}
              name="rating"
            />
          </li>
          <li className="color">({countVote} votes)</li>
        </ul>
      </div>
      <FormErrors errors={errors} />
    </>
  );
}
export default Foo;
