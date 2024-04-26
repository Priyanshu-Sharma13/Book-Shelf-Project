import React from 'react'
import HeaderNew from './Header/HeaderNew'
import SidebarNew from './SideBar/SidebarNew'
import Footer from './Footer/Footer'
import BookForm from './BookForm'

const BookFormDisplay = () => {
  return (
    <div>
      <HeaderNew />
      <SidebarNew />
      <BookForm />
      <Footer />
    </div>
  )
}

export default BookFormDisplay

