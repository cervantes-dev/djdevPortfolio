import '@fontsource/jetbrains-mono/800.css'

const Logo = ({ className = "" }) => {
    return (
        <div className={`flex items-center gap-2 whitespace-nowrap ${className}`}>
            {/* Logo Image */}
            <img
                src="assets/logo/logo.png"
                alt="Logo"
                className="w-8 h-8 object-contain"
            />

            {/* DJ DEVS Text */}
            <span
                className="text-xl font-extrabold tracking-wider 
                bg-gradient-to-r from-purple-400 via-[#a855f7] to-cyan-400 
                bg-clip-text text-transparent"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
                DJ DEVS
            </span>
        </div>
    )
}

export default Logo