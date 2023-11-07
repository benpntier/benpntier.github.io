import './index.scss'
import React, { useState } from 'react'

function Collapse({ title, text }) {
  const [isOpen, setIsOpen] = useState(false)

  // update state if open or closed
  function open() {
    setIsOpen(!isOpen)
  }

  return (
    <div className="collapse">
      <div onClick={open} className="collapse__title">
        <h2 className="collapse__title__content">{title}</h2>
        <div className="collapse__icon">
          <i className={'fa-solid fa-chevron-' + (isOpen ? 'up' : 'down')}></i>
        </div>
      </div>
      <div className="collapse__text">
        {isOpen && <div className="collapse__text__content">{text}</div>}
      </div>
    </div>
  )
}

export default Collapse
