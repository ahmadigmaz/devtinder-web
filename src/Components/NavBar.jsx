import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../Utils/constants';
import axios from 'axios';
import { removeUser } from '../Utils/userSlice';
import EditProfile from './EditProfile';

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerLogout = async () => {
    try{
        const res = await axios.post(BASE_URL + "/logout",
          {},
          {withCredentials:true});
          dispatch(removeUser());
          navigate("/login");
    }catch(err){
        console.error(err);
    }
}

  const firstName = user?.data?.firstName;
  const photoUrl = user?.data?.photoUrl;

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to = "/" className="btn btn-ghost text-xl">DevTinder</Link>
      </div>
      
      {firstName && (
        <div className="flex gap-2">
          Welcome, {firstName}
          <div className="dropdown dropdown-end mx-5 flex"> 
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User Photo"
                  src={photoUrl || "/default-avatar.png"} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                 <Link to = "/profile" className="justify-between">Profile</Link> 
              </li>
              <li><Link to="/connections">Connections</Link></li>
              <li><Link to="/requests">Requests</Link></li>

              <li><a onClick={handlerLogout}>Logout</a></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavBar
