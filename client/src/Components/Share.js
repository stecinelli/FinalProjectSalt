import React, { useContext, useEffect } from 'react'
import MainContext from '../Context'

const Share = () => {
  const { mobName, setMobName } = useContext(MainContext)
  const { names } = useContext(MainContext)
  const { soundList } = useContext(MainContext)
  const { playing } = useContext(MainContext)
  const { initialCounter } = useContext(MainContext)
  const { counter } = useContext(MainContext)


  const createMob = async () => {
    const newMob = {
      "mob": mobName,
      "sounds": soundList,
      "timeInitial": initialCounter,
      "timeLeft": counter,
      "playing": playing,
      "names": names,
    }
    await fetch('/mobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMob)
    }) // TODO: treat exception if server responds error

    window.location.href = `/?mob=${mobName}`
  }

  useEffect(() => {
    const updateMob = async () => {
      const changedMob = {
        "mob": mobName,
        "names": names,
      }
      await fetch('/mobs', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(changedMob)
      })
    }

    updateMob()
    console.log('Patch')
  }, [names])

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
        onChange={e => setMobName(e.target.value)}
      />
      <button
        className='Share-input--button'
        type='button'
        id='createMobButton'
        onClick={createMob}
      >
        Save
      </button>
      {/* TODO: do not allow user to save if their session is already from the db */}
    </div>
  )
}

export default Share