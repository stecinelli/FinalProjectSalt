import React from 'react'
import github from './Buttons/GitHub-Mark-64px.png'

const Footer = () => {
  return (
    <div>
      <h4>About us:</h4>
      <p>
        <a href='https://www.linkedin.com/in/stephanie-cinelli-ruzzi/'>Stephanie Cinelli</a>
      </p>
      <p>
        <a href='https://www.linkedin.com/in/paula-zappi-aa6717253/'>Paula Zappi</a>
      </p>
      <p>
        <a href='https://www.linkedin.com/in/maria-khimochkina/'>Maria Khimochkina</a>
      </p>
      <p>
        <a href='https://www.linkedin.com/in/dariusz-ciazynski/'>Darek Ciazynski</a>
      </p>

      <h4>Our project:</h4>
      <p>
        <a href='https://github.com/Mashidzasupergirl/FinalProjectSalt'>
          <img src={github} alt='github' />
        </a>
      </p>
    </div>
  )
}

export default Footer