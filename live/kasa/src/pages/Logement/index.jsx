import { useParams, Navigate } from 'react-router-dom'
import Collapse from '../../components/Collapse'
import Carousel from '../../components/Carousel'
import Tag from '../../components/Tag'
import Rating from '../../components/Rating'
import Data from '../../data/logements.json'
import './index.scss'

function Logement() {
  document.title = 'Kasa'

  // get id from url
  const { id } = useParams()

  // get logement by id
  const logement = Data.find((logement) => logement?.id === id)

  // return list of tags
  const tags = logement?.tags.map((tag, index) => {
    return <Tag key={index} tag={tag} />
  })

  // return list of equipments
  const equipments = logement?.equipments.map((equipment, i) => {
    return (
      <span key={i} className="equipment-element">
        {equipment}
      </span>
    )
  })

  return (
    <div>
      {logement ? (
        <main className="logement max-width">
          <Carousel pictures={logement.pictures} />
          <section className="logement__header">
            <div className="logement__infos">
              <h1 className="logement__name">{logement.title}</h1>
              <h2 className="logement__location">{logement.location}</h2>
              <div className="logement__tags">{tags}</div>
            </div>
            <div className="logement__details">
              <div className="logement__host">
                <p className="logement__host__name">
                  {logement.host.name.replace(' ', '\n')}
                </p>
                <img
                  src={logement.host.picture}
                  alt={logement.host.name}
                  className="logement__host__picture"
                />
              </div>
              <Rating stars={logement.rating} />
            </div>
          </section>
          <section className="logement__content">
            <div className="logement__collapse">
              <Collapse title="Description" text={logement.description} />
            </div>
            <div className="logement__collapse">
              <Collapse
                title="Équipements"
                text={<div className="equipment-list">{equipments}</div>}
              />
            </div>
          </section>
        </main>
      ) : (
        <Navigate replace to="/404" />
      )}
    </div>
  )
}

export default Logement
