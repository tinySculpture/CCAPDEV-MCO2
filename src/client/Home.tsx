import Navbar from "./components/Navbar";
import Post from "./components/Post";

import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {

  const [posts, setPosts] = useState<any[]>([])
  const [currentUserID, setCurrentUserID] = useState("")

  useEffect(() => {
    axios.get("http://localhost:3000/api/posts")
    .then((res) => {
      setPosts(res.data.posts)
      setCurrentUserID(res.data.currentUser.uid)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <div>
      <Navbar />
      {/* Posts list container */}
      <div className="container" style={{ maxWidth: "85%" }}>
        {
          posts.map((post) => {
            return(
              <Post key={post._id} id={post._id} title={post.title} content={post.body} username={post.userID.username} date={post.createdAt} currentUserID={currentUserID} upvotes={post.votes} downvotes={post.downvotes} isViewing={false} />
            )
          })
        }
      </div>
    </div>
  );
}

export default Home