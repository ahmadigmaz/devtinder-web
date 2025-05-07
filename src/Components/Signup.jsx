import React, { useState } from 'react'
import { BASE_URL } from '../Utils/constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../Utils/userSlice';


const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [about, setAbout] = useState("");
    const [age, setAge] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlerSignup =  async()=> {
           try{
            const res = await axios.post( BASE_URL +"/signup",{ 
                firstName,
                lastName,
                emailId,
                password,
                gender,
                about,
                age,
                photoUrl
            },{ withCredentials: true })
            dispatch(addUser(res?.data));
            return navigate("/");

           }catch(err){
             console.error(err.message);
           }
    }
    const callLoginApi = async()=>{
        return navigate("/login");
    }


  return (
     <>
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
                            value={age}
                            placeholder="Age"
                            className="input input-bordered w-full max-w-xs"
                            onChange={(e)=>setAge(e.target.value)}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <input
                            type="text"
                            value={about}
                            placeholder="About"
                            className="input input-bordered w-full max-w-xs"
                            onChange={(e)=>setAbout(e.target.value)}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <input
                            type="PhotoUrl"
                            value={photoUrl}
                            placeholder="PhotoUrl"
                            className="input input-bordered w-full max-w-xs"
                            onChange={(e)=>setPhotoUrl(e.target.value)}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <select
                                value={gender}
                                className="select select-bordered w-full max-w-xs"
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            </label>
                    </div>
                    <div className="card-actions justify-center m-4">
                    <button className="btn btn-primary" onClick={handlerSignup}>SignUp</button>
                    </div>
                    <div>
                        <button className="text-white-600 hover:text-blue-600 transition-colors duration-100" onClick={callLoginApi} >
                            Already Have An Account
                        </button>
                   </div>

                </div>
            </div>
        </div> 
    </>    
  )
}

export default Signup