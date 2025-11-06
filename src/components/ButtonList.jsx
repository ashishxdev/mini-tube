import React from 'react'
import Button from './Button'

const list = ["All","Live","Gaming","Songs","Cricket","Soccer","News","Cooking","Valentines", "Movies","Podcasts", "Tech"];

const ButtonList = () => {
  return (
    <div className="flex">
      {list.map((name, index) => (
        <Button key={index} name={name} />
      ))}
    </div>
  )
}

export default ButtonList
