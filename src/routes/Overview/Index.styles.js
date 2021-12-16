import styled from "styled-components";
export const TopText = styled.h3`
margin:10px;
margin-top:20px;
font-size:4vh;
font-family:Poppins,sans-serif;
font-weight:600;
`;
export const FolderWrapper = styled.section`
display:flex;
flex-direction:row;
flex-wrap:wrap;
align-items: center;
justify-content:flex-start;
padding:20px 30px;

border-radius:5px;
margin:10px auto;
@media screen and (max-width:800px)
{
justify-content:flex-start;
padding:20px 0;
}
`;
export const CreatedFolder = styled.div`
display:flex;
flex-wrap:wrap;
@media screen and (max-width:800px)
{
justify-content:flex-start;
}

`;
export const Folder = styled.div`
position:relative;
width:200px;
min-height:150px;
max-width:40vw;
margin: 10px 10px;
display: flex;
flex-direction: column;
align-items:center;
justify-content:flex-start;
font-size:50px;
padding:20px;
padding-top:35px;
border-radius:5px;
color: #6d9765;
text-align:center;
word-break:break-word;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
cursor:pointer;
 @media screen and (max-width:800px)
 {
     font-size:30px;
      margin:10px ;
      
     
 }

`;
export const FolderName = styled.span`

font-size:18px;
color:#000;
@media screen and (max-width:800px)
{

color:#000;
}
`;
export const UploadButton = styled.button`

background:#6d9765;
color:#fff;
font-size:18px;
padding:2px 30px;
margin-left:20px;
`;
export const Modal = styled.div`

display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
min-width:40vw;
min-height:45vh;
background:#fff;
padding:20px;
position:relative;
border-radius:10px;
@media screen and (max-width:480px)
{
    min-width:80vw;
}

`;
export const CloseBtn = styled.span`
position:absolute;
top:20px;
right:20px;
font-size:21px;
cursor:pointer;
`;
export const ModalBg = styled.section`
position:fixed;
display:none;
flex-direction:column;
align-items:center;
justify-content:center;
top:0;
left:0;
height:100vh;
width:100vw;
background:rgba(0,0,0,0.5);
z-index:9999;
`;
export const ModalHead = styled.span`
font:21px Poppins,sans-serif;
font-weight:800;
color:#000;
`;
export const ModalInput = styled.input`
border:none;
outline:none;
background:transparent;
border-bottom:2px solid #000;
width:60%;
margin:42px 0;
font-size:21px;
text-align:center;
@media screen and (max-width:480px)
{
    width:80%;
}
`;
export const ModalBtn = styled.input`
background:#6d9765;
color:#fff;
font-size:14px;
padding:2px 20px;
margin-top:20px

`;
