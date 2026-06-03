import { useEffect, useState } from 'react';
import axios from 'axios';
import { Flame, ShoppingBag } from 'lucide-react';

const HERO_BG = 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1920&fit=crop';

function SpiceBadge({ levels }) {
  if (!levels) return null;
  return (
    <span className="flex items-center gap-1 text-xs font-semibold text-primary bg-red-50 px-2.5 py-1 rounded-full">
      <Flame size={11} /> Spice {levels}
    </span>
  );
}

export default function Menu() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [active, setActive] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get('/api/menu/categories'),
      axios.get('/api/menu'),
    ]).then(([catRes, itemRes]) => {
      setCategories(catRes.data);
      setItems(itemRes.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filtered = active === 'all' ? items : items.filter(i => i.category_slug === active);

  const grouped = active === 'all'
    ? categories.map(cat => ({
        ...cat,
        items: items.filter(i => i.category_id === cat.id),
      })).filter(g => g.items.length > 0)
    : null;

  return (
    <main className="pt-20">
      {/* Page Hero */}
      <section
        className="relative h-64 md:h-80 flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${HERO_BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4">
          <p className="section-subtitle text-gold mb-2">Crafted with Love</p>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white">Our Menu</h1>
          <p className="text-white/75 font-body mt-3 max-w-xl mx-auto">
            Fresh ingredients, traditional recipes, authentic Vietnamese flavors
          </p>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <div className="sticky top-[60px] z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            <button
              onClick={() => setActive('all')}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold font-body transition-colors duration-200 flex-shrink-0 ${
                active === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Dishes
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.slug)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold font-body transition-colors duration-200 flex-shrink-0 ${
                  active === cat.slug
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.name_vn} · {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading && (
          <div className="text-center py-24">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-500 font-body">Loading menu...</p>
          </div>
        )}

        {!loading && active === 'all' && grouped && grouped.map(group => (
          <div key={group.id} className="mb-14">
            <div className="flex items-center gap-4 mb-7">
              <div>
                <h2 className="font-display font-bold text-2xl text-charcoal">{group.name_vn}</h2>
                <p className="text-gray-400 font-body text-sm">{group.name}</p>
              </div>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {group.items.map(item => (
                <MenuItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}

        {!loading && active !== 'all' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(item => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-24 text-gray-400 font-body">
            No items found in this category.
          </div>
        )}
      </div>

      {/* Order CTA */}
      <div className="bg-primary py-14 text-center text-white">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display font-bold text-3xl mb-3">Ready to Order?</h2>
          <p className="text-white/80 font-body mb-6">
            Order online for pickup or dine in with us at 2363 California Ave #105, Corona, CA 92881.
          </p>
          <a
            href="https://chefspho.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white text-primary hover:bg-white/90 font-bold font-body px-9 py-4 rounded transition-colors duration-200"
          >
            <ShoppingBag size={20} /> Order Now Online
          </a>
        </div>
      </div>
    </main>
  );
}

function MenuItem({ item }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-50">
      <div className="relative overflow-hidden h-48">
        <img
          src={item.image_url}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {item.is_featured === 1 && (
          <div className="absolute top-3 left-3 bg-gold text-white text-xs font-bold px-2.5 py-1 rounded-full">
            Popular
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-display font-semibold text-charcoal text-sm leading-tight">{item.name}</h3>
          <span className="text-primary font-bold font-body text-base whitespace-nowrap">${item.price.toFixed(2)}</span>
        </div>
        {item.name_vn && (
          <p className="text-gray-400 font-body text-xs mb-2">{item.name_vn}</p>
        )}
        <SpiceBadge levels={item.spicy_levels} />
        <p className="text-gray-500 text-xs font-body leading-relaxed mt-2 line-clamp-2">{item.description}</p>
        <a
          href="https://chefspho.com"
          target="_blank"
          rel="noreferrer"
          className="mt-4 w-full block text-center bg-primary/10 hover:bg-primary text-primary hover:text-white text-xs font-semibold font-body py-2 rounded transition-colors duration-200"
        >
          Add to Order
        </a>
      </div>
    </div>
  );
}
