import React from 'react'
import { MdDelete } from "react-icons/md";

const Card = (props) => {
const { setNames, names, person, deleteName, id, setIsActive, toggleActivator, innerRef, ...extraProps} = props

const handleClick = (e, id) => {
  e.stopPropagation()
  deleteName(id)
}


  return (
    <div>
    <li className='name-list__card'
    onClick={() => toggleActivator(id)}
    {...extraProps} ref={innerRef}
      >
      {person}
      <MdDelete
        className='name-list__card--button'
        style={{color: 'red', cursor: 'pointer', margin: '0.5rem'}}
        onClick={(e) => handleClick(e, id)}
      />
    </li>
    </div>
  )
}

export default Card