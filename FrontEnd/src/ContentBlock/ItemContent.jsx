import React, { useState, useEffect } from 'react'
import '../ContentBlock/ItemContent.css'
import { FaPhoneAlt } from 'react-icons/fa'
import { IoBagHandleOutline } from 'react-icons/io5'
import { BiCategory } from 'react-icons/bi'
import { CiLocationOn } from 'react-icons/ci'
import { TbFileDescription } from 'react-icons/tb'
import { FaRegUser } from 'react-icons/fa'
import { LiaRupeeSignSolid } from 'react-icons/lia'
import { GoClock } from 'react-icons/go'
import { GiRegeneration } from 'react-icons/gi'

const ItemContent = ({ item, category}) => {
  //,category
  console.log(item + 'items')
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
  const [readMore, setReadMore] = useState(false)
  const marginLeft = width < 600 ? 0 : 175
  const widthSize = width < 600 ? '100vw' : 'calc(100vw - 175px)'

  return (
    <div className="content-block" style={{ marginLeft, widthSize }}>
      <div className="itemBlock" key={item._id}>
        <div className="itemheader">
          <div className="img">
            <img
              src={item.image}
              // src="https://m.media-amazon.com/images/I/61Qe0euJJZL._AC_UF1000,1000_QL80_.jpg"
              className="add-img"
            ></img>
          </div>
          <div className="personal-info">
            <div className="name-phone">
              Name : {item.userDetails.name}
              <br />
              <FaPhoneAlt className="phone-icon" /> : {item.userDetails.phone}
            </div>
            {/* <div className="phone"></div> */}
          </div>
        </div>
        <div className="itemcenter">
          <div className="status">
            <LiaRupeeSignSolid /> Price : {item.price}
          </div>
          <div className="categore">
            <FaRegUser /> Name : {item.name}
          </div>
          <div className="categore">
            {/* <BiCategory /> Category : {category} */}
          </div>
          <div className="categore">
            <GiRegeneration /> Edition : {item.edition}
          </div>
          <div className="categore">
            <GoClock /> Old (Years) : {item.old}
          </div>
          <div className="categore">
            <BiCategory /> Author : {item.author}
          </div>
          <div className="categore">
            <CiLocationOn /> Location : {item.userDetails.location}
          </div>
        </div>
        <div className="description">
          <div className="descript">
            <TbFileDescription /> Description :
          </div>
          <div className="descr">
            <p>
              {readMore
                ? item.description
                : `${item.description.substring(0, 100)}...`}
              <button
                className="descriptionContent-btn"
                onClick={() => setReadMore(!readMore)}
              >
                {readMore ? 'Show less' : '  Read more'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemContent
