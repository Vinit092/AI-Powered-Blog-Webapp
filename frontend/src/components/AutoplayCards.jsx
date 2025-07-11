import React from 'react'
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';
import banner from '../data/banners.json'
import {motion} from 'motion/react'
const AutoplayCards = () => {
  return (
    <>
    <motion.div
      initial={{opacity: 0, translateY: 50}}
      transition={{duration:1}}
      whileInView={{opacity: 1, translateY: 0}}
    >
       <Carousel 
       plugins={[Autoplay({ delay: 1000})]} className="-z-10 w-full py-17 mb-10">
          <CarouselContent className='flex gap-5 sm:gap-20 items-center'>
            {banner.map(({id, path }) => {
              return (
                <CarouselItem key={id} className='basis-1/3 lg:basis-1/5'>
                  <img src={path} className="object-contain rounded-2xl shadow-xs"/>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
        </motion.div>
    </>
  )
}

export default AutoplayCards
