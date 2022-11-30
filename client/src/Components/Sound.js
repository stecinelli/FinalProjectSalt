import React, { useEffect, useState, useContext } from 'react'
import MainContext from '../Context'
import playButton from './Buttons/play-button-black.png'

const Sound = () => {
  const { soundList, setSoundList } = useContext(MainContext)
  const [soundToPlay, setSoundToPlay] = useState([])
  const [soundIsRefreshed, setSoundIsRefreshed] = useState(true)
  const hiddenFileInput = React.useRef(null);
  const [soundIsDownloaded, setSoundIsDownloaded] = useState(false)


  useEffect(() => {
    fetch('/api/sounds')
      .then(result => result.json())
      .then(result => setSoundList(result))
  }, [setSoundList, soundIsRefreshed])

  useEffect(() => {
    if (soundList.length > 0) setSoundToPlay([soundList[0]])
  }, [soundList])

  const getSoundFunction = e => {
    const newPlaySong = soundList.filter(song => song.title === e.target.value);
    setSoundToPlay(newPlaySong)
  }

  const playSound = () => {
    document.getElementById('player').play()
  }

  const [soundFile, setSoundFile] = useState('')

  const saveChanges = e => {
    e.preventDefault()
    setSoundFile(e.target.files[0])
    setSoundIsDownloaded(true)
  }

  const handleSoundUploadChange = async () => {
    setSoundIsRefreshed(false)
    let formData = new FormData()
    formData.append('sound', soundFile)
    const response = await fetch('/api/sounds', {
      method: 'POST',
      body: formData,
    })
    setSoundIsRefreshed(true)
    setSoundIsDownloaded(false)
  }


  const handleUploadClick = event => {
    hiddenFileInput.current.click();
  };

  return (
    soundIsRefreshed && <div className='Sound'>
      <div className='sound-selector-container'>
        <label className='Sound-lable' htmlFor='SoundSelector'>🎵 </label>
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
            <button className='Sound-player--button' onClick={playSound}>
              <img src={playButton} alt='play' />
            </button>
          </>
        }
      </div>

      <div className='upload-your-sound-container'>
        {soundToPlay.length > 0 && soundToPlay[0] !== undefined &&
          <>
            {/* <label className='Sound-input--label' htmlFor='SoundInput'>Upload your 💃 :</label> */}
            <button onClick={handleUploadClick} className='universal-button upload-your-own-sound-button'>
            Choose your sound 💃
            </button>
            <input
              className='Sound-input '
              type='file'
              name='SoundInput'
              accept='audio/*'
              environment
              onChange={saveChanges}
              style={{ display: 'none' }}
              ref={hiddenFileInput}
       
            />
            <button className='universal-button' onClick={handleSoundUploadChange}>Upload</button>
          </>
        }
      </div>
        {soundIsDownloaded && <div className='file-choosen'>🎵 file choosen</div>}
    </div>
  )
}

export default Sound