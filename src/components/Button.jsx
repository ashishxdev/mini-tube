import React from 'react'

const Button = ({name}) => {
  return (
    <div>
      <button className='px-4 py-1.5 m-1 rounded-lg bg-[#272727] text-white text-sm hover:bg-white hover:text-black'>{name}</button>
    </div>
  )
}

export default Button
