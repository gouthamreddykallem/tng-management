'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Image src="/logo.svg" alt="Logo" width={32} height={32} className="mr-2" />
          <span className="text-xl font-bold">ClaimManager</span>
        </div>
        {pathname !== '/' && (
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 hover:text-blue-200"
            >
              <span>Admin</span>
              <Menu size={20} />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Account</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;