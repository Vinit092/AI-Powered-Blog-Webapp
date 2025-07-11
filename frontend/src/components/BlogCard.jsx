import React from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react"
import { delay } from 'motion';

const BlogCard = ({blog}) => {

    const {title, description, category, image, _id}=blog;
    const navigate= useNavigate();
  return (
    <>
      <motion.div
      initial={{opacity: 0, translateY: 30}}
      transition={{duration:1}}
      whileInView={{opacity: 1, translateY: 0}}
      onClick={()=>navigate(`/blog/${_id}`)} className='w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 duration-300 cursor-pointer'>
        <img src={image} alt="blog img" className='aspect-video' />
        <span className='ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs'>{category}</span>
        <div className='p-5'>
            <h5 className='mb-2 font-medium text-gray-900'>{title}</h5>
            <p className='mb-3 text-xs text-gray-600' dangerouslySetInnerHTML={{__html: description.slice(0,80)}}/>
        </div>
      </motion.div>
    </>
  )
}

export default BlogCard
