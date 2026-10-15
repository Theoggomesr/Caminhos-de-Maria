
export default function HeaderOrnaments() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-[-45px] w-[320px] -translate-x-1/2 rotate-180 opacity-30">
        <Ornament />
      </div>

      <div className="absolute bottom-[-45px] left-1/2 w-[320px] -translate-x-1/2 rotate-360 opacity-30">
        <Ornament />
      </div>
    </div>
  );
}

function Ornament() {
  return (
    <svg
      viewBox="0 0 400 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full"
      aria-hidden="true"
    >
      <g
        stroke="#C7A56A"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Linhas externas */}
        <path d="M10 54 H65 M335 54 H390" />

        {/* Arabescos laterais */}
        <path d="M65 54 C80 54 82 31 100 31 C120 31 122 68 105 68 C92 68 94 50 105 50 C114 50 116 60 111 62" />
        <path d="M335 54 C320 54 318 31 300 31 C280 31 278 68 295 68 C308 68 306 50 295 50 C286 50 284 60 289 62" />

        {/* Curvas superiores */}
        <path d="M112 54 C145 54 143 18 166 24 C184 29 176 45 166 43 C159 41 162 33 167 35" />
        <path d="M288 54 C255 54 257 18 234 24 C216 29 224 45 234 43 C241 41 238 33 233 35" />

        {/* Curvas inferiores */}
        <path d="M112 54 C145 54 143 90 166 84 C184 79 176 63 166 65 C159 67 162 75 167 73" />
        <path d="M288 54 C255 54 257 90 234 84 C216 79 224 63 234 65 C241 67 238 75 233 73" />

        {/* Flor-de-lis central */}
        <path d="M170 54 H230" />
        <path d="M200 48 C186 35 190 21 200 9 C210 21 214 35 200 48Z" />
        <path d="M197 49 C175 45 174 30 179 22 C187 30 195 34 197 49Z" />
        <path d="M203 49 C225 45 226 30 221 22 C213 30 205 34 203 49Z" />

        {/* Haste e acabamento */}
        <path d="M200 48 L200 88 M193 78 L200 90 L207 78" />
        <path d="M186 54 Q200 68 214 54" />
        <path d="M195 90 L200 98 L205 90 L200 82Z" />
      </g>

      {[35, 55, 345, 365].map((x) => (
        <circle
          key={x}
          cx={x}
          cy="54"
          r="2"
          fill="#C7A56A"
        />
      ))}
    </svg>
  );
}
