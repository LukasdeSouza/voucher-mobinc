import React from 'react'
import Mobcash from '../../assets/mob_cash.png'
import "./loader.css"

const SplashPage = () => {
  
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
        <img src={Mobcash} alt="Mobcash logo" width={800}/>
        <div className='loader'></div>
    </div>
  )
}

export default SplashPage