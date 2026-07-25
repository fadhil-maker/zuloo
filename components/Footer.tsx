import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <Logo size={40} />
          <h3 style={{ margin: 0, letterSpacing: '2px' }}>ZULOO</h3>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>Web Development Studio</p>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', margin: '2rem 0' }}>
          <a href="#services">Services</a>
          <a href="#works">Works</a>
          <a href="#testimonials">Reviews</a>
          <a href="#contact">Contact</a>
        </div>

        <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <p style={{ marginBottom: '0.5rem' }}>&copy; {new Date().getFullYear()} ZULOO. All rights reserved.</p>
          <p>Crafted with precision. Built to perform.</p>
        </div>
      </div>
    </footer>
  );
}
