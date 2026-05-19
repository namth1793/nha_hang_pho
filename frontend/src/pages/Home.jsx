import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Star, Leaf, ChefHat, BookOpen, ArrowRight, Quote, Flame } from 'lucide-react';

const HERO_BG = 'https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=1920&fit=crop';
const FEATURED_IMG = 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=900&fit=crop';
const ABOUT_IMG = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&fit=crop';

function StarRating({ rating = 5 }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} className={i < rating ? 'fill-gold text-gold' : 'text-gray-300'} />
      ))}
    </div>
  );
}

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios.get('/api/menu/featured').then(r => setFeatured(r.data)).catch(() => {});
    axios.get('/api/testimonials').then(r => setTestimonials(r.data.slice(0, 3))).catch(() => {});
  }, []);

  return (
    <main>
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${HERO_BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-gold font-body font-semibold text-sm tracking-widest uppercase mb-5">
            Authentic Vietnamese Cuisine — Ontario, CA
          </p>
          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Traditional dishes with
            <span className="text-primary"> local products</span>
            <br />of highest quality.
          </h1>
          <p className="text-white/80 font-body text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience the rich, soul-warming flavors of Vietnam — hand-crafted broths simmered 12+ hours, fresh herbs, and recipes passed through generations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://chefspho.com"
              target="_blank"
              rel="noreferrer"
              className="btn-primary text-base px-9 py-4 shadow-lg shadow-primary/40"
            >
              Order Now
            </a>
            <Link to="/menu" className="btn-outline text-base px-9 py-4">
              View Menu
            </Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
          <div className="w-px h-10 bg-white/30 animate-pulse" />
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                Icon: Leaf,
                title: 'Fresh Food',
                desc: 'We believe great pho starts with great ingredients. Every bowl features locally sourced, fresh produce and never-frozen proteins.',
                color: 'text-green-600',
                bg: 'bg-green-50',
              },
              {
                Icon: ChefHat,
                title: "Chef's Specials",
                desc: "Chef Duong's signature creations blend Vietnamese tradition with his own artistry. Every dish is prepared with heart and perfected over years.",
                color: 'text-primary',
                bg: 'bg-red-50',
              },
              {
                Icon: BookOpen,
                title: 'Traditional Recipe',
                desc: 'Our broths are slow-simmered for 12+ hours using authentic spices — star anise, cinnamon, charred ginger, and cloves. No shortcuts.',
                color: 'text-gold',
                bg: 'bg-amber-50',
              },
            ].map(({ Icon, title, desc, color, bg }) => (
              <div key={title} className="text-center group">
                <div className={`w-16 h-16 ${bg} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={30} className={color} />
                </div>
                <h3 className="font-display font-bold text-xl mb-3 text-charcoal">{title}</h3>
                <p className="text-gray-500 font-body text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED DISH ── */}
      <section className="bg-charcoal py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
              <img
                src={FEATURED_IMG}
                alt="Premium Beef Short Ribs Pho"
                className="w-full h-[420px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary text-white px-5 py-3 rounded-xl font-display font-bold text-xl shadow-lg">
                $18.99
              </div>
            </div>
            <div className="text-white lg:pl-8">
              <p className="section-subtitle text-gold mb-2">Chef's Selection</p>
              <h2 className="font-display font-bold text-3xl md:text-5xl text-white leading-tight mb-4">
                Premium Beef<br />Short Ribs Pho
              </h2>
              <div className="w-16 h-1 bg-primary mb-6" />
              <p className="text-2xl font-display text-gold/90 italic mb-4">
                "One bowl. Two bones. Maximum flavor."
              </p>
              <p className="text-white/70 font-body leading-relaxed mb-4">
                Our most iconic dish features slow-braised beef short ribs that fall off the bone, resting in our golden, aromatic 12-hour broth. Served with silky hand-pulled rice noodles, fresh herbs, and your choice of spice level 0–10.
              </p>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-body">
                  <Flame size={14} className="text-primary" />
                  <span>0–10 Heat Levels</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-body">
                  <span>🕐</span>
                  <span>12-Hour Broth</span>
                </div>
              </div>
              <a
                href="https://chefspho.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold font-body px-8 py-4 rounded transition-colors duration-200"
              >
                Order This Dish <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── POPULAR DISHES ── */}
      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="section-subtitle">Fresh from the Kitchen</p>
            <h2 className="section-title">Our Popular Dishes</h2>
            <p className="text-gray-500 font-body mt-3 max-w-xl mx-auto">
              From our signature pho to chef's specials — every dish is made to order with the freshest ingredients.
            </p>
          </div>

          {featured.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {featured.map(item => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {item.spicy_levels && (
                      <div className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Flame size={10} /> Spicy
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-display font-semibold text-charcoal text-base leading-tight">{item.name}</h3>
                      <span className="text-primary font-bold font-body text-lg whitespace-nowrap">${item.price.toFixed(2)}</span>
                    </div>
                    <p className="text-gray-500 text-xs font-body leading-relaxed line-clamp-2 mb-4">{item.description}</p>
                    <a
                      href="https://chefspho.com"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full block text-center bg-primary/10 hover:bg-primary text-primary hover:text-white text-sm font-semibold font-body py-2.5 rounded transition-colors duration-200"
                    >
                      Add to Order
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/menu" className="inline-flex items-center gap-2 btn-primary text-base">
              View Full Menu <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT PREVIEW ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="relative">
              <img
                src={ABOUT_IMG}
                alt="Chef's Pho Restaurant Interior"
                className="w-full h-[460px] object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-2xl shadow-xl hidden md:block">
                <div className="font-display font-bold text-4xl">5+</div>
                <div className="text-sm font-body mt-1 text-white/80">Years of Excellence</div>
              </div>
            </div>
            <div>
              <p className="section-subtitle">Our Story</p>
              <h2 className="section-title mb-5">
                A Family Passion<br />for Authentic Flavors
              </h2>
              <div className="w-16 h-1 bg-primary mb-6" />
              <p className="text-gray-600 font-body leading-relaxed mb-5">
                Chef's Pho was born in February 2020 from a simple passion: to bring authentic Vietnamese cuisine to Ontario, California. Founded by Chef Duong and his family, we opened our doors with the mission to share the bold, soulful flavors of Vietnam.
              </p>
              <p className="text-gray-600 font-body leading-relaxed mb-8">
                What makes us unique? We developed our own signature spicy pho broth recipe — available in 10 customizable heat levels. Whether you love mild or dare to try level 10, we have a bowl for you.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[
                  { num: '10', label: 'Spice Levels' },
                  { num: '12h', label: 'Broth Simmered' },
                  { num: '30+', label: 'Menu Items' },
                ].map(({ num, label }) => (
                  <div key={label} className="text-center p-4 bg-cream rounded-xl">
                    <div className="font-display font-bold text-2xl text-primary">{num}</div>
                    <div className="text-xs text-gray-500 font-body mt-1">{label}</div>
                  </div>
                ))}
              </div>
              <Link to="/about" className="inline-flex items-center gap-2 btn-primary">
                Our Full Story <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-charcoal py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="section-subtitle text-gold">Happy Customers</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white">What Our Guests Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(t => (
              <div
                key={t.id}
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-7 transition-colors duration-300"
              >
                <Quote size={28} className="text-primary mb-4" />
                <StarRating rating={t.rating} />
                <p className="text-white/75 font-body text-sm leading-relaxed mt-4 mb-6">
                  "{t.review}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold font-body text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-semibold font-body text-sm">{t.name}</p>
                    <p className="text-white/40 font-body text-xs">Verified Guest</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section
        className="relative py-24 text-white overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=1920&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-primary/85" />
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <h2 className="font-display font-bold text-3xl md:text-5xl mb-4">
            Ready for an Authentic Pho Experience?
          </h2>
          <p className="text-white/85 font-body text-lg mb-8">
            Order online or visit us at 1359 E 4th St, Ontario CA 91764.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://chefspho.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary hover:bg-white/90 font-bold font-body px-9 py-4 rounded transition-colors duration-200 text-base"
            >
              Order Online <ArrowRight size={18} />
            </a>
            <Link to="/contact" className="btn-outline text-base px-9 py-4 text-center">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
