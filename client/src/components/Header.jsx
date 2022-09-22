import React from "react";
import { Logo } from "../assets/img/index";
import { NavLink } from "react-router-dom";
import { isActiveStyle, isNotActiveSTyle } from "../utils/style";
import {FaCrown} from 'react-icons/fa'


const Header = () => {
  return (
    <header className="flex items-center w-full p-4 md:py-2 md:px-6">
      <NavLink to={"/"}>
        <img src={Logo} alt="Logo" className="w-16" />
      </NavLink>

      <ul className="flex items-center justify-center ml-7">
        <li className="mx-5 text-lg"><NavLink to={'/home'} className={({isActive})=> isActive ? isActiveStyle : isNotActiveSTyle}>Home</NavLink></li>
        <li className="mx-5 text-lg"><NavLink to={'/musics'}className={({isActive})=> isActive ? isActiveStyle : isNotActiveSTyle}>Musics</NavLink></li>
        <li className="mx-5 text-lg"><NavLink to={'/premium'}className={({isActive})=> isActive ? isActiveStyle : isNotActiveSTyle}>Premium</NavLink></li>
        <li className="mx-5 text-lg"><NavLink to={'/contact'}className={({isActive})=> isActive ? isActiveStyle : isNotActiveSTyle}>Contact Us</NavLink></li>
      </ul>

      <div className="flex items-center ml-auto cursor-pointer gap-2 relative">
        <img src="" className="w-12 min-w-[44px] object-cover rounded-full shadow-lg" alt="" />
        <div className="flex flex-col">
            <p className="text-textColor text-lg hover:text-headingColor font font-semibold">Username</p>
            <p className="flex items-center gap-2 text-xs text-gray-500">Premium Member. <FaCrown className="text-sm -ml-1 text-yellow-500"/></p>
        </div>
      </div>
    </header>
  );
};

export default Header;
