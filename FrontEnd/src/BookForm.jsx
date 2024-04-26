import axios from 'axios';
import { toast } from 'react-toastify'
import React, { useState, useEffect } from 'react'
import './ContentBlock/Content.css'
import './BookForm.css'
import ErrorComp from './ErrorComp';

const BookForm = () => {
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

  const [formData, setFormData] = useState({
    name: '',
    price: '', //null
    author: '',
    edition: '', //null
    old: '', //null 
    description: '',
    userLocation: '',
    userPhone: '',
    userName: '',
    category: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    const intValue = value.trim() !== '' ? parseInt(value, 10) : null

    setFormData((prevState) => ({
      ...prevState,
      [name]:
        name === 'price' || name === 'edition' || name === 'old'
          ? intValue
          : value,
    }))
  }

    const [display, setDisplay] = useState(false);
    useEffect(() => {
      check()
    }, [])
    const check = () => {
      const token = localStorage.getItem('token')
      if (token) {
        setDisplay(true);
      } else {
          setDisplay(false);
      }
    }


   const [userImage, setUserImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setUserImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

      const imageData = await axios.post(
        '/api/v1/book/upload',
        {
          image: userImage,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      console.log(imageData.data)


      const response = await axios.post('/api/v1/book/', {
        category : formData.category,
        name: formData.name,
        author : formData.author, 
        price : formData.price,
        edition : formData.edition,
        old: formData.old,
        description : formData.description,
        image: imageData.data.src,
        userName : formData.userName,
        userPhone : formData.userPhone,
        userLocation: formData.userLocation,
      })
      console.log(response.data)
      toast.success("Book added successfully.");

      
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

  const marginLeft = width < 600 ? 0 : 175
  const widthSize = width < 600 ? '100vw' : 'calc(100vw - 175px)'

  return (
    <div className="content-block" style={{ marginLeft, widthSize }}>
      {/* <CategoryPage/> */}
      {display ? (
        <div className="book-form-container">
          <h2>Sell Your Book</h2>
          <form onSubmit={handleSubmit}>
            <h3>Book details :</h3>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Book Name"
              required
            />
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              // placeholder="Category"
              required
            >
              <option value="">Category...</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-fiction">Non-Fiction</option>
              <option value="Mystery">Mystery</option>
              <option value="Thriller">Thriller</option>
              <option value="Romance">Romance</option>
              <option value="Science Fiction">Science Fiction (Sci-Fi)</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Horror">Horror</option>
              <option value="Historical Fiction">Historical Fiction</option>
              <option value="Biography/Autobiography">
                Biography/Autobiography
              </option>
              <option value="Self-help">Self-help</option>
              <option value="Business/Finance">Business/Finance</option>
              <option value="Travel">Travel</option>
              <option value="Cooking/Food">Cooking/Food</option>
              <option value="Art/Photography">Art/Photography</option>
              <option value="History">History</option>
              <option value="Philosophy">Philosophy</option>
              <option value="Religion/Spirituality">
                Religion/Spirituality
              </option>
              <option value="Poetry">Poetry</option>
              <option value="Children's Literature/YA">
                Children's Literature/YA (Young Adult)
              </option>
            </select>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price (₹)"
              required
            />
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author Name"
              required
            />
            <input
              type="text"
              name="edition"
              value={formData.edition}
              onChange={handleChange}
              placeholder="Edition"
            />
            <input
              type="text"
              name="old"
              value={formData.old}
              onChange={handleChange}
              placeholder="Old (Years)"
              required
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              required
            />
            <label className="photo-form-text">
              Photo:
              <input
                type="file"
                className="photo-form"
                name="image"
                accept=".png, .jpg, .jpeg"
                onChange={handleImage}
              />
            </label>
            <h3>User Details : </h3>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
            <input
              type="tel"
              name="userPhone"
              value={formData.userPhone}
              onChange={handleChange}
              placeholder="Contact Number"
              required
            />
            <input
              type="text"
              name="userLocation"
              value={formData.userLocation}
              onChange={handleChange}
              placeholder="Location"
              required
            />

            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div className="error">
          <ErrorComp/>
          </div>
      )}
    </div>
  )
}

export default BookForm