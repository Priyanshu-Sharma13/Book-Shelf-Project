import React from 'react'
import HeaderNew from './Header/HeaderNew'
import SidebarNew from './SideBar/SidebarNew'
import Footer from './Footer/Footer'
import BookForm from './BookForm'
import BookUpdate from './BookUpdate'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
const UpdateBook = () => {
  return (
    <div>
      <HeaderNew />
      <SidebarNew />
      <BookUpdate />
      <Footer />
    </div>
  )
}

export default UpdateBook
