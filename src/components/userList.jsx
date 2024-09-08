import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { deleteUser, fetchUsers } from '../store/userSlice';
import axios from 'axios';
import { MdDeleteForever } from "react-icons/md";

function UserList() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);
    const [error, setError] = useState(false);
    useEffect(() => {
        usersFetch();
     },[]);
    const usersFetch = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            dispatch(fetchUsers(response.data));
            setError(false);
        } catch (error) {
            setError(error.message);
        }
    }
    const handleDelete =  async (d) => {
        
      try {
          console.log(d.id)
          await axios.delete(`https://jsonplaceholder.typicode.com/users/${d.id}`);
          dispatch(deleteUser(d.id));
          setError(false)
      } catch (error) {
          setError(error)
      }
  };

  return users.length>0 ?(
    <div className="flex flex-col rounded-md overflow-auto bg-stone-50">
       {users.map((d)=> 
        (<div key={d.id} className="hidden sm:flex justify-between  border-b  border-emerald-100 shadow-[rgb(0,0,0)_0px_5px_5px_-7px]"><Link to={`/${d.id}`}className='w-full'><ul className="hidden sm:grid grid-cols-3 p-1 md:p-1.5 text-[13px] md:text-base col-span-11"> 
        <li>{d.name}</li> <li>{d.phone.replace(/[^0-9]/g, '')}</li> <li>{d.email}</li>  </ul></Link><button className='bg-red-500 p-0.5 rounded-md sm:text-base text-sm text-white' onClick={() =>{handleDelete(d)}}><MdDeleteForever /></button></div>)
       )}
       {users.map((d)=> 
        (<div key={d.id} className="flex justify-between border-b border-emerald-100  shadow-[rgb(0,0,0)_0px_5px_5px_-7px] sm:hidden " ><Link to={`/${d.id}`}><ul className="sm:hidden flex flex-col p-1 md:p-1.5 text-[13px] md:text-base  "> 
        <li>Name: &nbsp; {d.name}</li> <li>Phone No.: &nbsp; {d.phone.replace(/[^0-9]/g, '')}</li> <li>E-Mail:  &nbsp;{d.email}</li> </ul></Link><button className='bg-red-500 p-0.5 rounded-md sm:text-base text-sm text-white' onClick={() =>{handleDelete(d)}}><MdDeleteForever /></button></div>)
       )}    
    </div>
  ):( (error)? (<div className="text-white">{error}!!</div>) : (<div className="flex flex-col rounded-md bg-stone-50/90 animate-pulse h-full justify-around px-4">
     <span className='h-3 bg-slate-400/60 w-full rounded-lg'></span>
     <span className='h-3 bg-slate-400/60 w-full rounded-lg '></span>
     <span className='h-3 bg-slate-400/60 w-full rounded-lg'></span>
     <span className='h-3 bg-slate-400/60 w-full rounded-lg'></span>
     <span className='h-3 bg-slate-400/60 w-full rounded-lg'></span>
     <span className='h-3 bg-slate-400/60 w-full rounded-lg'></span>
     <span className='h-3 bg-slate-400/60 w-full rounded-lg'></span>
     <span className='h-3 bg-slate-400/60 w-full rounded-lg'></span> 
  </div>))
}

export default UserList