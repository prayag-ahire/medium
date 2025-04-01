import { useBlogs } from "../hooks"
import { Appbar } from "../components/Appbar"
import { BlogsCard } from "../components/BlogsCard"


export const Blogs = ()=>{
    const {loading,blogs} = useBlogs();

    if(loading){
        return <div> loading....</div>
    }
    return (<div>
        <div className="px-5"> <Appbar/></div>
        <div className="flex flex-col items-center justify-center">
        <div className="max-w-xl">
            {blogs.map(blog =>  <BlogsCard id={blog.id}
                autherName={blog.author.name} 
                title={blog.title} 
                content={blog.content} 
                publishDate={"2nd feb 2024"}/>)
                }
        </div>
        </div>
    </div>)
}