import React, { useState, useEffect } from "react";
import "./App.css";
import DragAndDrop from "./DragAndDrop";
import ProgressBar from "./ProgressBar";

let interval = undefined;

function App() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSend = (e) => {
    e.preventDefault();
    if (files.length) {
      setIsSending(true);
    }
  };

  useEffect(() => {
    if (isSending) {
      interval = setInterval(() => {
        setProgress((prev) => prev + 1);
      }, 300);
    } else {
      clearInterval(interval);
    }
  }, [isSending]);

  useEffect(() => {
    if (progress === 100) {
      setIsSending(false);
      clearInterval(interval);
    }
  }, [progress]);

  const FileName = ({ file }) => {
    return <p>{file.name}</p>;
  };

  return (
    <div className="App">
      <h1>Drag'n drop town</h1>

      {isSending || progress > 0 ? (
        <>
          <p>{progress === 100 ? "Upload complete" : "Loading files"}</p>
          <ProgressBar bgcolor={"#7DD181"} completed={progress} />
        </>
      ) : (
        <>
          <p>You have {files.length} uploaded files:</p>
          {files.map((file, index) => {
            return <FileName key={file.name + index} file={file} />;
          })}

          {error && <p>You can't upload more than 5 files</p>}
          <form>
            <DragAndDrop
              files={files}
              setFiles={setFiles}
              setError={setError}
            />
            <button onClick={(e) => handleSend(e)}>Send</button>
          </form>
        </>
      )}
    </div>
  );
}

export default App;
