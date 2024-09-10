import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-200 py-4">
      <div className="container mx-auto px-4 text-center text-gray-600">
        &copy; {new Date().getFullYear()} ClaimManager. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;