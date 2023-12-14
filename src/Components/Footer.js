import React from 'react';

const Footer = () => {
  return (
    <footer className="text-dark">
        <div className='ft'>
      <div className="container-fluid text-center">
        <p className="mb-0">&copy; {new Date().getFullYear()} Final Fight. All Rights Reserved.</p>
      </div>
        </div>
    </footer>
  );
};

export default Footer;