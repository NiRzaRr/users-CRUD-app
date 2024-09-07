import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/header'

function App() {
  const [count, setCount] = useState(0)

  return (
    
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-800 h-dvh">
        <div className="h-[5%] sm:h-[6%]">
          <Header />
        </div>
        <div className="h-[92%] p-1 w-full"> 
          <Outlet />
        </div>
        
      </div>
  )
}

export default App
