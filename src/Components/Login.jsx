import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../Utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../Utils/constants';



const Login = () => {

   const [emailId,setEmailId] = useState("");
   const [password,setPassword] = useState("");
   const [error, setError] = useState("");
   const dispatch = useDispatch();
   const navigate = useNavigate();


        const userData = useSelector((store)=>store.user)

        useEffect(() => {
        if (userData?.data) {
            navigate("/");
        }
        }, [userData, navigate]);

   const handlerLogin = async ()=>{
        try{
            const res = await axios.post(BASE_URL + "/login",{ 
                emailId,
                password
            },{ withCredentials: true })
            dispatch(addUser(res.data));
           return navigate("/");
        }catch(err){
            setError(err?.response?.data || "something went Wrong")
            console.error(err);
        }
   }

   const callSignUpPage = async ()=>{
        try{
            return navigate("/signup");
        }catch(err){
            console.error(err);
        }
   }
    const handleKeyDown = (e) =>{
        if(e.key === "Enter"){
             handlerLogin();
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
                        onKeyDown={handleKeyDown}
                        />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        className="input input-bordered w-full max-w-xs"
                        onChange={(e)=>setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        />
                    </label>
                    <p className='text-red-500'>{error}</p>
                </div>
                <div className="card-actions justify-center m-4">
                  <button className="btn btn-primary " onClick={handlerLogin}>Login</button>
                </div>
                <div>
                    <button className="text-white-600 hover:text-blue-600 transition-colors duration-100" onClick={callSignUpPage}>
                        Create Account
                    </button>
                </div>

            </div>
        </div>
    </div>    
  )
}

export default Login