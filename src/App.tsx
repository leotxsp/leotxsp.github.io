import { useEffect, useState, type ReactNode } from "react";
import {
  Mail,
  Briefcase,
  GitBranch,
  MessageCircle,
  ArrowUpRight,
  ArrowLeft,
  Code2,
  Database,
  Cloud,
  Brain,
  Globe,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import SplitHero from "./SplitHero";
import EmailPage from "./EmailPage";

const PROFILE = {
  name: "Leonardo Simplicio",
  role: "Developer | Data Scientist",
  email: "leotxsp@gmail.com",
  linkedin: "https://www.linkedin.com/in/leonardosimplicio/",
  github: "https://github.com/leotxsp",
  whatsapp: "https://wa.me/559193326166",
};

type Skill = { name: string; area: string; level: "Beginner" | "Intermediate"; icon: LucideIcon };

const DEV_SKILLS: Skill[] = [
  { name: "Python", area: "Programming", level: "Beginner", icon: Terminal },
  { name: "Java", area: "Programming", level: "Beginner", icon: Terminal },
  { name: "TypeScript", area: "Programming", level: "Beginner", icon: Terminal },
  { name: "JavaScript", area: "Web", level: "Beginner", icon: Globe },
  { name: "React", area: "Web", level: "Beginner", icon: Globe },
  { name: "Node.js", area: "Web", level: "Beginner", icon: Globe },
  { name: "AWS", area: "Cloud", level: "Beginner", icon: Cloud },
];

const DATA_SKILLS: Skill[] = [
  { name: "Data Science", area: "Data", level: "Beginner", icon: Database },
  { name: "Machine Learning", area: "Data", level: "Beginner", icon: Brain },
  { name: "TensorFlow", area: "AI", level: "Beginner", icon: Brain },
  { name: "SQL", area: "Database", level: "Intermediate", icon: Database },
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

type Project = { title: string; description: string; tags: string[]; repo?: string; icon: LucideIcon };

const DEV_PROJECTS: Project[] = [
  {
    title: "XML Handler",
    description:
      "Ferramenta em Python que manipula XMLs de notas fiscais e os exibe em uma tabela PyQt para visualização. Usa pandas e ElementTree.",
    tags: ["Python", "PyQt", "XML", "Pandas", "Backend"],
    repo: "https://github.com/leotxsp/XMLHandler",
    icon: Code2,
  },
  {
    title: "Site de Portfólio",
    description: "Este site: portfólio online feito com Vite, Tailwind CSS e React, publicado no GitHub Pages.",
    tags: ["Vite", "Tailwind", "TypeScript", "React", "Frontend"],
    icon: Globe,
  },
];

const DATA_PROJECTS: Project[] = [
  {
    title: "Deep Audio Classifier",
    description:
      "Projeto de IA que reconhece sons e os classifica em categorias específicas, com modelos de aprendizado de máquina treinados para reconhecer cantos de pássaros.",
    tags: ["Python", "TensorFlow", "Matplotlib", "Pandas", "AI"],
    repo: "https://github.com/leotxsp/Ai-Para-reconhecimento-de-som-Deep-Audio-Classifier-",
    icon: Brain,
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

const DEV_COURSES = ["Formação React Native Developer — DIO"];
const DATA_COURSES = ["Formação Machine Learning Specialist — DIO", "Formação SQL Database Specialist — DIO"];

function Section({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return (
    <section className="border-t border-white/10 px-6 py-16 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-[11px] tracking-[0.5em] text-muted uppercase">{label}</p>
        <h2 className="mb-12 text-4xl leading-none font-bold tracking-tight md:text-6xl">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function SubHeader({ side }: { side: "dev" | "data" }) {
  const other = side === "dev" ? { href: "#/data", label: "Data" } : { href: "#/dev", label: "Dev" };
  return (
    <header className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-5 text-[11px] tracking-[0.35em] uppercase md:px-12">
      <a href="#/" className="inline-flex items-center gap-2 hover:text-muted">
        <ArrowLeft className="h-4 w-4" /> Início
      </a>
      <span className="font-semibold">{PROFILE.name}</span>
      <a href={other.href} className="text-muted hover:text-blanc">
        {other.label} →
      </a>
    </header>
  );
}

function PageHero({ label, title, subtitle }: { label: string; title: string; subtitle: string }) {
  return (
    <div className="px-6 pt-20 pb-16 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 text-[11px] tracking-[0.5em] text-muted uppercase">{label}</p>
        <h1 className="text-6xl leading-[0.9] font-bold tracking-tight md:text-8xl">{title}</h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-blanc/80">{subtitle}</p>
      </div>
    </div>
  );
}

function SkillList({ items }: { items: Skill[] }) {
  return (
    <ul className="divide-y divide-white/10 border-y border-white/10">
      {items.map((s) => {
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
  );
}

function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-px bg-white/10 md:grid-cols-2">
      {projects.map((p) => {
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
  );
}

function InProgress() {
  return (
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
  );
}

function CourseList({ courses }: { courses: string[] }) {
  return (
    <div className="mt-16">
      <h3 className="mb-6 text-sm tracking-[0.3em] text-muted uppercase">Cursos em progresso</h3>
      <ul className="divide-y divide-white/10 border-y border-white/10">
        {courses.map((c) => (
          <li key={c} className="py-4 text-lg">
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DevPage() {
  return (
    <>
      <SubHeader side="dev" />
      <PageHero
        label="Lado Dev"
        title="Código. Sistemas."
        subtitle="Desenvolvimento de ferramentas em Python e sistemas web com React, Node.js e AWS."
      />
      <Section label="01 — Projetos" title="Projetos">
        <ProjectGrid projects={DEV_PROJECTS} />
        <InProgress />
      </Section>
      <Section label="02 — Habilidades" title="Stack de desenvolvimento">
        <SkillList items={DEV_SKILLS} />
        <CourseList courses={DEV_COURSES} />
      </Section>
      <AboutAndContact />
    </>
  );
}

function DataPage() {
  return (
    <>
      <SubHeader side="data" />
      <PageHero
        label="Lado Data"
        title="Dados. Insight."
        subtitle="Automação de processos com dados, aprendizado de máquina e SQL, com foco em resolver problemas do mundo real."
      />
      <Section label="01 — Projetos" title="Projetos">
        <ProjectGrid projects={DATA_PROJECTS} />
      </Section>
      <Section label="02 — Habilidades" title="Dados & IA">
        <SkillList items={DATA_SKILLS} />
        <CourseList courses={DATA_COURSES} />
      </Section>
      <Section label="03 — Certificações" title="Certificações & badges">
        <ul className="mb-12 space-y-4">
          {CERTIFICATIONS.map((c) => (
            <li key={c} className="border-l border-white/20 pl-5 text-lg">
              {c}
            </li>
          ))}
        </ul>
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
      </Section>
      <AboutAndContact />
    </>
  );
}

function AboutAndContact() {
  return (
    <>
      <Section label="Sobre" title="Sobre mim">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-6 text-lg leading-relaxed text-blanc/80">
            <p>
              Sou um estudante fascinado por dados. Tudo começou ajudando na loja dos meus pais: aos 16 anos, eu
              criava pequenos scripts em Excel/VBA para automatizar tarefas repetitivas, como alimentar planilhas de
              vendas a partir de outras fontes.
            </p>
            <p>
              Hoje uso tecnologia para facilitar processos, como o cadastro de notas fiscais no sistema de gestão, com
              técnicas como{" "}
              <a className="underline underline-offset-4 hover:text-blanc" href="https://pt.wikipedia.org/wiki/Reconhecimento_%C3%B3tico_de_caracteres" target="_blank" rel="noopener noreferrer">OCR</a>{" "}
              e{" "}
              <a className="underline underline-offset-4 hover:text-blanc" href="https://pt.wikipedia.org/wiki/Extract,_transform,_load" target="_blank" rel="noopener noreferrer">ETL</a>.
            </p>
            <p>
              Com formação em tecnologia e certificações em AWS e programação, junto com a minha noção de processos,
              busco novas formas de aplicar o poder dos dados para resolver problemas do mundo real.
            </p>
          </div>
          <div className="space-y-6 border-l border-white/15 pl-8 text-lg leading-relaxed text-blanc/80">
            <p>
              Quando não estou codificando ou analisando dados, gosto de explorar habilidades pessoais como musculação e
              corrida.
            </p>
            <p>
              Meu próximo objetivo de desenvolvimento pessoal está focado em comunicação, com ênfase em oratória e
              storytelling.
            </p>
          </div>
        </div>
      </Section>
      <Contact />
    </>
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
    <Section label="Contato" title="Contato">
      <p className="mb-12 max-w-2xl text-lg leading-relaxed text-blanc/80">
        Estou disponível para oportunidades de trabalho, projetos freelance ou apenas para trocar ideias sobre dados e
        tecnologia.
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

// Hash routing (#/, #/dev, #/data): GitHub Pages serves only the root, so path routes would 404 on reload.
function useHashRoute() {
  const read = () => window.location.hash.replace(/^#\/?/, "");
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const onChange = () => {
      setRoute(read());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

export default function App() {
  const route = useHashRoute();
  let page: ReactNode;
  if (route === "dev") page = <DevPage />;
  else if (route === "data") page = <DataPage />;
  else if (route === "email") page = <EmailPage />;
  else page = <SplitHero />;

  return (
    <main className="min-h-screen overflow-x-hidden bg-noir text-blanc">
      {page}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-[10px] tracking-[0.4em] text-muted uppercase md:px-12">
        © {new Date().getFullYear()} {PROFILE.name} — Developer | Data Scientist
      </footer>
      <WhatsAppButton />
    </main>
  );
}
