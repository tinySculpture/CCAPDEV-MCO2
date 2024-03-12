import React from "react";
import ReactDOM from "react-dom/client";

import Home from "./Home";
import Index from "./Index";

import "bootstrap/dist/css/bootstrap.css";
import "./scss/main.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserPost from "./UserPost.jsx";
import Profile from "./Profile";
import Login from "./Login";
import Signup from "./Signup";
import CreatePost from "./CreatePost";

export class PostContent {
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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Main path */}
        <Route path="/" element={<Index />} />
        
        <Route path="/home" element={<Home postList={postList} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/create" element={<CreatePost />} />
        
        {/* Show a user */}
        <Route
          path="/user/:username"
          element={<Profile />}
        />
        
        {/* Show a post */}
        <Route
          path="/post/:username/:title"
          element={<UserPost />}
        />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
