import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../ExtraComp/Dash.css'
import {toast} from 'react-toastify'

const Dash = () => {
  
  const [userProfile, setUserProfile] = useState(() => {
    const storedProfile = localStorage.getItem('userProfile')
    return storedProfile ? JSON.parse(storedProfile) : {}
  })

  const [display, setDisplay] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/v1/user/profile')
      const data = response.data
      // Update state with fetched user profile data
      setUserProfile(data)
      console.log(data);
      // Store user profile data in local storage
      localStorage.setItem('userProfile', JSON.stringify(data))
      setDisplay(true);
    } catch (error) {
      setDisplay(false);
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
      console.log("Error : ", error);
    }
  }


  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="b_ody">
      {display ? (
        <div className="outer">
          <div className="user">User Profile</div>
          <div className="main">
            <div className="one">
              <img src={userProfile.user?.image} alt="user" />
            </div>
            <div className="two">
              <h1>Details</h1>
              <div className="content__">
                Username: {userProfile.user?.name}
              </div>
              <div className="content__">Age: {userProfile.user?.age}</div>
              <div className="content__">
                Contact Number: {userProfile.user?.phone}
              </div>
              <div className="content__">
                Location: {userProfile.user?.location}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty"></div>
      )}
    </div>
  )
}

export default Dash



// import React from 'react'
// import '../ExtraComp/Dash.css'
// import axios from 'axios'
// import { useState, useEffect } from 'react'

// const Dash = () => {
//   const [userProfile, setUserProfile] = useState({})

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('/api/v1/user/profile')
//       const data = response.data
//       console.log(data)
//       setUserProfile(data);
//        console.log(userProfile.user.name)
//        console.log(userProfile.user.phone)
//        console.log(userProfile.user.age)
//        console.log(userProfile.user.image)
//     } catch (error) {
//       console.log(error.response)
//     }
//   }

//   // fetchData();
//   useEffect(() => {
//     fetchData();
//   }, []);

//   // useEffect(() => {
//   //   axios
//   //     .get('/api/v1/user/profile')
//   //     .then((response) => {
//   //       console.log(response.data)
//   //       setUserProfile(response.data)

//   //       console.log(userProfile.user.name)
//   //       console.log(userProfile.user.phone)
//   //       console.log(userProfile.user.age)
//   //       console.log(userProfile.user.image)
//   //     })
//   //     .catch((error) => {
//   //       console.log(error)
//   //     })
//   // }, [])

//   return (
//     <div className="b_ody">
//       <div className="outer">
//         <div className="user">User Profile</div>
//         <div className="main">
//           <div className="one">
//             <img src={userProfile.user.image} alt="user" />
//           </div>
//           <div className="two">
//             <h1>Details</h1>
//             <div className="content__">Username : {userProfile.user.name}</div>
//             <div className="content__">Age : {userProfile.user.age}</div>
//             <div className="content__">
//               Contact Number : {userProfile.user.phone}
//             </div>
//             <div className="content__">
//               Location : {userProfile.user.location}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Dash