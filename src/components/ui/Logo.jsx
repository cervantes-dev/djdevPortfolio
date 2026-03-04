import '@fontsource/jetbrains-mono/800.css'

// Logo.jsx
const Logo = ({ className = "w-48 h-auto" }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 480 120"
            preserveAspectRatio="xMidYMid meet"
            className={className}
        >
            <defs>
                {/* Text gradient: purple-400 → cyan-400 */}
                <linearGradient
                    id="textGrad"
                    gradientUnits="userSpaceOnUse"
                    x1="108" y1="0"
                    x2="460" y2="0"
                >
                    <stop offset="0%"   stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>

                {/* Icon gradients */}
                <linearGradient id="iconGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="iconGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
                <linearGradient id="iconGrad3" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%"   stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
            </defs>

            {/* Left < bracket */}
            <g>
                <polygon points="14,25 26,25 50,57 38,57" fill="url(#iconGrad1)" />
                <polygon points="14,95 26,95 50,63 38,63" fill="url(#iconGrad1)" />
                <polygon points="26,25 32,19 56,51 50,57" fill="url(#iconGrad3)" />
                <polygon points="26,95 32,101 56,69 50,63" fill="url(#iconGrad2)" />
                <polygon points="38,57 50,57 50,63 38,63"  fill="url(#iconGrad2)" />
                <polygon points="14,25 14,95 26,95 26,25"  fill="url(#iconGrad3)" opacity="0.6" />
            </g>

            {/* Right > bracket */}
            <g>
                <polygon points="86,25 74,25 50,57 62,57" fill="url(#iconGrad1)" />
                <polygon points="86,95 74,95 50,63 62,63" fill="url(#iconGrad1)" />
                <polygon points="74,25 68,19 44,51 50,57" fill="url(#iconGrad3)" />
                <polygon points="74,95 68,101 44,69 50,63" fill="url(#iconGrad2)" />
                <polygon points="62,57 50,57 50,63 62,63"  fill="url(#iconGrad2)" />
                <polygon points="86,25 86,95 74,95 74,25"  fill="url(#iconGrad3)" opacity="0.6" />
            </g>

            {/* DJ DEVS text */}
            <text
                x="108"
                y="80"
                fontFamily="'JetBrains Mono', 'Courier New', monospace"
                fontSize="52"
                fontWeight="800"
                fill="url(#textGrad)"
                letterSpacing="2"
            >DJ DEVS</text>
        </svg>
    )
}

export default Logo