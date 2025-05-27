import React from 'react'
import Style from '../Styles/Home.module.css'
const HomePage = () => {
  return (
    <div className={`${Style.Container}`}>
      <h1 style={{
        letterSpacing:'10px'
      }}>Welcome To Note Takking App</h1>

      <p
        style={{
          letterSpacing:'10px',
          marginTop:'10px',
          
        }}
      >
        Take Your Daily Notes
      </p>
    </div>
  )
}

export default HomePage