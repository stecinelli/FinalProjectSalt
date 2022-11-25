import React from 'react'
import Input from './InputContainer'
import Cards from './Cards'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'

const LOCAL_STORAGE_KEY = 'final_project';

const Names = () => {
  const [names, setNames] = useState([])
  // const [isActive, setIsActive] = useState(false)

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
    setNames([...names, {id, name, isActive: false}])
  }
  // console.log(names)

  const deleteName = id => {
    console.log('dariusz wolontariusz');
    setNames(names.filter(person => person.id !== id))
  }

  // toggle activator zrob to if statement
  const toggleActivator = (id) => {
    // setNames(names.map(person => (person.id === id) ? {...person, isActive: !person.isActive} : person))
    setNames(names.map(person => (person.id !== id) ? {...person, isActive: false} : {...person, isActive: true}))
    // setNames(names.map(person => (person.id === id) ? {...person, isActive: true} : person))
  }


  return (
    <div className='name-list'>
      <Input 
        names={names}
        addName={addName}/>
      <Cards
        toggleActivator={toggleActivator}
        setNames={setNames}
        names={names}
        deleteName={deleteName}
        />
    </div>
  )
}

export default Names