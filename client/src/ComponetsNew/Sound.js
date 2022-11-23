import React, { useState } from 'react'

const Sound = () => {
const [soundList, setSoundList] = useState([
  {name: 'Sound1', url: 'http://localhost:8000/files/sound1.m4a'},
  {name: 'Sound2', url: 'http://localhost:8000/files/sound2.m4a'},
  {name: 'Sound3', url: 'http://localhost:8000/files/sound3.m4a'},
])
const [playSound, setPlaySound] = useState([])

const getSoundFunction = e => {
  const newPlaySong = soundList.filter(song => song.name === e.target.value);
  setPlaySound(newPlaySong)
  // console.log(newPlaySong)
}

  return (
    <div className='Sound'>
      <label className='Sound-lable' htmlFor='SoundSelector'>Select the sound: </label>
      <select name='SoundSelector'
        onChange={getSoundFunction}
        className='Sound-selector' >
        {soundList && soundList.map((sound, index) =>
          <option
            key={sound.name + index}
            value={sound.name} >
            {sound.name}
          </option>
        )}
      </select>
      {/* <audio controls src={playSound[0].url}></audio> */}
    </div>
  )
}

export default Sound