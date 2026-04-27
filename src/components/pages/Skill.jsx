import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const skillList = [
    { src: "./assets/tech-logo/html-1.svg", alt: "HTML" },
    { src: "./assets/tech-logo/css-3.svg", alt: "CSS" },
    { src: "./assets/tech-logo/javascript-1.svg", alt: "JavaScript" },
    { src: "./assets/tech-logo/bootstrap-5-1.svg", alt: "Bootstrap" },
    { src: "./assets/tech-logo/tailwind-css-2.svg", alt: "Tailwind CSS" },
    { src: "./assets/tech-logo/php-6.svg", alt: "PHP" },
    { src: "./assets/tech-logo/laravel-2.svg", alt: "Laravel" },
    { src: "./assets/tech-logo/codeigniter-1.svg", alt: "CodeIgniter" },
    { src: "./assets/tech-logo/react-native-1.svg", alt: "React Native" },
    { src: "./assets/tech-logo/nodejs-icon.svg", alt: "Node JS" },
    { src: "./assets/tech-logo/phpmyadmin-logo.svg", alt: "phpMyAdmin" },
    { src: "./assets/tech-logo/mongodb-icon-2.svg", alt: "MongoDB" },
    { src: "./assets/tech-logo/vitejs.svg", alt: "Vite JS" },
    { src: "./assets/tech-logo/expo-1.svg", alt: "Expo" },
    { src: "./assets/tech-logo/github-icon-1.svg", alt: "Git Hub" },
    { src: "./assets/tech-logo/qgis-logo.svg", alt: "QGIS" },
    { src: "./assets/tech-logo/canva-wordmark-2.svg", alt: "Canva" },

]

const Skills = () => {
    const sectionRef = useRef(null)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "center center"]
    })

    const titleY = useTransform(scrollYProgress, [0, 1], [40, 0])
    const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

    return (
        <div className='w-full px-6 py-16 lg:px-20'>
            <section id='skills' ref={sectionRef} className='scroll-mt-20 flex flex-col items-center justify-center min-h-screen gap-12 px-4'>

                {/* ── Header ── */}
                <motion.div
                    style={{ y: titleY, opacity: titleOpacity }}
                    className='flex flex-col items-center gap-4 text-center'
                >
                    {/* Pill Label */}
                    <motion.span
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0, ease: "easeOut" }}
                        viewport={{ once: false }}
                        className='w-fit font-mono text-xs font-semibold tracking-widest uppercase border border-purple-500/40 bg-purple-500/10 px-4 py-1.5 rounded-full'
                    >
                        <span className='bg-linear-to-r from-[#ff8a00] via-[#ff4d00] to-[#ff0040] bg-clip-text text-transparent'>
                            My Skills
                        </span>
                    </motion.span>

                    {/* Title — staggered lines */}
                    <h2 className='font-syne text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight'>
                        <motion.span
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                            viewport={{ once: false }}
                            className='text-white block'
                        >
                            Tools &amp;
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.22, ease: "easeOut" }}
                            viewport={{ once: false }}
                            className='bg-linear-to-r from-[#ff8a00] via-[#ff4d00] to-[#ff0040] bg-clip-text text-transparent block'
                        >
                            Weapons of Choice
                        </motion.span>
                    </h2>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
                        viewport={{ once: false }}
                        className='font-jakarta text-sm text-gray-400 max-w-md tracking-wide'
                    >
                        Technologies and tools I use to bring ideas to life — from web to mobile.
                    </motion.p>
                </motion.div>

                {/* ── Grid ── */}
                <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 w-full max-w-3xl'>
                    {skillList.map((skill, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15, delay: i * 0.05 }}
                            viewport={{ once: false }}
                            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                            className='
                        group flex flex-col items-center justify-center gap-2
                        border border-purple-500/30 bg-purple-500/5
                        rounded-xl p-4
                        hover:border-purple-400/60
                        hover:bg-purple-500/10
                        hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]
                        transition-all duration-300
                        cursor-default
                    '
                        >
                            <img
                                src={skill.src}
                                alt={skill.alt}
                                className='w-10 h-10 object-contain'
                            />
                            <span className='font-mono text-[10px] text-gray-500 group-hover:text-purple-300 tracking-wider transition-colors duration-300'>
                                {skill.alt}
                            </span>
                        </motion.div>
                    ))}
                </div>

            </section>
        </div>
    )
}

export default Skills