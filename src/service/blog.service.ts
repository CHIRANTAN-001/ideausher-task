import axios from "axios"
import { BASE_URL } from "./index"

export const getBlogDatas = async () => { 
    try {
        const res = axios.get(`${BASE_URL}/api/blogs`)
        return res
    } catch (error) {
        throw new Error(String(error))
    }
}

export const getBlogBySlug = async ({slug}: {slug:string}) => { 
    try {
        const res = axios.get(`${BASE_URL}/api/blogs/${slug}`)
        return res
    } catch (error) {
        throw new Error(String(error))
    }
}