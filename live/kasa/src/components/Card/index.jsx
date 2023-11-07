import './index.scss'

function Card({ cover, title }) {
  return (
    <div className="card">
      <img src={cover} alt={title} className="card__cover" />
      <h2 className="card__title">{title}</h2>
    </div>
  )
}

export default Card
