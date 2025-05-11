import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { ChangeEvent, useState } from "react"
import { SignupInput } from "@prayag01/common"
import axios from "axios"
import { BACKEND_URL } from "../config"

interface LabelledInputType{
    label:string,
    placeholder:string,
    type?:string,
    value:string
    onchange:(e:ChangeEvent<HTMLInputElement>)=> void
}

const LabelledInput = ({label,placeholder,onchange,type,value}:LabelledInputType)=>{
return <div className="w-1/2">
    <h2 className="font-bold pt-4">{label}</h2>
    <Input  placeholder={placeholder}  type={type} onChange={onchange} value={value}></Input>
</div>
}


export const Login = ()=>{

    const [postInputs,setPostInputs] = useState<SignupInput>({
        username:"",
        password:"",
        
    })

    const Navigate = useNavigate();

    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`,postInputs);
            const  jwt = response.data.jwt;
            localStorage.setItem("token",jwt);
            console.log(jwt);
            Navigate("/");
        }catch(error){
            
        }
    }

    return(<div className="h-screen w-screen ">
        <div className="  sm:grid-cols-1 grid lg:grid-cols-2 h-full justify-center">
            <div className=" bg-amber-400  flex flex-col items-center justify-center">
                <h1 className="font-bold text-3xl">create an account</h1>
                
                <p className="text-gray-500 pt-2"> create new Account <u><Link to={"/signup"}>Signup</Link></u></p>

                <LabelledInput value={postInputs.username} type="text" label="Email"  placeholder="example@gmail.com"  onchange={(e)=>{setPostInputs(c=>({
                    ...c,
                    username:e.target.value
                }))}}/>
                <LabelledInput value={postInputs.password}  label="password"  type="password" placeholder="" onchange={(e)=>{setPostInputs(c=>({
                    ...c,
                    password:e.target.value
                }))}}/>
                
                <div className="pt-4 w-1/2"><Button className="w-full" onClick={sendRequest}>Sign In</Button></div>
           
            </div>
            
             <div className="hidden bg-gray-200 lg:flex flex-col items-center justify-center px-20">
                <p className=" font-bold text-2xl ">"The customer servies i received was exceptional. The support team went above and beyond to address my concern"</p>
                <div className=" w-full mt-3">
                    <p className="font-bold ">jules winnfield</p>
                    <p className="text-gray-500">CEO, Acme.inc</p>
                </div>
                
            </div>
        </div>
    </div>)
}

