import { useEffect } from "react"

export default function useShowcaseMotion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    const press = (event: PointerEvent) => {
      if (
        reduced.matches ||
        !(event.target instanceof Element) ||
        !event.target.closest("button, a")
      )
        return
      const wave = document.createElement("span")
      wave.className = "click-wave"
      wave.style.left = `${event.clientX}px`
      wave.style.top = `${event.clientY}px`
      document.body.append(wave)
      wave.addEventListener("animationend", () => wave.remove(), { once: true })
    }
    document.addEventListener("pointerdown", press, { passive: true })
    return () => {
      document.removeEventListener("pointerdown", press)
      document.querySelectorAll(".click-wave").forEach((el) => el.remove())
    }
  }, [])
}
