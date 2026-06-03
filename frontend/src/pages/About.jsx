import { Link } from 'react-router-dom';
import { Heart, Star, Users, Flame, ArrowRight } from 'lucide-react';

const HERO_BG = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1920&fit=crop';
const CHEF_IMG = 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=700&fit=crop';
const KITCHEN_IMG = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=700&fit=crop';
const FOOD_IMG = 'https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=700&fit=crop';

const values = [
  {
    Icon: Heart,
    title: 'Made with Love',
    desc: "Every dish is cooked as if it's for our own family. We pour heart and soul into every broth and every bowl.",
    color: 'text-primary',
    bg: 'bg-red-50',
  },
  {
    Icon: Star,
    title: 'Uncompromising Quality',
    desc: 'We source fresh, local ingredients daily and never take shortcuts — from our 12-hour broth to hand-made noodles.',
    color: 'text-gold',
    bg: 'bg-amber-50',
  },
  {
    Icon: Users,
    title: 'Community First',
    desc: 'Chef\'s Pho was built for the Corona community. We strive to be a warm, welcoming place where everyone feels at home.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
];

const timeline = [
  { year: '2020', event: 'Chef\'s Pho opens in Corona, CA — a family dream becomes reality despite pandemic challenges.' },
  { year: '2021', event: 'We introduce our signature 10-level spicy pho broth, developed over months of family taste-testing.' },
  { year: '2022', event: 'Expanded menu to include banh mi, vermicelli bowls, garlic noodles, and chef-crafted rice dishes.' },
  { year: '2023', event: 'Recognized as one of the top Vietnamese restaurants in the Inland Empire by local food critics.' },
  { year: '2024', event: 'Continuing to grow, adding new seasonal specials while staying true to our authentic roots.' },
];

export default function About() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section
        className="relative h-72 md:h-96 flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${HERO_BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 text-center px-4">
          <p className="section-subtitle text-gold mb-2">Est. February 2020</p>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white">Our Story</h1>
          <p className="text-white/75 font-body mt-3 max-w-xl mx-auto">
            A family's passion for authentic Vietnamese cuisine, brought to life in Corona, California
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="section-subtitle">Who We Are</p>
              <h2 className="section-title mb-5">
                A Simple Passion,<br />A Profound Bowl
              </h2>
              <div className="w-16 h-1 bg-primary mb-7" />
              <p className="text-gray-600 font-body leading-relaxed mb-5">
                Chef's Pho was founded in February 2020 by Chef Duong and his family with one simple goal: to offer the most authentic, flavorful Vietnamese cuisine in a warm and welcoming atmosphere.
              </p>
              <p className="text-gray-600 font-body leading-relaxed mb-5">
                Opening during one of the most challenging periods in restaurant history, we persevered because our community needed a place of comfort — and what's more comforting than a perfect bowl of pho?
              </p>
              <p className="text-gray-600 font-body leading-relaxed mb-8">
                Our culinary philosophy is simple: fresh ingredients, traditional methods, zero shortcuts. Every morning we begin simmering our broths from scratch, charring ginger and onion, toasting whole spices, and building flavors that can't be rushed.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: '2020', label: 'Year Founded' },
                  { num: '10', label: 'Spice Levels' },
                  { num: '12h+', label: 'Broth Simmered' },
                  { num: '1000+', label: 'Happy Customers' },
                ].map(({ num, label }) => (
                  <div key={label} className="flex items-center gap-3 p-4 bg-cream rounded-xl">
                    <div className="text-primary font-display font-bold text-2xl">{num}</div>
                    <div className="text-gray-500 font-body text-xs">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <img src={FOOD_IMG} alt="Chef's Pho" className="w-full h-64 object-cover rounded-2xl shadow-xl" />
              <div className="grid grid-cols-2 gap-4">
                <img src={KITCHEN_IMG} alt="Kitchen" className="w-full h-44 object-cover rounded-xl" />
                <img src={CHEF_IMG} alt="Chef Duong" className="w-full h-44 object-cover rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chef Profile */}
      <section className="bg-charcoal py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="relative">
              <img
                src={CHEF_IMG}
                alt="Chef Duong"
                className="w-full h-[460px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-5 -left-5 bg-primary text-white p-5 rounded-2xl hidden md:block">
                <div className="font-display font-bold text-3xl">Chef</div>
                <div className="font-display text-xl">Duong</div>
                <div className="text-white/70 text-xs font-body mt-1">Owner & Head Chef</div>
              </div>
            </div>
            <div className="text-white lg:pl-6">
              <p className="section-subtitle text-gold mb-2">Meet the Chef</p>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-5">
                The Heart Behind<br />Every Bowl
              </h2>
              <div className="w-16 h-1 bg-primary mb-7" />
              <p className="text-white/70 font-body leading-relaxed mb-5">
                Chef Duong is not just the owner of Chef's Pho — he's the soul of it. When you visit, there's a good chance you'll see him personally preparing your dish, because that's who he is: a hands-on chef who cares deeply about every plate that leaves the kitchen.
              </p>
              <p className="text-white/70 font-body leading-relaxed mb-5">
                Together with his family, Chef Duong developed their signature spicy pho broth recipe — a labor of love available in 10 distinct heat levels. From a gentle warmth at level 1 to a fiery challenge at level 10, there's a bowl for every palate.
              </p>
              <p className="text-white/70 font-body leading-relaxed mb-8">
                "We cook the way our grandmothers cooked — with time, patience, and the best ingredients we can find. There's no secret formula. Just love and respect for the food."
              </p>
              <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
                <Flame size={32} className="text-primary flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold font-body text-sm">Signature Spicy Pho</p>
                  <p className="text-white/60 text-xs font-body">10 customizable heat levels — dare to try level 10?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="section-subtitle">What We Stand For</p>
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(({ Icon, title, desc, color, bg }) => (
              <div key={title} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className={`w-14 h-14 ${bg} rounded-xl flex items-center justify-center mb-5`}>
                  <Icon size={28} className={color} />
                </div>
                <h3 className="font-display font-bold text-xl text-charcoal mb-3">{title}</h3>
                <p className="text-gray-500 font-body text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="section-subtitle">Our Journey</p>
            <h2 className="section-title">Milestones & Growth</h2>
          </div>
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-px bg-gray-200" />
            <div className="space-y-8">
              {timeline.map(({ year, event }) => (
                <div key={year} className="flex gap-8 items-start">
                  <div className="flex-shrink-0 w-16 text-right">
                    <span className="inline-block bg-primary text-white font-bold font-body text-sm px-3 py-1.5 rounded-full">
                      {year}
                    </span>
                  </div>
                  <div className="relative pl-8 pb-6">
                    <div className="absolute left-0 top-2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-md" />
                    <p className="text-gray-600 font-body leading-relaxed">{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-display font-bold text-3xl mb-4">Come Taste Our Story</h2>
          <p className="text-white/80 font-body mb-7">
            Every bowl tells a story of tradition, family, and authentic Vietnamese flavors. We'd love for you to be part of ours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu" className="inline-flex items-center justify-center gap-2 bg-white text-primary hover:bg-white/90 font-bold font-body px-8 py-4 rounded transition-colors">
              View Our Menu <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn-outline text-center">
              Visit Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
