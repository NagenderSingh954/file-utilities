import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import { IoIosAddCircle } from 'react-icons/io'
import { uploadeTextFile } from '../utils/Api'

function Textuplaod({ filesinfo, setFilesinfo }) {
  const {register,handleSubmit,reset}=useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("");

  const uploadtext=async(data)=>{
    console.log(data)
       setLoading(true);
    setError("");

    try {
      const response = await uploadeTextFile(data);
     
      setFilesinfo(prev => [response.data, ...prev])
      reset();

    } catch (error) {
      setError(error.response?.data?.message || error.message);
      console.error("Error while uploading:", error);
    } finally {
      setLoading(false);
    }
  }


  return (
  <form onSubmit={handleSubmit(uploadtext)}>
   <div  >
    <textarea
    name="content"
    {...register("content",{required:true})}
    placeholder="Write your text here..."
    className='group border-2 bg-gray-100 border-slate-300 border-dashed w-full h-35 rounded-4xl flex justify-center items-center flex-col hover:border-slate-400 p-3'
/></div>
     <div
      className='bg-gray-100 border-1 border-slate-300 p-3 rounded-full w-full flex flex-wrap gap-2 mt-6 justify-around max-md:rounded-2xl'>
          <input type="text" placeholder='Title' className='py-1.5 px-4 border-1 border-slate-200 rounded-full bg-white ' {...register('title', { required: true })} />
          <input type="text" placeholder='Description' className='py-1.5 px-4 border-1 border-slate-200 rounded-full bg-white ' {...register('description', { required: true })} />

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
  )
}

export default Textuplaod