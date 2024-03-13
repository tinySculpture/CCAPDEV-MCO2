import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import TextEditor from "./components/TextEditor"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const EditPost = () => {
  const {id} = useParams()
  const [titleText, setTitleText] = useState("")
  const [editorText, setEditorText] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:3000/editpost", {
      params: {
        id: id
      }
    })
    .then((res) => {
      setTitleText(res.data.title)
      setEditorText(res.data.editorText)
    })
  }, [])

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    axios.post("http://localhost:3000/edit", {
      params: {
        id: id
      }
    })
    .then((res) => {
      navigate("/home")
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return(
    <div>
      <Navbar />
      
      <div className="container" style={{ maxWidth: "85%" }}>
        <h2 style={{fontWeight: "bold"}}>Create Post</h2>
        <div>
          <input type="text" className="form-control" placeholder="Title"
            style={{
              "padding": "10px",
              marginBottom: "10px"
            }}
            onChange={(e) => setTitleText(e.target.value)}
          />
          <TextEditor editorText={editorText} setEditorText={setEditorText} placeholder="Say something..." />
          <button type="button" className="btn btn-primary align-self-start" onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default EditPost