import { Blogty } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogsCard"

export const BlogPage = ({blog}:{blog:Blogty})=>{
    return(<div>
        <Appbar/>
        <div key={blog.id} className="grid grid-cols-12 px-10">
            <div className="col-span-8 pt-10">
                <div className="text-6xl font-bold mb-2">{blog.title} </div>
                <div>Posted on August 24,2023</div>
                <div className="mt-5">{blog.content}</div>
            </div>
            <div className="col-span-4 pt-15 pl-10">
                <div className=" font-semibold">Auther</div>
                <div className="flex items-center">
                    <div className="mr-2"><Avatar name={blog.author.name}/></div>
                    <div>
                        <div className="font-bold text-2xl">{blog.author.name}</div>
                        <div className="text-slate-400 w-2xs">Master of mirth,purveor of puns and the funniest person in the kingdom.</div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}