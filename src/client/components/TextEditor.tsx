import { useState } from "react";
import MDEditor, { commands } from '@uiw/react-md-editor';

// Markdown editor component
const TextEditor = () => {

  const [editorText, setEditorText] = useState("")

  return(
    <div
      className="card"
      style={{
        padding: "20px"
      }}
    >
      <MDEditor value={editorText} onChange={() => {setEditorText}}
        data-color-mode="light"
        hideToolbar={false}
        preview="edit"
        visibleDragbar={false}
        textareaProps={{
          placeholder: "Add a comment..."
        }}
        style={{
          marginBottom: "10px"
        }}
        commands={
          [
            commands.bold,
            commands.italic,
            commands.link,
            commands.image,
            commands.group(
              [
                commands.title1,
                commands.title2,
                commands.title3,
                commands.title4,
                commands.title5,
                commands.title6
              ],
              {
                name: "title",
                groupName: "title",
                buttonProps: { "aria-label": "Insert title" }
              }
            ),
            
          ]}
      />
      <button type="button" className="btn btn-primary align-self-start">Submit</button>
    </div>
  )
}

export default TextEditor