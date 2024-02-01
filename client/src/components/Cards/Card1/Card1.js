import React from 'react'

const BASE_URL = process.env.REACT_APP_PHOTOS_URL;
const Card1 = ({ name, price, image }) => {

  


  return (
    <div className='   w-40  h-60  min-w-44 sm:w-60  sm:h-80   bg-zync-300 border-2 border-slate-700 flex flex-col justify-between  items-center  rounded-sm  p-2 '>
    
      <h1 className=' text-sm  sm:text-lg text-center text-slate-100  font-normal italic'>{name.slice( 0, 25).toLowerCase()}</h1>
      
      <div className='  min-w-auto overflow-hidden  bg-slate-100'>
        <img src={`${BASE_URL}${image}`} alt={name} loading='lazy' />
      </div>
      
      <h1 className='text-xl sm:text-2xl text-center text-slate-100   tracking-wide  font-nomal  font-bold  relative'><sup className=' absolute  top-4 -left-3 bottom-0'>₹</sup>{price}</h1>
      
    </div>
  )
}

export default Card1