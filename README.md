# Leonardo Simplicio — Portfólio

Site one-page de portfólio (Developer | Data Scientist), feito com React 19, Vite e Tailwind CSS v4.
Publicado como site estático no GitHub Pages.

## Rodar localmente

Pré-requisito: Node.js 20+.

```bash
npm install
npm run dev       # http://localhost:5173
```

Outros comandos:

```bash
npm run build     # type-check + build de produção (saída em dist/)
npm run preview   # serve o build localmente
```

## Publicar no GitHub Pages

O deploy é automático via GitHub Actions (`.github/workflows/deploy.yml`) a cada push na branch `main`.

1. Crie um repositório no GitHub e envie este projeto para ele.
2. No repositório: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Faça push na `main`. O site ficará em `https://<seu-usuario>.github.io/<nome-do-repo>/`.

`vite.config.ts` usa `base: "./"`, então os caminhos funcionam tanto em `/<repo>/` quanto em domínio próprio na raiz.

## Ajustes rápidos

Todo o conteúdo fica em `src/App.tsx`:

- **Dados de contato e links**: objeto `PROFILE`.
- **Habilidades**: array `SKILLS`.
- **Certificações e badges**: arrays `CERTIFICATIONS` e `BADGES`.
- **Projetos**: array `PROJECTS`.
- **Em andamento / cursos**: `IN_PROGRESS` e `COURSES`.
- **Cores e fonte**: `src/styles.css` (bloco `@theme`).

## Estrutura

```
src/
  main.tsx      ponto de entrada
  App.tsx       todas as seções (Hero, Sobre, Habilidades, Projetos, Contato)
  styles.css    tema (Tailwind v4) e animações
index.html      meta tags (título, descrição, Open Graph) e fonte
```
