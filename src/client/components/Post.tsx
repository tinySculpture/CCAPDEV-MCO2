import { useState } from "react";
import { IconContext } from "react-icons";
import { BiUpvote, BiDownvote, BiComment } from "react-icons/bi";
import { FaTrash, FaEdit  } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
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
    votes: any[],
    currentUserID: string
    isViewing?: boolean,
    isOwner?: boolean,
  }
) => {

  const [username, setUsername] = useState(props.username)
  const [title, setTitle] = useState(props.title)
  const [content, setContent] = useState(props.content)
  const [isViewing, setIsViewing] = useState(props.isViewing || false)
  const [isOwner, setIsOwner] = useState(props.isOwner || false)
  const [voteCount, setVoteCount] = useState(props.votes.length)
  const [isVoted, setIsVoted] = useState(false)

  const navigate = useNavigate()

  const updateCount = (count: number) => {
    if (!isVoted) {
      setVoteCount(voteCount + count)
      setIsVoted(true)
    }
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

  const checkIfOwner = () => {
    if (!isOwner) {
      return null
    }

    function handleEdit(): void {
      navigate(`/edit/${props.id}`)
    }

    function handleDelete(): void {
      if (confirm("Are you sure you want to delete your post forever?")) {
        axios.delete("http://localhost:3000/post", {
          params: {
            username: username,
            title: title
          }
        })
        .then((res) => {
          navigate(-1)
        })
        .catch((err) => {
          console.log(err)
        })
      }
    }

    return(
      <div
        className="d-md-flex d-lg-flex justify-content-md-end justify-content-lg-end"
        style={{ width: "100px", display: "flex"}}
      >
        <IconContext.Provider value={{ size: "1em" }}>
          <FaEdit  onClick={() => handleEdit()} style={{marginRight: "10px"}}/>
          <FaTrash onClick={() => handleDelete()}/>
        </IconContext.Provider>
      </div>
    )
  }

  return (
    <div className="card" style={{ marginBottom: "10px" }}>
      <div className="card-body">

        {/* metadata */}
        <div className="onTop" style={{ width: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <Link to={`/user/${username}`} style={{ marginRight: 10 }}>
              {username}
            </Link>
            <span>{moment(props.date).format("MMMM D, YYYY")}</span>
          </div>
          {checkIfOwner()}
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