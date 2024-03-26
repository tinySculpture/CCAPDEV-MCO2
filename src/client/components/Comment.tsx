import { useEffect, useState } from "react";
import pfp from "../assets/user-pfp.png";
import { IconContext } from "react-icons";
import {
  BiUpvote,
  BiSolidUpvote,
  BiDownvote,
  BiSolidDownvote,
  BiComment,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import moment from "moment";

import "../css/custom-styles.css";
import TextEditor from "./TextEditor";
import http from "../../server/utils/axios";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import UserType from "../../server/utils/UserType";
import Markdown from "react-markdown";

const Comment = (props: { id: string }) => {
  const [username, setUsername] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [date, setDate] = useState<Date>();

  const auth = useAuthUser<UserType>();

  const [voteCount, setVoteCount] = useState<number>(0);
  const [isUpvoted, setIsUpvoted] = useState<boolean>(false);
  const [isDownvoted, setIsDownvoted] = useState<boolean>(false);

  const [isReplying, setIsReplying] = useState(false);
  const [replies, setReplies] = useState<any[]>([]);

  useEffect(() => {
    const getReplies = async () => {
      try {
        const response = await http.get(`/api/${props.id}/replies`);
        const data = response.data;
        setReplies(data.comments);
        setContent(data.body);
        setDate(data.createdAt);
        setUsername(data.commentorID.username);
      } catch (err) {}
    };

    getReplies();

    const getVotes = async () => {
      try {
        const response = await http.get(`/api/comment/${props.id}/getvotes`)
        const data = response.data[0]
        setVoteCount(data.totalVotes)
        
        if (data.upvotes.includes(auth?.id)) {
          setIsUpvoted(true);
        }

        if (data.downvotes.includes(auth?.id)) {
          setIsDownvoted(true);
        }

      } catch (err) {
        console.error(err)
      }
    }

    getVotes()
  }, []);

  const handleSubmit = async (reply: String) => {
    if (reply === "") {
      return;
    }

    try {
      const response = await http.post("/api/reply", {
        commentId: props.id,
        userId: auth?.id,
        reply: reply,
      });
      setReplies([...replies, response.data]);
      setIsReplying(false);
    } catch (err) {}
  };

  const checkIfUpvoted = () => {
    if (isUpvoted) {
      return <BiSolidUpvote onClick={() => handleVote(0)} />;
    }

    return <BiUpvote onClick={() => handleVote(1)} />;
  };

  const checkIfDownvoted = () => {
    if (isDownvoted) {
      return <BiSolidDownvote onClick={() => handleVote(0)} />;
    }

    return <BiDownvote onClick={() => handleVote(-1)} />;
  };

  const handleVote = async (count: number) => {
    try {
      const response = await http.put("/api/comments/updatevote", {
        count: count,
        commentID: props.id,
        userID: auth?.id,
      });
      // get upvote count
      if (response.status === 200) {
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
        setVoteCount(response.data.votes);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className=""
      style={{
        margin: "10px 0px",
        border: "0px black",
        borderLeft: "1px white solid",
      }}
    >
      <div className="card-body" style={{ padding: "0px 0px 0px 10px" }}>
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
        </div>

        <Markdown>{content}</Markdown>

        {/* like and comment */}
        <div
          className="d-md-flex d-lg-flex justify-content-md-end justify-content-lg-start onTop"
          style={{ width: "100%", display: "flex", marginBottom: "5px" }}
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

              <div
                style={{ cursor: "pointer" }}
                className="btnContainer"
                onClick={() => setIsReplying(!isReplying)}
              >
                <BiComment />
                <span>Reply</span>
              </div>
            </IconContext.Provider>
          </div>
        </div>

        {isReplying && (
          <TextEditor
            handleSubmit={handleSubmit}
            placeholder="Type a Comment"
            isReplying={true}
            setIsReplying={setIsReplying}
          />
        )}
        {replies.map((reply) => {
          return <Comment key={reply._id} id={reply._id} />;
        })}
      </div>
    </div>
  );
};

export default Comment;
