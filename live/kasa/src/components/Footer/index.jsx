import Logo from '../../assets/logo-footer.png'
import './index.scss'

function Footer() {
  return (
    <footer className="footer">
      <img src={Logo} alt="Kasa" className="footer__logo" />
      <div className="footer__copyright">© 2023 Kasa. All rights reserved</div>
    </footer>
  )
}

export default Footer
