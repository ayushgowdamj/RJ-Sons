import { useEffect, useRef, useState, type CSSProperties } from "react"

const palettes = [
  { name: "Gulmohar wine", base: "#702c43", light: "#b77388", dark: "#351722" },
  { name: "Temple ivory", base: "#ded4b7", light: "#fff9e6", dark: "#a89b77" },
  { name: "Forest green", base: "#32564c", light: "#6b9986", dark: "#172f2a" },
  { name: "Marigold gold", base: "#b8852f", light: "#f0cd72", dark: "#72501f" },
]

export default function FabricStudio() {
  const [palette, setPalette] = useState(0)
  const [angle, setAngle] = useState(-18)
  const [playing, setPlaying] = useState(true)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  const color = palettes[palette]
  const style = {
    "--cloth-base": color.base,
    "--cloth-light": color.light,
    "--cloth-dark": color.dark,
    "--cloth-angle": `${angle}deg`,
  } as CSSProperties
  return (
    <section
      className="fabric-studio section"
      aria-labelledby="fabric-title"
      ref={ref}
    >
      <div className="studio-copy reveal reveal--left">
        <span className="eyebrow">A LITTLE COLOUR. A WHOLE NEW FEELING.</span>
        <h2 id="fabric-title">
          Watch the light.
          <br />
          <em>Feel the possibility.</em>
        </h2>
        <p>
          Rich wine or quiet ivory? A fabric tells a different story in every
          shade. Explore a little of that magic in our interactive fabric study.
        </p>
        <div className="studio-palette" role="group" aria-label="Fabric colour">
          {palettes.map((item, index) => (
            <button
              key={item.name}
              aria-label={item.name}
              aria-pressed={palette === index}
              style={{ background: item.base }}
              onClick={() => setPalette(index)}
            />
          ))}
        </div>
        <span className="studio-color-name" aria-live="polite">
          {color.name}
        </span>
        <p className="studio-disclaimer">
          An artistic 3D study, not a fabric simulation or exact colour match.
          Ask us about real fabric and border options for sarees and dhotis.
        </p>
      </div>
      <div
        className={`fabric-stage ${
          visible && playing ? "fabric-stage--playing" : ""
        }`}
        style={style}
      >
        <span className="stage-label">
          THE COLOUR ATELIER <span>01 / INTERACTIVE STUDY</span>
        </span>
        <div className="fabric-orbit" aria-hidden="true" />
        <div className="cloth-perspective" aria-hidden="true">
          <div className="cloth-float">
            <div className="cloth-rotation">
              <div className="cloth">
                {Array.from({ length: 9 }, (_, index) => (
                  <span
                    className="cloth-pleat"
                    key={index}
                    style={{ "--pleat-index": index } as CSSProperties}
                  />
                ))}
                <span className="cloth-border cloth-border--top" />
                <span className="cloth-border cloth-border--bottom" />
                <span className="cloth-label">RJ SONS</span>
              </div>
            </div>
          </div>
        </div>
        <div className="stage-controls">
          <label>
            ROTATE THE DRAPE{" "}
            <input
              type="range"
              aria-label="Fabric angle"
              min="-45"
              max="45"
              value={angle}
              onChange={(e) => {
                setAngle(Number(e.target.value))
                setPlaying(false)
              }}
            />
          </label>
          <button aria-pressed={playing} onClick={() => setPlaying(!playing)}>
            {playing ? "Pause motion" : "Play motion"}{" "}
            <span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span>
          </button>
        </div>
      </div>
    </section>
  )
}
