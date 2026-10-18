const ITEMS = [
  "张迪钊 × 薛婉莹",
  "一见钟情",
  "FOREVER & ALWAYS",
  "往后余生",
  "从校服百褶裙 到婚纱白纱",
  "始于初二 · 终于白头",
];

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((t, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span
            className={`px-8 text-sm tracking-[0.35em] md:text-base ${
              i % 2 === 0 ? "text-ivory" : "font-latin italic text-gold-soft"
            }`}
          >
            {t}
          </span>
          <span className="block h-1.5 w-1.5 rotate-45 bg-gold-soft/70" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="relative z-20 -my-6 rotate-[-1.2deg] scale-[1.02] overflow-hidden border-y border-gold-soft/25 bg-wine-deep py-4 shadow-[0_20px_50px_-20px_rgba(122,31,38,0.6)]">
      <div className="animate-marquee flex w-max">
        <Row />
        <Row />
      </div>
    </div>
  );
}
