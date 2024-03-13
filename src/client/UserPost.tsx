import { useParams } from "react-router-dom";

import Navbar from "./components/Navbar";
import Post from "./components/Post"
import TextEditor from "./components/TextEditor"
import Comment from "./components/Comment";
import { useEffect, useState } from "react";
import axios from "axios";

const UserPost = () => {
  const { username, title } = useParams()
  const [editorText, setEditorText] = useState("")
  const [post, setPost] = useState({
    _id: "",
    title: "",
    body: "",
    userID: {} as any,
    createdAt: new Date(),
    votes: [{} as any],
  })

  const [currentUserID, setCurrentUserID] = useState("")

  useEffect(() => {
    axios.get("http://localhost:3000/post", {
      params: {
        username: username,
        title: title
      }
    })
    .then((res) => {
      setPost(post => ({...post, ...res.data.post}))
      setCurrentUserID(res.data.currentUser.uid)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  const checkIfOwner = () => {
    if (currentUserID == post.userID._id) {
      return true
    }
    return false
  }

  return(
    <div>
      <Navbar />
      
      <div className="container" style={{ maxWidth: "85%" }}>
        <Post key={post._id} id={post._id} title={post.title} content={post.body} username={post.userID.username} date={post.createdAt} votes={post.votes} currentUserID={currentUserID} isViewing={true} isOwner={checkIfOwner()}/>
        <TextEditor editorText={editorText} setEditorText={setEditorText} placeholder="Add a comment..." />

        <div style={{"margin": "10px 0px", "padding": "0px 20px"}}>
          <h5 style={{ marginTop: "10px",  }}>Comments</h5>
          {/* <Comment username={username || ""} title={title || ""} content="" /> */}
        </div>
      </div>
    </div>
  )
}

export default UserPost