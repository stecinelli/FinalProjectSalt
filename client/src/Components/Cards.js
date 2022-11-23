import React from 'react'
import Card from './Card'

const Cards = ({ names, deleteName }) => {
  return (
    <ul className='name__list' >
      { names &&
        names.map(person => (
        <Card
          key={person.id}
          id={person.id}
          person={person.name}
          deleteName={deleteName}
          /> 
      ))}
    </ul>
  )
}

export default Cards