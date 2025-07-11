import React from 'react'
import gradBg from '../assets/gradientBackground.png'
import starIcon from '../assets/star_icon.svg'
import { useAppContext } from '../context/AppContext'
import { useRef } from 'react'
import AutoplayCards from './AutoplayCards'
import searchIcon from '../assets/search.svg'
import {motion} from 'motion/react'
const Header = () => {

  const {setInput, input}=useAppContext();
  const inputRef= useRef();

  const onSubmitHandler= async (e)=>{
      e.preventDefault();

      setInput(inputRef.current.value);
  };

  const onClear = ()=>{
      setInput('');
      inputRef.current.value='';
  };

  return (
    <>
     <div className='mx-8 sm:mx-16 xl:mx-24'>
        <div className='text-center mt-20 mb-8'>
            <motion.div 
            initial={{opacity: 0, translateY: -30}}
            transition={{duration:1}}
            whileInView={{opacity: 1, translateY: 0}}
            className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-6 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary cursor-pointer hover:scale-103 duration-200'>
                <p> <span className='text-blue-900'>New: </span>AI Feature Integrated</p>
                <img src={starIcon} alt="star icon" className='w-2.5 ' />
            </motion.div>
            <motion.h1 
            initial={{opacity: 0, translateY: 30}}
            transition={{duration:1}}
            whileInView={{opacity: 1, translateY: 0}}
            className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-800/90 hover:text-gray-800 cursor-pointer duration-200'><span className='text-primary/90 hover:text-primary cursor-pointer duration-200'>Blogs</span> That Think Before You <span className='text-primary/90 hover:text-primary cursor-pointer duration-200'>Blink</span>.</motion.h1>
            <motion.p 
            initial={{opacity: 0}}
            transition={{duration:3}}
            whileInView={{opacity: 1}}
            className='my-6 sm:my-8 max-w-3xl m-auto max-sm:text-xs text-gray-500'>"Welcome to your new scroll spot — where AI does the brainwork and you just vibe. Smart takes, weird facts, and cool content cooked up by clever code. No effort, all fun. Let the bots blog while you binge!"</motion.p>

            {/* banners autoplay */}

            <AutoplayCards/>

            {/* banners autoplay */}
            
            <motion.form 
            initial={{opacity: 0, translateY: 30}}
            transition={{duration:1}}
            whileInView={{opacity: 1, translateY: 0}}
            onSubmit={onSubmitHandler} className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded-3xl overflow-hidden'>
                <input ref={inputRef} type="text" placeholder='What’s in your curious mind?' className='outline-none ml-5' required />
                <button type='submit' className='text-white px-8 m-1.5 rounded-3xl hover:scale-105 transition-all cursor-pointer'><img src={searchIcon} alt="search icon" className='w-12'/></button>

            </motion.form>
        </div>
        <div className='text-center py-2'>
          {input && <button onClick={onClear} className='border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer'>Clear Search</button>
            }
        </div>
        <img src={gradBg} alt="bg" className='absolute -top-50 -z-1'/>
    </div> 
    </>
  )
}

export default Header
