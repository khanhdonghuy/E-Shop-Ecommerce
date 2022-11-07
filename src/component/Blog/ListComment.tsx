function ListComment(props: any) {
  const comments = props.comments;

  const handleClickReply = (e: any) => {
    props.getIdCmt(e.target.id);
  }
  return (
    <>
      {comments && comments.length > 0
        ? comments.map((value: any, key: number) => {
            if (value.id_comment === 0) {
              return (
                <div key={key}>
                  <li key={value.id} className="media">
                    <a className="pull-left" href="# ">
                      <img
                        className="media-object"
                        style={{ width: "30px", height: "30px" }}
                        src={`http://localhost/laravel/laravel/public/upload/user/avatar/${value.image_user}`}
                        alt=""
                      />
                    </a>
                    <div className="media-body">
                      <ul className="single-post-meta">
                        <li>
                          <i className="fa fa-user" />
                          {value.name_user}
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
                      <p>{value.comment}</p>
                      <button
                        className="btn btn-primary"
                        id={value.id}
                        onClick={handleClickReply}
                      >
                        <i className="fa fa-reply" />
                        Replay
                      </button>
                    </div>
                  </li>
                  {comments.map((value1: any) => {
                    if (value.id === value1.id_comment) {
                      return (
                        <li key={value1.id} className="media second-media">
                          <a className="pull-left" href="# ">
                            <img
                              className="media-object"
                              style={{ width: "30px", height: "30px" }}
                              src={`http://localhost/laravel/laravel/public/upload/user/avatar/${value1.image_user}`}
                              alt=""
                            />
                          </a>
                          <div className="media-body">
                            <ul className="single-post-meta">
                              <li>
                                <i className="fa fa-user" />
                                {value1.name_user}
                              </li>
                              <li>
                                <i className="fa fa-clock-o" />{" "}
                                {value1.created_at.split(" ")[1]}
                              </li>
                              <li>
                                <i className="fa fa-calendar" />{" "}
                                {value1.created_at.split(" ")[0]}
                              </li>
                            </ul>
                            <p>{value1.comment}</p>
                          </div>
                        </li>
                      );
                    }
                  })}
                </div>
              );
            }
          })
        : ""}
    </>
  );
}
export default ListComment;
