import axios from "axios"

export const getBlogDatas = async () => { 
    try {
        const res = axios.get(`https://blog-api-7s15.onrender.com/api/blogs`)
        return res
    } catch (error) {
        throw new Error(String(error))
    }
}

export const getBlogBySlug = async ({slug}: {slug:string}) => { 
    try {
        const res = axios.get(`https://blog-api-7s15.onrender.com/api/blogs/${slug}`)
        return res
    } catch (error) {
        throw new Error(String(error))
    }
}