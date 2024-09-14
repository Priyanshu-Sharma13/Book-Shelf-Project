import React from 'react'
import '../Header/HeaderNew.css' 
import logimg from '../bookself.png'
import { IoSearch , IoFilter} from 'react-icons/io5'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'

const HeaderNew = ({ onSearchUrlChange }) => {
  const navigateTo = useNavigate()
  const [showFilter, setShowFilter] = useState(false)
  const [filterData, setFilterData] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    search: '',
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
  const [value,setValue] = useState('');
  const handleOKClick = () => {
    // Construct search ID (URL)
    // setValue(newValue)
    localStorage.setItem(
      'myValue',
      `?location=${filterData.location}&minPrice=${filterData.minPrice}&maxPrice=${filterData.maxPrice}&bookName=${filterData.bookName}`
    
      )

      const storedValue = localStorage.getItem('myValue')
      if (storedValue) {
        setValue(storedValue)
      } else {
        setValue('Priyanshu')
      }
      console.log(value);
    toast.success("done");

  }


  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'myValue') {
        setValue(event.newValue)
        fetchData(event.newValue)
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])



  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    check()
  }, [])
  const check = () => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }

  const handleLogout = async () => {
    console.log('logout page')
    try {
      await axios.get('/api/v1/auth/logout')
      setIsLoggedIn(false)
      console.log('You logged out successfully.!')

      localStorage.removeItem('token')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleLogin = () => {
    console.log('login page')
    navigateTo('/login')
  }

  const buttonText = isLoggedIn ? 'Logout' : 'Login'
  const handleClick = isLoggedIn ? handleLogout : handleLogin

  return (
    <div className="header">
      <div className="logo">
        <img src={logimg} alt="logo" />
      </div>
      <div className="login-button">
        <button onClick={handleClick}>{buttonText}</button>
        {/* <div className="filter-icon" onClick={handleFilterClick}>
          <IoFilter />
        </div> */}
      </div>

    </div>
  )
}

export default HeaderNew