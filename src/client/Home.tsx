import Navbar from "./components/Navbar";
import Post from "./components/Post";

import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {

  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    axios.get("http://localhost:3000/api/posts")
    .then((posts) => {
      setPosts(posts.data)
      console.log(posts.data)
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
              <Post key={post._id}  title={post.title} content={post.body} username={"post.username"} isViewing={false} />
            )
          })
        }
      </div>
    </div>
  );
}

export default Home