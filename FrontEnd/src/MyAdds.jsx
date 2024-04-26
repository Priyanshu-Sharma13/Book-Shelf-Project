import React from 'react'
import { useState, useEffect } from 'react'
import './MyAdds.css'
import { toast } from 'react-toastify'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import axios from 'axios'

const MyAdds = () => {
     const [myBooks, setMyBooks] = useState(() => {
       const storedProfile = localStorage.getItem('userProfile')
       return storedProfile ? JSON.parse(storedProfile) : {}
     })

    const [width, setWidth] = useState(window.innerWidth)
    const [display, setDisplay] = useState(false);

     const fetchData = async () => {
       try {
         const response = await axios.get('/api/v1/book/cuurentUserBooks')
         const data = response.data
          setMyBooks(data.books)

         console.log(myBooks);
        
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
             toast.error('No Book Uploaded yet.')
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

     const handleDelete = async (bookId, categoryId) => {
       try {
         await axios.delete(`/api/v1/book/${categoryId}/${bookId}`)
         console.log('Book deleted successfully')
         toast.success('Book deleted successfully.')
         window.location.href = '/myads'
         
       } catch (error) {
         console.error('Error deleting book:', error)
       }
     }
  return (
    <div className="content-block" style={{ marginLeft, widthSize }}>
      {display ? (
        myBooks.map((book, index)=>{
          const id = `${book.categoryId}/${book.bookId}`
          return (
            <div className="ad-block" key={book.bookId}>
              <div className="ad-img">
                
                <img src={book.image} alt="Not available" />
              </div>
              <div className="ad-content">
                Name : {book.name}
                <br />
                Author : {book.author}
                <br />
                Price : {book.price}
                <br />
                Category : {book.category}
              </div>
              <div className="ad-buton">
                <div className="ad-butt-edit">
                  <Link className="ad-butt-edit-link" to={`/updateBook/${book.categoryId}/${book.bookId}`}>
                    Edit
                  </Link>
                </div>
                <button
                  className="ad-butt-del"
                  onClick={() => handleDelete(book.bookId, book.categoryId)}
                >
                  Delete
                </button>
              </div>
            </div>
          )
        })
        
      ) : (
        <div className="myadd-error"></div>
      )}
    </div>
  )
}

export default MyAdds