import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import "./NavBar.scss"
import { ReactComponent as Logo } from "../../assets/crown.svg"

const NavBar = () => {
    return (
        <>
            <div className='navigation'>
                <div className='logo-container'>
                    {/* Can be named whatever */}
                    <Logo />
                </div>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/'>HOME</Link>
                    <Link className='nav-link' to='/shop'>SHOP</Link>
                    <Link className='nav-link' to='/login'>SIGN IN </Link>
                </div>
            </div>
            <Outlet />
        </>
  )
}

export default NavBar