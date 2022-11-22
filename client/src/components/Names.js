import React from 'react'
import Input from './InputContainer'
import { v4 as uuidv4 } from 'uuid'


const Names = () => {
  const [names, setNames] = useState([])

  const addMember = member => {
    const id = uuidv4()
    console.log(id)
  }
  addMember()

  return (
    <div className='name-list'>
      <Input />
    </div>
  )
}

export default Names