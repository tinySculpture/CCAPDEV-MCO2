import { IconContext } from "react-icons";
import mainLogo from "../assets/LOGO1.png";
import { MdAccountCircle, MdAccountBox  } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = (
  props: {
    isLoggedIn?: boolean
  }
) => {
  // if no login status is given, assume a user is logged in
  const [isLoggedIn, setisLoggedIn] = useState(props.isLoggedIn === undefined ? true : props.isLoggedIn)
  const [username, setUsername] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      axios.get("/api/currentUser")
      .then((user) => {
        setUsername(user.data.username)
      })
    }
  })

  return (
    <nav className="navbar navbar-expand-md bg-body py-3">
      <div className="container">
        {/* Brand Icon and Text */}
        <NavLink className="navbar-brand d-flex align-items-center" to={isLoggedIn ? "/home" : "/"}>
          <span className="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon">
            <img src={mainLogo} style={{ width: 100 }} alt="" />
          </span>
          <span>EduReview</span>
        </NavLink>

        <button
          data-bs-toggle="collapse"
          className="navbar-toggler"
          data-bs-target="#navcol-2"
        >
          <span className="visually-hidden">Toggle navigation</span>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navcol-2">
          <ul className="navbar-nav ms-auto">
            <button type="button" className="btn btn-primary align-self-center" onClick={() => navigate("/create")}>Create</button>
            {
              isLoggedIn ?
              <Link reloadDocument to={`/user/${username}`} className="nav-item nav-link active">
                <IconContext.Provider value={{ size: "2.5em" }}>
                  <MdAccountBox />
                </IconContext.Provider>
              </Link>
              : null
            }
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar