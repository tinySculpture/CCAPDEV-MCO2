import Navbar from "./components/Navbar";
import Post from "./components/Post";

import { useEffect, useState } from "react";
import axios from "axios";
import { MongoClient } from "mongodb";

class PostContent {
  id: number;
  title: string;
  content: string;
  username: string;
  voteCount: number = 0;

  constructor(id: number, title: string, content: string, username: string) {
    this.id = id
    this.title = title
    this.content = content
    this.username = username
  }
}

var postList: PostContent[] = []

for (let i = 0; i < 5; i++) {
  postList.push(new PostContent(i, `Post Title A${i + 1}`, "Post Content", `@username${i}`))
}

const Home = () => {
  const [posts, setPosts] = useState(postList)

  useEffect(() => {
    axios.get("/api/home").then((res) => {
      // get posts from database
      console.log(res)
      console.log("Test")
    });
  }, []);

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