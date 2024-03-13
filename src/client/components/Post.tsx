import { useState } from "react";
import { IconContext } from "react-icons";
import { BiUpvote, BiDownvote, BiComment } from "react-icons/bi";
import { Link } from "react-router-dom";
import moment from "moment"

import "../css/custom-styles.css"
import axios from "axios";

const Post = (
  props: {
    id: string,
    username: string,
    title: string,
    content: string,
    date: Date,
    isViewing?: boolean,
    votes: any[],
    currentUserID: string
  }
) => {

  const [username, setUsername] = useState(props.username)
  const [title, setTitle] = useState(props.title)
  const [content, setContent] = useState(props.content)
  const [isViewing, setIsViewing] = useState(props.isViewing || false)
  const [voteCount, setVoteCount] = useState(props.votes.length)
  const [isVoted, setIsVoted] = useState(false)

  // const updateVotes = () => {
  //   axios.post("/api/updateVote", {
  //     postID: props.id,
  //     currentUserID: props.currentUserID,
  //     isVoted: isVoted,
  //   })
  //   .then((res) => {

  //   })
  // }

  const updateCount = (count: number) => {
    props.votes.map((vote) => {
      if (props.currentUserID === vote._id) {
        setIsVoted(true)
      }
    })

    if (!isVoted) {
      setVoteCount(voteCount + count)
    }

    // updateVotes()
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
          <span>{moment(props.date).format("MMMM D, YYYY")}</span>
          {/* <div
            className="d-md-flex d-lg-flex justify-content-md-end justify-content-lg-end"
            style={{ width: "100%", display: "flex" }}
          >
            <span
              className="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon"
              style={{ marginRight: 0 }}
            ></span>
          </div> */}
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