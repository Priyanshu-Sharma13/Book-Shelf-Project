import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import '../AccountPages/Login.css'
import { FaFacebookF } from 'react-icons/fa6';
import { FaGoogle } from 'react-icons/fa';
import SignupPage from './SignupPage';
import axios from 'axios';
import {toast} from 'react-toastify'

const Login = () => {
  const navigateTo = useNavigate()
  const [isMobile, setIsMobile] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const tokenhandle = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      localStorage.setItem('token', token);
    } 
  // setTokenValue(localStorage.setItem('token', token))
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/v1/auth/login', {
        email: formData.email,
        password: formData.password,
      })
      console.log(response.data)
      const token = response?.data?.accessToken
      localStorage.setItem('token', token)
      await new Promise((resolve) => setTimeout(resolve, 500)) 
      toast.success('Login successful! Redirecting to home screen...');
      navigateTo('/home')
      
    } catch (error) {
      // console.log('Priyanshu')
      if (error.response) {
        const statusCode = error.response.status
        if (statusCode === 400) {
          toast.error('Bad request! Please check your input.')
        } else if (statusCode === 401) {
          toast.error('Unauthorized! Please login to access this feature.')
        } else if (statusCode === 404) {
          toast.error('Not found! The requested resource does not exist.')
        } else {
          toast.error(`Error ${statusCode} occurred!`)
        }
      } else if (error.request) {
        toast.error('Network error! Please check your internet connection.')
      } else {
        toast.error('An unexpected error occurred! Please try again later.')
      }
      console.error('Registration error:', error)
    }
  }



  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 740);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {isMobile ? (
        <div className="grid-container">
          <div className="left">
            <div id="container">
              <h1>Sign in</h1>
              <form onSubmit={handleSubmit}>
                <div id="email">
                  <input
                    type="email"
                    placeholder="Username/Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div id="password">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {/* <!-- <i class="ri-lock-unlock-line"></i> --> */}
                </div>
                <div id="forgot-password">
                  <a href="">Forgot password?</a>
                </div>
                <div id="signin">
                  <button type="submit" onClick={handleSubmit}>
                    Sign in
                  </button>
                </div>
              </form>

              <div id="line">
                <div id="or">
                  <p>Or</p>
                </div>
              </div>

              <div className="social-links">
                <div id="facebook">
                  <button>
                    <FaFacebookF />
                    <span> Facebook</span>
                  </button>
                </div>
                <div id="google">
                  <button>
                    <FaGoogle />
                    <span> Google</span>
                  </button>
                </div>
              </div>

              <div id="signup">
                Didn't have an account ?{' '}
                <Link to={'/signup'}>
                  <a>Signup</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-container">
          <div className="left">
            <div id="container">
              <h1>Sign in</h1>
              <form onSubmit={handleSubmit}>
                <div id="email">
                  <input
                    type="email"
                    placeholder="Username/Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div id="password">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {/* <!-- <i class="ri-lock-unlock-line"></i> --> */}
                </div>
                <div id="forgot-password">
                  <a href="">Forgot password?</a>
                </div>
                <div id="signin">
                  <button type="submit" onClick={handleSubmit}>
                    Sign in
                  </button>
                </div>
              </form>

              <div id="line">
                <div id="or">
                  <p>Or</p>
                </div>
              </div>

              <div className="social-links">
                <div id="facebook">
                  <button>
                    <FaFacebookF />
                    <span> Facebook</span>
                  </button>
                </div>
                <div id="google">
                  <button>
                    <FaGoogle />
                    <span> Google</span>
                  </button>
                </div>
              </div>

              <div id="signup">
                Didn't have an account ?{' '}
                <Link to={'/signup'}>
                  <a>Signup</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="right">
            <img src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg" />
          </div>
        </div>
      )}
    </div>
  )
};

export default Login;

