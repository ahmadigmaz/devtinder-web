import axios from 'axios';
import React, { useState } from 'react'

const Login = () => {

   const [emailId,setEmailId] = useState("");
   const [password,setPassword] = useState("");

   const handlerLogin = async ()=>{
        try{
            const res = await axios.post("http://localhost:7777/login",{ 
                emailId,
                password
            },{ withCredentials: true })
        }catch(err){
            console.error(err);
        }
   }



  return (
    <div className='flex justify-center my-10'>
        <div className="card card-dash bg-base-300 w-96">
            <div className="card-body">
                <h2 className="card-title justify-center">Login</h2>
                <div className="flex flex-col space-y-4">
                    <label className="form-control w-full max-w-xs">
                        <input
                        type="text"
                        value={emailId}
                        placeholder="Email Id"
                        className="input input-bordered w-full max-w-xs"
                        onChange={(e)=>setEmailId(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <input
                        type="text"
                        value={password}
                        placeholder="Password"
                        className="input input-bordered w-full max-w-xs"
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <div className="card-actions justify-center m-4">
                  <button className="btn btn-primary " onClick={handlerLogin}>Login</button>
                </div>
            </div>
        </div>
    </div>    
  )
}

export default Login