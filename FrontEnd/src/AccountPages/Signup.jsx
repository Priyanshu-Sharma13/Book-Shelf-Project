import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LuRefreshCcw } from 'react-icons/lu'
import { FaFacebookF } from 'react-icons/fa6'
import { FaGoogle } from 'react-icons/fa'
import axios from 'axios'
import { toast } from 'react-toastify'

import '../AccountPages/Signup.css'

const Signup = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState('')
  const [captchaValue, setCaptchaValue] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (name === 'password') {
      checkPasswordStrength(value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/api/v1/auth/register',{
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      )
      console.log(response.data)
      window.location.href = '/login'
    } catch (error) {
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
      setIsMobile(window.innerWidth < 740)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  var value =
    'qwertyuioplkhjgfadszxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM1234567890@#$&'
  let index
  var capVal = ''

  function regenerate() {
    capVal = ''
    for (let i = 0; i < 6; i++) {
      index = Math.floor(Math.random() * 66)
      capVal = capVal + value.charAt(index)
    }
    setCaptchaValue(capVal)
  }

  useEffect(() => {
    regenerate()
  }, [])

  function checkPasswordStrength(password) {

    let strength = 0

    if (password.length >= 8) {
      strength += 1
    }

    if (/[A-Z]/.test(password)) {
      strength += 1
    }

    if (/[a-z]/.test(password)) {
      strength += 1
    }

    if (/\d/.test(password)) {
      strength += 1
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      strength += 1
    }

    let strengthText
    switch (strength) {
      case 1:
        strengthText = 'Weak'
        break
      case 2:
        strengthText = 'Moderate'
        break
      case 3:
        strengthText = 'Strong'
        break
      case 4:
        strengthText = 'Very Strong'
        break
    }
    setPasswordStrength(strengthText)
  }

  return (
    <div>
      <div className="signup">
        {isMobile ? (
          <div className="grid-container">
            <div className="left">
              <div id="container">
                <h1>Sign up</h1>
                <form onSubmit={handleSubmit}>
                  <div id="name">
                    <input
                      type="text"
                      placeholder="Username"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div id="email">
                    <input
                      type="email"
                      placeholder="Email"
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
                  </div>
                  <div className="strength-indicator" id="strengthIndicator">
                    {passwordStrength}
                  </div>

                  <div id="signup">
                    <button type="submit" onClick={handleSubmit}>
                      Sign up
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

                <div id="signin">
                  Already have an account ?{' '}
                  <a>
                    <Link to={'/login'}>Signin</Link>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-container">
            <div className="left">
              <div id="container">
                <h1>Sign up</h1>
                <form onSubmit={handleSubmit}>
                  <div id="name">
                    <input
                      type="text"
                      placeholder="Username"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div id="email">
                    <input
                      type="email"
                      placeholder="Email"
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
                  </div>
                  <div className="strength-indicator" id="strengthIndicator">
                    {passwordStrength}
                  </div>

                  <div id="signup">
                    <button type="submit" onClick={handleSubmit}>
                      Sign up
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

                <div id="signin">
                  Already have an account ?{' '}
                  <a>
                    <Link to={'/login'}>Signin</Link>
                  </a>
                </div>
              </div>
            </div>
            <div className="right">
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/sign-up-8694031-6983270.png" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Signup
