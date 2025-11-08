import React from 'react'
import Sidebar from './Sidebar'
import MainContainer from './MainContainer'
import WatchPage from './WatchPage'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Body = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen)

  return (
    <div className={`flex mt-1 ${isMenuOpen ? 'ml-50' : 'ml-0'}`}>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default Body
