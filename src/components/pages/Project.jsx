import { useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useScrollDirection } from '../../hooks/useScrollDirection'

// ─── Real Project Data ────────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    type: 'web',
    images: [
      '/assets/project-showcase/capstone-project/landing_page.png',
    ],
    title: 'Laboratory Inventory & Borrowing System',
    label: 'Capstone Project',
    desc: 'A full-featured laboratory management system for tracking equipment inventory and managing student borrowing requests with real-time status updates.',
    tags: ['CodeIgniter', 'Bootstrap CSS', 'PHP', 'MySQL'],
    liveLink: '#',
    sourceLink: '#',
    year: '2024',
    accent: '#c084fc',
    gradFrom: 'rgba(192,132,252,0.18)',
    gradTo: 'rgba(34,211,238,0.06)',
  },
  {
    id: 2,
    type: 'mobile',
    images: [
      '/assets/project-showcase/tasa/1.png',
    ],
    title: 'TASA — Treasurer Assistant',
    label: 'Mobile Application',
    desc: 'A cross-platform mobile application built with React Native and Expo, enabling organization treasurers to manage funds, track transactions, and generate reports on iOS and Android.',
    tags: ['React Native', 'Expo', 'Tailwind CSS'],
    liveLink: null,
    sourceLink: '#',
    year: '2024',
    accent: '#a855f7',
    gradFrom: 'rgba(168,85,247,0.18)',
    gradTo: 'rgba(34,211,238,0.06)',
  },
]

// ─── Image Carousel ───────────────────────────────────────────────────────────
const ImageCarousel = ({ images, type, accent }) => {
  const [current, setCurrent] = useState(0)
  const isMobile = type === 'mobile'

  const prev = useCallback((e) => {
    e.stopPropagation()
    setCurrent((c) => (c - 1 + images.length) % images.length)
  }, [images.length])

  const next = useCallback((e) => {
    e.stopPropagation()
    setCurrent((c) => (c + 1) % images.length)
  }, [images.length])

  return (
    <div
      className={`relative flex-shrink-0 overflow-hidden bg-black/30 w-full ${
        isMobile ? 'lg:w-[190px] h-[260px] lg:h-full' : 'h-[200px] lg:h-full'
      }`}
      style={{ borderRadius: '8px' }}
    >
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`Screenshot ${current + 1}`}
          className={`absolute inset-0 w-full h-full ${
            isMobile ? 'object-contain p-3' : 'object-cover'
          }`}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        />
      </AnimatePresence>

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)' }}
      />

      {/* Nav arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/55 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/75 transition-all duration-150 z-10"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M6.5 1.5L3 5l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/55 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/75 transition-all duration-150 z-10"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M3.5 1.5L7 5l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {/* Dot strip */}
      {images.length > 1 && (
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1 z-10">
          {images.map((_, di) => (
            <button
              key={di}
              onClick={(e) => { e.stopPropagation(); setCurrent(di) }}
              style={{
                width: di === current ? 14 : 5,
                height: 4,
                borderRadius: 2,
                background: di === current ? accent : 'rgba(255,255,255,0.28)',
                transition: 'all 0.2s ease',
              }}
            />
          ))}
        </div>
      )}

      {/* Type badge */}
      <div
        className="absolute top-2 left-2 font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full border z-10"
        style={{
          borderColor: `${accent}55`,
          background: `${accent}20`,
          color: accent,
        }}
      >
        {type === 'mobile' ? '📱 Mobile' : '🌐 Web'}
      </div>

      {/* Counter */}
      <div className="absolute top-2 right-2 font-mono text-[9px] text-white/45 bg-black/40 px-1.5 py-0.5 rounded z-10">
        {current + 1}/{images.length}
      </div>
    </div>
  )
}

// ─── Project Card ─────────────────────────────────────────────────────────────
const ProjectCard = ({ project, index, scrollDir }) => {
  const isMobile = project.type === 'mobile'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: scrollDir === 'down' ? 30 : -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.22 } }}
      className="group relative flex flex-col overflow-hidden
        border border-purple-500/25
        hover:border-purple-400/50
        hover:shadow-[0_0_44px_rgba(192,132,252,0.13)]
        transition-all duration-300 cursor-default"
      style={{
        borderRadius: '4px 20px 4px 20px',
        background: `linear-gradient(135deg, ${project.gradFrom}, ${project.gradTo})`,
      }}
    >
      <div className={`flex flex-col ${isMobile ? 'lg:flex-row' : 'lg:flex-row'} gap-0`}>

        {/* ── Image Panel ── */}
        <div
          className={`flex-shrink-0 p-4 pb-0 lg:pb-4 lg:pr-0 ${
            isMobile ? 'lg:w-[200px]' : 'lg:w-[320px]'
          }`}
          style={{ minHeight: isMobile ? 280 : 'auto' }}
        >
          <ImageCarousel
            images={project.images}
            type={project.type}
            accent={project.accent}
          />
        </div>

        {/* ── Content Panel ── */}
        <div className="flex flex-col gap-3 p-5 lg:p-6 flex-1 min-w-0">

          {/* Top row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full border"
              style={{
                borderColor: `${project.accent}55`,
                background: `${project.accent}18`,
                color: project.accent,
              }}
            >
              {project.label}
            </span>
            <span className="font-mono text-[10px] text-gray-600 ml-auto">{project.year}</span>
          </div>

          {/* Title */}
          <h3 className="font-syne text-lg lg:text-xl font-extrabold text-white group-hover:text-purple-100 transition-colors duration-300 leading-tight">
            {project.title}
          </h3>

          {/* Description */}
          <p className="font-jakarta text-sm text-gray-400 leading-relaxed">
            {project.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
            {project.tags.map((tag, t) => (
              <span
                key={t}
                className="font-mono text-[10px] px-2.5 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 group-hover:border-purple-400/50 transition-all duration-200"
                style={{
                  background: 'linear-gradient(to right, #ff8a00, #ff4d00, #ff0040)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-full border transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  borderColor: `${project.accent}60`,
                  background: `${project.accent}15`,
                  color: project.accent,
                }}
              >
                {/* External link icon */}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 9L9 1M9 1H4M9 1V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Live Demo
              </a>
            )}
            {project.sourceLink && (
              <a
                href={project.sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 hover:border-purple-400/60 hover:text-white transition-all duration-200 hover:scale-105 active:scale-95"
              >
                {/* GitHub icon */}
                <svg width="11" height="11" viewBox="0 0 11 11" fill="currentColor">
                  <path d="M5.5 0.5C2.739 0.5 0.5 2.739 0.5 5.5c0 2.209 1.434 4.083 3.421 4.742.25.046.342-.108.342-.241v-.857c-1.391.303-1.684-.672-1.684-.672-.228-.578-.556-.732-.556-.732-.454-.311.035-.305.035-.305.502.035.766.516.766.516.446.764 1.168.543 1.453.415.045-.323.175-.543.318-.668-1.109-.126-2.274-.555-2.274-2.469 0-.545.195-.99.515-1.339-.052-.126-.223-.634.049-1.319 0 0 .42-.135 1.375.512.399-.111.827-.166 1.252-.168.425.002.853.057 1.253.168.955-.647 1.374-.512 1.374-.512.272.685.102 1.193.05 1.319.32.349.515.794.515 1.339 0 1.918-1.167 2.341-2.28 2.465.179.154.338.457.338.922v1.367c0 .133.091.288.344.239C9.068 9.581 10.5 7.707 10.5 5.5 10.5 2.739 8.261.5 5.5.5z" />
                </svg>
                Source
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Decorative corners ── */}
      <div
        className="absolute top-0 right-0 w-16 h-16 pointer-events-none transition-all duration-300"
        style={{ borderRadius: '0 20px 0 100%', background: `${project.accent}12` }}
      />
      <div
        className="absolute bottom-0 left-0 w-12 h-12 pointer-events-none transition-all duration-300"
        style={{ borderRadius: '100% 0 0 20px', background: 'rgba(255,138,0,0.07)' }}
      />

      {/* Bottom hover line */}
      <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-[#ff8a00]/0 via-[#ff4d00]/55 to-[#ff0040]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Left accent bar */}
      <div
        className="absolute left-0 top-6 bottom-6 w-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, ${project.accent}, ${project.accent}33)` }}
      />
    </motion.div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────
const Projects = () => {
  const sectionRef = useRef(null)
  const scrollDir = useScrollDirection()
  const [filter, setFilter] = useState('All')

  const filters = ['All', 'Web', 'Mobile']

  const filtered =
    filter === 'All'
      ? projects
      : projects.filter((p) => p.type === filter.toLowerCase())

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  })

  const titleY = useTransform(scrollYProgress, [0, 1], [40, 0])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  const fadeUp = (delay = 0) => ({
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: false },
    variants: {
      hidden: { opacity: 0, y: scrollDir === 'down' ? 24 : -24 },
      visible: { opacity: 1, y: 0 },
    },
    transition: { duration: 0.5, delay, ease: 'easeOut' },
  })

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="scroll-mt-20 w-full px-6 py-16 lg:px-20"
    >
      {/* ── Header ── */}
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="flex flex-col items-center text-center gap-4 mb-10"
      >
        <motion.span
          {...fadeUp(0)}
          className="w-fit font-mono text-xs font-semibold tracking-widest uppercase border border-purple-500/40 bg-purple-500/10 px-4 py-1.5 rounded-full"
        >
          <span className="bg-gradient-to-r from-[#ff8a00] via-[#ff4d00] to-[#ff0040] bg-clip-text text-transparent">
            Selected Work
          </span>
        </motion.span>

        <h2 className="font-syne text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
          <motion.span {...fadeUp(0.1)} className="text-white block">
            Projects That
          </motion.span>
          <motion.span
            {...fadeUp(0.22)}
            className="bg-gradient-to-r from-[#ff8a00] via-[#ff4d00] to-[#ff0040] bg-clip-text text-transparent block"
          >
            Ship & Scale
          </motion.span>
        </h2>

        <motion.p
          {...fadeUp(0.35)}
          className="font-jakarta text-sm text-gray-400 max-w-md"
        >
          Real products. Real users. Built from the ground up — solo or as the lead engineer.
        </motion.p>
      </motion.div>

      {/* ── Filter Pills ── */}
      <motion.div
        {...fadeUp(0.45)}
        className="flex flex-wrap justify-center gap-2 mb-12"
      >
        {filters.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`font-mono text-[11px] tracking-wider uppercase px-4 py-1.5 rounded-full border transition-all duration-200 ${
              filter === cat
                ? 'border-purple-400/70 bg-purple-500/20 text-white'
                : 'border-purple-500/20 bg-transparent text-gray-500 hover:border-purple-500/40 hover:text-gray-300'
            }`}
          >
            {cat === 'All' ? '✦ All' : cat === 'Web' ? '🌐 Web' : '📱 Mobile'}
          </button>
        ))}
      </motion.div>

      {/* ── Cards ── */}
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              scrollDir={scrollDir}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* ── Footer CTA ── */}
      <motion.div
        {...fadeUp(0.2)}
        className="flex justify-center mt-14"
      >
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative font-mono text-xs tracking-widest uppercase px-8 py-3.5 border border-purple-500/40 bg-purple-500/10 hover:border-purple-400/70 hover:bg-purple-500/15 transition-all duration-300 overflow-hidden"
          style={{ borderRadius: '4px 16px 4px 16px' }}
        >
          <span
            style={{
              background: 'linear-gradient(to right, #ff8a00, #ff4d00, #ff0040)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            View All on GitHub →
          </span>
          <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-[#ff8a00]/0 via-[#ff4d00]/60 to-[#ff0040]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </a>
      </motion.div>
    </section>
  )
}

export default Projects