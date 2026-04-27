import { motion } from 'framer-motion'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// ─── Reusable stagger animation config ───────────────────────────────────────
const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }
})

const socials = [
  {
    label: 'Facebook',
    href: 'https://web.facebook.com/davidjohn.cervantes.5',
    path: "M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.5h-2.79V24C19.61 23.1 24 18.1 24 12.07z"
  },
  {
    label: 'TikTok',
    href: '#',
    path: "M19.59 6.69a4.83 4.83 0 0 1-4.83-4.83V0h-3.37v16.57a2.89 2.89 0 0 1-2.89 2.73 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V10.1a6.27 6.27 0 0 0-.79-.05 6.26 6.26 0 0 0-6.26 6.26 6.26 6.26 0 0 0 6.26 6.26 6.26 6.26 0 0 0 6.26-6.26V8.43a8.18 8.18 0 0 0 4.83 1.56V6.62a4.85 4.85 0 0 1 0-.07z"
  },
  {
    label: 'Instagram',
    href: '#',
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12c0-3.2.01-3.58.07-4.85C2.38 3.86 3.9 2.31 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24c3.26 0 3.67-.01 4.95-.07 4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95 0-3.26-.01-3.67-.07-4.95C23.73 2.71 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32A6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"
  },
  {
    label: 'LinkedIn',
    href: '#',
    path: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 .77 0 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z"
  },
  {
    label: 'GitHub',
    href: '#',
    path: "M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"
  },
]

const Hero = () => {
  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-between min-h-screen overflow-hidden">

      {/* ── Left: Text Content ──────────────────────────────────────────────── */}
      <div className="max-w-xl ml-[5%] z-10 mt-24 md:mt-0 lg:mt-0 px-4 lg:px-0">

        {/* Greeting */}
        <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-3">
          <span className="font-mono text-sm uppercase tracking-widest font-semibold">
            <span className="bg-gradient-to-r from-[#ff8a00] via-[#ff4d00] to-[#ff0040] bg-clip-text text-transparent">
              Hi!
            </span>{" "}
            <motion.span
              animate={{ rotate: [0, 20, -10, 20, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: "easeInOut",
              }}
              style={{ display: "inline-block", transformOrigin: "bottom right" }}
            >
              👋
            </motion.span>
          </span>
          {/* Animated accent line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-px bg-gradient-to-r from-purple-400 to-transparent"
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          {...fadeUp(0.2)}
          className="font-syne text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
        >
          I'm{" "}
          <span className="bg-gradient-to-r from-[#ff8a00] via-[#ff4d00] to-[#ff0040] bg-clip-text text-transparent">
            David
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.35)}
          className="font-jakarta text-base sm:text-lg text-gray-400 max-w-md mt-4 leading-relaxed"
        >
          Web Developer based in Southern Leyte, crafting{" "}
          <span className="font-jakarta font-medium text-gray-200">clean and modern</span> web experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div {...fadeUp(0.5)} className="flex flex-wrap gap-3 mt-7">

          {/* Primary */}
          <a
            href="#project"
            className="
              font-jakarta font-semibold
              px-7 py-2.5 rounded-full text-sm tracking-wider text-white
              bg-gradient-to-r from-[#ff8a00] via-[#ff4d00] to-[#ff0040]
              hover:brightness-110
              shadow-[0_0_20px_rgba(255,77,0,0.4)]
              hover:shadow-[0_0_30px_rgba(255,77,0,0.65)]
              transition-all duration-300
            "
          >
            View Work
          </a>

          {/* Secondary */}
          <a
            href="#contact"
            className="
              font-jakarta font-semibold
              px-7 py-2.5 rounded-full text-sm tracking-wider
              ring-1 ring-[#ff4d00]/70
              hover:ring-[#ff0040]/80
              hover:bg-[#ff4d00]/10
              hover:shadow-[0_0_16px_rgba(255,77,0,0.25)]
              transition-all duration-300
            "
          >
            <span className="bg-gradient-to-r from-[#ff8a00] via-[#ff4d00] to-[#ff0040] bg-clip-text text-transparent">
              Contact Me
            </span>
          </a>
        </motion.div>

        {/* Social Icons */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="social-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff2d55" />
              <stop offset="50%" stopColor="#ff4d00" />
              <stop offset="100%" stopColor="#ff0040" />
            </linearGradient>
          </defs>
        </svg>

        <motion.div {...fadeUp(0.65)} className="relative flex gap-3 mt-7">
          {socials.map(({ href, label, path }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="
                group p-2.5 rounded-full
                bg-white/5 border border-white/10
                hover:border-[#ff4d00]/60
                hover:bg-[#ff4d00]/10
                hover:shadow-[0_0_12px_rgba(255,77,0,0.3)]
                transition-all duration-300
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                className="transition-transform duration-300 group-hover:scale-110"
                className="transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"
                style={{ opacity: 0.7 }}
              >
                <path fill="url(#social-grad)" d={path} />
              </svg>
            </a>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex items-center gap-2 mt-12 text-gray-600"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-px h-7 bg-gradient-to-b from-transparent to-gray-600"
          />
          <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
        </motion.div>

      </div>

      {/* ── Right: Lottie Animation ─────────────────────────────────────────── */}
      <div className="w-full lg:w-1/2 h-72 md:h-96 lg:h-full lg:min-h-screen flex items-center justify-center">
        <DotLottieReact
          src="/assets/animations/programming.json"
          loop
          autoplay
          style={{ width: '100%', height: '100%', background: 'transparent' }}
        />
      </div>

    </section>
  )
}

export default Hero