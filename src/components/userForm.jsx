import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { addUser, updateUser } from '../store/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

function UserForm({isEditing}) {
    const {userId} =useParams()
    const users = useSelector((state) => state.users.users)
    const [error, setError] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
      });
 const navigate = useNavigate()
 const dispatch = useDispatch()
    useEffect(() => {
    if (isEditing) {
        const currentUser = users.find(user => user.id === parseInt(userId));
        // console.log({...currentUser})
        if (currentUser) {
            setFormData({
                ...currentUser,
                phone: Number(currentUser.phone.replace(/[^0-9]/g, '')),
                city: currentUser.address.city
            });
            console.log(formData)
        }
      }
    }, [userId, isEditing]);
        

       // on every change it will set data in formData object
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({
              ...formData,
              [name]: value,
            });
          };

          
          const handleSubmit = (e) => {
            e.preventDefault();

            //after all input fields are filled the object from formdata is copied to userPayload object
            const userPayload = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: {
                    ...formData.address,
                    city: formData.city,
                }
            };
    
            if (isEditing) {
                editUser(userId, userPayload)
                    .then(() => navigate(`/${userId}`))
                    .catch(error => setError(error));
            } else {
                createUser(userPayload)
                    .then(() => navigate('/'))
                    .catch(error => setError(error));
            }
        };

        //updating user
         const editUser = async (id, user) => {
            try {
                const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, {
                    ...user,
                    address: {
                        city: user.city,
                        ...user.address,
                    }
                });
                dispatch(updateUser(response.data));
                setError(false)
            } catch (error) {
                setError(error)
            }
        };

        //creating new user
        const createUser = async (user)  => {
            try {
                const response = await axios.post('https://jsonplaceholder.typicode.com/users', {
                    ...user,
                    address: {
                        city: user.city,
                        ...user.address,
                    }
                });
                dispatch(addUser(response.data));
                setError(false)
            } catch (error) {
                setError(error)
            }
        };
  return (formData && !error)?(
    
        <form onSubmit={handleSubmit} className=" grid grid-cols-1 gap-x-10 sm:grid-cols-6 h-[47%] sm:h-2/5 bg-white rounded-lg px-5 w-5/6 shadow-xl">{console.log(formData)}
        <div className="sm:col-span-3">
          <label htmlFor="name" className="flex flex-col text-[13px] md:text-base font-medium leading-5 text-gray-900">Name</label>
          <div className="mt-1">
            <input type="text" name="name" id="name" placeholder="Enter Full Name" className=" w-full rounded-md border-0 py-1 bg-gray-50 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 text-[13px] md:text-base leading-5 indent-1" 
            value={formData.name} onChange={handleChange}></input>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="email" className="flex flex-col text-[13px] md:text-base font-medium leading-5 text-gray-900">Email</label>
          <div className="mt-1">
          <input id="email" name="email" type="email" placeholder='Enter Email' className=" w-full rounded-md border-0 py-1 text-gray-900 shadow-sm bg-gray-50 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-[13px] md:text-base leading-5 indent-1" 
          value={formData.email} onChange={handleChange}></input>
          </div>
        </div>

        <div className="sm:col-span-3 ">
          <label htmlFor="phone" className="flex flex-col text-[13px] md:text-base font-medium leading-5 text-gray-900">Phone Number</label>
          <div className="mt-1">
            <input type="number" name="phone" id="phone" placeholder='Enter Phone Number ' className=" w-full rounded-md border-0 py-1 text-gray-900 bg-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-[13px] md:text-base leading-5 indent-1" onChange={handleChange} value={formData.phone}></input>
          </div>
        </div>  

        <div className="sm:col-span-3">
          <label htmlFor="city" className="flex flex-col text-[13px] md:text-base font-medium leading-5 text-gray-900">City</label>
          <div className="mt-1">
            <input type="text" name="city" id="city" placeholder='Enter City' className=" w-full rounded-md border-0 py-1 text-gray-900 bg-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-[13px] md:text-base leading-5 indent-1" onChange={handleChange} value={formData.city}></input>
          </div>
        </div>

        <div className="sm:col-span-6 ">
          <button type="submit" className="w-full rounded-md bg-indigo-500 h-6 sm:h-7 lg:h-9 text-[13px] md:text-base font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>  
        </div>
        

      </form>
   
    
  ):(<div>{error}</div>)
}

export default UserForm