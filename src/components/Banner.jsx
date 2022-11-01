import React from 'react'
import banner1 from '../assets/images/banner1.jpg'
import banner2 from '../assets/images/banner-2.jpg'
import banner3 from '../assets/images/banner-3.jpg'

export default function Banner() {
  return (
    <div class="banner">

      <div class="container-fluid">

        <div class="slider-container has-scrollbar">

          <div class="slider-item">

            <img src={banner1} alt="women's latest fashion sale" class="banner-img" />

          </div>

          <div class="slider-item">

            <img src={banner2} alt="modern sunglasses" class="banner-img" />

            <div class="banner-content">

              <p class="banner-subtitle">Trending accessories</p>

              <h2 class="banner-title">Modern sunglasses</h2>

              <p class="banner-text">
                starting at &dollar; <b>15</b>.00
              </p>

              <a href="/" class="banner-btn">Shop now</a>

            </div>

          </div>

          <div class="slider-item">

            <img src={banner3} alt="new fashion summer sale" class="banner-img" />

            <div class="banner-content">

              <p class="banner-subtitle">Sale Offer</p>

              <h2 class="banner-title">New fashion summer sale</h2>

              <p class="banner-text">
                starting at &dollar; <b>29</b>.99
              </p>

              <a href="/" class="banner-btn">Shop now</a>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}
