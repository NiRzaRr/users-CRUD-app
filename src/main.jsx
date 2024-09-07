import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AllUsers from './pages/allUsers.jsx'
import UserInfo from './pages/userInfo.jsx'
import EditInfo from './pages/editInfo.jsx'
import  store  from './store/store.js'
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <AllUsers />,
      },
      {
        path: "/:userId",
        element: <UserInfo />,
      },
      {
        path: "/editInfo/:userId",
        element: <EditInfo />,
      },
    ],
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
