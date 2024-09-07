import React, { useEffect, useState } from 'react'
import UserForm from '../components/userForm'
import UserList from '../components/userList'


function AllUsers() {
    
  return (
    <div className="h-full flex flex-col items-center gap-1">
        <UserForm isEditing={false}/>
        <span className="font-bold text-orange-100 text-xl ">USER LIST</span>
        <div  className="h-full w-[95%] md:w-5/6 rounded-lg flex flex-col gap-2 overflow-auto">
          <ul className="hidden sm:grid grid-cols-3 bg-yellow-50 rounded-lg p-1 md:p-1.5 font-medium text-sm md:text-base md:font-semibold border-2 border-black shadow-[rgb(0,0,0)_0px_7px_8px_-7px]">
            <li>NAME</li>
            <li>PHONE No.</li>
            <li>E-MAIL</li>
          </ul>
         <UserList/>
        </div>
        
    </div>
  )
}

export default AllUsers