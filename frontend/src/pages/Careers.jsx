import { useEffect, useState } from 'react';
import axios from 'axios';
import { Briefcase, Clock, CheckCircle, Send, ChevronDown, ChevronUp, Heart, Users, Utensils } from 'lucide-react';

const HERO_BG = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1920&fit=crop';

const perks = [
  { Icon: Heart, title: 'Family Environment', desc: "We're a tight-knit family-owned restaurant. You won't be just an employee — you'll be family." },
  { Icon: Utensils, title: 'Learn Authentic Cuisine', desc: "Work alongside Chef Duong and learn the art of authentic Vietnamese cooking and hospitality." },
  { Icon: Users, title: 'Great Team Culture', desc: 'We celebrate wins together and support each other. A positive, respectful workplace for everyone.' },
  { Icon: Clock, title: 'Flexible Schedules', desc: 'We work with your schedule. Full-time, part-time, and weekend shifts available.' },
];

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');

  useEffect(() => {
    axios.get('/api/careers').then(r => {
      setJobs(r.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleApply = async e => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setFormStatus('loading');
    try {
      await axios.post('/api/careers/apply', { ...form, career_id: selectedJob?.id });
      setFormStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <main className="pt-20">
      {/* Hero */}
      <section
        className="relative h-72 md:h-96 flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${HERO_BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 text-center px-4">
          <p className="section-subtitle text-gold mb-2">Now Hiring</p>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white">Join Our Team</h1>
          <p className="text-white/75 font-body mt-3 max-w-xl mx-auto">
            Be part of something special. We're building more than a restaurant — we're building a community.
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="section-subtitle">Why Join Us?</p>
            <h2 className="section-title">Life at Chef's Pho</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {perks.map(({ Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Icon size={26} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg text-charcoal mb-2">{title}</h3>
                <p className="text-gray-500 font-body text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="section-subtitle">Open Positions</p>
            <h2 className="section-title">Current Openings</h2>
            <p className="text-gray-500 font-body mt-3">
              {loading ? '...' : `${jobs.length} position${jobs.length !== 1 ? 's' : ''} available`}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map(job => (
                <div key={job.id} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <button
                    className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                    onClick={() => setExpanded(expanded === job.id ? null : job.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Briefcase size={22} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg text-charcoal">{job.title}</h3>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold font-body text-primary bg-primary/10 px-3 py-1 rounded-full mt-1">
                          <Clock size={11} /> {job.type}
                        </span>
                      </div>
                    </div>
                    {expanded === job.id ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                  </button>

                  {expanded === job.id && (
                    <div className="px-6 pb-6 border-t border-gray-50 pt-5 bg-white">
                      <p className="text-gray-600 font-body text-sm leading-relaxed mb-5">{job.description}</p>
                      <h4 className="font-display font-semibold text-charcoal mb-3">Requirements</h4>
                      <ul className="space-y-2 mb-6">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm font-body text-gray-600">
                            <CheckCircle size={15} className="text-primary mt-0.5 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => {
                          setSelectedJob(job);
                          setFormStatus('idle');
                          document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="btn-primary text-sm"
                      >
                        Apply for This Position
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Application Form */}
      <section id="apply-form" className="bg-cream py-20">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="text-center mb-8">
              <p className="section-subtitle">Get Started</p>
              <h2 className="section-title">
                {selectedJob ? `Apply: ${selectedJob.title}` : 'Apply Now'}
              </h2>
              {selectedJob && (
                <p className="text-gray-400 font-body text-sm mt-2">
                  {selectedJob.type} · Chef's Pho, Ontario CA
                </p>
              )}
            </div>

            {formStatus === 'success' ? (
              <div className="text-center py-10">
                <CheckCircle size={60} className="text-green-500 mx-auto mb-4" />
                <h3 className="font-display font-bold text-xl text-charcoal mb-2">Application Received!</h3>
                <p className="text-gray-500 font-body text-sm mb-6">
                  Thank you for your interest in joining Chef's Pho. We'll review your application and be in touch soon!
                </p>
                <button
                  onClick={() => { setFormStatus('idle'); setSelectedJob(null); }}
                  className="btn-primary text-sm"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-5">
                {!selectedJob && (
                  <div>
                    <label className="block text-sm font-semibold font-body text-charcoal mb-1.5">
                      Position of Interest
                    </label>
                    <select
                      onChange={e => setSelectedJob(jobs.find(j => j.id === Number(e.target.value)) || null)}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 font-body text-sm text-charcoal focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    >
                      <option value="">Select a position...</option>
                      {jobs.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
                    </select>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold font-body text-charcoal mb-1.5">
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text" name="name" value={form.name} onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold font-body text-charcoal mb-1.5">
                      Email <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email" name="email" value={form.email} onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold font-body text-charcoal mb-1.5">Phone</label>
                  <input
                    type="tel" name="phone" value={form.phone} onChange={handleChange}
                    placeholder="(555) 000-0000"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold font-body text-charcoal mb-1.5">
                    Why do you want to join us?
                  </label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    placeholder="Tell us a bit about yourself, your experience, and why you'd be a great fit..."
                    rows={5}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
                  />
                </div>
                {formStatus === 'error' && (
                  <p className="text-sm text-red-600 font-body bg-red-50 px-4 py-2.5 rounded-lg">
                    Something went wrong. Please try again.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-base disabled:opacity-70"
                >
                  {formStatus === 'loading' ? (
                    <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Submitting...</>
                  ) : (
                    <><Send size={18} /> Submit Application</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
