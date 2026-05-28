import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <Link to="/privacy" className="legal-link" aria-label="Privacy Policy">Privacy Policy</Link>
        <Link to="/terms" className="legal-link" aria-label="Terms of Service">Terms of Service</Link>
      </div>
    </footer>
  );
}

export default Footer;
