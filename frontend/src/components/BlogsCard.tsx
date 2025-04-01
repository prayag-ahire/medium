import { Link } from "react-router-dom"

interface BlogPageProps {
    autherName:string,
    title:string,
    content:string,
    publishDate: string,
    id:number
}

export const BlogsCard = ({
    id,
    autherName,
    title,
    content,
    publishDate
}:BlogPageProps)=>{
    return(<Link to={`/blog/${id}`}>
    <div className="border-b pb-5 cursor-pointer">
        <div className="flex ">
            <div className="flex justify-center"><Avatar name={autherName}/></div><div className="mx-1">{autherName}</div> <div className="flex items-center"><Circal/></div> <div className="mx-1 text-gray-600">{publishDate}</div>
        </div>
        <div className="text-2xl font-bold">{title}</div>
        <div>{content.slice(0,100)+"..."} </div>
        <div>{`${Math.ceil(content.length / 100)} minutes`}</div>
        {/* <div className="w-full h-1 bg-slate-300"></div> */}
    </div></Link>)
}

function Circal(){
    return(<div className=" w-1 h-1 rounded-full bg-slate-500">
    </div>)
}
export function Avatar({name}:{name:string}){
    return(<div>
        <div className="relative inline-flex items-center justify-center mx-2 w-7 h-7 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
        </div>
    </div>)
}