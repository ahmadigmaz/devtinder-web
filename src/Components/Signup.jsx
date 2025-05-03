import React, { useState } from 'react'
import { BASE_URL } from '../Utils/constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const [firstName, setFirstName] = useState("Nidhi");
    const [lastName, setLastName] = useState("Chaddha");
    const [emailId, setEmailId] = useState("nidhi@gmail.com");
    const [password, setPassword] = useState("Nidhi@123");
    const [gender, setGender] = useState("female");
    const navigate = useNavigate();

    const handlerSignup =  async()=> {
        const res = await axios.post( BASE_URL +"/signup",{ 
            firstName,
            lastName,
            emailId,
            password,
            gender,
        },{ withCredentials: true })
        
        return navigate("/login");
    }

  return (
        <div className='flex justify-center my-3'>
            <div className="card card-dash bg-base-300 w-96">
                <div className="card-body">
                    <h2 className="card-title justify-center">Signup</h2>
                    <div className="flex flex-col space-y-4">
                        <label className="form-control w-full max-w-xs">
                            <input
                            type="text"
                            value={firstName}
                            placeholder="First Name"
                            className="input input-bordered w-full max-w-xs"
                            onChange={(e)=>setFirstName(e.target.value)}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <input
                            type="text"
                            value={lastName}
                            placeholder="Last Name"
                            className="input input-bordered w-full max-w-xs"
                             onChange={(e)=>setLastName(e.target.value)}
                            />
                        </label>
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
                        <label className="form-control w-full max-w-xs">
                            <input
                            type="text"
                            value={gender}
                            placeholder="Gender"
                            className="input input-bordered w-full max-w-xs"
                            onChange={(e)=>setGender(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="card-actions justify-center m-4">
                    <button className="btn btn-primary" onClick={handlerSignup}>SignUp</button>
                    </div>
                </div>
            </div>
        </div>  
  )
}

export default Signup