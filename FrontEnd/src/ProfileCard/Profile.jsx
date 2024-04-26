import React, { useState, useEffect } from 'react'
import '../ProfileCard/Profile.css'
import axios from 'axios';
import {toast} from 'react-toastify'

const Profile = () => {
  

 const [userProfile, setUserProfile] = useState(() => {
   const storedProfile = localStorage.getItem('userProfile')
   return storedProfile ? JSON.parse(storedProfile) : {}
 })

 const [display, setDisplay] = useState(false)

 const fetchData = async () => {
   try {
     const response = await axios.get('/api/v1/user/profile')
     const data = response.data
     setUserProfile(data)
     localStorage.setItem('userProfile', JSON.stringify(data))
     setDisplay(true)
   } catch (error) {
     setDisplay(false)
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
     console.log('Error : ', error)
   }
 }

  useEffect(() => {
    fetchData()
  }, [])

const [formData, setFormData] = useState({
  name: '',
  age: '',
  phone: '',
  location: '',
})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const [currUser, setCurrUser] = useState({})
 

  
  const [userImage, setUserImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0]; 
    setUserImage(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.patch('/api/v1/user/updateUser', {
        name: formData.name,
        age: formData.age,
        phone: formData.phone,
        location: formData.location,
      })
      console.log(response.data)

       const imageData = await axios.post('/api/v1/user/upload', {
        image : userImage,
       },{ headers: {
          'Content-Type': 'multipart/form-data'
        }})
       console.log(imageData.data);
      
      toast.success("Profile updated successfully.");
    } catch (error) {
      console.log('Priyanshu')
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
    <div>
      {display ? (
        <div
          className="content-block-profile"
          style={{ marginLeft, widthSize }}
        >
          <div className="user-profile">
            <div className="per-info">
              <div className="img">
                <img
                  src="https://res.cloudinary.com/drnrsxnx9/image/upload/v1710584153/Profile-Images-Book-Store/istockphoto-1495088043-612x612_lcg4lr.jpg"
                  alt="User"
                />
              </div>
              <div className="heading-user-profile">
                <h1>
                  Update <br />
                  User
                </h1>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <label>
                Username:
                <input
                  type="text"
                  name="name"
                  placeholder={userProfile.user?.name}
                  value={formData.name} 
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Age:
                <input
                  type="number"
                  name="age"
                  placeholder={userProfile.user?.age}
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Phone Number:
                <input
                  type="tel"
                  name="phone"
                  placeholder={userProfile.user?.phone}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Photo:
                <input
                  type="file"
                  name="image"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleImage}
                  required
                />
              </label>
              <label>
                Location:
                <input
                  type="text"
                  name="location"
                  placeholder={userProfile.user?.location}
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      ) : (
        <div className="empty"></div>
      )}
    </div>
  )
}

export default Profile
