import React, { useState } from 'react'
import {blog_data, blogCategories} from '../assets/assets.js'
import { motion } from "motion/react"
import BlogCard from './BlogCard.jsx';
import { useAppContext } from '../context/AppContext.jsx';

const BlogList = () => {

    const [menu,setMenu]=useState("All");
    const{blogs, input}=useAppContext();    

    const  filteredBlogs= ()=>{
        if(input === ''){
            return blogs;
        }
        return blogs.filter((blog)=> blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()));
    };

  return (
    <>
     <div>
        <div className='flex justify-center gap-4 sm:gap-12 my-10 relative'>
        {blogCategories.map((item)=>(
            <div key={item} className='relative'>
                <button className={`cursor-pointer text-2xl text-gray-500 ${menu === item && 'text-white px-4 text-center pt-0.5'}`}
                onClick={()=>setMenu(item)}
                >
                    {item}
                    {menu===item && (
                    <motion.div layoutId='underline' 
                    transition={{type:'spring', stiffness: 800, damping:25}}
                    className='absolute left-0 right-0 top-0 h-8.5 -z-1 bg-primary rounded-full'/>
                    )}
                </button>
            </div>
        ))}
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
            {/* Blog Cards */}

            {
                filteredBlogs().filter((blog)=>menu ==='All' ? true : blog.category===menu).map((blog)=> <BlogCard key={blog._id} blog={blog}/>)
            }
        </div>
        
     </div> 
    </>
  )
}

export default BlogList
