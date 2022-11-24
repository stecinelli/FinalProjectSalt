import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";

const Card = (props) => {
const { setNames, names, person, deleteName, id, setIsActive, innerRef, ...extraProps} = props
// const [ memberIsActive, setMemberIsActive ] = useState(isActive)

const handleClickTurn = (e) => {
  e.preventDefault()
  setIsActive(true)
  console.log('first')
  // setNames(names.filter(person => person.id === id).isActive)
  
}

// const makePersonActive = id => {
//   isActiv = True
// }

// const deleteName = id => {
//   setNames(names.filter(person => person.id !== id))
// }

  return (

    <li className='name-list__card'
    onClick={handleClickTurn}
    {...extraProps} ref={innerRef}
      >
      {person}
      <MdDelete
        style={{color: 'red', cursor: 'pointer'}}
        onClick={() => deleteName(id)}
      /> 
    </li>
  )
}

export default Card