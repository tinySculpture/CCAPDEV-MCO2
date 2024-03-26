//styles
import { IconContext } from "react-icons";
import { BiUpvote, BiSolidUpvote, BiDownvote, BiSolidDownvote, BiComment } from "react-icons/bi";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../css/custom-styles.css";

// hooks
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

// utils
import http from "../../server/utils/axios";
import UserType from "../../server/utils/UserType";

const Post = (props: {
  id?: string,
  isViewing?: boolean;
  isOwner?: boolean;
}) => {
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date());

  const [isViewing, setIsViewing] = useState(props.isViewing || false);
  const [isOwner, setIsOwner] = useState(props.isOwner || false);

  const [voteCount, setVoteCount] = useState(0);
  const [isUpvoted, setIsUpvoted] = useState<boolean>(false);
  const [isDownvoted, setIsDownvoted] = useState<boolean>(false);
  
  const auth = useAuthUser<UserType>()

  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await http.get(`/api/post/${props.id}`)
        const data = response.data

        setTitle(data.title)
        setUsername(data.userID.username)
        setContent(data.body)
        setDate(data.date)
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 500) {
            console.error("Database error.");
          }
        } else {
          console.error(err);
        }
      }
    }

    getPost()

    const getVotes = async () => {
      try {
        const response = await http.get(`/api/post/${props.id}/getvotes`)
        setVoteCount(response.data[0].totalVotes)
        
        if (response.data[0].upvotes.includes(auth?.id)) {
          setIsUpvoted(true);
        }

        if (response.data[0].downvotes.includes(auth?.id)) {
          setIsDownvoted(true);
        }

      } catch (err) {
        console.error(err)
      }
    }

    getVotes()
  })

  const checkIfUpvoted = () => {
    if (isUpvoted) {
      return <BiSolidUpvote onClick={() => handleVote(0)} />
    }

    return <BiUpvote onClick={() => handleVote(1)} />
  }

  const checkIfDownvoted = () => {
    if (isDownvoted) {
      return <BiSolidDownvote onClick={() => handleVote(0)} />
    }

    return <BiDownvote onClick={() => handleVote(-1)} />
  }

  const handleVote = async (count: number) => {
    try {
      const response = await http.put("/api/posts/updatevote", {
        count: count,
        postID: props.id,
        userID: auth?.id
      })
      // get upvote count
      if (response.status === 200) {
        console.log(isUpvoted, isDownvoted)
        switch (count) {
          case 1:
            setIsUpvoted(true);
            setIsDownvoted(false);
            break;
          case 0:
            setIsUpvoted(false);
            setIsDownvoted(false);
            break;
          case -1:
            setIsUpvoted(false);
            setIsDownvoted(true);
            break;
        }
        setVoteCount(voteCount + count)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const checkIfViewing = () => {
    if (!isViewing) {
      return (
        <Link
          to={`/post/${username}/${props.id}`}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            inset: 0,
            zIndex: 0,
          }}
        ></Link>
      );
    }
  };

  const checkIfOwner = () => {
    if (!isOwner) {
      return null;
    }

    function handleEdit(): void {
      navigate(`/edit/${props.id}`);
    }

    function handleDelete(): void {
      if (confirm("Are you sure you want to delete your post forever?")) {
        axios
          .delete("http://localhost:3000/post", {
            params: {
              username: username,
              title: title,
            },
          })
          .then((res) => {
            navigate(-1);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    return (
      <div
        className="d-md-flex d-lg-flex justify-content-md-end justify-content-lg-end"
        style={{ width: "100px", display: "flex" }}
      >
        <IconContext.Provider value={{ size: "1em" }}>
          <FaEdit
            onClick={() => handleEdit()}
            style={{ marginRight: "10px" }}
          />
          <FaTrash onClick={() => handleDelete()} />
        </IconContext.Provider>
      </div>
    );
  };

  return (
    <div className="card" style={{ marginBottom: "10px" }}>
      <div className="card-body">
        {/* metadata */}
        <div
          className="onTop"
          style={{
            width: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Link to={`/user/${username}`} style={{ marginRight: 10 }}>
              {username}
            </Link>
            <span>{moment(date).format("MMMM D, YYYY")}</span>
          </div>
          {checkIfOwner()}
        </div>

        {/* title and content */}
        <h3
          className="card-title"
          style={{ ...{ fontWeight: "bold", marginBottom: "0" } }}
        >
          {title}
        </h3>
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
                {checkIfUpvoted()}
                <span style={{ userSelect: "none" }}>{voteCount}</span>
                {checkIfDownvoted()}
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
};

export default Post;
