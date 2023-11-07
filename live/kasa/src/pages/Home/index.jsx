import Banner from '../../components/Banner'
import Gallery from '../../components/Gallery'
import homeBannerImage from '../../assets/banner-home.png'

function Home() {
  document.title = 'Kasa'

  return (
    <main className="home max-width">
      <Banner img={homeBannerImage} text={'Chez vous,\n partout et ailleurs'} />
      <Gallery />
    </main>
  )
}

export default Home
