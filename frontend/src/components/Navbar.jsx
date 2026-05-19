import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, MapPin, Phone } from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/careers', label: 'Careers' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-charcoal shadow-xl' : 'bg-transparent'
      }`}
    >
      {/* Top info bar */}
      <div className={`border-b border-white/10 transition-all duration-300 ${scrolled ? 'hidden' : 'block'}`}>
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-xs text-white/80 font-body">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              1359 E 4th St, Ontario CA 91764
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Phone size={12} />
              (909) 321-0609
            </span>
          </div>
          <span className="hidden md:block">
            Mon & Wed–Sun: 10:00 AM – 8:30 PM &nbsp;|&nbsp; Closed Tuesdays
          </span>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-xl font-display font-bold shadow-lg group-hover:bg-primary-dark transition-colors">
            🍜
          </div>
          <div className="leading-tight">
            <span className="text-white font-display font-bold text-xl tracking-wide">Chef's Pho</span>
            <div className="text-gold text-[10px] font-body tracking-widest uppercase hidden sm:block">
              Authentic Vietnamese Cuisine
            </div>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 font-body font-medium text-sm tracking-wide rounded transition-colors duration-200 ${
                    isActive
                      ? 'text-gold border-b-2 border-gold'
                      : 'text-white/85 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Order Now CTA */}
        <a
          href="https://chefspho.com"
          target="_blank"
          rel="noreferrer"
          className="hidden lg:inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold font-body px-5 py-2.5 rounded transition-colors duration-200"
        >
          Order Now
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white p-2 rounded hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-charcoal border-t border-white/10">
          <ul className="px-4 py-4 space-y-1">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 font-body font-medium rounded transition-colors ${
                      isActive ? 'bg-primary text-white' : 'text-white/85 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="px-4 pb-4">
            <a
              href="https://chefspho.com"
              target="_blank"
              rel="noreferrer"
              className="block text-center bg-primary hover:bg-primary-dark text-white font-semibold font-body py-3 rounded transition-colors"
            >
              Order Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
