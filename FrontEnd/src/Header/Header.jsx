import { useEffect, useState } from 'react'
import { links, social } from '../data'
// import { CiMenuBurger } from 'react-icons/ci'
import { TiThMenu } from 'react-icons/ti'
// import logimg from '../logo.png'
import logimg from '../bookself.png'
import '../Header/Header.css'

const Header = () => {
  const [showLinks, setShowLinks] = useState(false)

  const toggleLink = () => {
    setShowLinks(!showLinks)
  }

  const [isMobile, setIsMobile] = useState(window.innerWidth < 600)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="navblock">
      {isMobile ? (
        <div className="header">
          <div className="navbar">
            <div className="logo">
              <img src={logimg} alt="Lost and found"></img>
            </div>

            <div
              className={`headerbar ${showLinks ? 'rotated' : ''}`}
              onClick={toggleLink}
            >
              {/* <CiMenuBurger />  */}
              <TiThMenu />
            </div>
          </div>

          {showLinks && (
            <div className="dropdown-nav">
              <ul>
                {links.map((link) => {
                  return (
                    <li>
                      <div className="menu-link" key={link.id}>
                        <a href={link.url}>{link.text}</a>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="navbar">
          <div className="logo">
            <img src={logimg} alt="Lost and found"></img>
          </div>
          <div className="list-items">
            <ul>
              {links.map((link) => {
                return (
                  <li>
                    <div className="link" key={link.id}>
                      <a href={link.url}>{link.text}</a>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="connections">
            <ul>
              {social.map((connection) => {
                return (
                  <li>
                    <div className="connection">
                      <a href={connection.url} alt={connection.icon}>
                        {connection.icon}
                      </a>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
export default Header
