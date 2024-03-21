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
import EditPost from "./EditPost";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Main path */}
        <Route path="/" element={<Index />} />
        
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/create" element={<CreatePost />} />
        <Route
          path="/edit/:id"
          element={<EditPost />}
        />
        
        {/* Show a user */}
        <Route
          path="/user/:username"
          element={<Profile />}
        />
        
        {/* Show a post */}
        <Route
          path="/post/:username/:id"
          element={<UserPost />}
        />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
