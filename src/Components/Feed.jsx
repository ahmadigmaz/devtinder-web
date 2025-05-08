import React, { useEffect } from 'react'
import { BASE_URL } from '../Utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../Utils/feedSlice';
import axios from 'axios';
import UserCard from './UserCard';


const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store)=>store.feed);
  const getFeed = async ()=>{
    if(feed) return;

    try{
      const res = await axios.get(BASE_URL + "/user/feed",{withCredentials:true})
      dispatch(addFeed(res?.data?.data));
    }catch(err){
      console.error(err.message);
    }
  }

  useEffect(()=>{
    getFeed();
  },[])

  if(!feed) return;
  if(feed.length === 0) return  <h1 className=' flex justify-center text-bold text-2xl my-10'>No New Users Found</h1>;

    return (feed && (
      <div className='flex justify-center my-5'>
       <UserCard user = {feed[0]}/>
      </div>
    ))
}

export default Feed