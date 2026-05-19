import { useEffect, useState } from 'react';
import axios from 'axios';
import { X, ZoomIn } from 'lucide-react';

const HERO_BG = 'https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=1920&fit=crop';

const FILTER_CATS = [
  { slug: 'all', label: 'All' },
  { slug: 'pho', label: 'Phở' },
  { slug: 'appetizers', label: 'Appetizers' },
  { slug: 'rice-noodles', label: 'Rice & Noodles' },
  { slug: 'sandwiches', label: 'Bánh Mì' },
  { slug: 'beverages', label: 'Beverages' },
];

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState('all');
  const [lightbox, setLightbox] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/gallery').then(r => {
      setItems(r.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filtered = active === 'all' ? items : items.filter(i => i.category === active);

  // Close lightbox on Esc
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <main className="pt-20">
      {/* Hero */}
      <section
        className="relative h-64 md:h-80 flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${HERO_BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 text-center px-4">
          <p className="section-subtitle text-gold mb-2">Visual Feast</p>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white">Our Gallery</h1>
          <p className="text-white/75 font-body mt-3 max-w-xl mx-auto">
            A showcase of our handcrafted dishes and the flavors that make Chef's Pho unforgettable
          </p>
        </div>
      </section>

      {/* Filter */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {FILTER_CATS.map(({ slug, label }) => (
              <button
                key={slug}
                onClick={() => setActive(slug)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold font-body transition-colors duration-200 flex-shrink-0 ${
                  active === slug
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        {loading ? (
          <div className="text-center py-24">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-500 font-body">Loading gallery...</p>
          </div>
        ) : (
          <>
            <p className="text-gray-400 font-body text-sm mb-6">
              Showing {filtered.length} photos
            </p>
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {filtered.map(item => (
                <div
                  key={item.id}
                  className="break-inside-avoid relative group cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                  onClick={() => setLightbox(item)}
                >
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <ZoomIn size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-body text-sm font-medium">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={28} />
          </button>
          <div
            className="max-w-4xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={lightbox.image_url}
              alt={lightbox.title}
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
            <p className="text-white/80 font-body text-center mt-4 text-lg">{lightbox.title}</p>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="bg-cream py-16 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="section-title mb-4">Hungry Yet?</h2>
          <p className="text-gray-500 font-body mb-7">
            Come taste the dishes that inspired these photos. Visit us or order online today.
          </p>
          <a
            href="https://chefspho.com"
            target="_blank"
            rel="noreferrer"
            className="btn-primary text-base"
          >
            Order Now
          </a>
        </div>
      </div>
    </main>
  );
}
