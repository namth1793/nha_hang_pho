import { useState } from 'react';
import axios from 'axios';
import { MapPin, Phone, Clock, Mail, Send, CheckCircle } from 'lucide-react';

const HERO_BG = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1920&fit=crop';

const hours = [
  { day: 'Monday', time: '10:00 AM – 8:30 PM' },
  { day: 'Tuesday', time: 'Closed' },
  { day: 'Wednesday', time: '10:00 AM – 8:30 PM' },
  { day: 'Thursday', time: '10:00 AM – 8:30 PM' },
  { day: 'Friday', time: '10:00 AM – 8:30 PM' },
  { day: 'Saturday', time: '10:00 AM – 8:30 PM' },
  { day: 'Sunday', time: '10:00 AM – 8:30 PM' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErrorMsg('Please fill in your name, email, and message.');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    try {
      await axios.post('/api/contacts', form);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <main className="pt-20">
      {/* Hero */}
      <section
        className="relative h-64 md:h-80 flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${HERO_BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 text-center px-4">
          <p className="section-subtitle text-gold mb-2">We'd Love to Hear from You</p>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white">Contact Us</h1>
          <p className="text-white/75 font-body mt-3">
            Questions, reservations, catering inquiries — we're here to help.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Info */}
            <div className="space-y-8">
              {/* Address */}
              <div className="bg-white rounded-2xl p-7 shadow-sm">
                <h3 className="font-display font-bold text-xl text-charcoal mb-6 flex items-center gap-2">
                  <MapPin size={20} className="text-primary" /> Visit Us
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold font-body text-charcoal text-sm mb-0.5">Address</p>
                      <p className="text-gray-500 font-body text-sm">1359 E 4th St</p>
                      <p className="text-gray-500 font-body text-sm">Ontario, CA 91764</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold font-body text-charcoal text-sm mb-0.5">Phone</p>
                      <a href="tel:9093210609" className="text-primary hover:text-primary-dark font-body text-sm transition-colors">
                        (909) 321-0609
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold font-body text-charcoal text-sm mb-0.5">Order Online</p>
                      <a href="https://chefspho.com" target="_blank" rel="noreferrer" className="text-primary hover:text-primary-dark font-body text-sm transition-colors">
                        chefspho.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-2xl p-7 shadow-sm">
                <h3 className="font-display font-bold text-xl text-charcoal mb-6 flex items-center gap-2">
                  <Clock size={20} className="text-primary" /> Hours of Operation
                </h3>
                <div className="space-y-2.5">
                  {hours.map(({ day, time }) => (
                    <div key={day} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0">
                      <span className={`font-body text-sm ${time === 'Closed' ? 'text-gray-400' : 'text-charcoal'}`}>{day}</span>
                      <span className={`font-body text-sm font-semibold ${time === 'Closed' ? 'text-primary' : 'text-gold'}`}>{time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <iframe
                  title="Chef's Pho Location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-117.6624%2C34.0520%2C-117.6424%2C34.0680&layer=mapnik&marker=34.0600%2C-117.6524"
                  className="w-full h-52 border-0"
                  loading="lazy"
                />
                <div className="p-4">
                  <a
                    href="https://maps.google.com/?q=1359+E+4th+St+Ontario+CA+91764"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:text-primary-dark font-body text-sm font-medium transition-colors"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm h-fit">
              <h3 className="font-display font-bold text-2xl text-charcoal mb-2">Send Us a Message</h3>
              <p className="text-gray-500 font-body text-sm mb-7">
                Have a question or special request? We'll get back to you as soon as possible.
              </p>

              {status === 'success' ? (
                <div className="text-center py-12">
                  <CheckCircle size={60} className="text-green-500 mx-auto mb-4" />
                  <h4 className="font-display font-bold text-xl text-charcoal mb-2">Message Sent!</h4>
                  <p className="text-gray-500 font-body text-sm mb-6">
                    Thank you for reaching out. We'll be in touch soon!
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-primary text-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold font-body text-charcoal mb-1.5">
                        Your Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 font-body text-sm text-charcoal focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold font-body text-charcoal mb-1.5">
                        Email <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@email.com"
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 font-body text-sm text-charcoal focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold font-body text-charcoal mb-1.5">
                      Phone Number <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(555) 000-0000"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 font-body text-sm text-charcoal focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold font-body text-charcoal mb-1.5">
                      Message <span className="text-primary">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your question, reservation request, or catering inquiry..."
                      rows={5}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 font-body text-sm text-charcoal focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
                      required
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-sm text-red-600 font-body bg-red-50 px-4 py-2.5 rounded-lg">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-base disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
