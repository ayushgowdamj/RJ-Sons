import { useEffect, useRef, useState, type ReactNode } from "react"
import FabricStudio from "./FabricStudio"
import useShowcaseMotion from "./useShowcaseMotion"

type IconName = "arrow" | "search" | "close" | "menu" | "plus" | "check" | "thread" | "diamond" | "flower"
interface IconProps {
  name: IconName
  size?: number
}
function Icon({ name, size = 21 }: IconProps) {
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M4 12h15M13 6l6 6-6 6" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
    close: <path d="m5 5 14 14M19 5 5 19" />,
    menu: <path d="M3 7h18M3 16h18" />,
    plus: <path d="M12 5v14M5 12h14" />,
    check: <path d="m5 12 4 4L19 6" />,
    thread: (
      <>
        <path d="m6 3 12 18M18 3 6 21M4 8h16M4 16h16M8 3h8M8 21h8" />
      </>
    ),
    diamond: (
      <>
        <path d="m12 2 9 10-9 10L3 12 12 2Z" />
        <path d="M3 12h18M12 2l-4 10 4 10 4-10-4-10Z" />
      </>
    ),
    flower: (
      <>
        <path d="M12 11C2-1 0 14 10 13 0 20 15 27 13 15c9 10 16-5 2-4C25 2 10-2 12 11Z" />
        <circle cx="12" cy="13" r="2" />
      </>
    ),
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

const imageFiles: Record<string, string> = {
  "photo-1610030469983-98e550d6193c": "gulmohar",
  "photo-1597897569252-9df44c7de0db": "marigold",
  "photo-1693023656257-87c142566ad3": "neelam",
  "photo-1609748340041-f5d61e061ebc": "everyday",
  "photo-1705164454907-a04fe248f675": "silk",
  "photo-1692992193981-d3d92fabd9cb": "crepe",
  "photo-1588140686379-1b76a52103dc": "textile",
}
const photo = (id: string) => `/images/${imageFiles[id]}.jpg`
const heroImage = photo("photo-1610030469983-98e550d6193c")
type Category = "All collections" | "Pure silk" | "Crepe" | "Plain & timeless" | "Dhotis"
type Product = {
  id: number
  name: string
  category: Category
  color: string
  image: string
  tag: string
  swatches: string[]
  description?: string
}
const products: Product[] = [
  {
    id: 1,
    name: "The Gulmohar Silk",
    category: "Pure silk",
    color: "Aubergine · Antique gold",
    image: heroImage,
    tag: "SIGNATURE PIECE",
    swatches: ["#4c2546", "#a33037", "#42584b"],
  },
  {
    id: 2,
    name: "The Marigold Drape",
    category: "Pure silk",
    color: "Marigold · Crimson",
    image: photo("photo-1597897569252-9df44c7de0db"),
    tag: "FESTIVE FAVOURITE",
    swatches: ["#d3a943", "#9d3037", "#9d754a"],
  },
  {
    id: 3,
    name: "The Neelam Crepe",
    category: "Crepe",
    color: "Indigo · Sunlit yellow",
    image: photo("photo-1693023656257-87c142566ad3"),
    tag: "EFFORTLESS ELEGANCE",
    swatches: ["#354d6c", "#c79b43", "#7a575f"],
  },
  {
    id: 4,
    name: "The Everyday Muse",
    category: "Plain & timeless",
    color: "Ivory · Forest green",
    image: photo("photo-1609748340041-f5d61e061ebc"),
    tag: "LESS, BUT LOVELIER",
    swatches: ["#e5e1d2", "#3d5d4b", "#b77c75"],
  },
  {
    id: 5,
    name: "The Heritage Dhoti",
    category: "Dhotis",
    color: "Classic white · Forest border",
    image: "/images/dhoti-heritage.jpg",
    tag: "A NEW CHAPTER",
    swatches: ["#eeeadc", "#315448", "#aa8c50"],
    description:
      "The quiet confidence of a traditional dhoti. Explore clean whites, considered borders, and a drape that feels right for family gatherings, festive mornings, and meaningful ceremonies.",
  },
  {
    id: 6,
    name: "The Everyday Veshti",
    category: "Dhotis",
    color: "Soft white · Heritage green",
    image: "/images/dhoti-everyday.jpg",
    tag: "ROOTED IN TRADITION",
    swatches: ["#f0ecdf", "#3d5d4b", "#b5a57a"],
    description:
      "An everyday expression of heritage. Discuss the fabric feel, border width, and dimensions you prefer, whether for your own wardrobe or a retail manufacturing requirement.",
  },
  {
    id: 7,
    name: "The Gulabi Drape",
    category: "Plain & timeless",
    color: "Petal pink · Soft ivory",
    image: "/images/rose.jpg",
    tag: "THE SOFTER SIDE",
    swatches: ["#c9859b", "#eee6d8", "#ae9876"],
  },
  {
    id: 8,
    name: "The Garden Muse",
    category: "Crepe",
    color: "Meadow florals · Rose",
    image: "/images/floral.jpg",
    tag: "PATTERNS WITH PERSONALITY",
    swatches: ["#bb7185", "#e3bc88", "#78815c"],
  },
]
const categories: {
  name: Category
  title: string
  subtitle: string
  image: string
}[] = [
  {
    name: "Pure silk",
    title: "The silk edit",
    subtitle: "A little heritage. A lot of heart.",
    image: photo("photo-1705164454907-a04fe248f675"),
  },
  {
    name: "Crepe",
    title: "Grace in crepe",
    subtitle: "Light as air. Made to move.",
    image: photo("photo-1692992193981-d3d92fabd9cb"),
  },
  {
    name: "Plain & timeless",
    title: "Simply extraordinary",
    subtitle: "Understated. Never unnoticed.",
    image: photo("photo-1609748340041-f5d61e061ebc"),
  },
  {
    name: "Dhotis",
    title: "The dhoti chapter",
    subtitle: "Heritage, in its purest form.",
    image: "/images/dhoti-everyday.jpg",
  },
]
type Panel = "search" | "custom" | null

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={`brand ${footer ? "brand--footer" : ""}`}
      href="#home"
      aria-label="RJ SONS home"
    >
      <span>
        RJ SONS<span className="brand-dot">.</span>
      </span>
      <small>THE ART OF THE SAREE</small>
    </a>
  )
}

function Modal({
  title,
  children,
  close,
  wide = false,
}: {
  title: string
  children: ReactNode
  close: () => void
  wide?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const previous = document.activeElement as HTMLElement
    const original = document.body.style.overflow
    document.body.style.overflow = "hidden"
    ref.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "Tab" && ref.current) {
        const items = ref.current.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input,select,textarea,[tabindex="0"]',
        )
        const first = items[0],
          last = items[items.length - 1]
        if (
          e.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === ref.current)
        ) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = original
      window.removeEventListener("keydown", onKey)
      previous?.focus()
    }
  }, [close])
  return (
    <div className="modal-backdrop" onClick={close}>
      <div
        className={`modal ${wide ? "modal--wide" : ""}`}
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-heading">
          <h2>{title}</h2>
          <button
            className="icon-button"
            aria-label="Close dialog"
            onClick={close}
          >
            <Icon name="close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

function App() {
  useShowcaseMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const [category, setCategory] = useState<Category>("All collections")
  const [panel, setPanel] = useState<Panel>(null)
  const [selected, setSelected] = useState<Product | null>(null)
  const [query, setQuery] = useState("")
  const [briefReady, setBriefReady] = useState(false)
  const [zoomed, setZoomed] = useState(false)
  const [briefGarment, setBriefGarment] = useState("Saree")
  const [ribbonPaused, setRibbonPaused] = useState(false)
  const closeRef = useRef(() => {
    setPanel(null)
    setSelected(null)
    setZoomed(false)
  })
  const close = closeRef.current
  const filtered = products.filter(
    (p) => category === "All collections" || p.category === category,
  )
  const searchResults = products.filter((p) =>
    `${p.name} ${p.category} ${p.color}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        }),
      { threshold: 0.08 },
    )
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [category])
  useEffect(() => {
    setZoomed(false)
  }, [selected])
  const explore = (value: Category) => {
    setCategory(value)
    setMenuOpen(false)
    document.getElementById("favourites")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    })
  }
  const download = (text: string, filename: string) => {
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }))
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  return (
    <div className="site-shell">
      <div className="announcement">
        <span>Thoughtfully made. Beautifully yours.</span>
        <span>Direct from the makers, with love.</span>
        <span>
          Discover the RJ SONS difference <span aria-hidden="true">↗</span>
        </span>
      </div>
      <header className="header">
        <div className="header-inner">
          <button
            className="icon-button mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
          <Brand />
          <nav
            aria-label="Main navigation"
            className={menuOpen ? "navigation navigation--open" : "navigation"}
          >
            <a
              className="nav-active"
              href="#collections"
              onClick={() => setMenuOpen(false)}
            >
              Our collections <span className="tiny-chevron">⌄</span>
            </a>
            <button onClick={() => explore("Pure silk")}>Pure silk</button>
            <button onClick={() => explore("Crepe")}>Crepe</button>
            <button onClick={() => explore("Plain & timeless")}>
              Plain sarees
            </button>
            <a href="#dhotis" onClick={() => setMenuOpen(false)}>
              Dhotis <span className="nav-new">NEW</span>
            </a>
            <a href="#custom" onClick={() => setMenuOpen(false)}>
              Custom designs
            </a>
            <a href="#story" onClick={() => setMenuOpen(false)}>
              Our story
            </a>
          </nav>
          <div className="header-actions">
            <button
              className="icon-button"
              aria-label="Search collections"
              onClick={() => setPanel("search")}
            >
              <Icon name="search" />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="hero-copy-inner">
              <div className="eyebrow">
                <span className="short-line" /> WOVEN WITH LOVE. WORN WITH
                PRIDE.
              </div>
              <h1>
                Every thread,
                <br />a timeless
                <br />
                <em>story.</em>
              </h1>
              <p>
                Exquisite sarees. Timeless dhotis. Endless possibilities.
                <br className="desktop-break" /> Sarees made to be a part of
                your story.
              </p>
              <a className="button button--wine" href="#collections">
                Find your perfect drape <Icon name="arrow" size={19} />
              </a>
              <a className="hero-secondary" href="#custom">
                A saree as unique as you <span>↗</span>
              </a>
              <div className="hero-note">
                <Icon name="flower" size={25} />
                <span>From our looms to your most beautiful moments.</span>
              </div>
            </div>
            <span className="hero-watermark" aria-hidden="true">
              R
            </span>
          </div>
          <div className="hero-visual">
            <img
              src={heroImage}
              alt="Woman in an aubergine silk saree with an intricate gold border against a rich red backdrop"
              fetchPriority="high"
            />
            <div className="hero-photo-shade" />
            <div className="hero-edition">
              THE SIGNATURE COLLECTION<span>Tradition, reimagined.</span>
            </div>
            <div className="hero-photo-bottom">
              <span>
                THE GULMOHAR SILK
                <br />
                <small>Aubergine &amp; antique gold</small>
              </span>
              <button
                className="photo-link"
                aria-label="View the Gulmohar Silk saree"
                onClick={() => setSelected(products[0])}
              >
                <Icon name="arrow" />
              </button>
            </div>
            <div className="image-counter">
              <span>01</span>
              <i />
              <span>THE SILK EDIT</span>
            </div>
          </div>
        </section>

        <div className="promises">
          <div>
            <Icon name="thread" size={26} />
            <span>
              From the makers.<small>No middlemen. Just craftsmanship.</small>
            </span>
          </div>
          <div>
            <Icon name="diamond" size={26} />
            <span>
              Fabrics you&apos;ll fall for.
              <small>Beautiful to see. A joy to wear.</small>
            </span>
          </div>
          <div>
            <Icon name="flower" size={27} />
            <span>
              Made your way.
              <small>Your colours. Your design. Your saree.</small>
            </span>
          </div>
          <a href="#story">
            A little more about us <Icon name="arrow" size={17} />
          </a>
        </div>

        <div className="heritage-ribbon" aria-label="Our fabric world">
          <div
            className="ribbon-track"
            aria-hidden="true"
            style={{ animationPlayState: ribbonPaused ? "paused" : undefined }}
          >
            {[0, 1].map((n) => (
              <span className="ribbon-set" key={n}>
                PURE SILK <Icon name="flower" size={16} /> FLOWING CREPE{" "}
                <Icon name="flower" size={16} /> TIMELESS DHOTIS{" "}
                <Icon name="flower" size={16} /> CUSTOM CREATIONS{" "}
                <Icon name="flower" size={16} /> WOVEN WITH CARE{" "}
                <Icon name="flower" size={16} />
              </span>
            ))}
          </div>
          <button
            className="ribbon-pause"
            aria-label={
              ribbonPaused ? "Play fabric ribbon" : "Pause fabric ribbon"
            }
            aria-pressed={ribbonPaused}
            onClick={() => setRibbonPaused(!ribbonPaused)}
          >
            {ribbonPaused ? "▷" : "Ⅱ"}
          </button>
        </div>

        <section className="section collections" id="collections">
          <div className="section-heading reveal">
            <div>
              <span className="eyebrow">A DRAPE FOR EVERY SIDE OF YOU</span>
              <h2>
                Find your kind of <em>beautiful.</em>
              </h2>
            </div>
            <a
              className="text-link"
              href="#favourites"
              onClick={() => setCategory("All collections")}
            >
              Explore all collections <Icon name="arrow" size={18} />
            </a>
          </div>
          <div className="collection-grid">
            {categories.map((item, index) => (
              <button
                className={`collection-card reveal collection-card--${index}`}
                key={item.name}
                onClick={() => explore(item.name)}
              >
                <img
                  src={item.image}
                  alt={
                    item.name === "Dhotis"
                      ? "Man wearing a traditional white dhoti with a green border"
                      : `Woman wearing a saree from our ${item.name.toLowerCase()} inspiration edit`
                  }
                  loading="lazy"
                />
                <span className="collection-shade" />
                <span className="collection-number">
                  0{index + 1} / THE COLLECTIONS
                </span>
                <span className="collection-info">
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.subtitle}</small>
                  </span>
                  <span className="round-arrow">
                    <Icon name="arrow" />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section
          className="dhoti-feature"
          id="dhotis"
          aria-labelledby="dhoti-title"
        >
          <div className="dhoti-copy reveal reveal--left">
            <span className="eyebrow">INTRODUCING THE DHOTI COLLECTION</span>
            <h2 id="dhoti-title">
              Some traditions
              <br />
              never go <em>out of style.</em>
            </h2>
            <p>
              For the festive morning. The family photograph. The everyday
              ritual. Our dhoti manufacturing brings the same love of fabric and
              finishing to a different kind of drape.
            </p>
            <div className="dhoti-details">
              <div>
                <span>01</span>
                <p>
                  <strong>Classic whites &amp; ivory tones</strong>
                  <small>A clean, considered canvas for your style.</small>
                </p>
              </div>
              <div>
                <span>02</span>
                <p>
                  <strong>Borders with character</strong>
                  <small>Discuss understated edges or a festive accent.</small>
                </p>
              </div>
              <div>
                <span>03</span>
                <p>
                  <strong>Made around your requirements</strong>
                  <small>
                    Fabric, dimensions, and retail manufacturing enquiries.
                  </small>
                </p>
              </div>
            </div>
            <button
              className="button button--ivory"
              onClick={() => explore("Dhotis")}
            >
              Explore our dhotis <Icon name="arrow" size={18} />
            </button>
          </div>
          <button
            className="dhoti-portrait reveal reveal--right"
            aria-label="Discover the Everyday Veshti"
            onClick={() => setSelected(products[5])}
          >
            <img
              src="/images/dhoti-everyday.jpg"
              alt="Traditional white dhoti with a forest-green border, styled with a white shirt"
              loading="lazy"
            />
            <span className="dhoti-portrait-label">
              <span>
                THE HERITAGE EDIT<small>Simple. Rooted. Remarkable.</small>
              </span>
              <span className="round-arrow">
                <Icon name="arrow" />
              </span>
            </span>
          </button>
          <span className="dhoti-watermark" aria-hidden="true">
            Heritage
          </span>
        </section>

        <section className="section favourites" id="favourites">
          <div className="section-heading reveal">
            <div>
              <span className="eyebrow">SOME THINGS JUST FEEL SPECIAL</span>
              <h2>
                Love at first <em>drape.</em>
              </h2>
            </div>
            <span className="heading-aside">
              A glimpse of the fabrics and designs we manufacture.
            </span>
          </div>
          <div className="collection-tabs" aria-label="Filter collection">
            {([
              "All collections",
              "Pure silk",
              "Crepe",
              "Plain & timeless",
              "Dhotis",
            ] as Category[]).map((item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
            <span>{filtered.length} pieces to fall for</span>
          </div>
          <div className="product-grid" key={category}>
            {filtered.map((p) => (
              <article className="product-card" key={p.id}>
                <div className="product-image">
                  <button
                    className="product-image-button"
                    aria-label={`View ${p.name}`}
                    onClick={() => setSelected(p)}
                  >
                    <img
                      src={p.image}
                      alt={`${p.name}, ${p.color.toLowerCase()} ${
                        p.category === "Dhotis" ? "dhoti" : "saree"
                      } inspiration`}
                      loading="lazy"
                    />
                  </button>
                  <span className="product-tag">{p.tag}</span>
                  <button
                    className="design-preview"
                    onClick={() => setSelected(p)}
                  >
                    Explore design <Icon name="arrow" size={16} />
                  </button>
                </div>
                <div className="product-meta">
                  <span>{p.category}</span>
                  <div className="swatches" aria-label="Complementary palette">
                    {p.swatches.map((color) => (
                      <i key={color} style={{ background: color }} />
                    ))}
                  </div>
                </div>
                <button
                  className="product-title"
                  onClick={() => setSelected(p)}
                >
                  {p.name}
                </button>
                <div className="product-bottom">
                  <span>{p.color}</span>
                </div>
              </article>
            ))}
          </div>
          <p className="collection-footnote">
            A showcase of saree and dhoti styles and fabric possibilities.
            Photography is for inspiration; colours, patterns, and finishes can
            be discussed for your design.
          </p>
        </section>

        <FabricStudio />

        <section
          className="craft-section section"
          id="craft"
          aria-labelledby="craft-title"
        >
          <div className="section-heading reveal">
            <div>
              <span className="eyebrow">BEAUTY IS IN THE MAKING</span>
              <h2 id="craft-title">
                From a single thread
                <br />
                to <em>something meaningful.</em>
              </h2>
            </div>
            <p className="craft-intro">
              A closer look at the choices behind a beautiful drape. Every
              conversation starts with how you want the fabric to look, feel,
              and move.
            </p>
          </div>
          <div className="craft-grid">
            <div className="craft-visual reveal reveal--left">
              <img
                src="/images/loom.jpg"
                alt="A textile artisan working at a weaving loom"
                loading="lazy"
              />
              <span>
                THE WORLD OF TEXTILE CRAFT<small>Editorial inspiration</small>
              </span>
            </div>
            <div className="craft-steps">
              {[
                [
                  "Begin with the feeling",
                  "Light and flowing, rich and festive, or soft and understated. We help you explore the fabric direction for your saree or dhoti.",
                ],
                [
                  "Find the colour story",
                  "From confident jewel tones to quiet neutrals, consider the palette, pattern, and border together—not in isolation.",
                ],
                [
                  "Consider every detail",
                  "Discuss fabric selection, design direction, dimensions, and finishing. Small decisions make a drape feel personal.",
                ],
                [
                  "Create for your world",
                  "An individual design or a retail manufacturing enquiry: share the occasion, quantity, and timeline in your design brief.",
                ],
              ].map(([title, text], index) => (
                <article
                  className="craft-step reveal reveal--right"
                  key={title}
                >
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                  <Icon
                    name={
                      index === 0
                        ? "thread"
                        : index === 1
                          ? "flower"
                          : index === 2
                            ? "diamond"
                            : "check"
                    }
                    size={23}
                  />
                </article>
              ))}
            </div>
          </div>
          <div className="detail-strip reveal">
            <img
              src="/images/weave-detail.jpg"
              alt="Coloured yarn and woven fabric on a traditional wooden loom"
              loading="lazy"
            />
            <div>
              <span className="eyebrow">SAREES · DHOTIS · CUSTOM DESIGNS</span>
              <h3>
                Different drapes.
                <br />
                <em>The same attention to detail.</em>
              </h3>
              <p>
                Pure silk, crepe, chiffon, satin, georgette, and dhoti fabric
                options. Tell us what you have in mind; let&apos;s explore what
                can be made.
              </p>
              <a className="text-link" href="#custom">
                Start with your idea <Icon name="arrow" size={17} />
              </a>
            </div>
          </div>
        </section>

        <section className="custom-section" id="custom">
          <div className="custom-image">
            <img
              src={photo("photo-1588140686379-1b76a52103dc")}
              alt="Intricate woven patterns and rich colours in a traditional saree textile"
              loading="lazy"
            />
            <span className="custom-image-label">
              YOUR IMAGINATION. OUR CRAFT.
            </span>
          </div>
          <div className="custom-copy reveal">
            <span className="eyebrow">
              SAREES OR DHOTIS. BEAUTIFULLY PERSONAL.
            </span>
            <h2>
              You dream it.
              <br />
              We <em>weave</em> it.
            </h2>
            <p>
              A colour you can&apos;t forget. A pattern that feels like you. A
              dhoti with just the right border. Let&apos;s bring it to life, one
              beautiful thread at a time.
            </p>
            <div className="custom-options">
              <span>
                <Icon name="check" size={15} /> Your choice of fabric
              </span>
              <span>
                <Icon name="check" size={15} /> Your perfect colour
              </span>
              <span>
                <Icon name="check" size={15} /> Your own design
              </span>
            </div>
            <button
              className="button button--wine"
              onClick={() => {
                setBriefReady(false)
                setPanel("custom")
              }}
            >
              Create something personal <Icon name="arrow" size={18} />
            </button>
            <small>
              Individual pieces &amp; retail manufacturing enquiries welcome.
            </small>
          </div>
        </section>

        <section className="story-section section" id="story">
          <div className="story-emblem reveal">
            <span>
              R<span>J</span>
            </span>
            <small>
              THE ART OF
              <br />
              THE SAREE
            </small>
            <Icon name="flower" size={26} />
          </div>
          <div className="story-copy reveal">
            <span className="eyebrow">ROOTED IN CRAFT. MADE FOR TODAY.</span>
            <h2>
              Not just what we make.
              <br />
              <em>What we believe in.</em>
            </h2>
            <p>
              At RJ SONS, we believe a beautiful saree begins with a beautiful
              fabric. From pure silk and flowing crepe to heavy chiffon, satin,
              and georgette, our world is one of colour, texture, and
              possibility.
            </p>
            <p>
              We bring the care of a manufacturer and the eye of a designer to
              every drape. Patterned or plain. A celebration or an ordinary day
              made special. There&apos;s a little of us, woven into every piece.
            </p>
            <p>
              And now, the same care extends to dhotis: timeless drapes that
              honour tradition while feeling completely at home today.
            </p>
            <span className="story-signature">
              Made with care. Worn with love.
            </span>
          </div>
        </section>

        <section className="closing-banner">
          <span className="eyebrow">SOME STORIES ARE MEANT TO BE WORN.</span>
          <h2>
            Make the next one <em>yours.</em>
          </h2>
          <a className="button button--ivory" href="#collections">
            Discover your saree <Icon name="arrow" size={18} />
          </a>
          <span className="banner-flower" aria-hidden="true">
            <Icon name="flower" size={280} />
          </span>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <Brand footer />
            <p>
              Beautiful fabrics. Thoughtful details.
              <br />A little something that stays with you.
            </p>
          </div>
          <div className="footer-group">
            <h3>THE COLLECTIONS</h3>
            <button onClick={() => explore("Pure silk")}>
              Pure silk sarees
            </button>
            <button onClick={() => explore("Crepe")}>Crepe sarees</button>
            <button onClick={() => explore("Plain & timeless")}>
              Plain sarees
            </button>
            <button onClick={() => explore("Dhotis")}>Dhotis</button>
            <a href="#custom">Custom designs</a>
          </div>
          <div className="footer-group">
            <h3>THE RJ SONS WORLD</h3>
            <a href="#story">Our story</a>
            <a href="#craft">The making of a drape</a>
            <a href="#custom">Made for you</a>
            <button
              onClick={() => {
                setBriefReady(false)
                setPanel("custom")
              }}
            >
              Retail &amp; bulk enquiries
            </button>
          </div>
          <div className="footer-invitation">
            <span className="eyebrow">LET&apos;S MAKE SOMETHING BEAUTIFUL</span>
            <h3>
              A little idea.
              <br />
              An extraordinary saree.
            </h3>
            <button
              className="text-link"
              onClick={() => {
                setBriefReady(false)
                setPanel("custom")
              }}
            >
              Begin your design story <Icon name="arrow" size={17} />
            </button>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} RJ SONS. All rights reserved.
          </span>
          <span>Crafted with care. Just like our sarees.</span>
          <a href="#home">BACK TO TOP ↑</a>
        </div>
      </footer>

      {selected && (
        <Modal title="A closer look" close={close} wide>
          <div className="preview-controls">
            <span>
              THE {selected.category === "Dhotis" ? "DHOTI" : "SAREE"} EDIT ·{" "}
              {String(products.indexOf(selected) + 1).padStart(2, "0")} /{" "}
              {String(products.length).padStart(2, "0")}
            </span>
            <div>
              <button
                aria-label="Previous design"
                onClick={() =>
                  setSelected(
                    products[
                      (products.indexOf(selected) - 1 + products.length) %
                        products.length
                    ],
                  )
                }
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                aria-label="Next design"
                onClick={() =>
                  setSelected(
                    products[
                      (products.indexOf(selected) + 1) % products.length
                    ],
                  )
                }
              >
                <Icon name="arrow" size={18} />
              </button>
            </div>
          </div>
          <div className="product-detail" key={selected.id}>
            <button
              className={`detail-photo ${zoomed ? "detail-photo--zoomed" : ""}`}
              aria-label={zoomed ? "Zoom out of design" : "Zoom into design"}
              aria-pressed={zoomed}
              onClick={() => setZoomed(!zoomed)}
            >
              <img
                src={selected.image}
                alt={`${selected.name} ${
                  selected.category === "Dhotis" ? "dhoti" : "saree"
                } inspiration`}
              />
              <span>
                {zoomed ? "−" : "+"}{" "}
                <span>
                  {zoomed ? "Zoom out" : "Click to discover the details"}
                </span>
              </span>
            </button>
            <div className="detail-copy">
              <span className="eyebrow">{selected.category}</span>
              <h3>{selected.name}</h3>
              <p>{selected.color}</p>
              <p>
                {selected.description || (
                  <>
                    A thoughtfully curated drape, with beautiful movement and a
                    palette made for memorable moments. Let this be the starting
                    point for your perfect saree.
                  </>
                )}
              </p>
              <dl>
                <div>
                  <dt>Length</dt>
                  <dd>
                    {selected.category === "Dhotis"
                      ? "Dimensions discussed to suit your drape"
                      : "Standard 5.5 m saree + blouse fabric"}
                  </dd>
                </div>
                <div>
                  <dt>Finish</dt>
                  <dd>Confirmed during design consultation</dd>
                </div>
                <div>
                  <dt>Care</dt>
                  <dd>Professional dry clean recommended</dd>
                </div>
              </dl>
              <button
                className="button button--wine"
                onClick={() => {
                  setSelected(null)
                  setBriefReady(false)
                  setBriefGarment(
                    selected.category === "Dhotis" ? "Dhoti" : "Saree",
                  )
                  setPanel("custom")
                }}
              >
                Discuss a custom design <Icon name="arrow" size={18} />
              </button>
              <p className="detail-disclaimer">
                Explore the possibilities of our manufacturing craft.
                Photography is for inspiration; fabric, colours, and finishing
                details can be tailored to your requirements.
              </p>
            </div>
          </div>
        </Modal>
      )}
      {panel && (
        <Modal
          title={
            panel === "search"
              ? "Find your perfect drape"
              : "Your drape. Your story."
          }
          close={close}
          wide={panel === "custom"}
        >
          {panel === "search" && (
            <>
              <label className="search-field">
                <Icon name="search" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try dhoti, silk, crepe, ivory..."
                  aria-label="Search collection"
                />
              </label>
              <p className="panel-note">
                {query
                  ? `${searchResults.length} matching pieces`
                  : "A few beautiful places to start"}
              </p>
              <div className="mini-products">
                {searchResults.map((p) => (
                  <button
                    className="mini-product"
                    key={p.id}
                    onClick={() => {
                      setPanel(null)
                      setSelected(p)
                    }}
                  >
                    <img src={p.image} alt={p.name} />
                    <span>
                      <strong>{p.name}</strong>
                      <small>
                        {p.category} · {p.color}
                      </small>
                    </span>
                    <Icon name="arrow" size={18} />
                  </button>
                ))}
              </div>
              {!searchResults.length && (
                <div className="empty-state">
                  <Icon name="search" size={34} />
                  <h3>No drapes found just yet.</h3>
                  <p>Try “dhoti”, “silk”, “crepe”, or a colour like “ivory”.</p>
                  <button className="text-link" onClick={() => setQuery("")}>
                    Explore all pieces <Icon name="arrow" size={18} />
                  </button>
                </div>
              )}
            </>
          )}
          {panel === "custom" && (
            <>
              {briefReady ? (
                <div className="empty-state">
                  <Icon name="check" size={40} />
                  <h3>Your idea, beautifully outlined.</h3>
                  <p>
                    Your design brief has been downloaded. Keep it ready to
                    share directly with RJ SONS. This preview does not send or
                    store enquiries.
                  </p>
                  <button
                    className="button button--wine"
                    onClick={() => setBriefReady(false)}
                  >
                    Create another brief <Icon name="plus" size={17} />
                  </button>
                </div>
              ) : (
                <>
                  <p className="custom-form-intro">
                    Tell us what you have in mind. We&apos;ll turn your ideas
                    into a downloadable brief, ready to share with the makers.
                  </p>
                  <form
                    className="custom-form"
                    onSubmit={(e) => {
                      e.preventDefault()
                      const values = new FormData(e.currentTarget)
                      download(
                        `RJ SONS — Custom design brief\n\n${Array.from(
                          values.entries(),
                        )
                          .map(([key, value]) => `${key}: ${value}`)
                          .join(
                            "\n\n",
                          )}\n\nPlease confirm design feasibility, materials, and lead time.\nThis brief has not been sent. Share it directly with RJ SONS.`,
                        "RJ-SONS-custom-design-brief.txt",
                      )
                      setBriefReady(true)
                    }}
                  >
                    <label>
                      Your name
                      <input
                        name="Name"
                        placeholder="How should we address you?"
                        required
                        maxLength={100}
                      />
                    </label>
                    <label>
                      Email address
                      <input
                        type="email"
                        name="Email"
                        placeholder="you@example.com"
                        required
                      />
                    </label>
                    <label>
                      Your garment
                      <select
                        name="Garment"
                        value={briefGarment}
                        onChange={(e) => setBriefGarment(e.target.value)}
                      >
                        <option>Saree</option>
                        <option>Dhoti</option>
                        <option>Sarees &amp; dhotis</option>
                      </select>
                    </label>
                    <label>
                      Your fabric
                      <select name="Fabric" defaultValue="Pure silk">
                        <option>Pure silk</option>
                        <option>Crepe</option>
                        <option>Heavy chiffon</option>
                        <option>Satin</option>
                        <option>Georgette</option>
                        <option>Dhoti fabric — discuss options</option>
                        <option>Help me choose</option>
                      </select>
                    </label>
                    <label>
                      The occasion
                      <select name="Occasion" defaultValue="A personal piece">
                        <option>A personal piece</option>
                        <option>Wedding & festivities</option>
                        <option>A thoughtful gift</option>
                        <option>Retail / bulk manufacturing</option>
                      </select>
                    </label>
                    <label>
                      Favourite colours
                      <input
                        name="Colours"
                        placeholder="Deep wine, antique gold..."
                        required
                        maxLength={200}
                      />
                    </label>
                    <label>
                      Number of pieces
                      <input
                        type="number"
                        name="Quantity"
                        defaultValue={1}
                        min={1}
                        max={10000}
                        required
                      />
                    </label>
                    <label className="form-full">
                      Your idea
                      <textarea
                        name="Design notes"
                        placeholder="Tell us about the pattern, finish, occasion, or anything you have in mind..."
                        rows={3}
                        required
                        maxLength={3000}
                      />
                    </label>
                    <p className="panel-note form-full">
                      Your details stay in your downloaded file. Nothing is
                      submitted or stored by this website.
                    </p>
                    <button
                      type="submit"
                      className="button button--wine form-full"
                    >
                      Download my design brief <Icon name="arrow" size={18} />
                    </button>
                  </form>
                </>
              )}
            </>
          )}
        </Modal>
      )}
    </div>
  )
}

export default App
