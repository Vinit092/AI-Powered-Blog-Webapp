import React from 'react'
import logo from '../../assets/logo.png'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {

    const {axios, setToken, navigate}=useAppContext();



    const logout=()=>{
      localStorage.removeItem('token');
      axios.defaults.headers.common['Authorization']=null;
      setToken(null);
      navigate('/');
    };
  return (
    <>
      <div className='flex items-center justify-between py-5 h-[70px] px-8 sm:px-20 xl:px-32 border-b-2 border-gray-200'>
    <img src={logo} alt="logo" className='w-32 sm:w-44 cursor-pointer' onClick={()=>navigate('/')} />    
    <button className='text-sm px-8 py-2.5 bg-primary text-white rounded-full cursor-pointer' onClick={logout}>Logout</button>
    </div>  

        <div className='flex h-[calc(100vh-70px)]'>
            <Sidebar/>
            <Outlet/>


        </div>
    </>
  )
}

export default Layout
