import React from 'react'
import { useState, useEffect } from 'react'
import Content from './ContentBlock/Content'
import './ErrorComp.css'
const ErrorComp = () => {
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
      <div className="error-comp-img">
        <h1>Please Login first...</h1>
        {/* <img
          src="https://media.istockphoto.com/id/1133420210/vector/notification-with-lock-and-password-on-screen-computer.jpg?s=612x612&w=0&k=20&c=meauFHJ6b5tm8mDKFCj-BYVozXLmVQ28SdYS1VEF4_4="
          alt="Please login first."
        /> */}
      </div>
    </div>
  )
}
export default ErrorComp
