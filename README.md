# Áurea Beauty Studio

Website institucional da Áurea Beauty Studio, desenvolvido pela Kise Studios.

## Homepage integrada para homologação

A rota `/` reúne Header, Hero, Serviços, Sobre, Resultados, Contato e Footer. Quando faltam materiais autorizados, as seções exibem seus estados de curadoria. O agendamento depende da configuração validada do canal de WhatsApp.

O **Figma aprovado é a fonte oficial da interface**: desktop, mobile, tipografia, cores, espaçamentos e interações. PDFs e a prancha do Instagram @aureabyln são referências de planejamento e conteúdo; não substituem o handoff. A proposta visual v1 do PR-004 aguarda aceite. Veja os frames e os critérios em [docs/design-system.md](docs/design-system.md). Nenhuma imagem da prancha foi incorporada à aplicação.

## Tecnologias

| Tecnologia | Versão definida |
| --- | --- |
| Node.js | 24.x (validado com 24.22.1) |
| npm | 11.x (validado com 11.9.0) |
| Next.js / App Router | 16.4.6 |
| React / React DOM | 19.3.1 |
| TypeScript | 6.0.3, modo strict |
| Tailwind CSS / plugin PostCSS | 4.3.5 |
| ESLint | 9.39.5, flat config |
| eslint-config-next | 16.4.6 |

npm é o único gerenciador adotado. Versionar `package-lock.json`; as versões efetivamente resolvidas, inclusive tipos e dependências transitivas, constam nele. Não adicionar lockfiles de outros gerenciadores.

## Pré-requisitos e instalação

Instale Git, Node.js 24.x e npm 11.x. A `.nvmrc` permite selecionar a linha 24 com `nvm use` quando o nvm estiver disponível.

```sh
git clone https://github.com/KiseStudios/aureabyln.git
cd aureabyln
git switch main
npm ci
npm run dev
```

Para revisar esta entrega, use `git fetch origin` e `git switch feat/pr-004-design-foundation`. Novos trabalhos devem partir da `main` atualizada após seus pré-requisitos serem integrados.

Acesse http://localhost:3000. `npm ci` reproduz o lockfile; use `npm install` ao alterar dependências, revisando o diff do manifesto e do lockfile. O preview funciona com a configuração padrão de [.env.example](.env.example). Consulte a estratégia de publicação em [docs/architecture.md](docs/architecture.md#homepage-integrada-e-seo).

## Comandos disponíveis

| Comando | Resultado |
| --- | --- |
| `npm run dev` | Inicia o desenvolvimento local com Next.js/Turbopack |
| `npm run lint` | Executa ESLint, falhando também em warnings |
| `npm run typecheck` | Gera os tipos de rotas e executa TypeScript sem emitir JavaScript |
| `npm run build` | Gera a compilação de produção |
| `npm start` | Serve a compilação existente; requer `npm run build` antes |

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

Lint é independente do build e deve ser executado explicitamente. `next typegen` permite verificar tipos também em um checkout limpo. `next-env.d.ts`, `.next/` e arquivos incrementais são gerados localmente e não são versionados. Não existe suíte de testes nem script `test` nesta entrega. A CI do PR-003 executa instalação, lint, typecheck e build em PRs para `main` e pushes em `main`. Veja [docs/ci-quality.md](docs/ci-quality.md) para baseline, validações e limites.

## Estrutura inicial

```text
src/
  app/
    layout.tsx       # Documento raiz, idioma pt-BR e CSS global
    page.tsx         # Página provisória de verificação
    globals.css      # Tailwind e estilos neutros provisórios
  content/           # Contratos e placeholders do PR-002
  components/
    ui/              # Reservado aos componentes compartilhados
    layout/          # Reservado a componentes de estrutura
    sections/        # Reservado às seções futuras
  lib/               # Reservado a funções compartilhadas
  types/             # Reservado a tipos compartilhados
public/
  images/            # Manifesto visual, placeholders e orientações do PR-002
.github/workflows/
  ci.yml             # CI de instalação, lint, tipos e build
docs/
  architecture.md    # Decisões e limites técnicos
  ci-quality.md      # Baseline técnico, CI e gate do PR-004
README.md
AGENTS.md            # Contexto do projeto e documentação local do Next.js
eslint.config.mjs
next.config.ts
postcss.config.mjs
tsconfig.json
package.json
package-lock.json
.nvmrc
.editorconfig
.gitattributes
.gitignore
```

Diretórios reservados e vazios não são rastreados pelo Git: estão documentados aqui e serão criados quando receberem arquivos reais. O alias `@/*` aponta para `src/*`. `src/content/` e `public/images/` foram preparados no PR-002 e permanecem sob responsabilidade de Felipe.

## Colaboração e responsabilidades

| Responsável | PRs | Áreas |
| --- | --- | --- |
| Luan — Dev A | 001, 004, 005, 008, 013 | Fundação, `src/app/`, estilos globais, tokens, Button/Container/Section, Hero, SEO e integração |
| Felipe — Dev B | 002, 006, 009, 010, 014 | `src/content/`, `public/images/`, Header/menu mobile, Serviços, Sobre e acessibilidade/responsividade |
| Kaua — Dev C | 003, 007, 011, 012, 015 | CI, Footer, cards atribuídos, Galeria, Contato/WhatsApp e performance |

Cada entrega utiliza uma branch e um Pull Request próprio. Antes de começar, sincronize a `main`, crie a branch da tarefa e mantenha o trabalho dentro do seu escopo. Antes de pedir revisão, atualize a branch com a `main`, resolva conflitos e execute lint, typecheck, build e testes que existirem.

Revisão cruzada: **Felipe revisa Luan; Kaua revisa Felipe; Luan revisa Kaua**. Ninguém aprova o próprio PR. Mudanças em arquivos de outro responsável precisam de alinhamento. O PR-003 utiliza `chore/pr-003-ci-quality` e tem a `main` como destino. A revisão prevista para o trabalho de Kaua é de Luan, sempre por conta distinta do autor do PR. Não realizar merge sem autorização do responsável pelo projeto.

## Próximas dependências

- **PR-001 e PR-002:** integrados. Os contratos de conteúdo de Felipe estão disponíveis, com aprovações ainda pendentes nos campos marcados como placeholders.
- **PR-003 / Kaua:** CI integrada à main.
- **PR-004 / Luan:** proposta visual desktop/mobile em revisão por Felipe e pelo responsável. A adoção do tema depende do aceite.

Aprovação da cliente e do CEO é obrigatória para publicar em produção. Este PR não configura deploy nem serviços externos.

As decisões técnicas e as referências documentais estão em [docs/architecture.md](docs/architecture.md).
