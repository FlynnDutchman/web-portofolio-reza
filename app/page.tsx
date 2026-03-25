"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Lenis from "@studio-freight/react-lenis";
import { Mail, Phone, ChevronRight, GraduationCap, Code2, Compass, Layers, Target, Satellite, Crosshair } from "lucide-react";

export default function Portfolio() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const baseLat = -7.7694;
  const baseLong = 110.3778;
  const liveLat = (baseLat + (mousePos.y * 0.00002)).toFixed(5);
  const liveLong = (baseLong + (mousePos.x * 0.00002)).toFixed(5);

  return (
    <Lenis root>
      <div className="min-h-screen bg-[#010409] text-slate-300 selection:bg-cyan-500/30 font-sans overflow-x-hidden relative cursor-none">
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

        <motion.div 
          animate={{ top: ["-10%", "110%"] }} 
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="fixed left-0 right-0 h-[2px] bg-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.8)] z-[100] pointer-events-none"
        />

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

        <div className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
          style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.08), transparent 40%)` }}
        />

        <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 origin-left z-[100]" style={{ scaleX }} />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d410_1px,transparent_1px),linear-gradient(to_bottom,#06b6d410_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

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

        <div className="w-full overflow-hidden bg-cyan-950/20 py-4 border-y border-cyan-500/20 relative z-40 backdrop-blur-sm">
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="flex gap-16 text-xl font-bold tracking-widest text-cyan-500/50 uppercase">
            <span>Geodetic Engineering</span> • <span>GIS & Spatial Analysis</span> • <span>Surveying & Fieldwork</span> • <span>3D & Remote Sensing</span> • <span>Geodetic Engineering</span>
          </motion.div>
        </div>

        <section id="about" className="py-32 px-8 max-w-7xl mx-auto relative z-40">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-3xl md:text-4xl font-black text-white mb-16 text-center uppercase">
            Education & Skills
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:col-span-2 bg-[#020813]/80 border border-cyan-500/20 p-10 hover:border-cyan-400/50 transition-colors group relative overflow-hidden">
              <GraduationCap className="w-10 h-10 text-cyan-400 mb-8" />
              <h3 className="text-2xl font-bold text-white mb-8 border-b border-cyan-500/20 pb-4">Education</h3>
              <div className="space-y-8 relative z-10">
                <div><h4 className="text-xl font-bold text-cyan-100">Universitas Gadjah Mada</h4><p className="text-cyan-400 mt-1">Geodetic Engineering</p><p className="text-slate-500 text-sm mt-2">Aug 2023 - Present</p></div>
                <div><h4 className="text-lg font-bold text-white">SMAN 2 Yogyakarta</h4><p className="text-slate-400 mt-1">Mathematics and Natural Science</p><p className="text-slate-500 text-sm mt-1">Jul 2020 - May 2023</p></div>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:col-span-1 bg-[#020813]/80 border border-emerald-500/20 p-10 hover:border-emerald-400/50 transition-colors relative overflow-hidden">
              <Layers className="w-10 h-10 text-emerald-400 mb-8" />
              <h3 className="text-xl font-bold text-white mb-6 border-b border-emerald-500/20 pb-4">Training</h3>
              <ul className="space-y-6 text-slate-300 text-sm">
                <li className="leading-relaxed"><span className="text-emerald-400 font-bold block mb-1">2025</span> GIS Training for Mining (Aksara Geospatial)</li>
                <li className="leading-relaxed"><span className="text-emerald-400 font-bold block mb-1">2025</span> Business Analysis with Spatial Data (Hi Spatial)</li>
              </ul>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:col-span-3 bg-[#020813]/80 border border-cyan-500/20 p-10 md:p-14 relative overflow-hidden flex flex-col md:flex-row gap-12 items-center">
               <div className="w-full md:w-1/3">
                 <Code2 className="w-12 h-12 text-cyan-400 mb-6" />
                 <h3 className="text-2xl font-bold text-white mb-4">Technical Skills</h3>
               </div>
               <div className="w-full md:w-2/3 flex flex-wrap gap-4">
                  {['ArcGIS', 'QGIS', 'AutoCAD', 'GNSS', 'Total Station', 'LiDAR', '3D Modeling', 'BPN Online'].map((skill) => (
                    <span key={skill} className="px-6 py-2 bg-transparent border border-cyan-500/30 text-sm font-semibold text-cyan-200 hover:bg-cyan-500/20 transition-all cursor-none">{skill}</span>
                  ))}
               </div>
            </motion.div>
          </div>
        </section>

        <section id="experience" className="py-32 px-8 relative z-40">
          <div className="max-w-5xl mx-auto">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-3xl md:text-4xl font-black text-white mb-20 text-center uppercase">Experience</motion.h2>
            <div className="grid gap-8 border-l border-cyan-500/30 pl-8 md:pl-12 ml-4 md:ml-0 relative">
              {[
                { title: "Head of Research Division", company: "KMTG UGM", date: "Des 2024 - Present", desc: ["Led research team and ensured project objectives."] },
                { title: "Geospatial Data Intern", company: "PT Total Geo Survey", date: "June 2025 - July 2025", desc: ["Performed digitization and LiDAR classification."] },
                { title: "Surveyor", company: "Proyek Jalan Kretek-Girijati", date: "Dec 2024 - Jan 2025", desc: ["Topographic and situational surveys."] }
              ].map((exp, index) => (
                <motion.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#020813]/80 border border-cyan-500/10 p-8 hover:border-cyan-500/50 transition-all">
                  <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                  <p className="text-cyan-400 font-mono text-sm my-2">{exp.date}</p>
                  <p className="text-slate-400 text-sm">{exp.company}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-32 px-8 max-w-5xl mx-auto text-center relative z-40">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#020813] border border-cyan-500/30 p-12 relative overflow-hidden">
            <h2 className="text-4xl font-black text-white mb-6 uppercase">Let's <span className="text-cyan-400">Work</span> Together</h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <a href="mailto:rezaauliafazrin@mail.ugm.ac.id" className="px-10 py-5 bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-all">Email Me</a>
              <a href="https://wa.me/6285867416098" target="_blank" rel="noreferrer" className="px-10 py-5 bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all">WhatsApp</a>
            </div>
          </motion.div>
        </section>

        <footer className="py-8 text-center text-slate-500 text-sm border-t border-cyan-500/20 relative z-40 bg-[#010409]">
          <p>© {new Date().getFullYear()} Reza Aulia Fazrin. All rights reserved.</p>
        </footer>
      </div>
    </Lenis>
  );
}