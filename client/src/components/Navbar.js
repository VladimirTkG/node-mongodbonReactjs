import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'


export const NavBar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <nav>
            <div className="nav-wrapper">
            <span className="brand-logo right">AUF</span>
            <ul id="nav-mobile" className="left hide-on-med-and-down">
                <li><NavLink to='/create'>Create</NavLink></li>
                <li><NavLink to='/links'>links</NavLink></li>
                <li><NavLink to='/profile'>Profile</NavLink></li>
                <li><a href='/' onClick={logoutHandler}>Exit</a></li>
            </ul>
            </div>
        </nav>
    )
}