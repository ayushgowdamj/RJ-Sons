import { useCallback, useEffect, useState } from "react"
import ClothCurtain from "./ClothCurtain"

const slides = [
  {
    name: "Sarees",
    eyebrow: "A CELEBRATION OF INDIAN TEXTILES",
    line: "Woven with soul.",
    italic: "Worn with pride.",
    image: "/images/gulmohar.jpg",
    alt: "Aubergine silk saree with a rich antique-gold border",
    text: "Extraordinary sarees. Thoughtful details. A little heritage, made for your most beautiful moments.",
    href: "#collections",
    action: "Explore our sarees",
  },
  {
    name: "Dhotis",
    eyebrow: "TRADITION, IN ITS PUREST FORM",
    line: "Quietly classic.",
    italic: "Entirely yours.",
    image: "/images/dhoti-everyday.jpg",
    alt: "White dhoti with a traditional green border",
    text: "From crisp cotton whites to ceremonial gold borders. Discover dhoti manufacturing with the same attention to every thread.",
    href: "#dhotis",
    action: "Discover our dhotis",
  },
  {
    name: "Made for you",
    eyebrow: "YOUR IMAGINATION. OUR CRAFT.",
    line: "A thought.",
    italic: "A beautiful drape.",
    image: "/images/silk.jpg",
    alt: "Red and gold saree, inspiration for a custom design",
    text: "Your palette. Your pattern. Your finishing touch. Bring your saree, dhoti, or retail manufacturing idea to the makers.",
    href: "#custom",
    action: "Begin your design story",
  },
]

export default function ReferenceHero() {
  const [active, setActive] = useState(0)
  const [intro, setIntro] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )
  const finish = useCallback(() => setIntro(false), [])
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const change = () => {
      setReduced(media.matches)
      if (media.matches) finish()
    }
    media.addEventListener("change", change)
    return () => media.removeEventListener("change", change)
  }, [finish])
  const slide = slides[active]
  return (
    <section
      className={`cinema-hero cinema-hero--${active}`}
      id="home"
      aria-label="RJ SONS textile showcase"
    >
      <div className="cinema-backdrop" aria-hidden="true" />
      <div className="cinema-copy" key={`copy-${active}`}>
        <span className="cinema-eyebrow">{slide.eyebrow}</span>
        <h1>
          {slide.line}
          <br />
          <em>{slide.italic}</em>
        </h1>
        <p>{slide.text}</p>
        <a className="button button--ivory" href={slide.href}>
          {slide.action}
          <span aria-hidden="true">↗</span>
        </a>
        <span className="cinema-maker">
          SAREES &amp; DHOTIS · DIRECT FROM THE MAKERS
        </span>
      </div>
      <div className="cinema-image" key={`image-${active}`}>
        <img
          src={slide.image}
          alt={slide.alt}
          fetchPriority={active === 0 ? "high" : "auto"}
        />
        <span className="cinema-image-shade" />
      </div>
      <div className="heritage-seal" aria-hidden="true">
        <span>
          R<span>J</span>
        </span>
        <small>
          THREADS OF
          <br />
          TRADITION
        </small>
      </div>
      <div className="cinema-bottom">
        <div className="cinema-tabs" aria-label="Featured collection">
          {slides.map((item, index) => (
            <button
              key={item.name}
              aria-pressed={active === index}
              onClick={() => setActive(index)}
            >
              <span>0{index + 1}</span>
              {item.name}
            </button>
          ))}
        </div>
        {!reduced && (
          <button className="replay-reveal" onClick={() => setIntro(true)}>
            Replay fabric reveal <span aria-hidden="true">↻</span>
          </button>
        )}
      </div>
      {intro && (
        <div className="curtain-intro">
          <ClothCurtain onDone={finish} />
          <div className="curtain-wordmark">
            <span>
              RJ SONS<span>.</span>
            </span>
            <small>A TRADITION, UNFOLDING.</small>
          </div>
          <button className="curtain-skip" onClick={finish}>
            Skip introduction <span aria-hidden="true">↗</span>
          </button>
        </div>
      )}
    </section>
  )
}
