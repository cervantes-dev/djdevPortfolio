import '@fontsource/jetbrains-mono/800.css'

const Logo = ({ className = "" }) => {
    return (
        <div className={`flex items-center gap-2 whitespace-nowrap ${className}`}>
            <img
                src="/assets/logo/logo.png"
                alt="DJ Devs logo"
                className="w-8 h-8 object-contain"
            />
            <span
                className="text-xl font-extrabold tracking-wider
                    bg-gradient-to-r from-[#ff8a00] via-[#ff4d00] to-[#ff0040]
                    bg-clip-text text-transparent"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
                DJ DEVS
            </span>
        </div>
    )
}

export default Logo