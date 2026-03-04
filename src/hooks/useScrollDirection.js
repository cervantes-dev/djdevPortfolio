import { useState, useEffect } from 'react'

export const useScrollDirection = () => {
    const [scrollDir, setScrollDir] = useState("down")

    useEffect(() => {
        let lastY = window.scrollY

        const handler = () => {
            const currentY = window.scrollY
            setScrollDir(currentY > lastY ? "down" : "up")
            lastY = currentY
        }

        window.addEventListener("scroll", handler)
        return () => window.removeEventListener("scroll", handler)
    }, [])

    return scrollDir
}