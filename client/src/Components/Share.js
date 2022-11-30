import React, { useContext, useEffect, useState, useRef } from 'react'
import MainContext from '../Context'
import QRCode from "qrcode";
import Popup from 'reactjs-popup';
import {copyToClipboard} from '../Helpers/clipboard'

const Share = () => {
  const { mobName, setMobName } = useContext(MainContext)
  const { names } = useContext(MainContext)
  const { soundList } = useContext(MainContext)
  const { playing } = useContext(MainContext)
  const { initialCounter } = useContext(MainContext)
  const { timerEndDate } = useContext(MainContext)
  const { autonext } = useContext(MainContext)
  const { counter } = useContext(MainContext)
  const canvasRef = useRef();

  const [url, setUrl] = useState(window.location.href);

  const createMob = async () => {
    const newMob = {
      "mob": mobName,
      "sounds": soundList,
      "timeInitial": initialCounter,
      "playing": playing,
      "names": names,
      "autonext": autonext,
      "timeLeft": counter,
      "timerEndDate": timerEndDate,
    }
    await fetch('/api/mobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMob)
    }) // TODO: treat exception if server responds error

    window.location.href = `/?mob=${mobName}`
  }

  useEffect(() => {
    const updateMobName = async () => {
      const changedMob = {
        "mob": mobName,
        "names": names,
      }
      await fetch('/api/mobs', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(changedMob)
      })
    }

    updateMobName()
  }, [names])

  //function to copy url
  const getCurrentUrl = (e) => {
    e.preventDefault()
    copyToClipboard(url)
  };



  return (

    <div className='share__container'>
      <input
        type='text'
        name='share__input'
        className='Share-input'
        required
        placeholder='Enter your team name'
        onKeyDown={e => {
          if (e.key.toLowerCase() === 'enter') {
            e.preventDefault();
            createMob();
          }
        }}
        onChange={e => setMobName(e.target.value)}
      />
      <div className='save-and-share-buttons'>
      <button
        className='share__button--save universal-button'
        type='button'
        id='createMobButton'
        onClick={createMob}
      >
        Save
      </button>
      {/* TODO: do not allow user to save if their session is already from the db */}
      <Popup
        trigger={<button className="share__button--share universal-button">Share</button>}
        modal
        nested
        onOpen={() => {
          QRCode.toCanvas(
            canvasRef.current,
            url || ' ',
            (error) => error && console.error(error)
          );}
        }
      >
        {close => (
          <div className="share__popup">
            <button className="share__popup--button-close universal-button" onClick={close}>
              &times;
            </button>
            <div className="share__popup--content">
              <button className="share__popup--button-copy universal-button" onClick={e => getCurrentUrl(e)}>Copy link</button>
              <canvas ref={canvasRef}/>
              {/* <button
                className="button"
                onClick={() => {
                  close();
                }}
              >Close
              </button> */}
            </div>
          </div>
        )}
      </Popup>
      </div>
    </div>
  )
}

export default Share