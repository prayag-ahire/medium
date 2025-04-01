import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blogty {
        "content": string
        "title": string
        "id": number
        "author": {
            "name": string
        }
}

export const useBlog = ({id}:{id:string})=>{
    const [loading , setLoading] = useState(true);
    const [blog,setBlog] = useState<Blogty>();

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        })
        .then(response=>{
            setBlog(response.data);
            setLoading(false);
        })
    },[id])
return{
    loading,
    blog
}
}

export const useBlogs = ()=>{
    const [loading , setLoading] = useState(true);
    const [blogs,setBlogs] = useState<Blogty[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        })
        .then(response=>{
            setBlogs(response.data);
            setLoading(false);
        })
    },[])
return{
    loading,
    blogs
}
}