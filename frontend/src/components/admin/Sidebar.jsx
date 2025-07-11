import React from 'react'
import { NavLink } from 'react-router-dom'
import homeIcon from '../../assets/home_icon.svg'
import addIcon from '../../assets/add_icon.svg'
import listIcon from '../../assets/list_icon.svg'
import commentIcon from '../../assets/comment_icon.svg'
const Sidebar = () => {
  return (
    <>
     <div className='flex flex-col border-r border-gray-200 min-h-full pt-6 '>

    <NavLink end={true} to='/admin' className={({isActive})=>`flex items-center gap-3 py-3.5 md:px-9 md:min-w-64 cursor-pointer ${isActive && 'bg-primary/10 border-r-4 border-primary'}`}>
    <img src={homeIcon} alt="home icon" className='min-w-4 w-5'/>    
        <p className='hidden md:inline-block'>Dashboard</p>
    </NavLink>    

    <NavLink to='/admin/addblog' className={({isActive})=>`flex items-center gap-3 py-3.5 md:px-9 md:min-w-64 cursor-pointer ${isActive && 'bg-primary/10 border-r-4 border-primary'}`}>
    <img src={addIcon} alt="add icon" className='min-w-4 w-5'/>    
        <p className='hidden md:inline-block'>Add Blogs</p>
    </NavLink>    

    <NavLink to='/admin/listblog' className={({isActive})=>`flex items-center gap-3 py-3.5 md:px-9 md:min-w-64 cursor-pointer ${isActive && 'bg-primary/10 border-r-4 border-primary'}`}>
    <img src={listIcon} alt="add icon" className='min-w-4 w-5'/>    
        <p className='hidden md:inline-block'>Blog Lists</p>
    </NavLink>    

    <NavLink to='/admin/comment' className={({isActive})=>`flex items-center gap-3 py-3.5 md:px-9 md:min-w-64 cursor-pointer ${isActive && 'bg-primary/10 border-r-4 border-primary'}`}>
    <img src={commentIcon} alt="add icon" className='min-w-4 w-5'/>    
        <p className='hidden md:inline-block'>Comments</p>
    </NavLink>    

    </div> 
    </>
  )
}

export default Sidebar
