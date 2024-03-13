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

  const checkPosts = () => {
    if (posts === undefined || posts.length === 0) {
      return(
        <div style={{textAlign: "center"}}>
          Nothing to see here
        </div>
      )
    }

    let postList: React.ReactElement[] = []
    posts.map((post) => {
      postList.push(
        <Post key={post._id} id={post._id} title={post.title} content={post.body} username={post.userID.username} date={post.createdAt} currentUserID={currentUserID} votes={post.votes} isViewing={false} />
      )
    })

    return postList
  }

  return (
    <div>
      <Navbar />
      {/* Posts list container */}
      <div className="container" style={{ maxWidth: "85%" }}>
        {
          checkPosts()
        }
      </div>
    </div>
  );
}

export default Home