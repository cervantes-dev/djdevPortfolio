import { useState, useEffect } from 'react';
import { Menu, X } from '@boxicons/react';
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

    // ── Scrolled state ──────────────────────────────────────────────────────
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
                ([entry]) => {
                    if (entry.isIntersecting) setActiveSection(id);
                },
                { rootMargin: "-20% 0px -50% 0px", threshold: 0 }
            );

            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    // ── Lock body scroll when mobile menu is open ───────────────────────────
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
    }, [menuOpen]);

    return (
        <header
            className={`
                fixed top-0 left-0 right-0 z-50
                flex justify-between items-center
                py-3 px-4 lg:px-20
                transition-all duration-300
                ${scrolled
                    ? "bg-black/60 backdrop-blur-md shadow-[0_1px_0_rgba(217,70,239,0.15)]"
                    : "bg-transparent"
                }
            `}
        >
            {/* Logo */}
            <a href="#" className="inline-block z-50">
                <Logo className="w-48 h-auto" />
            </a>

            {/* ── Desktop Nav ────────────────────────────────────────────────── */}
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
                                after:bg-linear-to-r after:from-[#d946ef] after:to-[#38bdf8]
                                after:transition-all after:duration-300
                                ${isActive
                                    ? "text-[#d946ef] after:w-full"
                                    : "text-gray-300 hover:text-[#d946ef] after:w-0 hover:after:w-full"
                                }
                            `}
                        >
                            {label}
                        </a>
                    );
                })}
            </nav>

            {/* Mobile Menu Toggle */}
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden z-50 p-2 text-gray-300 hover:text-[#d946ef] transition-colors"
                aria-label="Toggle menu"
            >
                {menuOpen ? <X size="24px" /> : <Menu size="24px" />}
            </button>

            {/* ── Mobile Nav Overlay ──────────────────────────────────────────── */}
            <div
                className={`
                    fixed inset-0 z-40 md:hidden
                    bg-black/80 backdrop-blur-md
                    flex flex-col items-center justify-center gap-8
                    transition-all duration-300
                    ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                `}
            >
                {/* Decorative glow blob */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#763aba]/20 rounded-full blur-3xl pointer-events-none" />

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
                                    ? "bg-linear-to-r from-[#d946ef] via-[#a855f7] to-[#38bdf8] bg-clip-text text-transparent"
                                    : "text-gray-400 hover:text-white"
                                }
                            `}
                        >
                            {label}
                            {/* Active dot indicator */}
                            {isActive && (
                                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#d946ef]" />
                            )}
                        </a>
                    );
                })}

                {/* Bottom accent line */}
                <div className="absolute bottom-10 w-16 h-px bg-linear-to-r from-[#d946ef] to-[#38bdf8]" />
            </div>

        </header>
    );
};

export default Header;