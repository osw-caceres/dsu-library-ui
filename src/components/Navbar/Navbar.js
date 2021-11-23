import React from 'react'
import { Link } from 'react-router-dom'
import { SideBarData } from './SidebarData';
import { IconContext } from 'react-icons/lib';
import { ImBooks } from 'react-icons/im';

import './Navbar.css'

function Navbar() {

    return (
        <>
            <IconContext.Provider value={{color: '#fff'}}>
            <div className="navbar">
            </div>
            <nav className='nav-menu'>
                <ul className="nav-menu-items">
                    <li key={0} className="nav-title">
                        <Link to="/">
                        <ImBooks />
                        <span>DSU Library</span>
                        </Link>
                    </li>
                    {SideBarData.map((item, index) => {
                        return(
                            <li key={index} className={item.class}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar
