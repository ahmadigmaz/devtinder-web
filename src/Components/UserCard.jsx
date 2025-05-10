import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../Utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../Utils/feedSlice';

const UserCard = ({user, showButtons = true}) => {
         const {_id ,firstName, lastName, about, gender, photoUrl,age} = user
         const dispatch = useDispatch();

        const handlerSendRequest = async (status,toUserId) =>{

              try{
                const res = await axios.post(BASE_URL + `/request/send/${status}/${toUserId}`, {}, 
                            {withCredentials:true});
                dispatch(removeFeed(toUserId));            

              }catch(err){
                console.error("Error: " + err.message);
              }
        }

        return (
          <div key = {_id} className="card bg-base-300 w-96 shadow-sm flex">
          <figure>
            <img
              src={photoUrl}
              alt="Photo" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{firstName +" "+ lastName}</h2>
            {age && gender && <p>{age + " " + gender}</p>}
            <p>{about}</p>
            {showButtons && <div className="card-actions justify-center my-4">
              <button className="btn btn-secondary" onClick={()=>handlerSendRequest("ignored",_id)}>Ignore</button>
              <button className="btn btn-primary" onClick={()=>handlerSendRequest("interested",_id)} >Interested</button>
            </div>}
          </div>
        </div>
        )
}

export default UserCard