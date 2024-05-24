import React from 'react'
import dress from '../assets/images/icons/dress.svg'
import coat from '../assets/images/icons/coat.svg'
import hat from '../assets/images/icons/hat.svg'
import glasses from '../assets/images/icons/glasses.svg'
import shorts from '../assets/images/icons/shorts.svg' 
import tshirts from '../assets/images/icons/tee.svg'
import jacket from '../assets/images/icons/jacket.svg'
import watch from '../assets/images/icons/watch.svg'

export default function Category() {
  return (
    <div className="category">

      <div className="container">

        <div className="category-item-container has-scrollbar">

          <div className="category-item">

            <div className="category-img-box">
              <img src={dress} alt="dress & frock" width="30" />
            </div>

            <div className="category-content-box">

              <div className="category-content-flex">
                <h3 className="category-item-title">Dress & frock</h3>

                <p className="category-item-amount">(53)</p>
              </div>

              <a href="#" className="category-btn">Show all</a>

            </div>

          </div>

          <div className="category-item">

            <div className="category-img-box">
              <img src={coat} alt="winter wear" width="30" />
            </div>

            <div className="category-content-box">

              <div className="category-content-flex">
                <h3 className="category-item-title">Winter wear</h3>

                <p className="category-item-amount">(58)</p>
              </div>

              <a href="#" className="category-btn">Show all</a>

            </div>

          </div>

          <div className="category-item">

            <div className="category-img-box">
              <img src={glasses} alt="glasses & lens" width="30" />
            </div>

            <div className="category-content-box">

              <div className="category-content-flex">
                <h3 className="category-item-title">Glasses & lens</h3>

                <p className="category-item-amount">(68)</p>
              </div>

              <a href="#" className="category-btn">Show all</a>

            </div>

          </div>

          <div className="category-item">

            <div className="category-img-box">
              <img src={shorts} alt="shorts & jeans" width="30" />
            </div>

            <div className="category-content-box">

              <div className="category-content-flex">
                <h3 className="category-item-title">Shorts & jeans</h3>

                <p className="category-item-amount">(84)</p>
              </div>

              <a href="#" className="category-btn">Show all</a>

            </div>

          </div>

          <div className="category-item">

            <div className="category-img-box">
              <img src={tshirts} alt="t-shirts" width="30" />
            </div>

            <div className="category-content-box">

              <div className="category-content-flex">
                <h3 className="category-item-title">T-shirts</h3>

                <p className="category-item-amount">(35)</p>
              </div>

              <a href="#" className="category-btn">Show all</a>

            </div>

          </div>

          <div className="category-item">

            <div className="category-img-box">
              <img src={jacket} alt="jacket" width="30" />
            </div>

            <div className="category-content-box">

              <div className="category-content-flex">
                <h3 className="category-item-title">Jacket</h3>

                <p className="category-item-amount">(16)</p>
              </div>

              <a href="#" className="category-btn">Show all</a>

            </div>

          </div>

          <div className="category-item">

            <div className="category-img-box">
              <img src={watch} alt="watch" width="30" />
            </div>

            <div className="category-content-box">

              <div className="category-content-flex">
                <h3 className="category-item-title">Watch</h3>

                <p className="category-item-amount">(27)</p>
              </div>

              <a href="#" className="category-btn">Show all</a>

            </div>

          </div>

          <div className="category-item">

            <div className="category-img-box">
              <img src={hat} alt="hat & caps" width="30" />
            </div>

            <div className="category-content-box">

              <div className="category-content-flex">
                <h3 className="category-item-title">Hat & caps</h3>

                <p className="category-item-amount">(39)</p>
              </div>

              <a href="#" className="category-btn">Show all</a>

            </div>

          </div>


        </div>

      </div>

    </div>

  )
}
