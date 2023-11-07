import './index.scss'

function Banner({ img, text }) {
  return (
    <div className="banner">
      <img
        //add class if we have a text for the banner
        className={'banner__img' + (text ? ' banner__img--text' : '')}
        src={img}
        alt="Kasa"
      />
      <h1 className="banner__text">{text}</h1>
    </div>
  )
}

export default Banner
