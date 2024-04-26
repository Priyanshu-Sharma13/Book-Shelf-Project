import React, { useState, useEffect } from 'react'
import '../ContentBlock/Content.css'
import { FaPhoneAlt } from 'react-icons/fa';
import { IoBagHandleOutline } from 'react-icons/io5';
import { BiCategory } from 'react-icons/bi';
import { CiLocationOn } from 'react-icons/ci';
import { TbFileDescription } from 'react-icons/tb';
import CategoryPage from './CategoryPage';
const Content = () => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const marginLeft = width < 600 ? 0 : 175
  const widthSize = width < 600 ? '100vw' : 'calc(100vw - 175px)'

  return (
    <div className="content-block" style={{ marginLeft, widthSize }}>
      <CategoryPage />
    </div>
  )
}

export default Content
