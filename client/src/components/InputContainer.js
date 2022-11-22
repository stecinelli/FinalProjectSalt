import React from 'react'
import { useState } from 'react'

const Input = () => {
  // const [input, setInput] = useState('')
  const [name, setName] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    console.log(name)
  }

  return (
    <form 
      className='name-list'
      onSubmit={ onSubmit }>
      <input
        className='name-list__input'
        type='text'
        placeholder='Add new member'
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button
        className='name-list__button'
        type='submit'
      >Add</button>
    </form>
  )
}

export default Input