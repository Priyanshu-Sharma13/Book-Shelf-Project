import React from 'react'
import HeaderNew from './Header/HeaderNew'
import Footer from './Footer/Footer'
import SidebarNew from './SideBar/SidebarNew'
import FooterAdd from './FooterAdd/FooterAdd'
import Content from './ContentBlock/Content'
const App = () => {
  return (
    <div>
      <HeaderNew />
      <SidebarNew />
      <Content />
      <FooterAdd />
      <Footer />
    </div>
  )
}

export default App
