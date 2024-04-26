import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../SideBar/Sidebar.css'
import { links } from '../data'

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
          {sidebarContent.map((content) => {
            return (
              <div className="sidebar-content">
                {/* <img src={content.icon} ></img> */}
                {content.text}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="sidebar">
          {sidebarContent.map((content) => {
            return (
              <div className="sidebar-content">
                {/* <img src={content.icon} ></img> */}
                {content.text}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Sidebar
