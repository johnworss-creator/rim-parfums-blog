import React, { useState } from 'react';
import { Hexagon, Menu, X, Globe } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center px-6 py-3 backdrop-blur-md rounded-full border border-gray-200 bg-white/80 shadow-sm w-[calc(100%-1.5rem)] sm:w-auto max-w-7xl transition-all">
        <div className="flex items-center justify-between w-full gap-x-10">
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
                <Hexagon className="w-6 h-6 text-black fill-black" />
                <span className="font-medium text-lg tracking-tighter uppercase font-display">RIM Parfums</span>
            </Link>

            <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-gray-600">
                <Link href="/#features" className="hover:text-black transition">Le P02-PRO</Link>
                <Link href="/#industries" className="hover:text-black transition">Industries</Link>
                <Link href="/blog" className={`hover:text-black transition ${router.pathname.startsWith('/blog') ? 'text-black font-bold' : ''}`}>Blog</Link>
                <Link href="/#contact" className="px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition">Contact</Link>
            </nav>

            <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
            </button>
        </div>
        
        {isMenuOpen && (
            <div className="lg:hidden flex flex-col items-center w-full pt-4 pb-2 space-y-4 text-sm font-medium">
                <Link href="/#features">Le P02-PRO</Link>
                <Link href="/blog">Blog</Link>
                <Link href="/#contact">Contact</Link>
            </div>
        )}
    </header>
  );
};
