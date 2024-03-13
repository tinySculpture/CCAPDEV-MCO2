import { Link, useNavigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import { useState } from "react"
import axios from "axios"

const Signup = () => {
  const [username, setUsername] = useState("")
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //TODO: add data validation
    e.preventDefault()

    try {
      axios.post("http://localhost:3000/signup", {
        username: username,
        fullname: fullname,
        email: email,
        password: password
      })
      alert("Successfully added account.")
      navigate("/login")
    } catch(err) {
      console.log(err)
    }
  }

  return(
    <div>
      <Navbar isLoggedIn={false} />
      
      <div className="container d-flex d-lg-flex justify-content-lg-center align-items-lg-center" style={{height: "100%", display: "flex"}}>
        <div className="card mb-5" style={{marginBottom: "0px", width: "30%"}}>
            <div className="card-body d-flex flex-column align-items-center">
                <form className="text-center" style={{width: "90%"}} method="POST" onSubmit={(e) => handleSubmit(e)}>
                    <h1 className="text-start" style={{marginBottom: "40px"}}><strong>Sign up</strong></h1>
                    <div className="mb-3"><input className="form-control" type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} /></div>
                    <div className="mb-3"><input className="form-control" type="text" name="fullname" placeholder="Full Name" onChange={(e) => setFullname(e.target.value)} /></div>
                    <div className="mb-3"><input className="form-control" type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} /></div>
                    <div className="mb-3"><input className="form-control" type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /></div>
                    <div className="mb-3"><button className="btn btn-primary d-block w-100" type="submit">Register</button></div>
                    <p className="text-muted">Already have an account? <Link to="/login">Login.</Link></p>
                </form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Signup