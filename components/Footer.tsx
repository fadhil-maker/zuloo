import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-left">
          <a href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Logo size={40} />
            <h3 style={{ margin: 0, letterSpacing: '2px' }}>ZULOO</h3>
          </a>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>Web Development Studio</p>
        </div>

        <div className="footer-links">
          <a href="#services">Services</a>
          <a href="#works">Works</a>
          <a href="#testimonials">Reviews</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-right">
          <p style={{ marginBottom: '0.5rem' }}>&copy; {new Date().getFullYear()} ZULOO. All rights reserved.</p>
          <p>Crafted with precision. Built to perform.</p>
        </div>
      </div>
    </footer>
  );
}
