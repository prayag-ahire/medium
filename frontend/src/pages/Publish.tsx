import axios from "axios"
import { Appbar } from "../components/Appbar"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import {  useNavigate } from "react-router-dom"

export const Publish = ()=>{
    const [title , setTitle] = useState("");
    const [content,setContent] = useState("");
    const navigate = useNavigate();

    return <div className="h-fit">
        <div><Appbar/></div>
        <div className="w-full pt-20 px-40 h-full">
            <div className="border-1 h-full">
            <div ><Input placeholder="Tital" onChange={(e)=>{setTitle(e.target.value)}} className="border-0 focus:outline-none"/></div>
            <div><Textarea rows={8} placeholder="Tell your story" onChange={(e)=>{setContent(e.target.value)}} className="h-full border-0 focus:outline-none "/></div>
            <div className="pt-5"><Button onClick={async()=>{
                const responce = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                    title,
                    content
                },{headers:{
                    Authorization:localStorage.getItem("token")
                }})

                navigate(`/blog/${responce.data.id}`)
            }}>Publish post</Button></div>
            </div>
        </div>
        
    </div>
}