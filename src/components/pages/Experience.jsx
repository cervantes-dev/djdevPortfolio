import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollDirection } from '../../hooks/useScrollDirection'

const experiences = [
    {
        role: "Freelance Web & Mobile Developer",
        company: "Freelance",
        date: "2026 - Present",
        desc: "Designing and building responsive web applications and cross-platform mobile apps for clients across different industries. Delivering pixel-perfect UIs, smooth animations, and seamless user experiences on both web and mobile platforms.",
        tags: ["React", "React Native", "Expo", "Tailwind CSS", "Framer Motion", "TypeScript"]
    },
    {
        role: "IT Staff — QGIS Mapper & Systems Developer",
        company: "LGU Malitbog, Southern Leyte",
        date: "2025",
        desc: "Handled geospatial mapping using QGIS and Google Earth to support local government operations. Designed and developed the TUPAD Information System — a full-stack web application built with Laravel and Bootstrap CSS to manage and streamline TUPAD beneficiary data for the municipality.",
        tags: ["QGIS", "Google Earth", "Laravel", "Bootstrap CSS", "PHP", "MySQL"]
    },
    {
        role: "Junior Web Developer Intern",
        company: "CDL Innovative IT Solutions",
        date: "2024",
        desc: "Built and maintained a full-featured Booking System as the primary project. Also handled basic SEO strategies to improve client search rankings and conducted social media data mining to support digital marketing efforts.",
        tags: ["HTML", "CSS", "JavaScript", "PHP", "Laravel", "SEO", "Data Mining"]
    },
]

function ExperienceCard({ exp, i, scrollDir }) {
    const isLeft = i % 2 === 0
    const cardRef = useRef(null)

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [60, -60])
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.97])
    const dotGlow = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0])

    return (
        <div
            ref={cardRef}
            className={`
                relative flex items-center
                pl-16 md:pl-0
                ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}
            `}
        >
            {/* DOT */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.15, type: 'spring', stiffness: 200 }}
                viewport={{ once: false }}
                style={{ boxShadow: dotGlow.get() > 0.5 ? '0 0 20px 6px rgba(192,132,252,0.8)' : 'none' }}
                className="
                    absolute left-6 md:left-1/2
                    -translate-x-1/2
                    w-4 h-4 rounded-full z-10
                    bg-linear-to-br from-purple-400 to-cyan-400
                    border-2 border-white/20
                    shadow-[0_0_16px_4px_rgba(192,132,252,0.7)]
                "
            />

            {/* CARD */}
            <motion.div
                initial={{
                    opacity: 0,
                    x: isLeft ? -60 : 60,
                    y: scrollDir === "down" ? 20 : -20
                }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: false }}
                style={{ y, scale }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className={`
                    group
                    w-full md:w-[45%]
                    p-6 rounded-2xl
                    border border-purple-500/40
                    bg-purple-500/5 backdrop-blur-sm
                    hover:border-purple-400/70
                    hover:bg-purple-500/10
                    hover:shadow-[0_0_30px_rgba(192,132,252,0.15)]
                    transition-all duration-300
                    ${isLeft ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'}
                `}
            >
                {/* Mobile date */}
                <span className="font-mono inline-block text-xs text-purple-400 font-medium mb-3 md:hidden">
                    {exp.date}
                </span>

                {/* Role */}
                <h3 className="font-syne text-xl font-bold text-white group-hover:text-purple-100 transition-colors duration-300">
                    {exp.role}
                </h3>

                {/* Company + Date */}
                <p className="font-jakarta text-sm mt-1 font-medium bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {exp.company}
                    <span className="hidden md:inline font-mono"> • {exp.date}</span>
                </p>

                {/* Divider */}
                <div className="w-full h-px bg-purple-500/20 my-4" />

                {/* Description */}
                <p className="font-jakarta text-gray-400 text-sm leading-relaxed">
                    {exp.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {exp.tags.map((tag, t) => (
                        <span
                            key={t}
                            className="font-mono text-xs px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 hover:border-purple-400/60 hover:bg-purple-500/20 transition-all duration-200"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}

export default function Experience() {
    const sectionRef = useRef(null)
    const timelineRef = useRef(null)  // ← separate ref for the cards container
    const scrollDir = useScrollDirection()

    // Title scroll animation
    const { scrollYProgress: titleProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "center center"]
    })
    const titleY = useTransform(titleProgress, [0, 1], [40, 0])
    const titleOpacity = useTransform(titleProgress, [0, 0.5], [0, 1])

    // ── Live line — tracks scroll through the cards only ──
    const { scrollYProgress: lineProgress } = useScroll({
        target: timelineRef,
        offset: ["start center", "end center"]  // grows as you scroll through cards
    })
    const lineScaleY = useTransform(lineProgress, [0, 1], [0, 1])
    const dotTop = useTransform(lineProgress, [0, 1], ["0%", "100%"])  // traveling dot

    // Scroll-direction-aware fadeUp helper
    const fadeUp = (delay = 0) => ({
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: false },
        variants: {
            hidden: { opacity: 0, y: scrollDir === "down" ? 24 : -24 },
            visible: { opacity: 1, y: 0 }
        },
        transition: { duration: 0.5, delay, ease: "easeOut" }
    })

    return (
        <section ref={sectionRef} id="experience" className="scroll-mt-20 px-4">

            {/* ── Title ── */}
            <motion.div
                style={{ y: titleY, opacity: titleOpacity }}
                className="flex flex-col items-center text-center gap-4 mb-20"
            >
                {/* Pill label */}
                <motion.span
                    {...fadeUp(0)}
                    className="w-fit font-mono text-xs font-semibold tracking-widest uppercase border border-purple-500/40 bg-purple-500/10 px-4 py-1.5 rounded-full"
                >
                    <span className="bg-linear-to-r from-[#ff8a00] via-[#ff4d00] to-[#ff0040] bg-clip-text text-transparent">
                        experience
                    </span>
                </motion.span>

                {/* Big title — staggered */}
                <h2 className="font-syne text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                    <motion.span {...fadeUp(0.1)} className="text-white block">
                        My Journey
                    </motion.span>
                    <motion.span {...fadeUp(0.22)} className="bg-linear-to-r from-[#ff8a00] via-[#ff4d00] to-[#ff0040] bg-clip-text text-transparent block">
                        So Far
                    </motion.span>
                </h2>

                {/* Subtitle */}
                <motion.p {...fadeUp(0.35)} className="font-jakarta text-gray-400 text-sm max-w-md">
                    A timeline of roles, projects, and lessons that shaped who I am as a developer.
                </motion.p>
            </motion.div>

            {/* ── Timeline container — has its own ref for line tracking ── */}
            <div ref={timelineRef} className="max-w-4xl mx-auto relative">

                {/* Track — dim static background line */}
                <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/5" />

                {/* Live line — grows with scroll */}
                <motion.div
                    style={{
                        scaleY: lineScaleY,
                        transformOrigin: 'top',
                        background: 'linear-gradient(to bottom, #c084fc, #a855f7, #22d3ee)',
                    }}
                    className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px"
                />

                {/* Traveling glowing dot — follows the line tip */}
                <motion.div
                    style={{ top: dotTop }}
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full z-20 bg-cyan-400 shadow-[0_0_12px_5px_rgba(34,211,238,0.8)]"
                />

                <div className="space-y-8">
                    {experiences.map((exp, i) => (
                        <ExperienceCard key={i} exp={exp} i={i} scrollDir={scrollDir} />
                    ))}
                </div>

            </div>
        </section>
    )
}