import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import Error from './Error'
import PrfileDisplay from './PrfileDisplay'
import MainDisplay from './MainDisplay'
import ItemDisplay from './ItemDisplay'
import BookFormDisplay from './BookFormDisplay'
import LoginPage from './AccountPages/LoginPage'
import SignupPage from './AccountPages/SignupPage'
import MyaddDisplay from './MyaddDisplay'
import HomePage from './HomePage/HomePage'
import DashboardDisplay from './Dashboard/DashboardDisplay'
import Dash from './ExtraComp/Dash'
import HeaderNew from './Header/HeaderNew'
import UpdateBook from './UpdateBook'
import CategoryPage from './ContentBlock/CategoryPage'
import Contactus from './ExtraComp/Contactus'
import Faq from './ExtraComp/Faq'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<MainDisplay />} />
          <Route path="/headernew" element={<HeaderNew />} />
          <Route path="/dash" element={<Dash />} />
          <Route path="/dashboard" element={<DashboardDisplay />} />
          <Route path="/profile" element={<PrfileDisplay />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/form" element={<BookFormDisplay />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/myads" element={<MyaddDisplay />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/item" element={<ItemDisplay />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route
            path="/updateBook/:categoryId/:bookId"
            element={<UpdateBook />}
          />
          <Route path="/contact" element={<Contactus />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <ToastContainer position="top-center" />
      </BrowserRouter>
    </div>
  )
}

export default App
