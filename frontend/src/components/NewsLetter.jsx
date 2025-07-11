import React from 'react'
import {motion} from 'motion/react'
const NewsLetter = () => {
  return (
    <>
     <motion.div 
     initial={{opacity: 0, translateY: 30}}
      transition={{duration:1}}
      whileInView={{opacity: 1, translateY: 0}}
     className='flex flex-col items-center justify-center text-center space-y-2 my-32'>
        <h1 className='md:text-4xl text-2xl font-semibold'>Your Words Deserve the World – Go Premium to Post Your Blogs!</h1>    
        <p className='md:text-lg text-gray-500/70 pb-8'>Subscribe or the robots will cry 🤖💔</p>
        <form className='flex items-center justify-between max-w-2xl w-full md:h-13 h-12'>
            <input type="text" placeholder='Please Enter Your Mail ID' className='border border-gray-300 rounded-3xl h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500' required/>
            <button type='submit' className='md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-3xl rounded-l-none duration-400'>Subscribe</button>

        </form>
    </motion.div> 
    </>
  )
}

export default NewsLetter
