import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { ChangeEvent, useState } from "react"

export const Signup = ()=>{
    // const [name,setName] = useState("");
    // const [email,setEmail] = useState("");
    // const [pass,setPass] = useState("");
    const postinputs = useState({
        username:"",
        email:"",
        password:""
    })
    return(<div className="h-screen w-screen ">
        <div className="flex flex-row h-full w-screen justify-center py-30">
            <div className="w-full bg-amber-400 lg:w-1/2  flex flex-col items-center justify-center">
                <h1 className="font-bold text-3xl">create an account</h1>
                <p className="text-gray-500 pt-2">Already have an account ? <u><Link to={"/login"}>Login</Link></u></p>
                <LabelledInput label="Username" placeholder="Entery your name" onchange={(e)=>{setName(e.target.value)}}/>
                <LabelledInput label="Email" placeholder="example@gmail.com" onchange={(e)=>{setEmail(e.target.value)}}/>
                <LabelledInput label="password" placeholder="" onchange={()=>{}}/>
                <div className="pt-4 w-1/2"><Button className="w-full">SignUp</Button></div>
            </div>
             <div className="invisible lg:visible w-0 lg:w-1/2 bg-gray-200  flex flex-col items-center justify-center px-30">
                <p className=" font-bold text-2xl">"The customer servies i received was exceptional. The support team went above and beyond to address my concern"</p>
                <div className=" w-full mt-3">
                    <p className="font-bold ">jules winnfield</p>
                    <p className="text-gray-500">CEO, Acme.inc</p>
                </div>
            </div>
        </div>
    </div>)
}

interface LabelledInputType{
    label:string,
    placeholder:string,
    onchange:(e:ChangeEvent<HTMLInputElement>)=> void
}
const LabelledInput = ({label,placeholder,onchange}:LabelledInputType)=>{
return <div className="w-1/2">
<h2 className="font-bold pt-4">{label}</h2>
<Input placeholder={placeholder} onChange={onchange}></Input>
</div>
}