import {BiUpvote, BiDownvote} from "react-icons/bi"
import { IconContext } from "react-icons"

import userPfp from "./assets/user-pfp.png"
import Navbar from "./components/Navbar"
import Post from "./components/Post"
import { useParams } from "react-router-dom"

const Profile = () => {
  const { username } = useParams()

  return(
    <div>
      <Navbar />

      <div className="container">
        <div className="row">
            <div className="col-md-4 col-lg-3">
                <div className="card">
                    <div className="card-body"><img src={userPfp} width="100px"/>
                        <h6 className="text-muted card-subtitle" style={{marginTop: "8px", marginBottom: "0px !important"}}>{username}</h6>
                        <h4 className="card-title" style={{marginBottom: "16px"}}><strong>User Name</strong></h4>
                        <IconContext.Provider value={{ size: "1.8em" }}>
                          <div style={{display: "flex"}}><BiUpvote />
                              <div style={{marginLeft: "4px"}}>
                                  <h5 style={{marginBottom: "0px"}}><strong>Upvotes</strong></h5><span>100,000</span>
                              </div>
                          </div>
                          <div style={{display: "flex"}}><BiDownvote />
                              <div style={{marginLeft: "4px"}}>
                                  <h5 style={{marginBottom: "0px"}}><strong>Downvotes</strong></h5><span>100,000</span>
                              </div>
                          </div>
                        </IconContext.Provider>
                    </div>
                </div>
            </div>
            <div className="col">
            <Post key={1}  title="Test" content="Test content" username={username || ""} isViewing={false} />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Profile