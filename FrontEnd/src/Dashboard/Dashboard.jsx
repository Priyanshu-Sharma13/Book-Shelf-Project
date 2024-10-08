// Dashboard.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Dash from '../ExtraComp/Dash'

const Dashboard = () => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/user-data-endpoint')
        setUserData(response.data)
      } catch (error) {
        
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [])
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const marginLeft = width < 600 ? 0 : 175
  const widthSize = width < 600 ? '100vw' : 'calc(100vw - 175px)'

  return (
    <div className="content-block" style={{ marginLeft, widthSize }}>
      <Dash />
    </div>
  )
}

export default Dashboard
