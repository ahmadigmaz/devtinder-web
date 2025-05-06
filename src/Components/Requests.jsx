import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../Utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../Utils/requestsSlice'

const Requests = () => {
    const dispatch = useDispatch()
    const allRequests = useSelector((store)=>store.requests)

    const reviewRequest = async (status,requestId)=>{
        try{
            const res = await axios.post(BASE_URL + `/request/receive/${status}/${requestId}`,{},{withCredentials:true})
            dispatch(removeRequest(requestId))
        }catch(err){
            console.error(err.message);
        }
    }



    const fetchRequests = async ()=>{
        try{
            const res = await axios.get(BASE_URL + "/user/requests/received", {withCredentials:true});
            dispatch(addRequest(res?.data?.data))
        }catch(err){
            console.error(err.message);
        }
    }

    useEffect(()=>{
        fetchRequests();
    },[])

    if(!allRequests) return;
    if(allRequests.length===0) return  <h1 className=' flex justify-center text-bold text-2xl my-20'>No Requests Found</h1>;

  return (
    <div className=' justify-center my-10 '>
    {allRequests.map((request) =>{
       const {_id, firstName, lastName, age, gender, about, photoUrl} = request?.fromUserId;
       const requestId = request._id;
    
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
                                <button className="btn btn-secondary" onClick={()=>reviewRequest("rejected",requestId)}>Reject</button>
                                <button className="btn btn-primary" onClick={()=>reviewRequest("accepted",requestId)}>Accept</button>
                            </div>
                       </div>
                   </div>
               </div>
    )})}

  </div>
  )
}

export default Requests