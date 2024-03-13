import { useState } from "react";
import pfp from "../assets/user-pfp.png"
import { IconContext } from "react-icons";
import { BiDownvote, BiUpvote, BiComment } from "react-icons/bi";
import { Link } from "react-router-dom";
import moment from "moment"

import "../css/custom-styles.css"
import axios from "axios";

const Comment = (
  props: {
    id: string,
    username: string,
    content: string,
    date: Date,
    upvotes: any[],
    downvotes: any[],
    currentUserID: string
  }
) => {

  const [username, setUsername] = useState(props.username)
  const [content, setContent] = useState(props.content)
  const [voteCount, setVoteCount] = useState(props.upvotes.length - props.downvotes.length)
  const [isUpvoted, setIsUpvoted] = useState(false)
  const [isDownvoted, setIsDownvoted] = useState(false)

  const updateVotes = () => {
    axios.post("/api/updateVote", {
      postID: props.id,
      currentUserID: props.currentUserID,
      isUpvoted: isUpvoted,
      isDownvoted: isDownvoted
    })
    .then((res) => {

    })
  }

  const updateCount = (count: number) => {
    if (count === 1) {
      props.upvotes.map((vote) => {
        if (props.currentUserID === vote._id) {
          setIsUpvoted(true)
          setIsDownvoted(false)
        }
      })

      if (!isUpvoted) {
        setVoteCount(voteCount + count)
      }
    } else {
      props.downvotes.map((vote) => {
        if (props.currentUserID === vote._id) {
          setIsDownvoted(true)
          setIsUpvoted(false)
        }
      })

      if (!isDownvoted) {
        setVoteCount(voteCount + count)
      }
    }

    updateVotes()
  };

  return(
    <div style={{"margin": "10px 0px"}}>
      <div style={{"width": "auto", "display": "flex"}}>
        <picture style={{"width": "40px", "marginRight": "10px"}}>
          <img style={{"width": "100%", "height": "100%"}} src={pfp} />
        </picture>
        
        <Link to={`/user/${username}`} style={{ marginRight: 10 }}>
            {username}
        </Link>
        <span>{moment(props.date).format("MMMM D, YYYY")}</span>
        
        <div className="d-md-flex d-lg-flex justify-content-md-end justify-content-lg-end" style={{"width": "100%", "display": "flex"}}>
          <span className="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon" style={{"marginRight": "0px"}}></span>
        </div>
      </div>

      <p style={{"margin": "5px 0px"}}>{content}</p>

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
              <span>Reply</span>
            </div>
          </IconContext.Provider>
        </div>
      </div>

    </div>
  )
}

export default Comment