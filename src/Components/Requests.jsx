import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../Utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest } from '../Utils/requestsSlice'

const Requests = () => {
    const dispatch = useDispatch()
    const allRequests = useSelector((store)=>store.requests)
    const fetchRequests = async ()=>{
        try{
            const res = await axios.get(BASE_URL + "/user/requests/received", {withCredentials:true});
            console.log(res.data?.data);
            dispatch(addRequest(res.data?.data))
        }catch(err){
            console.error(err.message);
        }
    }

    useEffect(()=>{
        fetchRequests();
    },[])

    if(!allRequests) return;
    if(allRequests.length===0) return  <h1 className='text-bold text-2xl'>No Requests</h1>;

  return (
    <div className='flex justify-center my-10 '>
    {allRequests.map((requests) =>{
       const {_id, firstName, lastName, age, gender, about, photoUrl} = requests.fromUserId;
    
           return (
               <div key = {_id} className='flex justify-center my-5 mx-10'>
                   <div className=" card bg-base-300 w-96 shadow-sm">
                       <div className="card-body">
                           <figure>
                           <img
                               src={photoUrl}
                               alt="Photo" />
                           </figure>    
                           <h1 className="card-title">{firstName + " "  + lastName}</h1>
                           {age && gender && <h4 className='flex'>{age + " " + gender}</h4>}
                           <p>{about}</p>
                           <div className="card-actions justify-center my-4">
                                <button className="btn btn-secondary">Reject</button>
                                <button className="btn btn-primary">Accept</button>
                            </div>
                       </div>
                   </div>
               </div>
    )})}

  </div>
  )
}

export default Requests