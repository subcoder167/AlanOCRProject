import React from 'react'
import { Breadcrumb, Icon } from "antd";
import 
{
FolderWrapper,
CreatedFolder,
Folder,
FolderName,
UploadButton,
TopText,
Modal,
CloseBtn,ModalHead,ModalBg,
ModalBtn,ModalInput
} from './Index.styles';
import {Link} from 'react-router-dom';

function openModal()
{
    document.getElementById('folderModal').style.display="flex";
}
function closeModal()
{
     document.getElementById('folderModal').style.display="none";
}
function folder({match}) {

   
    return (
        <>
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
      </Breadcrumb>
      <TopText>
          Select a folder
      </TopText>
        <FolderWrapper >
            <CreatedFolder >
                <Link to="/bulkUpload">
                <Folder>
                <i className="fas fa-folder-open"></i>
                <FolderName >Folder for work</FolderName>
                </Folder>
                </Link>
                <Link to="/bulkUpload">
                <Folder>
                <i className="fas fa-folder-open"></i>
                <FolderName>Folder for side project</FolderName>
                </Folder>
                </Link>
                
            
                
                </CreatedFolder>
            <Folder className="NewFolder" onClick={openModal}>
            <i className="fas fa-folder-plus"></i>
            <FolderName>Create New Folder</FolderName>
            </Folder>
            
        </FolderWrapper>
        <ModalBg id="folderModal">
        <Modal>
        <CloseBtn onClick={closeModal}>X</CloseBtn>    
        <ModalHead>Do we have a name?</ModalHead>        
        <ModalInput placeholder="Enter Folder Name"  type="text" required>        
        </ModalInput>
        <ModalBtn type="submit" value="Create Folder" className="btn"></ModalBtn>

        </Modal>
        </ModalBg>
        <Link to="/bulkUpload">
        <UploadButton className="btn">
            Upload Folder
        </UploadButton>
        </Link>
        </>
    )
}

export default folder
