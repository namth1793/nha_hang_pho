import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
  { to: '/careers', label: 'Careers' },
];

const hours = [
  { day: 'Monday', time: '10:00 AM – 8:30 PM' },
  { day: 'Tuesday', time: 'Closed' },
  { day: 'Wednesday', time: '10:00 AM – 8:30 PM' },
  { day: 'Thursday', time: '10:00 AM – 8:30 PM' },
  { day: 'Friday', time: '10:00 AM – 8:30 PM' },
  { day: 'Saturday', time: '10:00 AM – 8:30 PM' },
  { day: 'Sunday', time: '10:00 AM – 8:30 PM' },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center mb-4 group">
            <img
              src="/logo.png"
              alt="Phở Brother"
              className="h-16 w-auto object-contain"
            />
          </Link>
          <p className="text-white/60 text-sm font-body leading-relaxed mt-4">
            Family-owned Vietnamese restaurant serving authentic pho and traditional dishes since 2020. Every bowl is crafted with love and a 12-hour broth.
          </p>
          <div className="flex items-center gap-3 mt-6">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label="Social media"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-bold text-lg mb-5 text-white">Quick Links</h4>
          <ul className="space-y-2">
            {quickLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-white/60 hover:text-gold font-body text-sm transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="text-primary">›</span> {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="font-display font-bold text-lg mb-5 text-white flex items-center gap-2">
            <Clock size={18} className="text-gold" /> Hours
          </h4>
          <ul className="space-y-1.5">
            {hours.map(({ day, time }) => (
              <li key={day} className="flex justify-between text-sm font-body">
                <span className={`${time === 'Closed' ? 'text-white/40' : 'text-white/70'}`}>{day}</span>
                <span className={`${time === 'Closed' ? 'text-primary' : 'text-gold'} font-medium`}>{time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-bold text-lg mb-5 text-white">Find Us</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white/80 text-sm font-body">2363 California Ave #105</p>
                <p className="text-white/80 text-sm font-body">Corona, CA 92881</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-primary flex-shrink-0" />
              <a href="tel:9093210609" className="text-white/80 hover:text-gold text-sm font-body transition-colors">
                (909) 321-0609
              </a>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
            <p className="text-xs text-white/50 font-body uppercase tracking-widest mb-1">Order Online</p>
            <a
              href="https://chefspho.com"
              target="_blank"
              rel="noreferrer"
              className="text-gold hover:text-white font-body text-sm font-medium transition-colors"
            >
              chefspho.com →
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-white/40 font-body">
          <p>© 2024 Chef's Pho. All rights reserved.</p>
          <p>2363 California Ave #105, Corona, CA 92881 | (909) 321-0609</p>
        </div>
      </div>
    </footer>
  );
}
