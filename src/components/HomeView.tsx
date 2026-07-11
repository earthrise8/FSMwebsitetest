import React, { useState, useEffect } from 'react';
import { PROJECTS, STATS, NEWS, EVENTS, SPONSORS } from '../data';
import { ArrowRight, Star, Calendar, MapPin, Clock, Award, Compass, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
  setSelectedProject: (projectId: string | null) => void;
}

export default function HomeView({ setActiveTab, setSelectedProject }: HomeViewProps) {
  // Stats counters simulation
  const [counts, setCounts] = useState(STATS.map(() => 0));
  
  // Load news from localStorage to sync with dedicated Updates page
  const [localNews, setLocalNews] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('fsm_news_articles');
    if (saved) {
      setLocalNews(JSON.parse(saved));
    } else {
      setLocalNews(NEWS);
    }
  }, []);

  useEffect(() => {
    const intervals = STATS.map((stat, index) => {
      const step = Math.ceil(stat.value / 40);
      return setInterval(() => {
        setCounts((prev) => {
          const next = [...prev];
          if (next[index] < stat.value) {
            next[index] = Math.min(next[index] + step, stat.value);
          }
          return next;
        });
      }, 30);
    });

    return () => {
      intervals.forEach(clearInterval);
    };
  }, []);

  return (
    <div className="w-full bg-slate-50 text-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 bg-white border-b border-slate-200/60">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold mb-6 tracking-wide uppercase shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            Fremont's First Student-Led Tech & Maker Nonprofit
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-slate-900 leading-tight max-w-4xl mx-auto"
          >
            Empowering the Next Generation of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Student Innovators
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-sans leading-relaxed"
          >
            From designing custom environmental sensor rovers to developing the Maker³ student satellite software, we build real hardware, real software, and real community leaders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => setActiveTab('projects')}
              className="w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md shadow-blue-500/10 hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
            >
              Explore Our Projects
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className="w-full sm:w-auto px-7 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg border border-slate-200 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
            >
              Join the Team
            </button>
          </motion.div>
        </div>
      </section>

      {/* Animated Statistics Banner */}
      <section className="bg-slate-50 border-b border-slate-200/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y-0 lg:divide-x lg:divide-slate-200">
            {STATS.map((stat, index) => (
              <div key={index} className="space-y-1 lg:px-4">
                <div className="text-3xl sm:text-4xl font-display font-bold text-slate-900">
                  <span className="text-blue-600">
                    {counts[index].toLocaleString()}
                  </span>
                  <span className="text-blue-500">{stat.suffix}</span>
                </div>
                <div className="text-[11px] text-slate-500 font-semibold tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission statement teaser */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-xs uppercase tracking-wider mb-3">
              <Compass className="w-4 h-4" />
              OUR MISSION AT A GLANCE
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
              Bridging Classroom Theory with Hands-On Maker Reality
            </h2>
            <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
              We believe that students shouldn't have to wait until graduate school to design advanced electronic hardware. 
              By establishing fully student-managed technology and maker programs, we provide the safety training, financial backing, 
              and technical mentorship needed to let middle and high school students spearhead genuine engineering marvels.
            </p>
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded bg-blue-50 text-blue-600 mt-1 shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-sm">100% Student Led</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Students coordinate projects, manage safety protocols, allocate budgets, and draft proposal documents.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded bg-emerald-50 text-emerald-600 mt-1 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-sm">Access for Everyone</h4>
                  <p className="text-xs text-slate-500 mt-0.5">We supply high-quality materials and training completely free, opening technical fields to all socio-economic backgrounds.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-display font-bold text-slate-900 mb-4">Our Core Focus Areas</h3>
            <div className="space-y-3">
              {[
                { title: 'Systems Engineering', desc: 'Managing massive interdisciplinary projects with complex payloads.', bg: 'bg-slate-50' },
                { title: 'Hardware Manufacture', desc: 'Hands-on layout boards, milling aluminum, carbon fiber, and micro-soldering.', bg: 'bg-slate-50' },
                { title: 'Avionics Development', desc: 'Real-time telemetry, sensor calculations, radio frequencies, and logging systems.', bg: 'bg-slate-50' },
                { title: 'Community Support', desc: 'Sponsoring regional schools with hardware kits and running public library workshops.', bg: 'bg-slate-50' }
              ].map((item, index) => (
                <div key={index} className={`p-3.5 rounded-xl border border-slate-100 ${item.bg}`}>
                  <h4 className="text-slate-900 font-bold text-xs sm:text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-16 md:py-20 bg-white border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">Featured Initiatives</h2>
            <p className="text-slate-500 mt-3 text-sm sm:text-base">
              Explore how students are tackling cutting-edge challenges. Select any card to read our complete project reports and specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.filter(p => p.id === 'makersat' || p.id === 'rocketry' || p.id === 'robotics').map((project) => (
              <div 
                key={project.id} 
                onClick={() => {
                  setSelectedProject(project.id);
                  setActiveTab('projects');
                }}
                className="group bg-slate-50 border border-slate-200/80 rounded-xl overflow-hidden hover:border-blue-400/60 hover:bg-white hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer flex flex-col h-full"
              >
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-[11px] font-bold bg-white/95 backdrop-blur-sm text-blue-600 border border-blue-100 rounded-full shadow-sm">
                      {project.title}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {project.subtitle}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-500 line-clamp-2 flex-grow">
                    {project.description}
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-150 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="text-[10px] bg-white text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 text-xs font-bold text-blue-600 inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                    Read Program Details
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => setActiveTab('projects')}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-700 font-bold transition-all cursor-pointer shadow-sm"
            >
              View All Initiatives & Roadmaps
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming Events & News Grid */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Latest News */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900">Latest Updates</h2>
              <button onClick={() => setActiveTab('updates')} className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-bold flex items-center gap-0.5 cursor-pointer">
                View All
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-4">
              {localNews.slice(0, 3).map((article) => (
                <div key={article.id} className="p-4 bg-white border border-slate-200/80 rounded-xl flex gap-4 hover:border-blue-200 hover:shadow-md transition-all duration-150">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-slate-100 shrink-0 hidden sm:block">
                    <img src={article.image} alt={article.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">{article.category}</span>
                        <span className="text-xs text-slate-300">•</span>
                        <span className="text-[10px] text-slate-500 font-semibold">{article.date}</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 hover:text-blue-600 transition-colors line-clamp-1">{article.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{article.excerpt}</p>
                    </div>
                    <button onClick={() => setActiveTab('updates')} className="text-[11px] text-blue-600 font-semibold hover:underline text-left mt-1.5">Read Article</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900">Upcoming Events</h2>
              <button onClick={() => setActiveTab('contact')} className="text-xs sm:text-sm text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-0.5 cursor-pointer">
                Contact Form
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-4">
              {EVENTS.map((event) => (
                <div key={event.id} className="p-4 bg-white border border-slate-200/80 rounded-xl hover:border-emerald-200 hover:shadow-md transition-all duration-150">
                  <div className="flex flex-wrap items-center gap-2 text-[10px] text-blue-600 font-bold mb-2 uppercase tracking-wide">
                    <span className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                      <Calendar className="w-3 h-3" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                      <Clock className="w-3 h-3" />
                      {event.time}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1">{event.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-2">{event.description}</p>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {event.location}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>




      {/* Voices of Fremont Student Makers (Testimonials) */} 

      {/*
      <section className="py-16 md:py-20 bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">Community Voices</h2>
            <p className="text-slate-500 mt-2 text-sm sm:text-base">Read what members, parents, and technical advisors say about our programs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between h-full relative">
                <span className="absolute top-2 right-4 text-slate-200 text-5xl font-serif select-none pointer-events-none">“</span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic z-10">"{t.quote}"</p>
                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-2.5">
                  <div className="p-1.5 rounded bg-white border border-slate-200 text-blue-500 shrink-0">
                    <Star className="w-3.5 h-3.5 fill-blue-500 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">{t.author}</h4>
                    <p className="text-[10px] text-slate-500 leading-none mt-0.5">{t.school}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      */} 
            


      {/* Sponsors Preview */}
      <section className="py-12 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
            TRUSTED AND SUPPORTED BY:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center justify-center opacity-85">
            {SPONSORS.map((sponsor, index) => (
              <div 
                key={index} 
                className="p-3.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 transition-all duration-150"
              >
                <span className="font-display text-xs font-bold tracking-wider text-slate-600 uppercase">
                  {sponsor.logoText}
                </span>
                <p className="text-[9px] text-slate-400 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">{sponsor.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 bg-white border-t border-slate-200/60 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">Ready to Shape the Future?</h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base max-w-xl mx-auto">
            Whether you are a student ready to build hardware, a parent wanting to support, or a local business looking to sponsor, there's a place for you.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveTab('contact')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-150 cursor-pointer"
            >
              Get Involved Today
            </button>
            <button
              onClick={() => setActiveTab('mission')}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold border border-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Learn More About Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
