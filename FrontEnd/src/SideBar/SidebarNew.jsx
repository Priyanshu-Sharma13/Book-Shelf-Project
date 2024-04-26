import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../SideBar/SidebarNew.css'
import { links } from '../data'
import { FaHome } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa'
import { PiPlusBold } from 'react-icons/pi'
import { FaHeart } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { MdModeEditOutline } from 'react-icons/md';

function Sidebar() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [sidebarContent, setSidebarContent] = useState([])
  useEffect(() => {
    setSidebarContent(links)

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="app">
      {windowWidth < 600 ? (
        <div className="sidebar fixed-bottom">
          <ul className="ul flex">
            <li>
              <NavLink to="/home" className="nav">
                <FaHome /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className="nav">
                <MdModeEditOutline /> Edit User
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className="nav">
                <FaUser /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/form" className="nav">
                <PiPlusBold /> Add Book
              </NavLink>
            </li>
            <li>
              <NavLink to="/myads" className="nav">
                <FaHeart /> My Ads
              </NavLink>
            </li>
          </ul>
        </div>
      ) : (
        <div className="sidebar">
          <ul className="ul">
            <li>
              <NavLink to="/home" className="nav">
                <FaHome /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className="nav">
                <MdModeEditOutline /> Edit User
                {/* <FaUser /> */}
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className="nav">
                <FaUser /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/form" className="nav">
                <PiPlusBold /> Add Book
              </NavLink>
            </li>
            <li>
              <NavLink to="/myads" className="nav">
                <FaHeart /> My Ads
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Sidebar
