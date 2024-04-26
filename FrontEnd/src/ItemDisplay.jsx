import React from 'react'
import HeaderNew from './Header/HeaderNew'
import Footer from './Footer/Footer'
import SidebarNew from './SideBar/SidebarNew'
import ItemContent from './ContentBlock/ItemContent'
import { useLocation } from 'react-router-dom'

const ItemDisplay = () => {
  const location = useLocation()
  console.log(location)
  const item=location.state.item;
  const category=location.state.category;
  
  console.log("hhh"+item+"ctegory"+category);
  return (
    <div>
      <HeaderNew />
      <SidebarNew />
      <ItemContent item={item} category={category} key={item._id}/>
      {/* <FooterAdd /> */}
      <Footer />
    </div>
  )
}

export default ItemDisplay
