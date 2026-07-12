import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="brand-icon">📖</span> BookStore
        </div>
        <p>Bringing the world of reading to your fingertips — one page at a time.</p>
        <p className="footer-tech">Built with MongoDB · Express.js · React · Node.js</p>
        <p className="footer-copy">&copy; {new Date().getFullYear()} BookStore. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
