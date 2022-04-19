import { useState } from "react";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  Editor as PreviewEditor,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./App.css";
import "draft-js/dist/Draft.css";

function App() {
  const [Text, setText] = useState();
  const [previewText, setPreviewText] = useState();

  const editorContent = EditorState.createEmpty();

  const [editorState, setEditorState] = useState({
    editorState: editorContent,
  });

  const handleEditorChange = (editorState) => {
    setEditorState({ editorState });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const editorText = JSON.stringify(
      convertToRaw(editorState.editorState.getCurrentContent())
    );
    setText(editorText);
    const contentState = convertFromRaw(JSON.parse(editorText));
    const textState = EditorState.createWithContent(contentState);
    setPreviewText(textState);
  };

  function myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    if (type === "blockquote") {
      return "blockQuoteCSS";
    } else if (type === "code") {
      return "codeCSS";
    }
  }

  return (
    <div className='container'>
      <h2 style={{ textAlign: "center" }}>Rich Text Editor</h2>
      <form>
        <div>
          <Editor
            editorState={editorState.editorState}
            onEditorStateChange={handleEditorChange}
            wrapperClassName='demo-wrapper'
            editorClassName='demo-editor'
            placeholder='Add rich text'
          />
        </div>

        <div className='button-container'>
          <button className='button' type='submit' onClick={onSubmit}>
            Submit
          </button>
        </div>
      </form>

      <h4 style={{ textAlign: "center" }}>Rich Text Preview</h4>

      {Text && (
        <div>
          <PreviewEditor
            editorState={previewText}
            blockStyleFn={myBlockStyleFn}
          />
        </div>
      )}
    </div>
  );
}

export default App;
