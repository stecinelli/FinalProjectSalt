import React from 'react'
import { MdDelete } from "react-icons/md";

const Card = ({ person, deleteName, id }) => {

  // const dragStarted = (e, id) => {
  //   e.dataTansfer.setData('nameId', id)
  //   console.log('drag has begun');
  // }

  return (
    
    <li className='name-list__card'
      draggable={true}
      // onDragStart={(e) => dragStarted(e, id)}
      >
      {person}
      {/* <button onClick={() => console.log('my print',id)}>Dupa</button> */}
      <MdDelete
        style={{color: 'red', cursor: 'pointer'}}
        onClick={() => deleteName(id)}
      />
    </li>
  )
}

export default Card