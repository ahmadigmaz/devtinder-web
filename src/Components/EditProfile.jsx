import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../Utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../Utils/userSlice';

const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
    const [age, setAge] = useState(user?.age || "");
    const [gender, setGender] = useState(user?.gender || "");
    const [about, setAbout] = useState(user?.about || "");

    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();

    const saveProfile = async ()=>{
        setError("");
        try{

            const res = await axios.patch(BASE_URL + "/profile/edit",
                 {firstName,lastName,photoUrl,age,gender,about} ,
                 {withCredentials:true});
                 dispatch(addUser(res?.data));
                 setShowToast(true);
                 setTimeout(()=>{
                    setShowToast(false)
                 },2000)

        }catch(err){
            setError(err.response.data)
        }
    }


  return (
    <>
    <div className='flex justify-center my-10'>
       <div className='flex justify-center mx-10'>
            <div className="card card-dash bg-base-300 w-96">
                <div className="card-body">
                    <h2 className="card-title justify-center">Edit Profile</h2>
                    <div className="flex flex-col space-y-4">
                        <p>First Name</p>
                        <label className="form-control w-full max-w-xs">
                            <input
                            type="text"
                            value={firstName}
                            placeholder="First Name"
                            className="input input-bordered w-full max-w-xs"
                            onChange={(e)=>setFirstName(e.target.value)}
                            />
                        </label>
                        <p>Last Name</p>
                        <label className="form-control w-full max-w-xs">
                            <input
                            type="text"
                            value={lastName}
                            placeholder="Last Name"
                            className="input input-bordered w-full max-w-xs"
                             onChange={(e)=>setLastName(e.target.value)}
                            />
                        </label>
                        <p>Photo URL</p>
                        <label className="form-control w-full max-w-xs">
                            <input
                            type="text"
                            value={photoUrl}
                            placeholder="PhotoUrl"
                            className="input input-bordered w-full max-w-xs"
                            onChange={(e)=>setPhotoUrl(e.target.value)}
                            />
                        </label>
                        <p>Age</p>
                        <label className="form-control w-full max-w-xs">
                            <input
                            type="text"
                            value={age}
                            placeholder="Age"
                            className="input input-bordered w-full max-w-xs"
                            onChange={(e)=>setAge(e.target.value)}
                            />
                        </label>
                        <p>Gender</p>
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

                        <p>About</p>
                        <label className="form-control w-full max-w-xs">
                            <textarea
                            type="text"
                            value={about}
                            placeholder="about"
                            className="input input-bordered w-full max-w-xs"
                            onChange={(e)=>setAbout(e.target.value)}
                            />
                        </label>
                    </div>
                    <p className='text-red-500'>{error}</p>
                    <div className="card-actions justify-center m-4">
                    <button className="btn btn-primary" onClick={saveProfile} >Update Profile</button>
                    </div>
                </div>
            </div>
       </div>  
       <div className='flex'>
        <UserCard user={{firstName,lastName,photoUrl,age,gender,about}} showButtons = {false}/>
       </div>
     </div>  
        {showToast && (
             <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
                <div className="alert alert-success shadow-lg">
                <span>Profile updated successfully.</span>
                </div>
             </div>
        )}

   </> 
    )
  
}

export default EditProfile