import { useRef, useState } from "react";
import api from "../API/api";
import FormErrors from "../Layout/FormErrors";

interface Props {
  idCmt?: string;
  idBlog?: string;
  getCmt: (data: any[]) => void;
}
function Comment({ idCmt, idBlog, getCmt }: Props) {
  interface errorSubmit {
    login?: string;
    comment?: string;
  }
  const focusComment = useRef<HTMLTextAreaElement>(null);
  const [inputComment, setInputComment] = useState<string>();
  const [errors, setErrors] = useState({});

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const errorSubmit: errorSubmit = {};
    let flag = true;
    const checkLogin = localStorage.getItem("checkLogin");
    if (!checkLogin) {
      flag = false;
      errorSubmit.login = "Vui lòng đăng nhập";
    } else {
      if (inputComment === "" || inputComment === undefined) {
        flag = false;
        errorSubmit.comment = "Vui lòng nhập bình luận";
      }
    }
    if (!flag) {
      setErrors(errorSubmit);
    } else {
      const userData = JSON.parse(localStorage["checkInfo"]);
      const url = `/blog/comment/${idBlog}`;
      const accessToken = userData.tokenUser;
      const config = {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      };
      const formData = new FormData();
      formData.append("id_blog", idBlog!);
      formData.append("id_user", userData.authUser.id);
      formData.append("id_comment", idCmt|| String(0));
      formData.append("comment", inputComment!);
      formData.append("image_user", userData.authUser.avatar);
      formData.append("name_user", userData.authUser.name);
      api
        .post(url, formData, config)
        .then((res) => {
          getCmt(res.data.data);
          setInputComment("");
          setErrors("");
          focusComment.current?.focus();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className="col-sm-12">
      <h2>Leave a replay</h2>
      <div className="text-area">
        <div className="blank-arrow">
          <label>Your Name</label>
        </div>
        <span>*</span>
        <textarea
          id="cmt"
          onChange={(event) => setInputComment(event.target.value)}
          name="message"
          rows={11}
          placeholder="Input your comment ..."
          ref={focusComment}
          value={inputComment}
        />
        <FormErrors errors={errors} />
        <button onClick={handleSubmit} className="btn btn-primary">
          Post Comment
        </button>
      </div>
    </div>
  );
}
export default Comment;
