import React, { useRef, useState,useEffect } from 'react'
import { IoIosAddCircle } from "react-icons/io";
import { FaFileUpload } from "react-icons/fa";
import { useForm } from 'react-hook-form'
import { TbXboxXFilled } from "react-icons/tb";
import { uploadfile } from '../utils/Api.js';
function Uploader({ filesinfo, setFilesinfo }) {


  const { register, handleSubmit, reset, watch,resetField } = useForm()
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const selectedFile = watch("file")?.[0];

  const [previewUrl, setPreviewUrl] = useState(null);
  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);
  const clearimage=()=>{
    resetField("file")
    setPreviewUrl(null)
    
  }

  const upload = async (data) => {
    setLoading(true);
    setError("");

    try {
      const response = await uploadfile(data);
      console.log(response)
      setFilesinfo(prev => [response.data, ...prev])
      reset();

    } catch (error) {
      setError(error.response?.data?.message || error.message);
      console.error("Error while uploading:", error);
    } finally {
      setLoading(false);
    }
  };
  const renderPreview = () => {
  if (!selectedFile) return null;

  if (selectedFile.type.startsWith("image/")) {
    return (
      <img
        src={previewUrl}
        alt="Preview"
        className="w-full h-full object-cover rounded-lg"
      />
    );
  }

  if (selectedFile.type === "application/pdf") {
    return (
      <iframe
        src={previewUrl}
        title="PDF Preview"
        className="w-full h-full rounded-lg"
      />
    );
  }

  if (selectedFile.type.startsWith("video/")) {
    return (
      <video
        src={previewUrl}
        controls
        className="w-full h-full rounded-lg"
      />
    );
  }

  if (selectedFile.type.startsWith("audio/")) {
    return <audio src={previewUrl} controls />;
  }

  // Fallback for unsupported files
  return (
    <div className="flex flex-col items-center">
      <p className="text-4xl">📄</p>
      <p>{selectedFile.name}</p>
    </div>
  );
};


  return (
    <>
      <form onSubmit={handleSubmit(upload)}>
        <div
          className='dark:bg-[#1f2b3d] group border-2 bg-gray-100 border-slate-300 border-dashed w-full h-35 rounded-4xl flex justify-center items-center flex-col hover:border-slate-400'>
          <label htmlFor="file-uploader" className='w-full h-full flex justify-center items-center flex-col'>  <FaFileUpload className='text-4xl text-blue-400 group-hover:text-blue-500' />
            <p className='dark:text-white'>Drop your file here, or click to browse</p>
            <div className='text-slate-400'>max 25 MB · any type</div></label>
          <input type="file" id="file-uploader" className='hidden' {...register('file', { required: true })} />
          
        </div>

       {selectedFile && (
  <div className="w-full h-40 mt-6 rounded-3xl border border-slate-400 flex justify-center items-center">
    <div className="relative w-30 h-30 rounded-xl border border-slate-400 overflow-hidden flex justify-center items-center">

      {renderPreview()}

      <button
        type="button"
        className="absolute top-2 right-2"
        onClick={clearimage}
      >
        <TbXboxXFilled size={24} />
      </button>

    </div>
  </div>
)}

       

        
        <div className='dark:bg-[#1f2b3d] bg-gray-100 border-1 max-md:rounded-2xl border-slate-300 p-3 rounded-full w-full flex flex-wrap gap-2 mt-6 justify-around'>
          <input type="text" placeholder='Title' className='dark:bg-[#0f1729] dark:text-slate-400 py-1.5 px-4 border-1 border-slate-200 rounded-full bg-white ' {...register('title', { required: true })} />
          <input type="text" placeholder='Description' className=' py-1.5 px-4 border-1 border-slate-200 rounded-full bg-white ' {...register('description', { required: true })} />

          <button
            type="submit"
            className="flex justify-center items-center gap-1 text-white py-1.5 px-4 rounded-full bg-black"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <IoIosAddCircle className="inline" />
                <span>Add file</span>
              </>
            )}
          </button>
        </div>
      </form>
    </>
  )
}

export default Uploader