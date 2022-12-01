import React from 'react'
import github from './Buttons/GitHub-Mark-64px.png'

const Footer = () => {
  return (

    <div className='footer-container'>
      <div className='Footer'>
        <div className='Footer-authors'>
          <h4>Made by:</h4>
          <p>
            <a href='https://www.linkedin.com/in/stephanie-cinelli-ruzzi/'>⭐️ Stéphanie Cinelli</a>
          </p>
          <p>
            <a href='https://www.linkedin.com/in/paula-zappi-aa6717253/'>⭐️ Paula Zappi</a>
          </p>
          <p>
            <a href='https://www.linkedin.com/in/maria-khimochkina/'>⭐️ Maria Khimochkina</a>
          </p>
          <p>
            <a href='https://www.linkedin.com/in/dariusz-ciazynski/'>⭐️ Darek Ciazynski</a>
          </p>
        </div>

        <div className='Footer-github'>
          <h4>Project repository:</h4>
          <p>
            <a href='https://github.com/Mashidzasupergirl/FinalProjectSalt'>
              <img src={github} alt='github' />
            </a>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Footer

