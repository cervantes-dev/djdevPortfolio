import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollDirection } from '../../hooks/useScrollDirection'

const services = [
    {
        icon: "🌐",
        title: "Web Development",
        desc: "Building responsive, modern websites and web apps with clean code and smooth user experiences using React and Laravel.",
        tags: ["React", "Laravel", "Tailwind CSS", "MySQL"],
    },
    {
        icon: "📱",
        title: "Mobile App Development",
        desc: "Cross-platform mobile apps for Android and iOS using React Native and Expo — fast, smooth, and pixel-perfect.",
        tags: ["React Native", "Expo", "TypeScript"],
    },
    {
        icon: "🎨",
        title: "UI/UX Design",
        desc: "Crafting clean, modern interfaces with great attention to detail — from wireframes to fully animated, production-ready UIs.",
        tags: ["Figma", "Framer Motion", "Tailwind CSS"],
    },
    {
        icon: "🗄️",
        title: "Backend & Database",
        desc: "Designing and building solid backends with RESTful APIs, authentication, and optimized database architecture.",
        tags: ["Laravel", "PHP", "MySQL", "REST API"],
    },
    {
        icon: "🗺️",
        title: "GIS & Mapping Systems",
        desc: "Geospatial data mapping and visualization using QGIS and Google Earth for government and field operations.",
        tags: ["QGIS", "Google Earth", "Geospatial"],
    },
    {
        icon: "🔍",
        title: "SEO & Digital Strategy",
        desc: "Improving search rankings and online visibility through technical SEO, content strategy, and data-driven insights.",
        tags: ["SEO", "Analytics", "Data Mining"],
    },
]

const Services = () => {
    const sectionRef = useRef(null)
    const scrollDir = useScrollDirection()

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "center center"]
    })

    const titleY = useTransform(scrollYProgress, [0, 1], [40, 0])
    const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

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
        <section
            ref={sectionRef}
            id="services"
            className="scroll-mt-20 w-full px-6 py-16 lg:px-20"
        >
            {/* ── Header ── */}
            <motion.div
                style={{ y: titleY, opacity: titleOpacity }}
                className="flex flex-col items-center text-center gap-4 mb-16"
            >
                {/* Pill */}
                <motion.span
                    {...fadeUp(0)}
                    className="w-fit font-mono text-xs font-semibold tracking-widest uppercase border border-purple-500/40 bg-purple-500/10 px-4 py-1.5 rounded-full"
                >
                    <span className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        What I Offer
                    </span>
                </motion.span>

                {/* Title */}
                <h2 className="font-syne text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                    <motion.span {...fadeUp(0.1)} className="text-white block">
                        Services That
                    </motion.span>
                    <motion.span
                        {...fadeUp(0.22)}
                        className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent block"
                    >
                        Make an Impact
                    </motion.span>
                </h2>

                {/* Subtitle */}
                <motion.p
                    {...fadeUp(0.35)}
                    className="font-jakarta text-sm text-gray-400 max-w-md"
                >
                    From concept to deployment — I build solutions that are fast, scalable, and built to last.
                </motion.p>
            </motion.div>

            {/* ── Cards Grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {services.map((service, i) => (
                    <motion.div
                        key={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false }}
                        variants={{
                            hidden: { opacity: 0, y: scrollDir === "down" ? 30 : -30 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                        whileHover={{ y: -6, transition: { duration: 0.25 } }}
                        className="group relative flex flex-col gap-4 p-6
                            bg-purple-500/5
                            border border-purple-500/30
                            hover:border-purple-400/60
                            hover:bg-purple-500/10
                            hover:shadow-[0_0_30px_rgba(192,132,252,0.15)]
                            transition-all duration-300
                            cursor-default
                        "
                        style={{ borderRadius: '4px 24px 4px 24px' }}
                    >
                        {/* Corner accent — top right */}
                        <div
                            className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 group-hover:bg-purple-400/15 transition-all duration-300"
                            style={{ borderRadius: '0 24px 0 100%' }}
                        />

                        {/* Corner accent — bottom left */}
                        <div
                            className="absolute bottom-0 left-0 w-12 h-12 bg-cyan-500/10 group-hover:bg-cyan-400/15 transition-all duration-300"
                            style={{ borderRadius: '100% 0 0 24px' }}
                        />

                        {/* Icon */}
                        <motion.div
                            whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
                            className="text-3xl w-fit z-10"
                        >
                            {service.icon}
                        </motion.div>

                        {/* Title */}
                        <h3 className="font-syne text-lg font-bold text-white group-hover:text-purple-100 transition-colors duration-300 z-10">
                            {service.title}
                        </h3>

                        {/* Description */}
                        <p className="font-jakarta text-sm text-gray-400 leading-relaxed z-10">
                            {service.desc}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-auto z-10">
                            {service.tags.map((tag, t) => (
                                <span
                                    key={t}
                                    className="font-mono text-[10px] px-2.5 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 group-hover:border-purple-400/50 transition-all duration-200"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Bottom gradient line — reveals on hover */}
                        <div className="absolute bottom-0 left-6 right-6 h-px bg-linear-to-r from-purple-400/0 via-purple-400/60 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default Services