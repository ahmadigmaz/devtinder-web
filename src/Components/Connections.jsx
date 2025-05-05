import React, { useEffect } from 'react'
import { BASE_URL } from '../Utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../Utils/connectionSlice';

const Connections =  () => {
    const connections = useSelector((store)=>store.connection);
    const dispatch  = useDispatch();
    const fetchConnections = async () =>{
        try{
            const res = await axios.get(BASE_URL + "/user/connections",
                {withCredentials: true,

                });
                dispatch(addConnection(res.data?.data));
        }catch(err){
            console.error("Eroor: " + err.message);
        }
    };

   useEffect(()=>{
      fetchConnections();
   },[]) 

   if(!connections) return;
   if(connections.length===0) return  <h1 className='text-bold text-2xl'>Connections</h1>;

  return (
    <div className='flex justify-center my-10 '>
         {connections.map((connection) =>{
            const {_id, firstName, lastName, age, gender, about, photoUrl} = connection;
         
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
                            </div>
                        </div>
                    </div>
         )})}

    </div>
  )
}

export default Connections