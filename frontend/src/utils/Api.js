import { useForm } from "react-hook-form"

const BaseUrl = import.meta.env.VITE_BASE_URL

const uploadfile = async (data) => {
  const url = `${BaseUrl}/api/v1/files/upload`
  const formData = new FormData()
  formData.append("title", data.title)
  formData.append("description", data.description)
  formData.append('file', data.file[0])
  try {
    const responce = await fetch(url, {
      method: "Post",
      body: formData
    })
    const result = await responce.json()
    if (!responce.ok) {
      setError("there is problem while uploading the file", result.message)
    }
  
    return result;
  } catch (error) {
    console.log(error)
  }
}
 
const uploadeTextFile=async(data)=>{
  const url = `${BaseUrl}/api/v1/files/upload/text`
  const formData=new FormData()
  formData.append('title',data.title)
  formData.append("description", data.description)
  formData.append('content', data.content)
    const responce = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result=responce.json()
  if(!responce.ok){
    console.log("frontendt error while uploading",result.message)
  }
  return result
  
}


const getAllFiles = async () => {
  const url = `${BaseUrl}/api/v1/files`
  try {
    const response = await fetch(url)
    const result = await response.json()

    if (!response.ok) {
      setError("there is problem while uploading the file", result.message)
    }

    return result;
  } catch (error) {
    console.log(error)
  }
}
const deleting = async (fileId) => {
  const url = `${BaseUrl}/api/v1/files/${fileId}`

  try {
    const responce = await fetch(url, {
      method: "DELETE"
    })
    const result = await responce.json()
    if (!responce.ok) {
      console.log('error in request')
      return;
    }
    return result;

  } catch (error) {
    console.log(error)
  }
}

const editDetail = async (fileId, title, description) => {
  const url = `${BaseUrl}/api/v1/files/${fileId}`
  

  if (!fileId) {
    comsole.log('Please provide the valid file if')
  }
  try {
    const responce = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description })
    })
    const result = await responce.json()

    if (!responce.ok) {
      console.log("There is erro in responce")
    }
    return result;

  } catch (error) {
    console.log(error)
  }
}


export { uploadfile, getAllFiles, deleting, editDetail,uploadeTextFile}