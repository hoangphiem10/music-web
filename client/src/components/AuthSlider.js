import React from 'react'
import { Carousel } from 'antd'
import login1 from '../assets/Images/login1.jpg'
import login2 from '../assets/Images/login2.jpeg'
import login3 from '../assets/Images/login3.gif'
import login4 from '../assets/Images/login4.jpeg'
// const images = [login3, login1, login4]
const images = []

const AuthSlider = () => {
  return (
    <Carousel dots={false} draggable autoplay>
      {images.map((image, idx) => (
        <div key={`carousel-${idx}`}>
          <img className="img-carousel" src={image} alt=""></img>
        </div>
      ))}
    </Carousel>
  )
}

export default AuthSlider
