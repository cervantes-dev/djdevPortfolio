import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import '@fontsource/jetbrains-mono/800.css';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import Logo from './ui/Logo';

const navLinks = [
    { label: "ABOUT", href: "#about", id: "about" },
    { label: "SERVICES", href: "#services", id: "services" },
    { label: "SKILLS", href: "#skills", id: "skills" },
    { label: "EXPERIENCE", href: "#experience", id: "experience" },
    { label: "PROJECT", href: "#project", id: "project" },
    { label: "CONTACT", href: "#contact", id: "contact" },
];

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const observers = [];
        navLinks.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (!el) return;
            const observer = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
                { rootMargin: "-20% 0px -50% 0px", threshold: 0 }
            );
            observer.observe(el);
            observers.push(observer);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    return (
        <>
            {/* ── Header bar ─────────────────────────────────────── */}
            <header
                className={`
                    fixed top-0 left-0 right-0 z-50
                    flex justify-between items-center
                    py-3 px-4 lg:px-20
                    transition-all duration-300
                    ${menuOpen
                        // When menu is open, always use a consistent dark background
                        // so the bar looks the same regardless of scroll position
                        ? "bg-black/90 backdrop-blur-md"
                        : scrolled
                            ? "bg-black/60 backdrop-blur-md shadow-[0_1px_0_rgba(255,140,0,0.15)]"
                            : "bg-transparent"
                    }
                `}
            >
                {/* Logo — always on top */}
                <a href="#" className="inline-block relative z-50">
                    <Logo className="w-48 h-auto" />
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map(({ label, href, id }) => {
                        const isActive = activeSection === id;
                        return (
                            <a
                                key={label}
                                href={href}
                                className={`
                                    relative font-mono text-xs tracking-widest
                                    transition-colors duration-300
                                    after:absolute after:left-0 after:-bottom-1 after:h-px
                                    after:bg-gradient-to-r after:from-[#ff8a00] after:via-[#ff4d00] after:to-[#ff0040]
                                    after:transition-all after:duration-300
                                    ${isActive
                                        ? "bg-gradient-to-r from-[#ff8a00] via-[#ff4d00] to-[#ff0040] bg-clip-text text-transparent after:w-full"
                                        : "text-gray-300 hover:text-[#ff8a00] after:w-0 hover:after:w-full"
                                    }
                                `}
                            >
                                {label}
                            </a>
                        );
                    })}
                </nav>

                {/* Hamburger toggle — always on top of overlay */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden relative z-50 p-2 text-gray-300 hover:text-[#ff8a00] transition-colors"
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>

            {/* ── Mobile overlay — rendered as a sibling, NOT inside the header ── */}
            {/*
                Key fix: the overlay is now a sibling <div> to <header>, not nested
                inside it. This means it gets its own stacking context at z-40 in the
                document root, so it correctly covers all page content (z-10) while
                staying below the header bar (z-50).
            */}
            <div
                className={`
                    fixed inset-0 z-40 md:hidden
                    flex flex-col items-center justify-center gap-8
                    transition-opacity duration-300
                    ${menuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }
                `}
                style={{ background: 'rgba(0, 0, 0, 0.92)', backdropFilter: 'blur(16px)' }}
            >
                {/* Decorative glow blob */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#ff4d00]/20 rounded-full blur-3xl pointer-events-none" />

                {navLinks.map(({ label, href, id }, i) => {
                    const isActive = activeSection === id;
                    return (
                        <a
                            key={label}
                            href={href}
                            onClick={() => setMenuOpen(false)}
                            style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
                            className={`
                                relative font-mono text-2xl font-bold tracking-widest
                                transition-all duration-300
                                ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                                ${isActive
                                    ? "bg-gradient-to-r from-[#ff8a00] via-[#ff4d00] to-[#ff0040] bg-clip-text text-transparent"
                                    : "text-gray-400 hover:text-white"
                                }
                            `}
                        >
                            {label}
                            {isActive && (
                                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#ff4d00]" />
                            )}
                        </a>
                    );
                })}

                <div className="absolute bottom-10 w-16 h-px bg-gradient-to-r from-[#ff8a00] via-[#ff4d00] to-[#ff0040]" />
            </div>
        </>
    );
};

export default Header;