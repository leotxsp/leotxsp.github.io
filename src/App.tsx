import { useState, type ReactNode } from "react";
import {
  Mail,
  Briefcase,
  GitBranch,
  MessageCircle,
  ArrowUpRight,
  Code2,
  Database,
  Cloud,
  Brain,
  Globe,
  Terminal,
  type LucideIcon,
} from "lucide-react";

const PROFILE = {
  name: "Leonardo Simplicio",
  role: "Developer | Data Scientist",
  email: "leotxsp@gmail.com",
  linkedin: "https://www.linkedin.com/in/leonardosimplicio/",
  github: "https://github.com/leotxsp",
  whatsapp: "https://wa.me/559193326166",
};

const SKILLS: { name: string; area: string; level: "Beginner" | "Intermediate"; icon: LucideIcon }[] = [
  { name: "Python", area: "Programming", level: "Beginner", icon: Terminal },
  { name: "Java", area: "Programming", level: "Beginner", icon: Terminal },
  { name: "TypeScript", area: "Programming", level: "Beginner", icon: Terminal },
  { name: "JavaScript", area: "Web", level: "Beginner", icon: Globe },
  { name: "React", area: "Web", level: "Beginner", icon: Globe },
  { name: "Node.js", area: "Web", level: "Beginner", icon: Globe },
  { name: "Data Science", area: "Data", level: "Beginner", icon: Database },
  { name: "Machine Learning", area: "Data", level: "Beginner", icon: Brain },
  { name: "TensorFlow", area: "AI", level: "Beginner", icon: Brain },
  { name: "SQL", area: "Database", level: "Intermediate", icon: Database },
  { name: "AWS", area: "Cloud", level: "Beginner", icon: Cloud },
];

const CERTIFICATIONS = [
  "Ciência da Computação — cursando (Estácio)",
  "AWS Certified Cloud Practitioner",
  "AWS re/Start Graduate",
  "Curso de Programador de Sistemas (Senac)",
  "Programa Oracle Next Education F2 T5 Back-end",
];

const BADGES = [
  { title: "Python Essentials 1", issuer: "Cisco", url: "https://www.credly.com/badges/4405a4a5-2d1d-43b3-b812-970d91e75ca3/public_url" },
  { title: "Networking Academy Learn-A-Thon 2023", issuer: "Cisco", url: "https://www.credly.com/badges/8677b043-f02c-4e68-9bb1-95218674831c/public_url" },
  { title: "Introduction to Data Science", issuer: "Cisco", url: "https://www.credly.com/badges/2a077a33-f47d-4142-a2ef-d8aa27fae2c2/public_url" },
  { title: "AWS re/Start Graduate", issuer: "Cisco", url: "https://www.credly.com/badges/810083d4-228a-4444-ba4d-957015282dd8/public_url" },
  { title: "AWS Certified Cloud Practitioner", issuer: "Cisco", url: "https://www.credly.com/badges/e89f0716-9f4e-4f1d-a956-ddaee267a5c9/public_url" },
  { title: "IBM Z Day 2025 SE — Security", issuer: "IBM", url: "https://www.credly.com/badges/7e1a54fa-2cbe-43d3-b144-3f622b2d80dd/public_url" },
];

const PROJECTS: { title: string; description: string; tags: string[]; repo?: string; icon: LucideIcon }[] = [
  {
    title: "XML Handler",
    description:
      "Ferramenta em Python que manipula XMLs de notas fiscais e os exibe em uma tabela PyQt para visualização. Usa pandas e ElementTree.",
    tags: ["Python", "PyQt", "XML", "Pandas", "Backend", "Data"],
    repo: "https://github.com/leotxsp/XMLHandler",
    icon: Code2,
  },
  {
    title: "Deep Audio Classifier",
    description:
      "Projeto de IA que reconhece sons e os classifica em categorias específicas, com modelos de aprendizado de máquina treinados para reconhecer cantos de pássaros.",
    tags: ["Python", "TensorFlow", "Matplotlib", "Pandas", "AI", "Data"],
    repo: "https://github.com/leotxsp/Ai-Para-reconhecimento-de-som-Deep-Audio-Classifier-",
    icon: Brain,
  },
  {
    title: "Site de Portfólio",
    description: "Este site: portfólio online feito com Vite, Tailwind CSS e React, publicado no GitHub Pages.",
    tags: ["Vite", "Tailwind", "TypeScript", "React", "Frontend"],
    icon: Globe,
  },
];

const IN_PROGRESS = {
  title: "XMLHandler como API",
  description:
    "Transformando o XMLHandler em uma API para ganhar escalabilidade e acessibilidade, sem exigir a instalação de dependências localmente. Assim, mais pessoas, inclusive em pequenos negócios, podem usar a ferramenta.",
  stack: [
    "Java no backend, para robustez e performance",
    "API RESTful para integração com diversos sistemas",
    "Interface simples em PyQt para visualizar e manipular dados",
    "Recursos adicionais de processamento e análise de notas fiscais",
  ],
};

const COURSES = [
  "Formação React Native Developer — DIO",
  "Formação Machine Learning Specialist — DIO",
  "Formação SQL Database Specialist — DIO",
];

function Section({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8 border-t border-white/10 px-6 py-20 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-[11px] tracking-[0.5em] text-muted uppercase">{label}</p>
        <h2 className="mb-12 text-4xl leading-none font-bold tracking-tight md:text-6xl">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function Hero() {
  return (
    <header className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 pt-8 pb-10 md:px-12 lg:px-24">
      <nav className="flex items-center justify-between text-[11px] tracking-[0.35em] uppercase">
        <span className="font-semibold">LS</span>
        <div className="hidden gap-8 text-muted md:flex">
          <a href="#sobre" className="hover:text-blanc">Sobre</a>
          <a href="#habilidades" className="hover:text-blanc">Habilidades</a>
          <a href="#projetos" className="hover:text-blanc">Projetos</a>
          <a href="#contato" className="hover:text-blanc">Contato</a>
        </div>
      </nav>

      <div className="relative py-24">
        <div className="relative h-px w-full overflow-hidden bg-white/10" aria-hidden>
          <div className="animate-sweep absolute inset-y-0 w-1/3 bg-blanc" />
        </div>
        <p className="mt-10 text-[11px] tracking-[0.5em] text-muted uppercase">{PROFILE.role}</p>
        <h1 className="mt-4 text-6xl leading-[0.9] font-bold tracking-tight md:text-8xl lg:text-9xl">
          Leonardo
          <br />
          <span className="text-muted">Simplicio</span>
        </h1>
        <p className="mt-10 max-w-xl text-lg leading-relaxed text-blanc/80">
          Olá, eu sou o Léo. Sou estudante de ciência da computação, entusiasta de dados e desenvolvimento
          pessoal, buscando minha primeira oportunidade de trabalho.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#projetos"
            className="inline-flex items-center gap-2 bg-blanc px-5 py-3 text-sm font-semibold text-noir transition-colors hover:bg-white"
          >
            Ver projetos <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="#contato"
            className="inline-flex items-center gap-2 border border-white/30 px-5 py-3 text-sm font-semibold transition-colors hover:border-blanc"
          >
            Entrar em contato
          </a>
        </div>
      </div>

      <p className="text-[11px] tracking-[0.4em] text-muted uppercase">Brasil</p>
    </header>
  );
}

function About() {
  return (
    <Section id="sobre" label="01 — Sobre" title="Sobre mim">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-6 text-lg leading-relaxed text-blanc/80">
          <p>
            Sou um estudante fascinado por dados. Tudo começou ajudando na loja dos meus pais: aos 16 anos,
            eu criava pequenos scripts em Excel/VBA para automatizar tarefas repetitivas, como alimentar
            planilhas de vendas a partir de outras fontes.
          </p>
          <p>
            Hoje uso tecnologia para facilitar processos, como o cadastro de notas fiscais no sistema de
            gestão, com técnicas como{" "}
            <a className="underline underline-offset-4 hover:text-blanc" href="https://pt.wikipedia.org/wiki/Reconhecimento_%C3%B3tico_de_caracteres" target="_blank" rel="noopener noreferrer">OCR</a>{" "}
            e{" "}
            <a className="underline underline-offset-4 hover:text-blanc" href="https://pt.wikipedia.org/wiki/Extract,_transform,_load" target="_blank" rel="noopener noreferrer">ETL</a>.
          </p>
          <p>
            Com formação em tecnologia e certificações em AWS e programação, junto com a minha noção de
            processos, busco novas formas de aplicar o poder dos dados para resolver problemas do mundo real.
          </p>
        </div>
        <div className="space-y-6 border-l border-white/15 pl-8 text-lg leading-relaxed text-blanc/80">
          <p>
            Quando não estou codificando ou analisando dados, gosto de explorar habilidades pessoais como
            musculação e corrida.
          </p>
          <p>
            Meu próximo objetivo de desenvolvimento pessoal está focado em comunicação, com ênfase em
            oratória e storytelling.
          </p>
        </div>
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="habilidades" label="02 — Habilidades" title="Habilidades & Certificações">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <h3 className="mb-6 text-sm tracking-[0.3em] text-muted uppercase">Habilidades técnicas</h3>
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {SKILLS.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.name} className="flex items-center justify-between gap-4 py-4">
                  <div className="flex items-center gap-4">
                    <span className="grid h-10 w-10 place-items-center border border-white/20">
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    <div>
                      <p className="font-semibold">{s.name}</p>
                      <p className="text-xs tracking-[0.2em] text-muted uppercase">{s.area}</p>
                    </div>
                  </div>
                  <span className="text-[10px] tracking-[0.3em] text-muted uppercase">{s.level}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="space-y-12">
          <div>
            <h3 className="mb-6 text-sm tracking-[0.3em] text-muted uppercase">Certificações</h3>
            <ul className="space-y-4">
              {CERTIFICATIONS.map((c) => (
                <li key={c} className="border-l border-white/20 pl-5 text-lg">
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-sm tracking-[0.3em] text-muted uppercase">Badges (Credly)</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {BADGES.map((b) => (
                <li key={b.url}>
                  <a
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full items-center justify-between gap-3 border border-white/15 p-4 transition-colors hover:border-blanc"
                  >
                    <div>
                      <p className="text-sm font-semibold leading-snug">{b.title}</p>
                      <p className="mt-1 text-[10px] tracking-[0.25em] text-muted uppercase">{b.issuer}</p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-blanc" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projetos" label="03 — Projetos" title="Projetos">
      <div className="grid gap-px bg-white/10 md:grid-cols-3">
        {PROJECTS.map((p) => {
          const Icon = p.icon;
          return (
            <article key={p.title} className="flex flex-col bg-noir p-8">
              <Icon className="mb-8 h-8 w-8" strokeWidth={1.25} />
              <h3 className="text-2xl font-bold tracking-tight">{p.title}</h3>
              <p className="mt-4 flex-1 leading-relaxed text-blanc/70">{p.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="border border-white/15 px-2 py-1 text-[10px] tracking-[0.15em] text-muted uppercase">
                    {t}
                  </span>
                ))}
              </div>
              {p.repo && (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4 hover:text-muted"
                >
                  Ver código <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </article>
          );
        })}
      </div>

      <div className="mt-16 border border-white/15 p-8 md:p-12">
        <p className="mb-4 text-[11px] tracking-[0.4em] text-muted uppercase">Atualmente trabalhando em</p>
        <h3 className="text-3xl font-bold tracking-tight md:text-4xl">{IN_PROGRESS.title}</h3>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-blanc/80">{IN_PROGRESS.description}</p>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {IN_PROGRESS.stack.map((s) => (
            <li key={s} className="flex gap-3 text-blanc/80">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-blanc" />
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16">
        <h3 className="mb-6 text-sm tracking-[0.3em] text-muted uppercase">Cursos em progresso</h3>
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {COURSES.map((c) => (
            <li key={c} className="py-4 text-lg">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function Contact() {
  const links = [
    { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}`, icon: Mail },
    { label: "WhatsApp", value: "Enviar mensagem", href: PROFILE.whatsapp, icon: MessageCircle },
    { label: "LinkedIn", value: "leonardosimplicio", href: PROFILE.linkedin, icon: Briefcase },
    { label: "GitHub", value: "leotxsp", href: PROFILE.github, icon: GitBranch },
  ];
  return (
    <Section id="contato" label="04 — Contato" title="Contato">
      <p className="mb-12 max-w-2xl text-lg leading-relaxed text-blanc/80">
        Estou disponível para oportunidades de trabalho, projetos freelance ou apenas para trocar ideias sobre
        dados e tecnologia.
      </p>
      <ul className="grid gap-px bg-white/10 sm:grid-cols-2">
        {links.map((l) => {
          const Icon = l.icon;
          return (
            <li key={l.label} className="bg-noir">
              <a
                href={l.href}
                target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 p-8 transition-colors hover:bg-noir-2"
              >
                <div className="flex items-center gap-5">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                  <div>
                    <p className="text-[10px] tracking-[0.3em] text-muted uppercase">{l.label}</p>
                    <p className="mt-1 text-lg font-semibold break-all">{l.value}</p>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted transition-colors group-hover:text-blanc" />
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

function WhatsAppButton() {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={PROFILE.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`fixed right-6 bottom-6 z-50 grid h-14 w-14 place-items-center rounded-full border transition-all duration-300 ${
        hover ? "border-noir bg-blanc text-noir" : "border-white/20 bg-noir text-blanc"
      } shadow-[0_8px_30px_rgba(0,0,0,0.5)]`}
    >
      <MessageCircle className="h-6 w-6" strokeWidth={1.5} />
    </a>
  );
}

export default function App() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-noir text-blanc">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <footer className="border-t border-white/10 px-6 py-8 text-center text-[10px] tracking-[0.4em] text-muted uppercase md:px-12">
        © {new Date().getFullYear()} {PROFILE.name} — Developer | Data Scientist
      </footer>
      <WhatsAppButton />
    </main>
  );
}
