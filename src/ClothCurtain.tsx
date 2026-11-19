import { useEffect, useRef } from "react"

function silkTexture() {
  const canvas = document.createElement("canvas")
  canvas.width = canvas.height = 1024
  const ctx = canvas.getContext("2d")!
  ctx.fillStyle = "#9c142b"
  ctx.fillRect(0, 0, 1024, 1024)
  const gold = ctx.createLinearGradient(0, 0, 1024, 1024)
  gold.addColorStop(0, "#a16a2e")
  gold.addColorStop(0.45, "#eed29a")
  gold.addColorStop(1, "#b48144")
  ctx.strokeStyle = gold
  ctx.fillStyle = gold
  for (let row = -1; row < 6; row++) {
    for (let col = -1; col < 8; col++) {
      ctx.save()
      ctx.translate(col * 156 + (row % 2) * 78, row * 186 + 70)
      ctx.rotate(-0.45)
      for (let ring = 0; ring < 4; ring++) {
        ctx.lineWidth = ring === 0 ? 3 : 1.5
        ctx.beginPath()
        ctx.moveTo(0, -57 + ring * 5)
        ctx.bezierCurveTo(
          61 - ring * 5,
          -15,
          44 - ring * 3,
          59,
          0,
          45 - ring * 4,
        )
        ctx.bezierCurveTo(-47 + ring * 4, 31, -28, -21, 0, -57 + ring * 5)
        ctx.stroke()
      }
      for (let i = 0; i < 8; i++) {
        ctx.save()
        ctx.translate(0, 6)
        ctx.rotate((i * Math.PI) / 4)
        ctx.beginPath()
        ctx.ellipse(0, -15, 3, 11, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
      ctx.restore()
    }
  }
  for (const y of [40, 920]) {
    ctx.fillStyle = gold
    ctx.fillRect(0, y, 1024, 3)
    ctx.fillRect(0, y + 48, 1024, 3)
    ctx.fillRect(0, y + 58, 1024, 8)
    for (let x = 0; x < 1024; x += 25) {
      ctx.beginPath()
      ctx.moveTo(x, y + 8)
      ctx.lineTo(x + 12, y + 42)
      ctx.lineTo(x + 24, y + 8)
      ctx.stroke()
    }
  }
  return canvas
}

const vertexSource = `
  attribute vec2 aPosition;
  uniform float uTime;
  uniform float uLift;
  varying vec2 vUv;
  varying float vLight;
  void main() {
    vec2 uv = aPosition * .5 + .5;
    float wave = sin(aPosition.x * 7.0 + uTime * 1.2 + aPosition.y * 2.0);
    float wave2 = sin(aPosition.x * 13.0 - uTime * .8 + aPosition.y * 4.0);
    float z = wave * .22 + wave2 * .07;
    float dx = cos(aPosition.x * 7.0 + uTime * 1.2 + aPosition.y * 2.0) * 1.54
      + cos(aPosition.x * 13.0 - uTime * .8 + aPosition.y * 4.0) * .91;
    vec3 normal = normalize(vec3(-dx, -.2 * wave, 1.0));
    vLight = .53 + max(dot(normal, normalize(vec3(-.55, .7, 1.0))), 0.0) * .65;
    float perspective = 3.0 / (3.0 - z);
    vec2 pos = aPosition * vec2(1.16, 1.25);
    pos.y += wave * .045 + uLift * 3.5 + sin(uv.x * 4.0 + uTime) * uLift * .3;
    gl_Position = vec4(pos * perspective, z * .1, 1.0);
    vUv = uv + vec2(z * .03, sin(aPosition.x * 4.0 + uTime) * .025);
  }
`
const fragmentSource = `
  precision mediump float;
  uniform sampler2D uTexture;
  varying vec2 vUv;
  varying float vLight;
  void main() {
    vec3 color = texture2D(uTexture, vUv).rgb;
    float weave = .97 + .03 * sin(vUv.x * 1500.0) * sin(vUv.y * 1500.0);
    gl_FragColor = vec4(color * vLight * weave, 1.0);
  }
`

export default function ClothCurtain({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fallbackRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current!
    const textureCanvas = silkTexture()
    const fallback = fallbackRef.current!
    fallback.style.backgroundImage = `url(${textureCanvas.toDataURL("image/jpeg", 0.85)})`
    const timeout = window.setTimeout(onDone, 4100)
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    })
    if (!gl) return () => clearTimeout(timeout)
    let frame = 0
    let disposed = false
    const shaders: WebGLShader[] = []
    const program = gl.createProgram()!
    const buffer = gl.createBuffer()!
    const indexBuffer = gl.createBuffer()!
    const texture = gl.createTexture()!
    try {
      for (const [kind, source] of [
        [gl.VERTEX_SHADER, vertexSource],
        [gl.FRAGMENT_SHADER, fragmentSource],
      ] as const) {
        const shader = gl.createShader(kind)!
        gl.shaderSource(shader, source)
        gl.compileShader(shader)
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
          throw new Error("Cloth shader unavailable")
        shaders.push(shader)
        gl.attachShader(program, shader)
      }
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        throw new Error("Cloth renderer unavailable")
      gl.useProgram(program)
      const positions: number[] = [],
        indices: number[] = []
      const columns = 90,
        rows = 55
      for (let y = 0; y <= rows; y++)
        for (let x = 0; x <= columns; x++)
          positions.push((x / columns) * 2 - 1, (y / rows) * 2 - 1)
      for (let y = 0; y < rows; y++)
        for (let x = 0; x < columns; x++) {
          const i = y * (columns + 1) + x
          indices.push(
            i,
            i + 1,
            i + columns + 1,
            i + 1,
            i + columns + 2,
            i + columns + 1,
          )
        }
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(positions),
        gl.STATIC_DRAW,
      )
      const position = gl.getAttribLocation(program, "aPosition")
      gl.enableVertexAttribArray(position)
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
      gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices),
        gl.STATIC_DRAW,
      )
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        textureCanvas,
      )
      gl.generateMipmap(gl.TEXTURE_2D)
      gl.uniform1i(gl.getUniformLocation(program, "uTexture"), 0)
      const timeLocation = gl.getUniformLocation(program, "uTime")
      const liftLocation = gl.getUniformLocation(program, "uLift")
      const start = performance.now()
      const draw = (now: number) => {
        if (disposed) return
        const elapsed = (now - start) / 1000
        const rect = canvas.getBoundingClientRect()
        const dpr = Math.min(devicePixelRatio || 1, 1.5)
        const width = Math.round(rect.width * dpr),
          height = Math.round(rect.height * dpr)
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width
          canvas.height = height
          gl.viewport(0, 0, width, height)
        }
        const raw = Math.max(0, Math.min(1, (elapsed - 1.4) / 2.2))
        const lift = raw * raw * (3 - 2 * raw)
        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.uniform1f(timeLocation, elapsed)
        gl.uniform1f(liftLocation, lift)
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0)
        if (elapsed < 4.1) frame = requestAnimationFrame(draw)
      }
      fallback.style.display = "none"
      frame = requestAnimationFrame(draw)
    } catch {
      canvas.style.display = "none"
    }
    const lost = (event: Event) => {
      event.preventDefault()
      onDone()
    }
    canvas.addEventListener("webglcontextlost", lost)
    return () => {
      disposed = true
      clearTimeout(timeout)
      cancelAnimationFrame(frame)
      canvas.removeEventListener("webglcontextlost", lost)
      gl.deleteBuffer(buffer)
      gl.deleteBuffer(indexBuffer)
      gl.deleteTexture(texture)
      shaders.forEach((shader) => gl.deleteShader(shader))
      gl.deleteProgram(program)
    }
  }, [onDone])
  return (
    <div className="curtain-scene" aria-hidden="true">
      <div className="curtain-fallback" ref={fallbackRef} />
      <canvas ref={canvasRef} />
    </div>
  )
}
