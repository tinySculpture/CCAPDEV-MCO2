import { useState } from "react";
import { IconContext } from "react-icons";
import { BiUpvote, BiDownvote, BiComment } from "react-icons/bi";
import { Link } from "react-router-dom";

import "../css/custom-styles.css"

const Post = (
  props: {
    username: string,
    title: string,
    content: string,
    isViewing?: boolean
  }
) => {

  const [username, setUsername] = useState(props.username)
  const [title, setTitle] = useState(props.title)
  const [content, setContent] = useState(props.content)
  const [isViewing, setIsViewing] = useState(props.isViewing || false)
  const [voteCount, setVoteCount] = useState(0)

  const updateCount = (count: number) => {
    setVoteCount(voteCount + count)
  };

  const checkIfViewing = () => {
    if (!isViewing) {
      return <Link to={`/post/${username}/${title.split(' ').join('_')}`} style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        inset: 0,
        zIndex: 0
      }}></Link>
    }
  }

  return (
    <div className="card" style={{ marginBottom: "10px" }}>
      <div className="card-body">

        {/* metadata */}
        <div className="onTop" style={{ width: "auto", display: "flex" }}>
          <Link to={`/user/${username}`} style={{ marginRight: 10 }}>
            {username}
          </Link>
          <span>01/10/2022</span>
          <div
            className="d-md-flex d-lg-flex justify-content-md-end justify-content-lg-end"
            style={{ width: "100%", display: "flex" }}
          >
            <span
              className="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon"
              style={{ marginRight: 0 }}
            ></span>
          </div>
        </div>

        {/* title and content */}
        <h3 className="card-title" style={{...{"fontWeight": "bold", "marginBottom": "0"}}}>{title}</h3>
        <p className="card-text">{content}</p>

        {/* like and comment */}
        <div
          className="d-md-flex d-lg-flex justify-content-md-end justify-content-lg-start onTop"
          style={{ width: "100%", display: "flex" }}
        >
          {/* Box for Votes */}
          <div
            style={{
              height: "100%",
              minWidth: "50px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconContext.Provider value={{ size: "1.2em" }}>
              <div className="btnContainer">
                <BiUpvote onClick={() => updateCount(1)} />
                <span style={{ userSelect: "none" }}>{voteCount}</span>
                <BiDownvote onClick={() => updateCount(-1)} />
              </div>

              <div className="btnContainer">
                <BiComment />
                <span>Comments</span>
              </div>
            </IconContext.Provider>
          </div>
        </div>
        
        {checkIfViewing()}

      </div>
    </div>
  );
}

export default Post