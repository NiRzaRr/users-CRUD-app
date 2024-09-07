import React, {useState, useEffect} from 'react'
import UserForm from '../components/userForm'

function EditInfo() {
    
  return (
    <div className="flex flex-col place-items-center w-5/6 h-full m-auto"><UserForm isEditing={true} /></div>
  )
}

export default EditInfo