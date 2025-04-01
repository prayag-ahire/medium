import { Link } from "react-router-dom"
import { Avatar } from "./BlogsCard"
import { Button } from "./ui/button"


export const Appbar = ()=>{
    return <div className=" flex justify-between mx-10 pt-2">
        <div className="flex items-center">
            <Link className="text-3xl font-bold cursor-pointer" to={"/blogs"}>Medium</Link>
            <div className="rounded-2xl bg-gray-500 h-8 ml-4 "><input  placeholder="Search"/></div>
        </div>
        <div className="flex">
            <div><Link to={"/publish"}><Button>publish</Button></Link></div>
            <Avatar name="Medium"/>
        </div>
    </div>
}