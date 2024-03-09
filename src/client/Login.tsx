import Navbar from "./components/Navbar"

const Login = () => {

  return(
    <div>
      <Navbar isLoggedIn={false} />
      <div className="container d-flex d-lg-flex justify-content-lg-center align-items-lg-center" style={{height: "100%", display: "flex"}}>
        <div className="card mb-5" style={{marginBottom: "0px", width: "35%"}}>
            <div className="card-body d-flex flex-column align-items-center">
                <form className="text-center" method="post" style={{width: "90%"}}>
                    <h1 className="text-start" style={{marginBottom: "40px"}}><strong>Log in</strong></h1>
                    <div className="mb-3"><input className="form-control" type="email" name="email" placeholder="Email" /></div>
                    <div className="mb-3"><input className="form-control" type="password" name="password" placeholder="Password" /></div>
                    <div className="mb-3"><button className="btn btn-primary d-block w-100" type="submit">Login</button></div>
                    <p className="text-muted">Forgot your password?</p>
                </form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login