import { Link } from 'react-router-dom'
import logements from '../../data/logements.json'
import Card from '../Card'
import './index.scss'

function Gallery() {
  return (
    <div className="gallery">
      {logements.map((logement) => {
        return (
          <article key={logement.id} className="gallery__logement">
            <Link to={`/logement/${logement.id}`} className="gallery__link">
              <Card cover={logement.cover} title={logement.title} />
            </Link>
          </article>
        )
      })}
    </div>
  )
}

export default Gallery
