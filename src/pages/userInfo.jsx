import React, {useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../store/userSlice';

function UserInfo() {
    const {userId} = useParams();
    const users = useSelector(state => state.users.users);
    const user = users.find(user => user.id === parseInt(userId));
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState(false)
     
    const handleDelete =  async () => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
            dispatch(deleteUser(userId));
            navigate('/')
            setError(false)
        } catch (error) {
            setError(error)
        }
    };

  return (user && !error)? (
    <div className='bg-yellow-50 w-5/6 sm:w-4/5 md:w-1/2 sm:text-base text-sm lg:w-[40%] flex flex-col h-[45%] justify-around p-2 gap-6 font-medium place-self-center m-auto rounded-md'>
      <span>Name: {user.name}</span>
      <span>Phone No.: {user.phone}</span>
      <span>E-mail: {user.email}</span>
      <span>City: {user.address.city}</span>
      <div className='grid grid-cols-2 gap-1'>
      <Link to={`/editInfo/${user.id}`}><button className='bg-indigo-700 p-1 rounded-md sm:text-base text-sm text-white w-full'>EDIT</button></Link> 
      <button className='bg-red-500 p-1 rounded-md sm:text-base text-sm text-white  block' onClick={handleDelete}>DELETE</button> 
      </div>
    </div>
  ):((error && user)? <div> {error}!! </div> :<div className='bg-white/80 w-2/3 md:w-1/2 lg:w-[40%] flex flex-col animate-pulse justify-around  p-2 h-[45%] m-auto rounded-md'>
    <span className='h-3 bg-slate-400/60 w-5/6 rounded-lg'></span>
    <span className='h-3 bg-slate-400/60 w-[60%] rounded-lg'></span>
    <span className='h-3 bg-slate-400/60 w-5/6 rounded-lg'></span>
    <span className='h-3 bg-slate-400/60 w-[70%] rounded-lg'></span>
    <span className='h-3 bg-slate-400/60 w-5/6 rounded-lg'></span>
    <span className='h-3 bg-slate-400/60 w-[60%] rounded-lg'></span>
    <span className='h-3 bg-slate-400/60 w-5/6 rounded-lg'></span>
    <span className='h-3 bg-slate-400/60 w-[70%] rounded-lg'></span>   
    
  </div>)

  
}

export default UserInfo