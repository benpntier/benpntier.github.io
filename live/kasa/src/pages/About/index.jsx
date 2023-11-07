import Banner from '../../components/Banner'
import aboutBannerImage from '../../assets/banner-about.png'
import aboutContent from '../../data/about.json'
import Collapse from '../../components/Collapse'
import './index.scss'

function About() {
  document.title = 'Kasa - A Propos'
  return (
    <main className="about max-width">
      <Banner img={aboutBannerImage} />
      <div className="about__dropdown">
        {aboutContent.map((paragraph) => {
          return (
            <div key={paragraph.id}>
              <Collapse title={paragraph.title} text={paragraph.text} />
            </div>
          )
        })}
      </div>
    </main>
  )
}

export default About
