import type { CSSProperties } from "react"

const colours = [
  {
    name: "Wine",
    tone: "#782b41",
    image: "/images/gulmohar.jpg",
    subtitle: "Rich & expressive",
  },
  {
    name: "Green",
    tone: "#375743",
    image: "/images/everyday.jpg",
    subtitle: "Rooted in nature",
  },
  {
    name: "Gold",
    tone: "#b78a37",
    image: "/images/marigold.jpg",
    subtitle: "A festive glow",
  },
  {
    name: "Blue",
    tone: "#334a68",
    image: "/images/neelam.jpg",
    subtitle: "A quieter statement",
  },
  {
    name: "Pink",
    tone: "#bf8394",
    image: "/images/rose.jpg",
    subtitle: "A softer kind of story",
  },
  {
    name: "Ivory",
    tone: "#c7b68e",
    image: "/images/dhoti-gold.jpg",
    subtitle: "Timeless simplicity",
  },
]
export default function ColourGallery({
  onChoose,
}: {
  onChoose: (name: string) => void
}) {
  return (
    <section className="colour-world section" aria-labelledby="colour-title">
      <div className="colour-intro reveal reveal--left">
        <span className="eyebrow">EVERY SHADE TELLS A STORY</span>
        <h2 id="colour-title">
          Find your
          <br />
          <em>colour story.</em>
        </h2>
        <p>
          Jewel tones or gentle neutrals. Sarees or dhotis. Start with the shade
          that feels like you.
        </p>
        <span className="colour-hint">
          EXPLORE A SHADE <span aria-hidden="true">↗</span>
        </span>
      </div>
      <div className="colour-arches">
        {colours.map((item, index) => (
          <button
            className="colour-arch"
            style={
              {
                "--arch-tone": item.tone,
                "--arch-delay": `${index * 0.07}s`,
              } as CSSProperties
            }
            key={item.name}
            onClick={() => onChoose(item.name)}
            aria-label={`Explore ${item.name.toLowerCase()} designs`}
          >
            <img
              src={item.image}
              alt={`${item.name} textile inspiration`}
              loading="lazy"
            />
            <span className="arch-shade" />
            <span className="arch-name">
              {item.name}
              <small>{item.subtitle}</small>
            </span>
            <span className="arch-dot" />
          </button>
        ))}
      </div>
    </section>
  )
}
