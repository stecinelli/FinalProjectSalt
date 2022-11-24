import React from 'react'
import Input from './InputContainer'
import Cards from './Cards'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'

const LOCAL_STORAGE_KEY = 'final_project';

const Names = () => {
  const [names, setNames] = useState([])
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const nameStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (nameStorage) {
      setNames(nameStorage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(names))
  }, [names])

  const addName = name => {
    const id = uuidv4()
    setNames([...names, {id, name, isActive}])
  }
  console.log(isActive)

  const deleteName = id => {
    setNames(names.filter(person => person.id !== id))
  }


  return (
    <div className='name-list'>
      <Cards
        setIsActive={setIsActive}
        setNames={setNames}
        names={names}
        deleteName={deleteName}
        />
        <Input 
        names={names}
        addName={addName}/>
    </div>
  )
}

export default Names