import { BiUpvote, BiDownvote } from "react-icons/bi"
import { IconContext } from "react-icons"

import userPfp from "./assets/user-pfp.png"
import Navbar from "./components/Navbar"
import Post from "./components/Post"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const Profile = () => {
  const { username } = useParams()
  const navigate = useNavigate()

  const [posts, setPosts] = useState<any[]>([])
  const [currentUserID, setCurrentUserID] = useState("")
  const [isOwner, setIsOwner] = useState(false)
  const [totalVotes, setTotalVotes] = useState(0)

  useEffect(() => {
    axios.get("http://localhost:3000/api/user", {
      params: {
        username: username
      }
    })
      .then((res) => {
        setPosts(res.data.posts)
        setCurrentUserID(res.data.currentUser.uid)
        if (res.data.user._id === res.data.currentUser.uid) {
          setIsOwner(true)
        }
      })
      .catch((err) => {
        console.log(err)
      })

    getTotalVotes()
  }, [])

  const getTotalVotes = () => {
    posts.map((post) => {
      setTotalVotes(totalVotes + post.votes.length)
    })
  }

  const checkLogout = () => {
    if (!isOwner) return null

    return (
      <button type="button" className="btn btn-danger align-self-start" onClick={(e) => handleSubmit(e)} style={{ marginTop: "15px" }}>Logout</button>
    )
  }

  const handleSubmit = (e: React.MouseEvent) => {
    axios.get("http://localhost:3000/logout")
      .then((res) => {
        navigate("/", { replace: true })
      })
  }

  const checkPosts = () => {
    console.log(posts)
    if (posts == undefined || posts.length == 0) {
      return (
        <div style={{ textAlign: "center" }}>
          Nothing to see here
        </div>
      )
    }

    let postList: React.ReactElement[] = []
    posts.map((post) => {
      postList.push(
        <Post key={post._id} id={post._id} title={post.title} content={post.body} username={post.userID.username} date={post.createdAt} currentUserID={currentUserID} votes={post.votes} isViewing={false} isOwner={isOwner} />
      )
    })

    return postList
  }

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="row">
          <div className="col-md-4 col-lg-3">
            <div className="card">
              <div className="card-body"><img src={userPfp} width="100px" />
                <h6 className="text-muted card-subtitle" style={{ marginTop: "8px", marginBottom: "0px !important" }}>{username}</h6>
                <h4 className="card-title" style={{ marginBottom: "16px" }}><strong>{username}</strong></h4>
                <IconContext.Provider value={{ size: "1.8em" }}>
                  <div style={{ display: "flex", alignItems: "center" }}><BiUpvote />
                    <div style={{ marginLeft: "4px" }}>
                      <h5 style={{ marginBottom: "0px" }}><strong>Votes</strong></h5><span>{totalVotes}</span>
                    </div>
                  </div>
                </IconContext.Provider>
                {checkLogout()}
              </div>
            </div>
          </div>
          <div className="col">
            {
              checkPosts()
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile