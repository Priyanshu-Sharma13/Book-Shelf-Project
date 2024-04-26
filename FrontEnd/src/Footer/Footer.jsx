import React, { useState, useEffect } from 'react'
import '../Footer/Footer.css'
import { social } from '../data';

import { FaRegCopyright } from 'react-icons/fa6';


function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
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
      {/* <div className="container"></div> */}
      {/* {windowWidth >= 600 && ( */}
        <footer className="footer">
          <div className="left-content">
            Copyright  {" "}
            <FaRegCopyright className="iconc" />
            {'  '}
            company 2024. All rights reserved.
          </div>
          <div className="right-content">
            {social.map((handles, index) => {
              return (
                <div className="handles" key={index}>
                  <a href={handles.url}>{handles.icon}</a>
                </div>
              )
            })}
          </div>
        </footer>
      {/* )} */}
    </div>
  )
}

export default App
