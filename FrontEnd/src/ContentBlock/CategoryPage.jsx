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
  // const [listBooks, setListBooks] = useState([])
  const location = useLocation()
  // const navigate = useNavigate()

  // useEffect(() => {
  //   fetchData()
  // }, [location.search])

  // const fetchData = async () => {
  //   try {
  //     const params = new URLSearchParams(location.search)
  //     const locationParam = params.get('location')
  //     const minPriceParam = params.get('minPrice')
  //     const maxPriceParam = params.get('maxPrice')
  //     const bookNameParam = params.get('bookName')

  //     const response = await axios.get('/api/v1/book/', {
  //       params: {
  //         location: locationParam,
  //         minPrice: minPriceParam,
  //         maxPrice: maxPriceParam,
  //         bookName: bookNameParam,
  //       },
  //     })

  //     setListBooks(response.data.books)
  //   } catch (error) {
  //     console.log(error.response)
  //   }
  // }

  const [listBooks, setListBooks] = useState([])
  // let [value, setValue] = useState('');

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
    // fetchData();
    // handleOKClick();
    const storedValue = localStorage.getItem('myValue')
    if (storedValue) {
      // setValue(storedValue)
      fetchData(storedValue)
    } else {
      fetchData('');
    }
    // console.log(value)

    // toast.success('done')
  }, [])

  // useEffect(() => {
  //   const storedValue = localStorage.getItem('myValue')
  //   if (storedValue) {
  //     setValue(storedValue)
  //   } else {
  //     setValue('')
  //   }
  //   fetchData()
  // }, [])

  // useEffect(() => {
  //   const handleStorageChange = (event) => {
  //     if (event.key === 'myValue') {
  //       setValue(event.newValue)
  //       fetchData(event.newValue)
  //     }
  //   }

  //   window.addEventListener('storage', handleStorageChange)

  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange)
  //   }
  // }, [])

  // const fetchData = async () => {
  //   const storedValue = localStorage.getItem('myValue')
  //   if (storedValue) {
  //     setValue(storedValue)
  //   } else {
  //     setValue('')
  //   }
  //   try {
  //     console.log(value);
  //     const response = await axios.get(`/api/v1/book/${value}`)

  //     const data = response.data.books
  //     console.log(data)
  //     setListBooks(data)
  //   } catch (error) {
  //     console.log(error.response)
  //   }
  // }

  // useEffect(() => {
  //   fetchData()
  // }, [localStorage])

  // fetchData();
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // useEffect(()=>{
  //   // try{

  //   // }
  //   const storedValue = localStorage.getItem('myValue')
  //   if (storedValue) {
  //     setValue(storedValue)
  //   } else {
  //     setValue('')
  //   }
  //   axios
  //     .get(`/api/v1/book/${value}`)
  //     .then((response) => {
  //       console.log(response.data.books)
  //       setListBooks(response.data.books)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // },[])

  const navigate = useNavigate()
  // const [detail, setDetail] = useState([]);
  // const handleClick = (item, item) => {
  //   navigate('/item', {
  //     state: { helo: 'helo', item: item, category: item },
  //   })
  // }

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

  // const [value,setValue] = useState('');

  // const handleOKClick = () => {
  //   let value = `?location=${filterData.location}&minPrice=${filterData.minPrice}&maxPrice=${filterData.maxPrice}&search=${filterData.bookName}`
  //   // setValue(value);
  //   localStorage.setItem('myValue', value)
  //   console.log(value)
  //   fetchData(value)
  //   setShowFilter(false)
  // }
  
  const clearLocalStorage = () => {
    localStorage.removeItem('myValue')
    fetchData('')

    setShowFilter(false)
    setFilterData(temp);


  }
  const handleOKClick = () => {
    // Initialize an empty array to store non-empty fields
    let queryParams = []
    // Check each field in filterData and add non-empty ones to queryParams array
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

    // Join the queryParams array with '&' to form the query string
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
