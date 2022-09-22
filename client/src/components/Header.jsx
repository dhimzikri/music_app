import React, { useState } from "react";
import { Logo } from "../assets/img/index";
import { NavLink, useNavigate } from "react-router-dom";
import { isActiveStyle, isNotActiveSTyle } from "../utils/style";
import { FaCrown } from "react-icons/fa";
import { useStateValue } from "../context/StateProvider";
import { getApp } from "firebase/app";
import { app } from "../config/firebase.config";
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";

const Header = () => {
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [isMenu, setisMenu] = useState(false);

  const logOut = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
      })
      .catch((e) => console.log(e));
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex items-center w-full p-4 md:py-2 md:px-6">
      <NavLink to={"/"}>
        <img src={Logo} alt="Logo" className="w-16" />
      </NavLink>

      <ul className="flex items-center justify-center ml-7">
        <li className="mx-5 text-lg">
          <NavLink
            to={"/home"}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveSTyle
            }
          >
            Home
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            to={"/musics"}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveSTyle
            }
          >
            Musics
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            to={"/premium"}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveSTyle
            }
          >
            Premium
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            to={"/contact"}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveSTyle
            }
          >
            Contact Us
          </NavLink>
        </li>
      </ul>

      <div
        onMouseEnter={() => setisMenu(true)}
        onMouseLeave={() => setisMenu(false)}
        className="flex items-center ml-auto cursor-pointer gap-2 relative"
      >
        <img
          src={user?.user.imageURL}
          className="w-12 h-12 min-w-[44px] object-cover rounded-full shadow-lg"
          alt=""
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col">
          <p className="text-textColor text-lg hover:text-headingColor font font-semibold">
            {user?.user?.name}
          </p>
          <p className="flex items-center gap-2 text-xs text-gray-500">
            Premium Member <FaCrown className="text-sm -ml-1 text-yellow-500" />
          </p>
        </div>

        {isMenu && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute z-10 top-12 right-0 w-275 gap-2 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col p-3"
          >
            <NavLink to={"/userProfile"}>
              <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                Profile
              </p>
            </NavLink>

            <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
              My Fav
            </p>
            <hr />

            <p
              className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out"
              onClick={logOut}
            >
              Sign Out
            </p>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
