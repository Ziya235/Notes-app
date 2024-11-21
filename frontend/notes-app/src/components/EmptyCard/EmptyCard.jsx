import React from 'react'

const EmptyCard = ({imgSrc,message,onImageClick}) => {
  return (
    <div className='flex flex-col items-center justify-center mt-20 '>
        <img  onClick={onImageClick} src={imgSrc} alt="No notes" className='w-60 cursor-pointer' />
        <p className='max-w-[500px] text-sm font-medium text-slate-700 text-center leading-7 mt-5'>
            {message}</p>
    </div>
  )
}

export default EmptyCard