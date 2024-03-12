import Navbar from "./components/Navbar";
import Post from "./components/Post";
import {PostContent} from "./main"

import { useEffect, useState } from "react";
import axios from "axios";

const Home = (props: {postList: Array<PostContent>}) => {

  const [posts, setPosts] = useState(props.postList)
  useEffect(() => {
    axios.get("").then((res) => {
      // get posts from database
    });
  });

  return (
    <div>
      <Navbar />

      {/* Posts list container */}
      <div className="container" style={{ maxWidth: "85%" }}>
        {
          posts.map((post, i) => {
            return(
              <Post key={post.id}  title={post.title} content={post.content} username={post.username} isViewing={false} />
            )
          })
        }
      </div>
    </div>
  );
}

export default Home