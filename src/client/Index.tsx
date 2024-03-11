import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const Index = () => {

  const navigate = useNavigate()
  
  useEffect(() => {
    axios.get("/").then((res) => {
      console.log(res)

      navigate("/login")
      
    }).catch((error) => {
      console.log(error)
      return (
        <div>
          You're not supposed to be here
        </div>
      )
    })
  });

  return(
    <></>
  )
}

export default Index
