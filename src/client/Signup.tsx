import { Link } from "react-router-dom"
import Navbar from "./components/Navbar"

const Signup = () => {
  
  return(
    <div>
      <Navbar isLoggedIn={false} />
      
      <div className="container d-flex d-lg-flex justify-content-lg-center align-items-lg-center" style={{height: "100%", display: "flex"}}>
        <div className="card mb-5" style={{marginBottom: "0px", width: "30%"}}>
            <div className="card-body d-flex flex-column align-items-center">
                <form className="text-center" method="post" style={{width: "90%"}}>
                    <h1 className="text-start" style={{marginBottom: "40px"}}><strong>Sign up</strong></h1>
                    <div className="mb-3"><input className="form-control" type="text" name="username" placeholder="Username" /></div>
                    <div className="mb-3"><input className="form-control" type="text" name="fullname" placeholder="Full Name" /></div>
                    <div className="mb-3"><input className="form-control" type="email" name="email" placeholder="Email" /></div>
                    <div className="mb-3"><input className="form-control" type="password" name="password" placeholder="Password" /></div>
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