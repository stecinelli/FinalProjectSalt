import React, {useState} from 'react'

const Share = () => {
  const [mobName, setMobName] = useState('')
  const [mob, setMob] = useState([
    {
      mob: '',
      sounds: [],
      timer: 10,
      members: [],
    },
  ])

  const createMob = () => {
    const newMob = {
      mob: mobName,
      sounds: [],
      timer: 10,
      members: [],
    }

    setMob([...mob, newMob])

    window.location.href = mobName;
  }

  const getMobName = e => {
    setMobName(e.target.value)
  }

  return (
    <div className='Share'>
      <label htmlFor='ShareInput'>http://localholst:3000/</label>
      <input
        type='text'
        name='ShareInput'
        className='Share-input'
        placeholder='your mob name'
        onKeyDown={e => {
          if (e.key.toLowerCase() === 'enter') {
            e.preventDefault();
            createMob();
          }
        }}
      onChange={getMobName}
      />
      <button
        className='Share-input--button'
        type='button'
        id='createMobButton'
        onClick={createMob}
        >
        Save
      </button>
    </div>
  )
}

export default Share