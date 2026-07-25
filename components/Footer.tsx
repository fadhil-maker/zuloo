import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Logo size={32} />
          <span className="footer__name">ZULOO</span>
          <p className="footer__tagline">Web Development Studio</p>
        </div>

        <div className="footer__links">
          <a href="#services">Services</a>
          <a href="#works">Works</a>
          <a href="#testimonials">Reviews</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} ZULOO. All rights reserved.</p>
          <p className="footer__credit">Crafted with precision. Built to perform.</p>
        </div>
      </div>
    </footer>
  );
}
