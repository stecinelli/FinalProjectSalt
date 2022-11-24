import React, { useEffect, useState } from 'react'

const Sound = () => {
  const [soundList, setSoundList] = useState([])
  const [soundToPlay, setSoundToPlay] = useState([])

  useEffect(() => {
    fetch('/sounds/archive.json')
      .then(result => result.json())
      .then(result => setSoundList(result))
  }, [])

  useEffect(() => {
    if(soundList.length > 0) setSoundToPlay([soundList[0]])
  }, [soundList])

  const getSoundFunction = e => {
    const newPlaySong = soundList.filter(song => song.title === e.target.value);
    setSoundToPlay(newPlaySong)
  }

  const playSound = () => {
    document.getElementById('player').play()
  };

  return (
    <div className='Sound'>
      <label className='Sound-lable' htmlFor='SoundSelector'>Select the sound: </label>
      <select name='SoundSelector'
        onChange={getSoundFunction}
        className='Sound-selector' >
        {soundList && soundList.map((sound, index) =>
          <option
            key={sound.title + index}
            value={sound.title} >
            {sound.title}
          </option>
        )}
      </select>
      {soundToPlay.length > 0 && soundToPlay[0] !== undefined &&
        <>
        <audio id='player' src={soundToPlay[0].url}></audio>
        <button onClick={playSound}>Play</button>
        </>
      }
    </div>
  )
}

export default Sound