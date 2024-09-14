// CategoryPage.jsx

import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { IoSearch, IoFilter } from 'react-icons/io5'
import './CategoryPage.css'
import { FiFilter } from 'react-icons/fi'
import { FaRegUser } from 'react-icons/fa'
import { LiaRupeeSignSolid } from 'react-icons/lia'
import { IoBagHandleOutline } from 'react-icons/io5'
import { BiCategory } from 'react-icons/bi'
import { CiLocationOn } from 'react-icons/ci'
import { toast } from 'react-toastify'
const CategoryPage = () => {
  
  const location = useLocation()

  const [listBooks, setListBooks] = useState([])

  const fetchData = async (paramVal) => {
    try {
      const response = await axios.get(`/api/v1/book/${paramVal}`)
      console.log(response.data)
      const data = response.data.books
      // console.log(value);

      console.log(data)
      setListBooks(data)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    const storedValue = localStorage.getItem('myValue')
    if (storedValue) {
      fetchData(storedValue)
    } else {
      fetchData('');
    }
  }, [])

  const navigate = useNavigate()

  const handleClick = (book, item) => {
    navigate('/item', {
      state: { helo: 'helo', item: item, category: book.category },
    })
  }
  const [showFilter, setShowFilter] = useState(false)
  const [filterData, setFilterData] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    bookName: '',
  })
  const [temp, Temp] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    bookName: '',
  })

  const handleFilterClick = () => {
    setShowFilter(!showFilter)
    console.log(showFilter)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilterData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const clearLocalStorage = () => {
    localStorage.removeItem('myValue')
    fetchData('')

    setShowFilter(false)
    setFilterData(temp);


  }
  const handleOKClick = () => {
    let queryParams = []
    if (filterData.location) {
      queryParams.push(`location=${filterData.location}`)
    }
    if (filterData.minPrice) {
      queryParams.push(`minPrice=${filterData.minPrice}`)
    }
    if (filterData.maxPrice) {
      queryParams.push(`maxPrice=${filterData.maxPrice}`)
    }
    if (filterData.bookName) {
      queryParams.push(`search=${filterData.bookName}`)
    }

    let value = queryParams.length > 0 ? `?${queryParams.join('&')}` : ''

    localStorage.setItem('myValue', value)
    console.log(value)
    fetchData(value)
    setShowFilter(false)
  }


  return (
    <div className="category-page-filter-data">
      <div className="line-filter">
        <div className="filter-icon" onClick={handleFilterClick}>
          Search ... <FiFilter />
        </div>
        {showFilter && (
          <div className="filter-dialog">
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={filterData.location}
              onChange={handleChange}
            />
            <input
              type="number"
              name="minPrice"
              placeholder="Min Price"
              value={filterData.minPrice}
              onChange={handleChange}
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Max Price"
              value={filterData.maxPrice}
              onChange={handleChange}
            />
            <input
              type="text"
              name="bookName"
              placeholder="Book Name"
              value={filterData.bookName}
              onChange={handleChange}
            />
            <div className="button-filter">
              <button onClick={handleOKClick}>OK</button>
              <button
                onClick={clearLocalStorage}
                className="clear-filter-button"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="category-page">
        {listBooks.map((book) => (
          <div key={book._id} className="category">
            <h2 className="category-name">{book.category}</h2>
            <div className="items-list">
              {book.books.map((item, index) => (
                <div
                  key={index}
                  className="item"
                  onClick={() => handleClick(book, item)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="item-img">
                    <img src={item.image} className="add-img" alt="Image" />
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
  )
}

export default CategoryPage
