import Navbar from "./components/Navbar";
import Post from "./components/Post";

// hooks
import { useEffect, useState } from "react";

// utils
import http from "../server/utils/axios";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await http.get("/api/posts");
        setPosts(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 500) {
            console.error("Database error.");
          }
        } else {
          console.error(err);
        }
      }
    };

    getPosts();
  }, []);

  const checkPosts = () => {
    if (posts === undefined || posts.length === 0) {
      return <div style={{ textAlign: "center" }}>Nothing to see here</div>;
    }

    let postList: React.ReactElement[] = [];
    posts.map((post) => {
      postList.push(
        <Post
          key={post._id}
          id={post._id}
          title={post.title}
          content={post.body}
          username={post.userID.username}
          date={post.createdAt}
          upvotes={post.upvotes}
          isViewing={false}
        />
      );
    });

    return postList;
  };

  return (
    <div>
      <Navbar />
      {/* Posts list container */}
      <div className="container" style={{ maxWidth: "85%" }}>
        {checkPosts()}
      </div>
    </div>
  );
};

export default Home;
