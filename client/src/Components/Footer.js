import React from 'react'
import github from './Buttons/GitHub-Mark-64px.png'

const Footer = () => {
  return (
    <div>
      <h4>About us:</h4>
      <p>
        <a href='https://github.com/stecinelli'>Stephanie Cinelli</a>
      </p>
      <p>
        <a href='https://github.com/zappip'>Paula Zappi</a>
      </p>
      <p>
        <a href='https://github.com/Mashidzasupergirl'>Maria Khimochkina</a>
      </p>
      <p>
        <a href='https://github.com/Dariusz-Wolontariusz'>Darek Ciazynski</a>
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