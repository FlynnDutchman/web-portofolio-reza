"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Lenis from "@studio-freight/react-lenis";
import { Mail, Phone, MapPin, ChevronRight, GraduationCap, Code2, Compass, Layers, Target, Satellite, Crosshair } from "lucide-react";

export default function Portfolio() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  // Setup Lenis & Mouse Tracking
  useEffect(() => {
    setIsMounted(true);
    window.scrollTo(0, 0);
    const updateMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  // Kalkulasi Koordinat Fiktif HUD
  const baseLat = -7.7694;
  const baseLong = 110.3778;
  const liveLat = (baseLat + (mousePos.y * 0.00002)).toFixed(5);
  const liveLong = (baseLong + (mousePos.x * 0.00002)).toFixed(5);

  return (
    <Lenis root>
      <div className="min-h-screen bg-[#010409] text-slate-300 selection:bg-cyan-500/30 font-sans overflow-x-hidden relative cursor-none">
        
        {/* CUSTOM SURVEYOR CROSSHAIR CURSOR */}
        {isMounted && (
          <motion.div 
            className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference"
            animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
            transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
          >
            <Crosshair className="w-8 h-8 text-cyan-400 opacity-80" strokeWidth={1} />
            <div className="absolute w-1 h-1 bg-emerald-400 rounded-full animate-ping"></div>
          </motion.div>
        )}

        {/* LIDAR SCANLINE EFFECT */}
        <motion.div 
          animate={{ top: ["-10%", "110%"] }} 
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="fixed left-0 right-0 h-[2px] bg-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.8)] z-[100] pointer-events-none"
        />

        {/* HUD (HEADS UP DISPLAY) */}
        <div className="fixed bottom-6 right-6 z-[90] pointer-events-none hidden md:block">
          <div className="bg-[#010409]/80 backdrop-blur-md border border-cyan-500/30 p-4 rounded-xl font-mono text-xs text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <div className="flex items-center gap-2 mb-2 border-b border-cyan-500/30 pb-2">
              <Satellite className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-bold tracking-widest">GNSS RTK : FIX</span>
            </div>
            <p>LAT : {liveLat}° S</p>
            <p>LON : {liveLong}° E</p>
            <p>ELV : +144.23 m</p>
            <p className="mt-2 text-slate-500">TRACKING_ACTIVE</p>
          </div>
        </div>

        {/* Spotlight Effect */}
        <div 
          className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
          style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.08), transparent 40%)` }}
        />

        {/* Progress Bar Top */}
        <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 origin-left z-[100]" style={{ scaleX }} />

        {/* Grid Latar Belakang Topografi */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d410_1px,transparent_1px),linear-gradient(to_bottom,#06b6d410_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-16 py-6 bg-[#010409]/70 backdrop-blur-2xl border-b border-cyan-500/10">
          <div className="text-xl font-black tracking-tighter text-white flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            Reza Aulia Fazrin
          </div>
          <div className="hidden md:flex gap-10 text-sm font-semibold uppercase text-slate-300">
            <a href="#about" className="hover:text-cyan-400 transition-colors cursor-none">About</a>
            <a href="#experience" className="hover:text-cyan-400 transition-colors cursor-none">Experience</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors cursor-none">Contact</a>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section className="relative flex flex-col md:flex-row items-center justify-center min-h-screen px-8 md:px-16 gap-16 pt-24 z-40">
          <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }} className="max-w-3xl text-center md:text-left order-2 md:order-1">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-none border-l-2 border-emerald-500 bg-emerald-500/10 text-emerald-300 text-xs font-mono mb-8 backdrop-blur-md uppercase tracking-widest">
              <Target className="w-4 h-4" /> Available for Work
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-black tracking-tighter mb-4 leading-[1.1] text-white">
              Geodetic <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-500" style={{ textShadow: "0 0 40px rgba(6,182,212,0.4)" }}>
                Engineer.
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-slate-400 font-light mb-10 leading-relaxed max-w-2xl">
              Undergraduate student at Gadjah Mada University. Specializing in <span className="text-cyan-300 font-medium">GIS, Spatial Analysis,</span> and <span className="text-emerald-300 font-medium">3D Remote Sensing</span>.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center md:justify-start gap-6">
              <a href="#contact" className="px-10 py-4 bg-cyan-500 text-slate-950 font-bold rounded-none hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-none">
                Hubungi Saya
              </a>
              <a href="#experience" className="px-10 py-4 bg-transparent border border-cyan-500/30 text-cyan-400 font-bold rounded-none hover:bg-cyan-500/10 transition-all backdrop-blur-md group flex items-center gap-2 cursor-none">
                Lihat Pengalaman <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: "easeOut" }} className="order-1 md:order-2 relative">
             <div className="absolute inset-0 bg-cyan-500 blur-[100px] opacity-20 animate-pulse rounded-full"></div>
             {/* Frame Futuristik untuk Foto */}
             <div className="relative w-72 h-72 md:w-96 md:h-96 p-2 bg-[#010409] overflow-hidden border border-cyan-500/40">
               <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400"></div>
               <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400"></div>
               <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400"></div>
               <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400"></div>
               
               <img src="/profil.jpeg" alt="Reza Aulia Fazrin" className="w-full h-full object-cover filter contrast-125 hover:brightness-110 transition-all duration-700" />
               
               <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(6,182,212,0.1)_3px,rgba(6,182,212,0.1)_3px)] pointer-events-none"></div>
             </div>
          </motion.div>
        </section>

        {/* MARQUEE */}
        <div className="w-full overflow-hidden bg-cyan-950/20 py-4 border-y border-cyan-500/20 relative z-40 backdrop-blur-sm">
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="flex gap-16 text-xl font-bold tracking-widest text-cyan-500/50 uppercase">
            <span>Geodetic Engineering</span> •
            <span>GIS & Spatial Analysis</span> •
            <span>Surveying & Fieldwork</span> •
            <span>3D & Remote Sensing</span> •
            <span>Geodetic Engineering</span> •
            <span>GIS & Spatial Analysis</span>
          </motion.div>
        </div>

        {/* BENTO GRID (ABOUT & SKILLS) */}
        <section id="about" className="py-32 px-8 max-w-7xl mx-auto relative z-40">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-3xl md:text-4xl font-black text-white mb-16 text-center uppercase">
            Education & Skills
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
            {/* Education Bento */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:col-span-2 bg-[#020813]/80 border border-cyan-500/20 p-10 hover:border-cyan-400/50 transition-colors group relative overflow-hidden">
              <GraduationCap className="w-10 h-10 text-cyan-400 mb-8" />
              <h3 className="text-2xl font-bold text-white mb-8 border-b border-cyan-500/20 pb-4">Education</h3>
              <div className="space-y-8 relative z-10">
                <div>
                  <h4 className="text-xl font-bold text-cyan-100">Universitas Gadjah Mada</h4>
                  <p className="text-cyan-400 mt-1">Geodetic Engineering</p>
                  <p className="text-slate-500 text-sm mt-2">Aug 2023 - Present</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">SMAN 2 Yogyakarta</h4>
                  <p className="text-slate-400 mt-1">Mathematics and Natural Science</p>
                  <p className="text-slate-500 text-sm mt-1">Jul 2020 - May 2023</p>
                </div>
              </div>
            </motion.div>

            {/* Certifications Bento */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:col-span-1 bg-[#020813]/80 border border-emerald-500/20 p-10 hover:border-emerald-400/50 transition-colors relative overflow-hidden">
              <Layers className="w-10 h-10 text-emerald-400 mb-8" />
              <h3 className="text-xl font-bold text-white mb-6 border-b border-emerald-500/20 pb-4">Training & Certification</h3>
              <ul className="space-y-6 text-slate-300 text-sm">
                <li className="leading-relaxed"><span className="text-emerald-400 font-bold block mb-1">2025</span> GIS Training for Mining (Aksara Geospatial)</li>
                <li className="leading-relaxed"><span className="text-emerald-400 font-bold block mb-1">2025</span> Business Analysis with Spatial Data (Hi Spatial)</li>
                <li className="leading-relaxed"><span className="text-emerald-400 font-bold block mb-1">2024</span> QGIS: Optimizing Map Visualization</li>
              </ul>
            </motion.div>

            {/* Skills Bento */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:col-span-3 bg-[#020813]/80 border border-cyan-500/20 p-10 md:p-14 relative overflow-hidden flex flex-col md:flex-row gap-12 items-center">
               <div className="w-full md:w-1/3">
                 <Code2 className="w-12 h-12 text-cyan-400 mb-6" />
                 <h3 className="text-2xl font-bold text-white mb-4">Technical Skills</h3>
                 <p className="text-slate-400 leading-relaxed text-sm">A comprehensive toolkit spanning spatial analysis, precise field data collection, and 3D modeling technologies.</p>
               </div>
               <div className="w-full md:w-2/3 flex flex-wrap gap-4">
                  {['ArcGIS', 'QGIS', 'AutoCAD', 'GNSS', 'Total Station', 'LiDAR Classification', '3D Modeling', 'Microsoft Excel', 'GIS & Spatial Analysis'].map((skill) => (
                    <span key={skill} className="px-6 py-2 bg-transparent border border-cyan-500/30 text-sm font-semibold text-cyan-200 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all cursor-none shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                      {skill}
                    </span>
                  ))}
               </div>
            </motion.div>
          </div>
        </section>

        {/* EXPERIENCE TIMELINE */}
        <section id="experience" className="py-32 px-8 relative z-40">
          <div className="max-w-5xl mx-auto">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-3xl md:text-4xl font-black text-white mb-20 text-center uppercase">
              Professional Experience
            </motion.h2>
            
            <div className="grid gap-8 border-l border-cyan-500/30 pl-8 md:pl-12 ml-4 md:ml-0 relative">
              {[
                { title: "Head of Research Division", company: "Keluarga Mahasiswa Teknik Geodesi", date: "Des 2024 - Des 2025", desc: ["Led research team by providing strategic direction and ensuring achievement of project objectives.", "Coordinated tasks and resources to optimize team performance and role alignment.", "Monitored and evaluated research activities to maintain progress, address challenges, and ensure quality outcomes."] },
                { title: "Geospatial Data Processing Intern", company: "PT Total Geo Survey", date: "June 2025 - July 2025", desc: ["Performed building digitization using GIS/CAD tools.", "Classified LiDAR point clouds for accurate spatial analysis.", "Developed 3D building models for mapping and visualization."] },
                { title: "Surveyor", company: "Proyek Jalan Baru Kretek-Girijati (PUPR, Waskita, PP)", date: "Dec 2024 - Jan 2025", desc: ["Conducted stake out measurements using Total Station.", "Performed topographic and situational surveys for monitoring landslides.", "Carried out as-built measurements (opname).", "Assisted in site monitoring of slopes, excavations, and drainage."] },
                { title: "Surveying & Mapping Assistant", company: "Dinas Pertanahan dan Tata Ruang Kota Yogyakarta", date: "July 2024 - July 2024", desc: ["Digitized land parcels and urban areas using GIS tools and official cadastral data.", "Conducted GNSS field surveys for accurate geospatial data collection.", "Assisted in boundary demarcation by installing and referencing ground control markers."] },
                { title: "Land Data Operator", company: "Badan Pertanahan Nasional (ATR/BPN) Kota Yogyakarta", date: "Jan 2024 - Jan 2024", desc: ["Sorted and processed land deed documents for data management.", "Utilized Microsoft Excel and BPN’s online system to organize and input 800 land records with high accuracy.", "Contributed to maintaining data integrity and improving service efficiency."] }
              ].map((exp, index) => (
                <motion.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="group relative bg-[#020813]/80 border border-cyan-500/10 p-8 md:p-10 hover:border-cyan-500/50 hover:bg-[#020813] transition-all duration-500 overflow-hidden">
                  <div className="absolute -left-[41px] md:-left-[57px] top-10 w-4 h-4 rounded-none bg-cyan-500 border border-[#010409] outline outline-1 outline-cyan-500/50 group-hover:scale-150 transition-transform"></div>
                  <div className="absolute -left-[41px] md:-left-[57px] top-10 w-4 h-4 bg-cyan-400 animate-ping opacity-50"></div>
                  
                  <div className="flex flex-col md:flex-row gap-6 md:gap-12 relative z-10">
                    <div className="md:w-1/3 shrink-0">
                      <p className="text-cyan-400 font-bold mb-3 font-mono text-sm tracking-widest border-b border-cyan-500/20 pb-2 inline-block">{exp.date}</p>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{exp.title}</h3>
                      <p className="text-slate-400 text-sm mt-3 flex items-start gap-2">
                        <Compass className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" /> {exp.company}
                      </p>
                    </div>
                    <div className="md:w-2/3">
                      <ul className="space-y-4">
                        {exp.desc.map((item, i) => (
                          <li key={i} className="flex items-start gap-4 text-slate-300 leading-relaxed text-sm">
                             <span className="text-cyan-500 font-bold mt-1"><ChevronRight className="w-4 h-4" /></span>
                             {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-32 px-8 max-w-5xl mx-auto text-center relative z-40">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#020813] border border-cyan-500/30 p-12 md:p-24 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase">
              Mari Bekerja <span className="text-cyan-400">Sama</span>
            </h2>
            <p className="text-slate-400 mb-16 text-lg max-w-2xl mx-auto">
              Silakan hubungi saya melalui platform di bawah ini untuk kolaborasi atau pertanyaan profesional.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-16 relative z-10">
              <a href="mailto:rezaauliafazrin@mail.ugm.ac.id" className="group flex items-center justify-center gap-4 px-10 py-5 bg-cyan-500/10 border border-cyan-500/50 hover:bg-cyan-500 transition-all w-full md:w-auto cursor-none">
                <Mail className="w-5 h-5 text-cyan-400 group-hover:text-slate-950" />
                <span className="font-bold text-cyan-400 group-hover:text-slate-950 text-base">rezaauliafazrin@mail.ugm.ac.id</span>
              </a>
              <a href="https://wa.me/6285867416098" target="_blank" rel="noreferrer" className="group flex items-center justify-center gap-4 px-10 py-5 bg-emerald-500/10 border border-emerald-500/50 hover:bg-emerald-500 transition-all w-full md:w-auto cursor-none">
                <Phone className="w-5 h-5 text-emerald-400 group-hover:text-slate-950" />
                <span className="font-bold text-emerald-400 group-hover:text-slate-950 text-base">(+62) 858-6741-6098</span>
              </a>
            </div>

            <div className="flex justify-center gap-8 relative z-10">
              <a href="https://linkedin.com/in/reza-aulia-fazrin/" target="_blank" rel="noreferrer" className="p-4 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition-all cursor-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://instagram.com/rzzzzz_9" target="_blank" rel="noreferrer" className="p-4 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-all cursor-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 text-center text-slate-500 text-sm border-t border-cyan-500/20 relative z-40 bg-[#010409]">
          <p className="uppercase tracking-widest font-bold mb-2">Reza Aulia Fazrin</p>
          <p>© {new Date().getFullYear()} All rights reserved.</p>
        </footer>

      </div>
    </Lenis>
  );
}