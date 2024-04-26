import React from 'react'
import '../FooterAdd/FooterAdd.css'
// import addimg from '../footeradd1.webp'
import { PiShoppingCart } from 'react-icons/pi';
import { useState, useEffect } from 'react';
import {datas} from '../FooterAdd/addcontent.jsx'
const FooterAdd = () => {
    const [adds, setAdds] = useState(datas)
    const [currentAdd, setCurrentAdd] = useState(0)

    const nextAdd = () => {
      const next = (currentAdd + 1) % adds.length
      setCurrentAdd(next)
    }

    const preAdd = () => {
      const prev = (currentAdd - 1 + adds.length) % adds.length
      setCurrentAdd(prev)
    }

    useEffect(() => {
      let newValue = setInterval(() => {
        nextAdd()
      }, 2500)

      return () => {
        clearInterval(newValue)
      }
    }, [currentAdd])

    const { img, text, id } = adds[currentAdd]
    
    const [widthSize, setWidthSize] = useState(window.innerWidth)
    const width = widthSize < 600 ? '100vw' : 'calc(100vw - 175px)'
    const float = widthSize < 600 ? 'none' : 'right'
    return (
    <div className="FooterAdd" key={id} style={{width, float}}>
      <div className="addimg">
        <img src={img}></img>
      </div>
      <div className="content">
        <div className="description">
          <h3>Bookself</h3>
          <p>{text}</p>
          {/* <p>Reunite Lost Treasures: Discover Your Lost Items Here!</p> */}
        </div>
      </div>
      <div className="visitus">
        <div className="block">
          <div className="line">Get your favourite book.</div>
          <button type="button" className="button">
            <PiShoppingCart className="icon" /> Visit Us
          </button>
        </div>
      </div>
    </div>
  )
}

export default FooterAdd

