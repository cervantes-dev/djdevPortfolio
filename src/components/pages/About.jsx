import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Lanyard from '../ui/Lanyard'

const stats = [
    { value: "5+", label: "Projects Done" },
    { value: "2+", label: "Years Coding" },
    { value: "3+", label: "Happy Clients" },
]

const About = () => {
    const sectionRef = useRef(null)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "center center"]
    })

    const titleY = useTransform(scrollYProgress, [0, 1], [40, 0])
    const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

    return (
        <div id='about' className='w-full px-4 lg:px-20 py-16'>
            <section
                ref={sectionRef}
                className='
            scroll-mt-20
            w-full min-h-screen
            flex flex-col lg:flex-row justify-between items-center gap-8
            px-6 py-12 lg:px-14
            border border-[#763aba]/30
            rounded-3xl
            bg-[#763aba]/5
            backdrop-blur-sm
            overflow-hidden
            relative
        '
            >
                {/* Ambient glow background */}
                <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* ── Text Content ─────────────────────────────────────────── */}
                <motion.div
                    style={{ y: titleY, opacity: titleOpacity }}
                    className='flex flex-col gap-6 max-w-xl w-full lg:w-1/2 z-10'
                >
                    {/* Pill Label — first to appear */}
                    <motion.span
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0, ease: "easeOut" }}
                        viewport={{ once: false }}
                        className='w-fit font-mono text-xs font-semibold tracking-widest uppercase border border-purple-500/40 bg-purple-500/10 px-4 py-1.5 rounded-full'
                    >
                        <span className='bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent'>
                            about me
                        </span>
                    </motion.span>

                    {/* Heading — staggered lines */}
                    <h1 className='font-syne text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight'>
                        <motion.span
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                            viewport={{ once: false }}
                            className='text-white block'
                        >
                            More Than
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.22, ease: "easeOut" }}
                            viewport={{ once: false }}
                            className='bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent block'
                        >
                            Just a Developer
                        </motion.span>
                    </h1>

                    {/* Description — follows heading */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
                        viewport={{ once: false }}
                        className='font-jakarta text-base sm:text-lg text-gray-400 leading-relaxed tracking-wide'
                    >
                        I'm a full-stack web and mobile app developer specializing in solutions
                        for small businesses and school projects. I build responsive, high-quality
                        websites and mobile apps using{' '}
                        <span className='font-jakarta font-medium text-white'>Laravel</span> and{' '}
                        <span className='font-jakarta font-medium text-white'>React Native</span>, with end-to-end
                        project management and clear, consistent communication.
                    </motion.p>

                    {/* Divider — fades in after description */}
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
                        viewport={{ once: false }}
                        style={{ originX: 0 }}
                        className="w-full h-px bg-purple-500/20"
                    />

                    {/* Education card — slides up after divider */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                        viewport={{ once: false }}
                        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                        className='flex flex-col gap-2 p-4 rounded-2xl border border-purple-500/30 bg-purple-500/5 hover:border-purple-400/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300 cursor-default'
                    >
                        {/* Education Label */}
                        <div className='flex items-center gap-2'>
                            <span className='text-base'>🎓</span>
                            <span className='font-mono text-xs font-semibold tracking-widest uppercase bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent'>
                                Education
                            </span>
                        </div>

                        {/* Degree */}
                        <h4 className='font-jakarta text-white font-bold text-sm leading-snug'>
                            Bachelor of Science in Information Technology
                            <span className='font-jakarta text-purple-400 font-normal'> — Programming</span>
                        </h4>

                        {/* School */}
                        <p className='font-jakarta text-gray-400 text-sm'>
                            Southern Leyte State University
                        </p>

                        {/* Year + Honor */}
                        <div className='flex items-center gap-3 mt-1 flex-wrap'>
                            <span className='font-mono text-xs text-gray-500'>Graduated 2024</span>
                            <span className='font-jakarta text-xs px-3 py-0.5 rounded-full border border-yellow-500/40 bg-yellow-500/10 text-yellow-300 font-semibold tracking-wide'>
                                🏅 Cum Laude
                            </span>
                        </div>
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
                        viewport={{ once: false }}
                        style={{ originX: 0 }}
                        className="w-full h-px bg-purple-500/20"
                    />

                    {/* Stats — staggered per card */}
                    <div className='grid grid-cols-3 gap-3'>
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.6 + i * 0.1, ease: "easeOut" }}
                                viewport={{ once: false }}
                                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                                className='
                                    flex flex-col items-center justify-center
                                    bg-purple-500/10 border border-purple-500/30
                                    backdrop-blur-sm rounded-2xl px-4 py-3
                                    hover:border-purple-400/60
                                    hover:bg-purple-500/15
                                    hover:shadow-[0_0_20px_rgba(192,132,252,0.2)]
                                    transition-all duration-300
                                    cursor-default
                                '
                            >
                                <span className='font-syne text-2xl font-bold bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent'>
                                    {stat.value}
                                </span>
                                <span className='font-jakarta text-xs text-gray-400 mt-1 tracking-wider text-center whitespace-nowrap'>
                                    {stat.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                </motion.div>

                {/* ── Lanyard Visual ───────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                    viewport={{ once: false }}
                    className='relative w-full lg:w-1/2 h-100 sm:h-125 lg:h-150'
                >
                    <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
                </motion.div>

            </section>
        </div>
    )
}

export default About