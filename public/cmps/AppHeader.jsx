const { NavLink, useNavigate, Link } = ReactRouterDOM
const { useEffect, useState } = React

import { LoginSignup } from './LoginSignup.jsx'
import { UserMsg } from './UserMsg.jsx'

import { userService } from '../services/user.service.js'

export function AppHeader() {
  useEffect(() => {
    // component did mount when dependency array is empty
  }, [])

  const navigate = useNavigate()

  const [user, setUser] = useState(userService.getLoggedinUser())

  function onLogout() {
    userService
      .logout()
      .then(() => {
        onSetUser(null)
      })
      .catch((err) => {
        showErrorMsg('OOPs try again')
      })
  }

  function onSetUser(user) {
    setUser(user)
    navigate('/')
  }

  return (
    <header className="main-header main-section">
      <section className="header-inner-section">
        <UserMsg />
        <h1>Bugs are Forever</h1>
        {user ? (
          <section className="login-section">
            <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
            <button onClick={onLogout}>Logout</button>
          </section>
        ) : (
          <section className="login-section">
            <LoginSignup onSetUser={onSetUser} />
          </section>
        )}
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/bug">Bugs</NavLink>
          {user && <NavLink to="/user">User</NavLink>}
          {user && user.isAdmin && <NavLink to="/admin">Admin</NavLink>}
          <NavLink to="/about">About</NavLink>
        </nav>
      </section>
    </header>
  )
}
