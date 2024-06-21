import React, { useEffect, useState } from 'react';
import { useFileContext, uploadFile,FileActionType } from './file';
import { Chip } from '@mui/material';
import { MessageType } from "../ui/file"
type CallbackFunction = () => void;
interface FileUploaderProps {
  callBack: CallbackFunction;
}

const FileUploader: React.FC<FileUploaderProps> = ({ callBack }) => {
  const { state, dispatch } = useFileContext();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log('Uploading');
      uploadFile(dispatch, selectedFile);
    }
  };
  useEffect(() => {
    console.log("state",state)
    if (state.type === FileActionType.UPLOAD_FILE) {
      console.log("FileActionType.UPLOAD_FILE")
      callBack()
    }
  }, [state])

  return (
    <div className="flex flex-col gap-6">
      {state.message && state.message.text && (<Chip
        color={state.message.type === MessageType.Error ? 'error' : 'success'}
        label={state.message.text}
      />)}
      <div>
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input
          id="file"
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
          onChange={handleFileChange}
        />
      </div>
      {state.file && (
        <section>
          <p className="pb-6">File details:</p>
          <ul>
            <li>Name: {state.file.name}</li>
            <li>Type: {state.file.type}</li>
            <li>Size: {state.file.size} bytes</li>
          </ul>
        </section>
      )}
      {selectedFile && (
        <button onClick={handleUpload} className="rounded-lg bg-green-800 text-white px-4 py-2 border-none font-semibold">
          Upload the file
        </button>
      )}
    </div>
  );
};
export type {CallbackFunction}
export { FileUploader };
