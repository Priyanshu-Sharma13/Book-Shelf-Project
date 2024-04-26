import React from 'react'
import HeaderNew from '../Header/HeaderNew'
import Footer from '../Footer/Footer'
import SidebarNew from '../SideBar/SidebarNew'
// import Profile from '../ProfileCard/Profile'
import Dashboard from '../Dashboard/Dashboard'
import Dash from '../ExtraComp/Dash'

const DashboardDisplay = () => {
  return (
    <div>
      <HeaderNew />
      <SidebarNew />
      <Dashboard />
      <Footer />
    </div>
  )
}

export default DashboardDisplay
