import React, { useState } from 'react'
import { FaFileUpload,FaInbox  } from "react-icons/fa";
import {
  FaFileImage,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
  FaFileVideo,
  FaFileAudio,
  FaFileArchive,
  FaFileCode,
  FaFileAlt,
   FaFolderOpen
} from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import { FaDownload } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { FaEdit } from "react-icons/fa";
import { deleting, editDetail } from '../utils/Api.js';


function FileDisplay({filesinfo,setFilesinfo}) {
  
 const [editingId, setEditingId] = useState(null);
const [editedTitle, setEditedTitle] = useState("");
 const [title,settitle]=useState('')
 const [description,setDescription]=useState('')


const [protectedFile, setProtectedFile] = useState(null);
const [password, setPassword] = useState("");
const [passwordError, setPasswordError] = useState("");

  const formateFileSize=(bytes)=>{
    if(bytes==0) return '0 B'
    let sizes=['B','KB','MB','GB']
    let k=1024
    let i=Math.floor(Math.log(bytes)/Math.log(k))
     const val = (bytes / Math.pow(k, i)).toFixed(2);
      return val + ' ' + sizes[i];
  

  }

const getFileIcon = (fileType) => {
  fileType = fileType.toLowerCase();

  // Images
  if (
    [
      "jpg", "jpeg", "png", "gif", "webp", "svg",
      "avif", "bmp", "ico", "tif", "tiff",
      "heic", "heif"
    ].includes(fileType)
  ) {
    return <FaFileImage />;
  }

  // PDF
  if (["pdf"].includes(fileType)) {
    return <FaFilePdf />;
  }

  // Word
  if (["doc", "docx"].includes(fileType)) {
    return <FaFileWord />;
  }

  // Excel
  if (["xls", "xlsx", "csv"].includes(fileType)) {
    return <FaFileExcel />;
  }

  // PowerPoint
  if (["ppt", "pptx"].includes(fileType)) {
    return <FaFilePowerpoint />;
  }

  // Videos
  if (
    [
      "mp4", "mkv", "avi", "mov",
      "wmv", "flv", "webm", "m4v"
    ].includes(fileType)
  ) {
    return <FaFileVideo />;
  }

  // Audio
  if (
    [
      "mp3", "wav", "aac", "ogg",
      "flac", "m4a"
    ].includes(fileType)
  ) {
    return <FaFileAudio />;
  }

  // Archives
  if (
    [
      "zip", "rar", "7z", "tar",
      "gz", "bz2"
    ].includes(fileType)
  ) {
    return <FaFileArchive />;
  }

  // Code files
  if (
    [
      "js", "jsx", "ts", "tsx", "html",
      "css", "scss", "json", "xml",
      "java", "py", "cpp", "c", "cs",
      "php", "go", "rb", "swift",
      "kt", "sql", "sh"
    ].includes(fileType)
  ) {
    return <FaFileCode />;
  }

  // Text files
  if (["txt", "md", "log"].includes(fileType)) {
    return <FaFileAlt />;
  }

  // Default
  return <FaFileAlt />;
};

const editFile=async(fileId,editedTitle,description)=>{
  console.log(editedTitle,description)
  if(!editedTitle || !description){
    console.log("there is no data provided")
  }
    try {
      const res=await editDetail(fileId,editedTitle,description)
      console.log(res)
      if(!res.success){
        console.log('Erro in local method')
      }

       setEditedTitle("")
      setEditingId(null)
       setFilesinfo((prev) =>
      prev.map((file) =>
        file._id === fileId
          ? {
              ...file,
              title: editedTitle,
              description: description,
            }
          : file
      )
    );
      
    } catch (error) {
       console.log('Erro in local method')
    }
}


const deleteFile=async(fileId)=>{
      try {
        const responce=await deleting(fileId)
        setFilesinfo(pre=>pre.filter(e=> e._id !== responce.data.fileId))
  
      } catch (error) {
        console.log(error)
      }
  }

const handleDownload = (file) => {
  if (file.password) {
    setProtectedFile(file);
    setPassword("");
    setPasswordError("");
    return;
  }

  downloadFile(
    file.fileSecure || file.fileUrl,
    file.fileName
  );
};
const verifyPassword = async () => {
  if (password === protectedFile.password) {
    await downloadFile(
      protectedFile.fileSecure || protectedFile.fileUrl,
      protectedFile.fileName
    );

    setProtectedFile(null);
    setPassword("");
    setPasswordError("");
  } else {
    setPasswordError("Incorrect password. Try again.");
  }
};

const downloadFile = async (url, fileName) => {
  try {
    
    const response = await fetch(url);
    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error("Download failed:", err);
  }
};
  return (
    <>
    <div
              className='group border-1 text-slate-400  border-slate-300  w-full  rounded-3xl flex justify-center items-center flex-col hover:border-slate-400 p-2'>
    {!filesinfo?(<>
              <FaInbox className=' text-4xl'/> 
              <span className=''>No files uploaded yet</span></>
   ):(
      <>{
        filesinfo.map((e)=>(
          <div key={e._id} className='flex py-4 px-4 border-1 mt-3 border-slate-300 dark:border-[#2b3b52] rounded-2xl w-full justify-between items-center'>
        <div className='flex gap-9 px-2 justify-center items-center'>
          <div className='text-4xl text-blue-400'>
            {e.fileType?( getFileIcon(e.fileType)):(<FaFolderOpen className='inline text-blue-400'/> ) }
          {/* <FaFileImage className='inline text-blue-400'/> */}
          </div>
          <div >
            <p className='font-medium text-black dark:text-[#e8edf5]'>{e.fileName}</p>
            <span className='bg-slate-200 rounded-4xl text-[11px] py-1 px-3 text-slate-500 font-medium dark:bg-[#28364d]'>{formateFileSize(e.fileSize)}</span>
            <span className='bg-slate-200 rounded-4xl text-[11px] text-center py-1 px-3 text-slate-500 font-medium ml-2 dark:bg-[#28364d]'>{e.fileType}</span>
            <p className='flex flex-wrap gap-0.5 mt-1'>
             

               <input type="text" value={editingId == e._id? editedTitle:e.title} onChange={(e)=>setEditedTitle(e.target.value)  }
               disabled={editingId !== e._id}
               className={`text-[14px] text-gray-900 font-semibold ${editingId == e._id? 'border-1 px-4 py-1 border-slate-400 rounded-4xl': 'border-0'} dark:text-[#c9d8f0] ` }/>
               <LuDot/> 
               <input type="text" value={editingId == e._id? description:e.description} onChange={(e)=>setDescription(e.target.value)  }
               disabled={editingId !== e._id}
               className={`text-[14px] text-slate-600   ${editingId == e._id? 'border-1 px-4 py-1 border-slate-400 rounded-4xl': 'border-0'}`}/>
              
            </p>
            <p className='text-[13px]'>
              <span>{new Date(e.createdAt)?.toLocaleDateString("en-GB")}</span>
             
            </p>
          </div>
        </div>



        <div className='flex gap-5 p-3'>
          {
            editingId == e._id ? (
              <button className='cursor-pointer hover:bg-slate-100 p-2 rounded-4xl' onClick={()=>{
                editFile(e._id,editedTitle,description)
           }}>change</button>
            
            ):(
              <button className='cursor-pointer hover:bg-slate-100 p-2 rounded-4xl' onClick={()=>{
            setEditedTitle(e.title)
            setDescription(e.description)
            setEditingId(e._id)}}><FaEdit/></button>
            )
          }
          
       {/* <button className='cursor-pointer hover:bg-slate-100 p-2 rounded-4xl' 
        onClick={() => downloadFile(e.fileSecure ? e.fileSecure:e.fileUrl, e.fileName)}
       >
         <FaDownload />
         
         </button> */}
         <button
  type="button"
  title="Download"
  className="cursor-pointer hover:bg-slate-100 p-2 rounded-4xl"
  onClick={() => handleDownload(e)}
>
  <FaDownload />
</button>
      <button type='button' title='Delete' className='cursor-pointer hover:bg-slate-100 p-2 rounded-4xl'  onClick={()=>{
            deleteFile(e._id)
          }}>  <RxCross2 /></button>
        
        </div>
      </div>
        ))
      }
      
</>
    )}
     </div>

     
{protectedFile && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-[#172337]">

      <button
        type="button"
        onClick={() => {
          setProtectedFile(null);
          setPassword("");
          setPasswordError("");
        }}
        className="float-right text-xl"
      >
        <RxCross2 />
      </button>

      <div className="clear-both flex justify-center">
        <img
  src="/meme1.jpeg"
  alt="Password protected file"
  className="h-50 w-50 object-contain"
/>
      </div>

      <h2 className="mt-3 text-center text-xl font-bold dark:text-white">
        Password Protected
      </h2>

      <p className="mt-2 text-center text-sm text-slate-500">
        Password Dalo for {" "}
        <strong>{protectedFile.fileName}</strong>
      </p>

      <form
        className="mt-5"
        onSubmit={(event) => {
          event.preventDefault();
          verifyPassword();
        }}
      >
        <input
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setPasswordError("");
          }}
          placeholder="Enter password"
          autoComplete="current-password"
          className="w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 outline-none focus:border-blue-500 dark:text-white"
          autoFocus
        />

        {passwordError && (
          <p className="mt-2 text-sm text-red-500">
            {passwordError}
          </p>
        )}

        <button
          type="submit"
          className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Verify & Download
        </button>
      </form>
    </div>
  </div>
)}

    </>
  )
}

export default FileDisplay