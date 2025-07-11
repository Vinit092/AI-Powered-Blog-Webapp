import React from "react";
import logo from "../assets/logo.png";
import arrow from "../assets/arrow.svg";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const {navigate, token}=useAppContext();
  return (
    <>
      <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
        <img
          src={logo}
          alt="logo"
          className="w-32 sm:w-44 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <button
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white 
          px-10 py-2.5"
          onClick={() => navigate("/admin")}
        >
          {token ? 'Dashboard' : 'Login'}
          <img src={arrow} className="w-3" alt="arrow" />
        </button>
      </div>
    </>
  );
};

export default Navbar;
