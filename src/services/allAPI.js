

import { ServerUrl } from "./ServerUrl"
import { commonApi } from "./commonApi"

//api to upload video

 export const uploadAllVideo=async(reqBody)=>{
   return await commonApi('POST',`${ServerUrl}/videos`,reqBody)
}

// api to get all video

export const getAllVideos = async()=>{
  return await commonApi('GET' ,`${ServerUrl}/videos`,"")
}



// api to delete

export const deleteVideo =async (id)=>{
  return await commonApi('DELETE' ,`${ServerUrl}/videos/${id}`)
}


// api to watch history

export const  watchHistory=async (videoDetails)=>{
  return await commonApi('POST' ,`${ServerUrl}/history`,videoDetails)
}


export const  getWatchHistory=async ()=>{
  return await commonApi('GET' ,`${ServerUrl}/history`,"")
}

export const deleteHistory =async (id)=>{
  return await commonApi('DELETE' ,`${ServerUrl}/history/${id}`)
}


//api to add category

export const  addCategory=async (reqBody)=>{
  return await commonApi('POST' ,`${ServerUrl}/category`,reqBody)
}

//api to get category
export const  getCategory=async ()=>{
  return await commonApi('GET' ,`${ServerUrl}/category`,"")
}

//api to get a video

export const  getAVideo=async (id)=>{
  return await commonApi('GET' ,`${ServerUrl}/videos/${id}`,"")
}

//api call to update category
export const updateCategory =async (id,reqBody)=>{
  return await commonApi('PUT' ,`${ServerUrl}/category/${id}`,reqBody)
}
