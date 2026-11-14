import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Brain, Cloud, Database, Globe, Terminal, type LucideIcon } from "lucide-react";

type Side = "dev" | "data";

const SIDES: Record<
  Side,
  {
    label: string;
    headline: [string, string];
    target: string;
    items: { icon: LucideIcon; title: string }[];
  }
> = {
  dev: {
    label: "DEV",
    headline: ["Código.", "Sistemas."],
    target: "#/dev",
    items: [
      { icon: Terminal, title: "Python" },
      { icon: Terminal, title: "Java" },
      { icon: Globe, title: "React & JavaScript" },
      { icon: Cloud, title: "AWS" },
    ],
  },
  data: {
    label: "DATA",
    headline: ["Dados.", "Insight."],
    target: "#/data",
    items: [
      { icon: Database, title: "Data Science" },
      { icon: Brain, title: "Machine Learning" },
      { icon: Database, title: "SQL" },
      { icon: Brain, title: "TensorFlow" },
    ],
  },
};

// easeInOutCubic-like: sweeps fast in the middle, slows at the edges
function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const TOP_BAR = (
  <div className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 text-[11px] tracking-[0.35em] text-white mix-blend-difference uppercase md:px-12">
    <span className="font-semibold">Leonardo Simplicio</span>
    <a
      href="./ltsdados/"
      aria-label="Ir para LTS Dados"
      className="pointer-events-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-current px-4 py-2 text-[11px] tracking-[0.35em] transition-colors hover:bg-white hover:text-black"
    >
      LTS DADOS
    </a>
  </div>
);

export default function SplitHero() {
  return (
    <header className="relative">
      {TOP_BAR}
      <DesktopSplit />
      <MobileSplit />
    </header>
  );
}

function DesktopSplit() {
  const [split, setSplit] = useState(50);
  const [hovered, setHovered] = useState<Side | null>(null);
  const hoveredRef = useRef<Side | null>(null);

  useEffect(() => {
    hoveredRef.current = hovered;
  }, [hovered]);

  useEffect(() => {
    const DURATION = 4200; // ms per half-cycle
    let raf = 0;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (hoveredRef.current) {
        start = null;
        raf = requestAnimationFrame(tick);
        return;
      }
      if (start === null) start = ts;
      const phase = ((ts - start) % (DURATION * 2)) / DURATION; // 0..2
      const t = phase < 1 ? easeInOut(phase) : easeInOut(2 - phase);
      setSplit(15 + t * 70); // sweep between 15% and 85%
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // hovering freezes the split so the hovered side takes ~75% of the screen
  const pos = hovered === "dev" ? 75 : hovered === "data" ? 25 : split;
  const animate = hovered ? "clip-path 700ms cubic-bezier(0.22, 1, 0.36, 1)" : "none";

  return (
    <section className="relative hidden h-screen w-full overflow-hidden select-none md:block">
      {/* DEV half (black) */}
      <a
        href={SIDES.dev.target}
        onMouseEnter={() => setHovered("dev")}
        onMouseLeave={() => setHovered(null)}
        aria-label="Ir para projetos (lado Dev)"
        className="absolute inset-0 block bg-noir"
        style={{ clipPath: `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)`, transition: animate }}
      >
        <SidePanel side="dev" active={hovered === "dev"} />
      </a>

      {/* DATA half (white) */}
      <a
        href={SIDES.data.target}
        onMouseEnter={() => setHovered("data")}
        onMouseLeave={() => setHovered(null)}
        aria-label="Ir para habilidades (lado Data)"
        className="absolute inset-0 block bg-blanc"
        style={{ clipPath: `polygon(${pos}% 0, 100% 0, 100% 100%, ${pos}% 100%)`, transition: animate }}
      >
        <SidePanel side="data" active={hovered === "data"} />
      </a>

      {/* divider */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 w-px bg-white/20"
        style={{ left: `${pos}%`, transition: animate.replace("clip-path", "left") }}
      />

      {/* center monogram */}
      <div
        className="pointer-events-none absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${pos}%`, transition: animate.replace("clip-path", "left") }}
      >
        <div className="grid h-12 w-12 place-items-center border border-white/30 bg-black/40 font-semibold text-[10px] tracking-[0.3em] text-white backdrop-blur-sm">
          L<span className="mx-0.5 opacity-40">/</span>S
        </div>
      </div>

      {/* bottom hint */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex justify-center">
        <div className="bg-black/80 px-5 py-2.5 text-[10px] tracking-[0.5em] text-white backdrop-blur-sm">
          {hovered
            ? `CLIQUE PARA VER · ${SIDES[hovered].label}`
            : "PASSE O CURSOR PARA EXPLORAR"}
        </div>
      </div>
    </section>
  );
}

function SidePanel({ side, active }: { side: Side; active: boolean }) {
  const cfg = SIDES[side];
  const isDev = side === "dev";
  const fg = isDev ? "text-blanc" : "text-noir";
  const subtle = isDev ? "text-white/50" : "text-black/50";
  const edge = isDev ? "border-white/20" : "border-black/20";
  const iconBorder = isDev ? "border-white/30" : "border-black/30";
  // headline sits at the center of its own half so the sweep does not shake the text
  const center = isDev ? "25%" : "75%";

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute top-1/2 text-center"
        style={{
          left: center,
          transform: "translate(-50%, -50%)",
          opacity: active ? 0 : 1,
          transition: "opacity 500ms ease",
          pointerEvents: "none",
        }}
      >
        <p className={`mb-4 text-[10px] tracking-[0.5em] ${subtle}`}>{cfg.label}</p>
        <h2 className={`${isDev ? "font-bold" : "font-light"} text-5xl leading-[0.95] tracking-tight md:text-7xl ${fg}`}>
          {cfg.headline[0]}
          <br />
          {cfg.headline[1]}
        </h2>
      </div>

      <ul
        className="absolute inset-y-0 flex flex-col justify-center gap-6 transition-opacity duration-500"
        style={{
          [isDev ? "left" : "right"]: "8%",
          opacity: active ? 1 : 0,
          pointerEvents: "none",
        }}
      >
        {cfg.items.map((it, i) => {
          const Icon = it.icon;
          return (
            <li key={it.title} className={`flex items-center gap-4 border-l ${edge} pl-5`}>
              <span className={`grid h-10 w-10 place-items-center border ${iconBorder} ${fg}`}>
                <Icon className="h-5 w-5" strokeWidth={isDev ? 2 : 1.25} />
              </span>
              <div>
                <p className={`text-[9px] tracking-[0.3em] ${subtle}`}>{String(i + 1).padStart(2, "0")}</p>
                <p className={`${isDev ? "font-semibold" : "font-light"} text-base leading-tight ${fg}`}>{it.title}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function MobileSplit() {
  return (
    <div
      className="h-screen w-full overflow-x-hidden overflow-y-auto md:hidden"
      style={{ scrollSnapType: "y mandatory", WebkitOverflowScrolling: "touch" }}
    >
      <MobilePanel side="data" />
      <MobilePanel side="dev" />
    </div>
  );
}

function MobilePanel({ side }: { side: Side }) {
  const cfg = SIDES[side];
  const isDev = side === "dev";
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const FADE = 500;
    const HOLD = 2200;
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((p) => (p + 1) % cfg.items.length);
        setVisible(true);
      }, FADE);
    }, HOLD + FADE);
    return () => clearInterval(id);
  }, [cfg.items.length]);

  const bg = isDev ? "bg-noir text-blanc" : "bg-blanc text-noir";
  const subtle = isDev ? "text-white/50" : "text-black/50";
  const border = isDev ? "border-white/15" : "border-black/15";
  const Icon = cfg.items[idx].icon;

  return (
    <a
      href={cfg.target}
      aria-label={`Ir para o lado ${cfg.label}`}
      className={`relative flex h-screen w-full snap-start flex-col px-6 pt-24 pb-10 ${bg}`}
    >
      <p className={`text-[10px] tracking-[0.5em] ${subtle}`}>{cfg.label}</p>
      <h2 className={`mt-4 text-4xl leading-[1.05] uppercase ${isDev ? "font-medium" : "font-light"}`}>
        {cfg.headline[0]}
        <br />
        {cfg.headline[1]}
      </h2>

      <div className="flex flex-1 items-center justify-center">
        <div
          className={`flex w-full max-w-[280px] items-center gap-4 border-l ${border} pl-5`}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 500ms ease, transform 500ms ease",
          }}
        >
          <span className={`grid h-12 w-12 place-items-center border ${border}`}>
            <Icon className="h-5 w-5" strokeWidth={isDev ? 2 : 1.25} />
          </span>
          <div>
            <p className={`text-[9px] tracking-[0.3em] ${subtle}`}>
              {String(idx + 1).padStart(2, "0")} / {String(cfg.items.length).padStart(2, "0")}
            </p>
            <p className={`${isDev ? "font-semibold" : "font-light"} text-base leading-tight`}>
              {cfg.items[idx].title}
            </p>
          </div>
        </div>
      </div>

      <div className={`flex items-center justify-center gap-3 text-[10px] tracking-[0.5em] ${subtle}`}>
        TOQUE PARA VER <ArrowUpRight className="h-3 w-3" />
      </div>
    </a>
  );
}
