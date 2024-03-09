import { useParams } from "react-router-dom";

import Navbar from "./components/Navbar";
import Post from "./components/Post"
import TextEditor from "./components/TextEditor"
import Comment from "./components/Comment";

const UserPost = () => {
  const { username, title } = useParams()

  return(
    <div>
      <Navbar />
      <div className="container" style={{ maxWidth: "85%" }}>
        <Post key={0}  title={title || ""} content="Test Content" username={username || ""} isViewing={true} />
        <TextEditor />

        <div style={{"margin": "10px 0px", "padding": "0px 20px"}}>
          <h5 style={{ marginTop: "10px",  }}>Comments</h5>
          <Comment username={username || ""} title={title || ""} content="" />
        </div>
      </div>
    </div>
  )
}

export default UserPost