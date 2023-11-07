import React, { useState } from 'react'
import './index.scss'

function Carousel({ pictures }) {
  // index of the visible image
  const [visibleIndex, setVisibleIndex] = useState(0)

  // if there are no pictures
  if (!Array.isArray(pictures) || pictures.length === 0) {
    return null
  }

  // total number of pictures
  const nbPictures = pictures.length

  // display the previous picture (call on first picture displays last picture)
  const prevPicture = () => {
    setVisibleIndex(visibleIndex === 0 ? nbPictures - 1 : visibleIndex - 1)
  }

  // display the next picture (call on last picture displays first picture)
  const nextPicture = () => {
    setVisibleIndex(visibleIndex === nbPictures - 1 ? 0 : visibleIndex + 1)
  }

  return (
    <section className="carousel">
      {/* left arrow (if more than one picture) */}
      {nbPictures > 1 && (
        <div
          onClick={prevPicture}
          className="carousel__arrow carousel__arrow--left"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </div>
      )}

      {/* right arrow (if more than one picture) */}
      {nbPictures > 1 && (
        <div
          onClick={nextPicture}
          className="carousel__arrow carousel__arrow--right"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      )}

      {/* image */}
      {pictures.map((picture, i) => {
        return (
          <div key={i}>
            {i === visibleIndex && (
              <img
                src={picture}
                alt={'image' + { i }}
                className="carousel__picture"
              />
            )}
          </div>
        )
      })}

      {/* number of picture */}
      {nbPictures > 1 && (
        <p className="carousel__number">
          {visibleIndex + 1}/{nbPictures}
        </p>
      )}
    </section>
  )
}

export default Carousel
