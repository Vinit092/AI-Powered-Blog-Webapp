import React from 'react'
import logo from '../assets/logo.png'
import { footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <>
     <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3'>
     <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 boder-b border-gray-500/30 text-gray-500'>

     <div>
        <img src={logo} alt="logo" className='w-32 sm:w-44' />
        <p className='max-w-[410px] mt-6'>Welcome to the future of blogging — where AI curates sharp insights, quirky thoughts, and smart stories just for you. Whether you're here to learn, laugh, or explore something new, our intelligent bots have already done the hard work. You just scroll, read, and enjoy!</p>
     </div>

     <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
        {footer_data.map((sec,i)=>(
            <div key={i}>
                <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>{sec.title}</h3>
                <ul className='text-sm space-y-1'>
                    {sec.links.map((link,i)=>(
                        <li key={i}>
                            <a href="#" className='hover:underline transition'>{link}</a>
                        </li>
                    ))}
                </ul>

            </div>
        ))}

     </div>

     </div>
        <p className='py-4 text-center text-sm md:text-base text-gray-500/80'>Copyright 2025 © BlogPost By Vinit Suva - All Right Reserved.</p>
    </div> 
    </>
  )
}

export default Footer
