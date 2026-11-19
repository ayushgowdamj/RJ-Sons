// Ensures real image/font binaries exist before building.
// Hosts that clone without Git LFS (e.g. Vercel) get ~130-byte pointer files
// instead of binaries; this script detects that and fetches the real files.
import { execSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const G = "https://fonts.gstatic.com/s/"
const U = "https://images.unsplash.com/"
const img = (id, w, h) => `${U}${id}?fm=jpg&fit=crop&w=${w}&h=${h}&q=82`

const assets = [
  ["fonts/cormorant-italic-400.ttf", G + "cormorantgaramond/v21/co3smX5slCNuHLi8bLeY9MK7whWMhyjYrGFEsdtdc62E6zd58jDOjw.ttf"],
  ["fonts/cormorant-italic-500.ttf", G + "cormorantgaramond/v21/co3smX5slCNuHLi8bLeY9MK7whWMhyjYrGFEsdtdc62E6zd5wDDOjw.ttf"],
  ["fonts/cormorant-normal-400.ttf", G + "cormorantgaramond/v21/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_v86GnM.ttf"],
  ["fonts/cormorant-normal-500.ttf", G + "cormorantgaramond/v21/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_s06GnM.ttf"],
  ["fonts/cormorant-normal-600.ttf", G + "cormorantgaramond/v21/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_iE9GnM.ttf"],
  ["fonts/dm-sans-normal-400.ttf", G + "dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxhTg.ttf"],
  ["fonts/dm-sans-normal-500.ttf", G + "dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAkJxhTg.ttf"],
  ["fonts/dm-sans-normal-600.ttf", G + "dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAfJthTg.ttf"],
  ["fonts/dm-sans-normal-700.ttf", G + "dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwARZthTg.ttf"],
  ["images/crepe.jpg", img("photo-1692992193981-d3d92fabd9cb", 900, 1350)],
  ["images/crimson.jpg", img("photo-1727430228383-aa1fb59db8bf", 1000, 1500)],
  ["images/dhoti-ceremony.jpg", img("photo-1650632784476-2db5d6761736", 1000, 667)],
  ["images/dhoti-colour.jpg", img("photo-1650632784494-7b6d1960113f", 1000, 667)],
  ["images/dhoti-cotton.jpg", img("photo-1650632784049-3aded83f8e28", 1000, 667)],
  ["images/dhoti-everyday.jpg", img("photo-1793415604037-423fad37ad6e", 1000, 1500)],
  ["images/dhoti-gold.jpg", img("photo-1650632784437-07f2aecafc28", 1000, 1500)],
  ["images/dhoti-heritage.jpg", img("photo-1793415604013-02521a90793b", 1100, 1650)],
  ["images/everyday.jpg", img("photo-1609748340041-f5d61e061ebc", 900, 1277)],
  ["images/festive-red.jpg", img("photo-1732850195250-940dd4d0bb49", 1000, 1500)],
  ["images/floral.jpg", img("photo-1769275061202-cf3ef67d7279", 900, 1350)],
  ["images/gulmohar.jpg", img("photo-1610030469983-98e550d6193c", 1600, 2400)],
  ["images/loom.jpg", img("photo-1640292343595-889db1c8262e", 1200, 780)],
  ["images/marigold.jpg", img("photo-1597897569252-9df44c7de0db", 900, 1480)],
  ["images/neelam.jpg", img("photo-1693023656257-87c142566ad3", 900, 1125)],
  ["images/rose.jpg", img("photo-1786300114351-c0c73bb6fe85", 900, 1350)],
  ["images/silk.jpg", img("photo-1705164454907-a04fe248f675", 900, 1063)],
  ["images/textile.jpg", img("photo-1588140686379-1b76a52103dc", 1000, 1333)],
  ["images/weave-detail.jpg", img("photo-1695898341950-6b78780c1458", 900, 1350)],
]

function valid(buf, file) {
  if (!buf || buf.length < 1024) return false
  if (buf.subarray(0, 20).toString("latin1").startsWith("version https://")) return false
  if (file.endsWith(".jpg")) return buf[0] === 0xff && buf[1] === 0xd8
  const tag = buf.subarray(0, 4).toString("latin1")
  return tag === "\0\x01\0\0" || tag === "OTTO" || tag === "true"
}

const target = (rel) => path.join(root, "public", rel)
const readSafe = (p) => { try { return fs.readFileSync(p) } catch { return null } }
const findMissing = () => assets.filter(([rel]) => !valid(readSafe(target(rel)), rel))

let missing = findMissing()
if (missing.length) {
  try { execSync("git lfs pull", { cwd: root, stdio: "ignore", timeout: 20000 }) } catch {}
  missing = findMissing()
}

if (missing.length) {
  console.log(`[prepare-assets] Fetching ${missing.length} binary asset(s) missing from checkout...`)
  let failed = 0
  let next = 0
  const worker = async () => {
    while (next < missing.length) {
      const [rel, url] = missing[next++]
      let done = false
      for (let attempt = 1; attempt <= 3 && !done; attempt++) {
        try {
          const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" }, signal: AbortSignal.timeout(30000) })
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          const buf = Buffer.from(await res.arrayBuffer())
          if (!valid(buf, rel)) throw new Error("invalid payload")
          fs.mkdirSync(path.dirname(target(rel)), { recursive: true })
          fs.writeFileSync(target(rel), buf)
          done = true
        } catch (err) {
          if (attempt === 3) console.warn(`[prepare-assets] Could not fetch ${rel}: ${err.message}`)
          else await new Promise((r) => setTimeout(r, 500 * attempt))
        }
      }
      if (!done) failed++
    }
  }
  await Promise.all(Array.from({ length: Math.min(6, missing.length) }, worker))
  if (failed) {
    console.error(`[prepare-assets] ${failed} asset(s) unavailable.`)
    process.exit(1)
  }
}
