import React from 'react'
import Three from './Three'

const Landing = () => {
  return (
    <>
    {/* back */}
    <div className='h-full w-full  flex items-center justify-center text-[20vh] relative'>
    <div className='h-full w-full flex items-center justify-center relative'>
    <div className='h-full absolute top-0 left-0 z-99 w-full grid grid-cols-8'>
            <div className='h-full w-full border-r-2 border-black opacity-20'></div>
            <div className='h-full w-full border-r-2 border-black opacity-20'></div>
            <div className='h-full w-full border-r-2 border-black opacity-30'></div>
            <div className='h-full w-full border-r-2 border-black opacity-30'></div>
            <div className='h-full w-full border-r-2 border-black opacity-30'></div>
            <div className='h-full w-full border-r-2 border-black opacity-30'></div>
            <div className='h-full w-full border-r-2 border-wblackhite opacity-30'></div>
            <div className='h-full w-full border-r-2 border-black opacity-30'></div>
        </div>
         <h2 className=' font-bold uppercase text-black opacity-30'>hellow & hunain</h2>




    </div>




    <div className='h-full w-full z-[999]   absolute left-0 top-0'>
        <Three/>
        
        
         </div>

    </div>
      
    </>
  )
}

export default Landing
