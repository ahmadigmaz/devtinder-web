import React, { useEffect } from 'react'
import { BASE_URL } from '../Utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../Utils/feedSlice';
import axios from 'axios';
import UserCard from './userCard';


const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store)=>store.feed);
  const getFeed = async ()=>{
    if(feed) return;

    try{
      const res = await axios.get(BASE_URL + "/user/feed",{withCredentials:true})
      dispatch(addFeed(res.data));
    }catch(err){
      console.error(err.message);
    }
  }

  useEffect(()=>{
    getFeed();
  },[])

    return feed && (
      <div className='flex justify-center my-5'>
       <UserCard user = {feed.data[0]}/>
      </div>
    )
}

export default Feed