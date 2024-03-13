import MDEditor, { commands } from '@uiw/react-md-editor';

// Markdown editor component
const TextEditor = (props: {
  editorText: string
  setEditorText: React.Dispatch<React.SetStateAction<string>>,
  placeholder: string
}) => {

  const handleChange = (value: string) => {
    props.setEditorText(value)
  }

  return(
    <div
      className="card"
      style={{
        padding: "20px",
        marginBottom: "10px"
      }}
    >
      <MDEditor value={props.editorText} onChange={(value) => { handleChange(value || "")}}
        data-color-mode="dark"
        hideToolbar={false}
        preview="edit"
        visibleDragbar={false}
        textareaProps={{
          placeholder: props.placeholder
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
    </div>
  )
}

export default TextEditor