import React from 'react'
import { FaRegCopyright } from 'react-icons/fa6'
import { social } from '../data'
import { datas } from '../FooterAdd/addcontent.jsx'
import { imageAdd } from '../FooterAdd/addcontent.jsx'
import { PiShoppingCart } from 'react-icons/pi'
import { useState, useEffect } from 'react'
import { FaAngleLeft } from 'react-icons/fa6'
import { FaAngleRight } from 'react-icons/fa6'
// import { IoBagHandleOutline } from 'react-icons/io5'
import { BiCategory } from 'react-icons/bi'
import { FaRegUser } from 'react-icons/fa'
import { LiaRupeeSignSolid } from 'react-icons/lia'


// import { CiLocationOn } from 'react-icons/ci'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

import '../HomePage/HomePage.css'

import logimg from '../bookself.png'

const HomePage = () => {
  const [adds, setAdds] = useState(datas)
  const [images, setImage] = useState(imageAdd)

  const [currentImage, setCurrentImage] = useState(0)
  const [currentAdd, setCurrentAdd] = useState(0)

  const nextImg = () => {
    const next = (currentImage + 1) % images.length
    setCurrentImage(next)
  }
  const preImg = () => {
    const prev = (currentImage - 1 + images.length) % images.length
    setCurrentImage(prev)
  }

  const nextAdd = () => {
    const next = (currentAdd + 1) % adds.length
    setCurrentAdd(next)
  }

  useEffect(() => {
    let newVal = setInterval(() => {
      nextImg()
    }, 3000)

    return () => {
      clearInterval(newVal)
    }
  }, [currentImage])

  useEffect(() => {
    let newValue = setInterval(() => {
      nextAdd()
    }, 2500)

    return () => {
      clearInterval(newValue)
    }
  }, [currentAdd])

  const { image, ide } = images[currentImage]
  const { img, text, id } = adds[currentAdd]



   const [listBooks, setListBooks] = useState([])


   useEffect(() => {
     axios
       .get('/api/v1/book/')
       .then((response) => {
         console.log(response.data.books)
         setListBooks(response.data.books)
       })
       .catch((error) => {
         console.log(error)
       })
   }, [])

   const navigate = useNavigate()
   // const [detail, setDetail] = useState([]);
   const handleClick = (book, item) => {
     navigate('/item', {
       state: { helo: 'helo', item: item, category: book.category },
     })
   }


  return (
    <div className="home">
      <div className="home-log">
        <div className="home-log-img">
          <img src={logimg} />
        </div>
        <p>
          "Unlock the stories of yesterday, embrace the possibilities of
          tomorrow. Discover treasures in every page, at our old book bazaar."
        </p>
      </div>
      <div className="home-slideshow" key={ide}>
        <div className="left-button" onClick={preImg}>
          <FaAngleLeft />
        </div>
        <div className="image-slidshow">
          <img src={image}></img>
        </div>
        <div className="right-button" onClick={nextImg}>
          <FaAngleRight />
        </div>
      </div>
      <div className="home-content">
        <div className="category-page">
          {listBooks.map((book, index) => (
            <div key={book._id} className="category">
              <h2 className="category-name">{book.category}</h2>
              <div className="items-list">
                {book.books.map((item, index) => (
                  <div
                    key={item._id}
                    className="item"
                    onClick={() => handleClick(book, item)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="item-img">
                      <img
                        src={item.image}
                        // src="https://m.media-amazon.com/images/I/61Qe0euJJZL._AC_UF1000,1000_QL80_.jpg"
                        className="add-img"
                        alt=""
                      />
                    </div>
                    <span className="item-location">
                      <FaRegUser /> Name : {item.name}
                      <br />
                    </span>
                    <span className="item-category">
                      <BiCategory /> Author : {item.author}
                      <br />
                    </span>

                    <span className="item-status">
                      <LiaRupeeSignSolid /> Price : {item.price}
                      <br />
                    </span>
                    <p></p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="home-add">
        <div className="FooterAdd" key={id}>
          <div className="addimg">
            <img src={img}></img>
          </div>
          <div className="content">
            <div className="description">
              <h3>Bookself</h3>
              <p>{text}</p>
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
      </div>
      <div className="home-footer">
        <div className="home-footer-first">
          <div className="box">
            <h3>Trending Locations</h3>
            <ul>
              <li>Bubaneshwar</li>
              <li>Hyderabad</li>
              <li>Chandigarh</li>
              <li>Nashik</li>
            </ul>
          </div>
          <div className="box">
            <h3>Popular Locations</h3>
            <ul>
              <li>Kolkata</li>
              <li>Mumbai</li>
              <li>Chennai</li>
              <li>Pune</li>
            </ul>
          </div>
          <div className="box">
            <h3>About us</h3>
            <div className="contact-us">
              <Link to="/contact">
                Contact us
                {/* <a href="">Contact us</a> */}
              </Link>
            </div>
          </div>
          <div className="box">
            <h3>Book Self</h3>
            <div className="contact-us">
              <Link to="/faq">
                FAQ
                {/* <a href=""></a> */}
              </Link>
            </div>
          </div>
          <div className="box">
            <h3>Follow us</h3>
            <div className="social-link-content">
              {social.map((handles, index) => {
                return (
                  <div className="social-handle" key={index}>
                    <a href={handles.url}>{handles.icon}</a>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="home-footer-second">
          <div className="left-content">
            Copyright <FaRegCopyright className="iconc" />
            {'  '}
            company 2024. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
