# Áurea Beauty Studio

Website institucional da Áurea Beauty Studio, de Lorrayne Nunes, desenvolvido pela Kise Studios. O MVP apresentará a profissional, serviços e resultados autorizados e encaminhará visitantes para uma conversa no WhatsApp. Essas funcionalidades ainda não foram implementadas.

## Estado atual: PR-001 / Onda 0

Somente a fundação técnica está implementada. A rota `/` contém uma identificação neutra e a mensagem de preparação técnica. Não há conteúdo comercial, componentes finais, integrações, autenticação, banco de dados, APIs ou publicação em produção.

O **Figma aprovado é a fonte oficial da interface**: desktop, mobile, tipografia, cores, espaçamentos e interações. PDFs e a prancha do Instagram @aureabyln são referências de planejamento e conteúdo; não substituem o handoff. O link e o registro de aprovação do Figma ainda precisam ser fornecidos antes do PR-004. Nenhuma imagem da prancha foi incorporada à aplicação.

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
git switch chore/pr-001-foundation
npm ci
npm run dev
```

Durante a revisão, utilize a branch acima. Após o merge autorizado, novos trabalhos devem partir da `main` atualizada.

Acesse http://localhost:3000. `npm ci` reproduz o lockfile; use `npm install` ao alterar dependências, revisando o diff do manifesto e do lockfile. Nenhuma variável de ambiente é necessária nesta etapa, portanto não há `.env.example`.

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

Lint é independente do build e deve ser executado explicitamente. `next typegen` permite verificar tipos também em um checkout limpo. `next-env.d.ts`, `.next/` e arquivos incrementais são gerados localmente e não são versionados. Não existe suíte de testes nem script `test` nesta entrega. Os workflows de CI pertencem ao PR-003.

## Estrutura inicial

```text
src/
  app/
    layout.tsx       # Documento raiz, idioma pt-BR e CSS global
    page.tsx         # Página provisória de verificação
    globals.css      # Tailwind e estilos neutros provisórios
  components/
    ui/              # Reservado aos componentes compartilhados
    layout/          # Reservado a componentes de estrutura
    sections/        # Reservado às seções futuras
  lib/               # Reservado a funções compartilhadas
  types/             # Reservado a tipos compartilhados
public/              # Reservado a arquivos estáticos
docs/
  architecture.md    # Decisões e limites técnicos
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

Diretórios reservados e vazios não são rastreados pelo Git: estão documentados aqui e serão criados quando receberem arquivos reais. O alias `@/*` aponta para `src/*`. `src/content/` e `public/images/` serão preparados exclusivamente por Felipe no PR-002.

## Colaboração e responsabilidades

| Responsável | PRs | Áreas |
| --- | --- | --- |
| Luan — Dev A | 001, 004, 005, 008, 013 | Fundação, `src/app/`, estilos globais, tokens, Button/Container/Section, Hero, SEO e integração |
| Felipe — Dev B | 002, 006, 009, 010, 014 | `src/content/`, `public/images/`, Header/menu mobile, Serviços, Sobre e acessibilidade/responsividade |
| Kaua — Dev C | 003, 007, 011, 012, 015 | CI, Footer, cards atribuídos, Galeria, Contato/WhatsApp e performance |

Cada entrega utiliza uma branch e um Pull Request próprio. Antes de começar, sincronize a `main`, crie a branch da tarefa e mantenha o trabalho dentro do seu escopo. Antes de pedir revisão, atualize a branch com a `main`, resolva conflitos e execute lint, typecheck, build e testes que existirem.

Revisão cruzada: **Felipe revisa Luan; Kaua revisa Felipe; Luan revisa Kaua**. Ninguém aprova o próprio PR. Mudanças em arquivos de outro responsável precisam de alinhamento. O PR-001 utiliza `chore/pr-001-foundation` e tem a `main` como destino. Não realizar merge sem autorização do responsável pelo projeto.

## Próximas dependências

- **PR-002 / Felipe:** iniciar após revisão, aceite e merge autorizado do PR-001, a partir da `main` atualizada. Preparar conteúdo tipado e assets, com placeholders identificados e sem inventar informações.
- **PR-003 / Kaua:** iniciar a partir da mesma base integrada, usando scripts e lockfile deste PR. Criar CI e sua própria trilha de qualidade; não assumir testes inexistentes.
- **PR-004 e UI posterior:** dependem da Onda 0 integrada e do handoff Figma desktop/mobile aprovado. Tokens, componentes, stubs e seções ficam para seus PRs próprios.

Aprovação da cliente e do CEO é obrigatória para publicar em produção. Este PR não configura deploy nem serviços externos.

As decisões técnicas e as referências documentais estão em [docs/architecture.md](docs/architecture.md).
