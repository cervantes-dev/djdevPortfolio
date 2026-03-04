import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollDirection } from '../../hooks/useScrollDirection'

// ── Icons ──────────────────────────────────────────────────────────────────────
const ExternalLinkIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)
const GithubIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)
const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
)
const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
)

// ── Project Data ───────────────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    type: 'web',
    images: [
      '/assets/project-showcase/capstone-project/landing_page.png',
      '/assets/project-showcase/capstone-project/2.png',
      '/assets/project-showcase/capstone-project/3.png',
      '/assets/project-showcase/capstone-project/4.png',
      '/assets/project-showcase/capstone-project/5.png',
      '/assets/project-showcase/capstone-project/6.png',
      '/assets/project-showcase/capstone-project/7.png',
      '/assets/project-showcase/capstone-project/8.png',
    ],
    title: 'Laboratory Inventory & Borrowing System',
    label: 'Capstone Project',
    desc: 'A full-featured laboratory management system for tracking equipment inventory and managing student borrowing requests with real-time status updates.',
    tags: ['CodeIgniter', 'Bootstrap CSS', 'PHP', 'MySQL'],
    liveLink: '#',
    sourceLink: '#',
    year: '2024',
    accent: '#c084fc',       // purple-400 ✅
    gradFrom: 'rgba(192,132,252,0.18)',
    gradTo: 'rgba(34,211,238,0.06)',
  },
  {
    id: 2,
    type: 'web',
    images: [
      '/assets/project-showcase/booking/1.png',
      '/assets/project-showcase/booking/2.png',
    ],
    title: 'Booking System',
    label: 'Internship Project',
    desc: 'A web-based booking system developed during internship to streamline client reservations, scheduling, and real-time availability management.',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    liveLink: '#',
    sourceLink: '#',
    year: '2023',
    accent: '#22d3ee',       // cyan-400 ✅
    gradFrom: 'rgba(34,211,238,0.18)',
    gradTo: 'rgba(192,132,252,0.06)',
  },
  {
    id: 3,
    type: 'mobile',
    images: [
      '/assets/project-showcase/tasa/1.png',
      '/assets/project-showcase/tasa/2.png',
      '/assets/project-showcase/tasa/3.png',
      '/assets/project-showcase/tasa/4.png',
      '/assets/project-showcase/tasa/5.png',
      '/assets/project-showcase/tasa/6.png',
    ],
    title: 'TASA — Treasurer Assistant',
    label: 'Mobile Application',
    desc: 'A cross-platform mobile application built with React Native and Expo, enabling organization treasurers to manage funds, track transactions, and generate reports on iOS and Android.',
    tags: ['React Native', 'Expo', 'Tailwind CSS'],
    liveLink: null,
    sourceLink: '#',
    year: '2024',
    accent: '#a855f7',       // purple-500 ✅
    gradFrom: 'rgba(168,85,247,0.18)',
    gradTo: 'rgba(34,211,238,0.06)',
  },
]

// ── Screenshot Modal ───────────────────────────────────────────────────────────
function ScreenshotModal({ project, onClose }) {
  const [current, setCurrent] = useState(0)
  const total = project.images.length
  const prev = (e) => { e.stopPropagation(); setCurrent(i => (i - 1 + total) % total) }
  const next = (e) => { e.stopPropagation(); setCurrent(i => (i + 1) % total) }

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-999 bg-black/92 backdrop-blur-md flex items-center justify-center px-4 py-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-[#0d0918] border border-purple-500/30 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(192,132,252,0.2)] flex flex-col md:flex-row"
        style={{ maxHeight: '88vh' }}
      >
        {/* Close */}
        <button onClick={onClose}
          className="absolute top-4 right-4 z-30 w-8 h-8 flex items-center justify-center rounded-full bg-purple-500/20 border border-purple-500/30 text-white hover:bg-purple-500/40 transition-all">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Image side */}
        <div className="relative w-full md:w-[58%] bg-black/40 flex items-center justify-center overflow-hidden" style={{ minHeight: '300px' }}>
          <div className="absolute top-4 left-4 z-20 font-mono text-[11px] text-white/40 bg-black/40 px-3 py-1 rounded-full border border-purple-500/20 backdrop-blur-sm tracking-widest">
            {String(current + 1).padStart(2,'0')} / {String(total).padStart(2,'0')}
          </div>
          <AnimatePresence mode="wait">
            <motion.img key={current} src={project.images[current]} alt={`screenshot ${current + 1}`}
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.22 }} className="w-full h-full object-contain p-8" />
          </AnimatePresence>
          {total > 1 && <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 border border-purple-500/30 text-white hover:bg-purple-500/20 transition-all z-10">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 border border-purple-500/30 text-white hover:bg-purple-500/20 transition-all z-10">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {project.images.map((_, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); setCurrent(i) }}
                  className={`rounded-full transition-all duration-300 ${i === current ? 'w-5 h-1.5 bg-purple-400' : 'w-1.5 h-1.5 bg-purple-500/30'}`} />
              ))}
            </div>
          </>}
          <div className="hidden md:block absolute right-0 inset-y-6 w-px bg-purple-500/20" />
        </div>

        {/* Content side */}
        <div className="flex flex-col justify-center gap-5 w-full md:w-[42%] p-8">
          <div>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-purple-400/60">
              {project.label} · {project.year}
            </span>
            <h3 className="font-syne text-xl font-bold text-white mt-1.5 leading-snug">{project.title}</h3>
          </div>

          {/* Accent bar — purple to cyan ✅ */}
          <div className="w-8 h-1.5 rounded-full bg-linear-to-r from-purple-400 to-cyan-400" />

          <p className="font-jakarta text-sm text-gray-400 leading-relaxed">{project.desc}</p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, t) => (
              <span key={t} className="font-mono text-[11px] px-2.5 py-1 rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-300">{tag}</span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2.5 pt-1">
            {project.type === 'web' && project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-wider uppercase px-4 py-2.5 rounded-xl text-white hover:opacity-80 transition-all"
                style={{
                  background: 'linear-gradient(135deg, #c084fc, #22d3ee)',   // purple-400 → cyan-400 ✅
                  boxShadow: '0 0 20px rgba(192,132,252,0.35)'               // purple-400 glow ✅
                }}>
                <ExternalLinkIcon /> Live Preview
              </a>
            )}
            <a href={project.sourceLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-wider uppercase px-4 py-2.5 rounded-xl border border-purple-500/30 bg-purple-500/5 text-gray-300 hover:bg-purple-500/10 transition-all">
              <GithubIcon /> Source Code
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  )
}

// ── Main Project Card ──────────────────────────────────────────────────────────
function ProjectCard({ project, direction, onOpenScreenshots }) {
  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 0.97 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0, scale: 0.97 }),
  }

  return (
    <motion.div
      key={project.id}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative w-full rounded-2xl border border-purple-500/20 bg-[#0c0917] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
      style={{ minHeight: '440px' }}
    >
      {/* Colour wash */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 55% 80% at 18% 50%, ${project.gradFrom}, ${project.gradTo}, transparent 65%)` }} />

      <div className="relative flex flex-col lg:flex-row h-full min-h-110">

        {/* ── IMAGE ── */}
        <div
          onClick={onOpenScreenshots}
          className="group relative w-full lg:w-[50%] min-h-60 lg:min-h-full flex items-center justify-center overflow-hidden cursor-pointer bg-black/15"
        >
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.055]"
            style={{ backgroundImage: `radial-gradient(circle, ${project.accent} 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />

          {/* Ghost number */}
          <span className="absolute select-none pointer-events-none font-syne font-black text-[150px] leading-none opacity-[0.04] text-white"
            style={{ bottom: -16, right: -8 }}>
            {String(projects.indexOf(project) + 1).padStart(2, '0')}
          </span>

          <img
            src={project.images[0]}
            alt={project.title}
            className="relative z-10 w-full max-h-90 object-contain p-10 transition-transform duration-700 group-hover:scale-[1.05]"
          />

          {/* Hover reveal */}
          <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/58 flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center backdrop-blur-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
            </div>
            <span className="font-mono text-[11px] text-white/70 tracking-[0.15em] uppercase">
              {project.images.length} Screenshots
            </span>
          </div>

          {/* Divider */}
          <div className="hidden lg:block absolute right-0 top-8 bottom-8 w-px"
            style={{ background: `linear-gradient(to bottom, transparent, ${project.accent}35, transparent)` }} />
        </div>

        {/* ── CONTENT ── */}
        <div className="flex flex-col justify-center gap-5 w-full lg:w-[50%] p-8 lg:px-12 lg:py-10">

          {/* Meta row */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-black" style={{ color: project.accent }}>
              {String(projects.indexOf(project) + 1).padStart(2, '0')}
            </span>
            <div className="h-px flex-1" style={{ background: `${project.accent}20` }} />
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase px-2.5 py-0.5 rounded-full border"
              style={{ color: project.accent, borderColor: `${project.accent}35`, background: `${project.accent}10` }}>
              {project.type === 'mobile' ? '📱 Mobile' : '🌐 Web'}
            </span>
          </div>

          {/* Title */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase mb-2 text-purple-400/60">
              {project.label} · {project.year}
            </p>
            <h3 className="font-syne text-2xl lg:text-3xl font-extrabold text-white leading-tight">
              {project.title}
            </h3>
          </div>

          {/* Accent bar — purple to cyan ✅ */}
          <div className="w-10 h-1.5 rounded-full bg-linear-to-r from-purple-400 to-cyan-400" />

          {/* Desc */}
          <p className="font-jakarta text-[14.5px] text-gray-400 leading-[1.8]">
            {project.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, t) => (
              <span key={t}
                className="font-mono text-[11px] px-3 py-1 rounded-lg border border-purple-500/25 bg-purple-500/5 text-gray-300 hover:bg-purple-500/10 transition-colors">
                {tag}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {project.type === 'web' && project.liveLink && (
              <motion.a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-wider uppercase px-5 py-2.5 rounded-xl text-white"
                style={{
                  background: 'linear-gradient(135deg, #c084fc, #22d3ee)',   // purple-400 → cyan-400 ✅
                  boxShadow: '0 0 22px rgba(192,132,252,0.35)'               // purple-400 glow ✅
                }}>
                <ExternalLinkIcon /> Live Preview
              </motion.a>
            )}
            <motion.a href={project.sourceLink} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-wider uppercase px-5 py-2.5 rounded-xl border border-purple-500/30 bg-purple-500/5 text-gray-300 hover:bg-purple-500/10 transition-colors">
              <GithubIcon /> Source Code
            </motion.a>
          </div>

        </div>
      </div>
    </motion.div>
  )
}

// ── Main Section ───────────────────────────────────────────────────────────────
const Project = () => {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [screenshotProject, setScreenshotProject] = useState(null)
  const scrollDir = useScrollDirection()
  const total = projects.length

  const scrollToCard = () => {
    if (!cardRef.current) return
    const top = cardRef.current.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const goTo = (index) => {
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
    setTimeout(scrollToCard, 0)
  }

  const prev = () => {
    setDirection(-1)
    setActiveIndex(i => (i - 1 + total) % total)
    setTimeout(scrollToCard, 0)
  }

  const next = () => {
    setDirection(1)
    setActiveIndex(i => (i + 1) % total)
    setTimeout(scrollToCard, 0)
  }

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: scrollDir === 'down' ? 28 : -28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, margin: '-50px' },
    transition: { duration: 0.55, delay, ease: 'easeOut' },
  })

  const activeProject = projects[activeIndex]
  const peekProjects = [
    projects[(activeIndex + 1) % total],
    projects[(activeIndex + 2) % total],
  ]

  return (
    <section ref={sectionRef} id="project"
      className="relative w-full px-4 sm:px-6 md:px-12 lg:px-20 py-28">

      {/* ── Header ── */}
      <div className="flex flex-col items-center text-center gap-4 mb-16">
        <motion.span {...fadeUp(0)}
          className="w-fit font-mono text-xs font-semibold tracking-[0.2em] uppercase border border-purple-500/40 bg-purple-500/10 px-4 py-1.5 rounded-full">
          <span className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            featured projects
          </span>
        </motion.span>

        <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
          {/* ✅ removed via-fuchsia-400 */}
          <motion.span {...fadeUp(0.1)} className="text-white block">Things I've</motion.span>
          <motion.span {...fadeUp(0.2)}
            className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent block">
            Built
          </motion.span>
        </h2>

        <motion.p {...fadeUp(0.3)} className="font-jakarta text-sm text-gray-400 max-w-md leading-relaxed">
          A collection of real-world projects — from government systems to mobile apps.
        </motion.p>

        {/* Decorative divider */}
        <motion.div {...fadeUp(0.38)} className="flex items-center gap-2 mt-1">
          <div className="w-12 h-px bg-linear-to-r from-transparent to-purple-400/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400/60" />
          <div className="w-20 h-px bg-linear-to-r from-purple-400/40 to-cyan-400/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
          <div className="w-12 h-px bg-linear-to-l from-transparent to-cyan-400/40" />
        </motion.div>
      </div>

      {/* ── Card navigator ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-6xl mx-auto"
      >
        <div ref={cardRef} className="relative" style={{ isolation: 'isolate' }}>

          {/* Peek cards */}
          {peekProjects.map((p, i) => (
            <div
              key={p.id}
              className="absolute inset-x-0 rounded-2xl border border-purple-500/10 bg-[#0c0917] pointer-events-none"
              style={{
                top: `${(i + 1) * 6}px`,
                bottom: `-${(i + 1) * 6}px`,
                transform: `scale(${1 - (i + 1) * 0.025})`,
                transformOrigin: 'bottom center',
                zIndex: -(i + 1),
                opacity: 1 - (i + 1) * 0.35,
              }}
            >
              <div className="absolute inset-0 rounded-2xl"
                style={{ background: `radial-gradient(ellipse 60% 60% at 20% 50%, ${p.gradFrom}, transparent 70%)` }} />
            </div>
          ))}

          {/* Active card */}
          <div className="relative" style={{ zIndex: 1 }}>
            <AnimatePresence mode="wait" custom={direction}>
              <ProjectCard
                key={activeProject.id}
                project={activeProject}
                direction={direction}
                onOpenScreenshots={() => setScreenshotProject(activeProject)}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* ── Controls bar ── */}
        <div className="flex items-center justify-between mt-8 px-1">

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {projects.map((p, i) => (
              <button key={p.id} onClick={() => goTo(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === activeIndex ? '2rem' : '0.5rem',
                  height: '0.5rem',
                  background: i === activeIndex
                    ? 'linear-gradient(to right, #c084fc, #22d3ee)'   // purple-400 → cyan-400 ✅
                    : 'rgba(255,255,255,0.15)',
                  boxShadow: i === activeIndex ? '0 0 10px rgba(192,132,252,0.6)' : 'none',
                }}
              />
            ))}
          </div>

          {/* Counter + arrows */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-white/30 tracking-widest tabular-nums">
              <span className="text-purple-400">{String(activeIndex + 1).padStart(2, '0')}</span>
              <span className="mx-1 opacity-40">/</span>
              {String(total).padStart(2, '0')}
            </span>

            <div className="flex items-center gap-2">
              <motion.button
                onClick={prev}
                whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-purple-500/25 bg-purple-500/5 text-white hover:bg-purple-500/15 transition-colors"
              >
                <ChevronLeftIcon />
              </motion.button>
              <motion.button
                onClick={next}
                whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
                className="w-10 h-10 flex items-center justify-center rounded-full text-white transition-all"
                style={{
                  background: 'linear-gradient(135deg, #c084fc, #22d3ee)',   // purple-400 → cyan-400 ✅
                  boxShadow: '0 0 20px rgba(192,132,252,0.35)',               // purple-400 glow ✅
                  border: '1px solid rgba(192,132,252,0.3)',
                }}
              >
                <ChevronRightIcon />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Hint */}
        <p className="text-center font-mono text-[11px] text-purple-400/30 tracking-widest mt-5 animate-pulse">
          ✦ Click the image to view screenshots · Use arrows to browse projects
        </p>
      </motion.div>

      {/* ── Screenshot modal ── */}
      <AnimatePresence>
        {screenshotProject && (
          <ScreenshotModal
            project={screenshotProject}
            onClose={() => setScreenshotProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Project