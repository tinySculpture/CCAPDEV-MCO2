import { Link, useNavigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import { FormEvent, useState } from "react"
import axios from "axios"

const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        username: username,
        password: password
      })

      navigate("/home")
    } catch {
      console.log("Failed")
    }
  }

  return(
    <div>
      <Navbar isLoggedIn={false} />
      <div className="container d-flex d-lg-flex justify-content-lg-center align-items-lg-center" style={{height: "100%", display: "flex"}}>
        <div className="card mb-5" style={{marginBottom: "0px", width: "30%"}}>
            <div className="card-body d-flex flex-column align-items-center">
                <form className="text-center" method="post" style={{width: "90%"}} onSubmit={(e) => handleSubmit(e)}>
                    <h1 className="text-start" style={{marginBottom: "40px"}}><strong>Log in</strong></h1>
                    <div className="mb-3"><input className="form-control" type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} /></div>
                    <div className="mb-3"><input className="form-control" type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /></div>
                    <div className="mb-3"><button className="btn btn-primary d-block w-100" type="submit">Login</button></div>
                    <p className="text-muted">Forgot your password?</p>
                    <p className="text-muted">Dont have an account? <Link to="/signup">Signup.</Link></p>
                </form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login