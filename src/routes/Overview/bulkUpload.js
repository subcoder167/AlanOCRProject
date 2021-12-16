import React, { useState } from 'react';
import FileUpload from "./file-upload/file-upload.component";
import { Breadcrumb, Icon } from "antd";

function App() {
  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: []
  });

  const updateUploadedFiles = (files) =>
    setNewUserInfo({ ...newUserInfo, profileImages: files });

  const handleSubmit = (event) => {
    event.preventDefault();
    //logic to create new user...
  };

  return (
    <div>
      <Breadcrumb>
          <Breadcrumb.Item>
            <span className="gx-link">
              <Icon type="home" />
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span className="gx-link">
              <span>Overview</span>
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span className="gx-link">
              <span>Bulk Upload</span>
            </span>
          </Breadcrumb.Item>
      </Breadcrumb>
      <form onSubmit={handleSubmit}>
        <FileUpload
          accept="file"
          multiple
          updateFilesCb={updateUploadedFiles}
        />
        <input type="submit" className="btn" style={{background:'#6d9765',color:'#fff'}} value="Upload" disabled></input>
      </form>
    </div>
  );
}

export default App;