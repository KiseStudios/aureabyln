# Arquitetura inicial — PR-001

Fundação, contratos de conteúdo e CI integrados à main. O PR-004 introduz a proposta visual em revisão.

## Referências e precedência

Foram consultados `Aureabyln Projeto Estrutura.pdf` (sitemap, wireframes e handoff), `Kise Aureabylnprojeto.pdf` (DOC-ENG-001, v1.1) e os planos individuais `Kise AureabylnLuan.pdf`, `Kise AureabylnFelipe.pdf` e `Kise AureabylnKaua.pdf` (v1.2). A prancha @aureabyln é material de apoio; suas imagens não são assets originais da aplicação.

O Figma aprovado será a referência oficial da interface. O PDF UX representa baixa fidelidade, com medidas e interações propostas, sujeitas à validação. Não converter essas propostas em tokens ou componentes definitivos neste PR. Frames e versão da proposta estão em [design-system.md](design-system.md). O aceite visual está pendente.

## Decisões técnicas

1. **Next.js 16.4.6, App Router e React 19.3.1:** uma única rota provisória em `src/app/`, com Server Components por padrão. Não há necessidade de estado cliente, endpoints, autenticação ou persistência. A escolha não define provedor de hospedagem ou estratégia de deploy.
2. **Node.js 24.x e npm 11.x:** uma linha comum para desenvolvimento e futura CI. `.nvmrc`, `engines` e `packageManager` registram o contrato. O lockfile do npm é versionado para instalações reproduzíveis com `npm ci`.
3. **TypeScript 6.0.3 strict:** resolução de módulos `bundler`, ausência de emissão e alias `@/*` para `src/*`. `next typegen && tsc --noEmit` gera os tipos necessários antes da checagem, inclusive em checkout limpo. Arquivos gerados não são versionados.
4. **Tailwind CSS 4.3.5:** integração com `@tailwindcss/postcss` e `@import "tailwindcss"`. A versão 4 dispensa um `tailwind.config` vazio. Nenhuma paleta, fonte de marca ou breakpoint definitivo foi configurado. As poucas utilities e a fonte do sistema servem apenas à página temporária.
5. **ESLint 9.39.5:** flat config com `eslint-config-next` na mesma versão do Next.js, regras Core Web Vitals e TypeScript. O script chama a CLI do ESLint diretamente e rejeita warnings. Lint não é implícito no build do Next.js 16. A linha 10 foi avaliada, mas os plugins transitivos de importação, React e acessibilidade ainda declaram peers até a linha 9. Foi mantido ESLint 9.39.5 para respeitar esses contratos, sem overrides ou legacy-peer-deps. O npm informa depreciação por fim de suporte dessa linha; reavaliar a atualização quando todos os plugins declararem compatibilidade.
6. **Dependências mínimas:** sem biblioteca de UI, animação, ícones, fontes remotas, analytics ou ferramenta de testes. Testes e CI devem ser introduzidos em suas entregas, com comandos reais.
7. **Separação de responsabilidades:** `app/` compõe a aplicação; `components/ui`, `components/layout` e `components/sections` receberão módulos futuros; `lib/` e `types/` receberão funções e tipos quando necessários. Diretórios vazios são documentados, sem arquivos artificiais.
8. **Segurança e colaboração:** `.gitignore` exclui dependências, saída do framework, logs e variáveis locais; não há variáveis necessárias nem `.env.example`. `.editorconfig` e `.gitattributes` padronizam texto, indentação e finais de linha.

## Página provisória e limites

`layout.tsx` define o idioma `pt-BR` e importa os estilos. `page.tsx` renderiza somente um `main`, um título e uma mensagem de preparação. Não contém Header, Footer, Hero, serviços, galeria, contato, imagens ou informações comerciais. Metadados de SEO, Open Graph, robots e sitemap pertencem ao PR-013.

O PR-002 integrado acrescentou `src/content/` e assets provisórios. O PR-003 acrescenta o workflow de CI. Tokens/stubs do PR-004 e Button/Container/Section do PR-005 continuam fora desta entrega.

## Histórico e integração

O repositório remoto estava vazio na inspeção inicial: sem commits, branches ou PRs. A inicialização estabeleceu apenas um README mínimo na `main`; a fundação foi implementada em `chore/pr-001-foundation`. O acesso de escrita foi regularizado e os PRs #1 e #2 foram posteriormente integrados.

A matriz permanece: Felipe revisa Luan, Kaua revisa Felipe, Luan revisa Kaua. Não realizar merge automático ou autoaprovação. O PR-003 parte da `main` com PR-001/002 integrados. O PR-004 depende do handoff do Figma e do PR-003 integrado.

## Verificação e homologação local

```sh
npm ci
npm run lint
npm run typecheck
npm run build
npm run dev
# Em outro terminal, consultar http://localhost:3000
```

Para conferir a versão compilada, encerrar o servidor de desenvolvimento e executar `npm start`. O preview local permite revisão da fundação, sem configurar hospedagem ou publicar em produção. A validação final de UI com Figma ocorrerá nos PRs visuais.

## Fontes técnicas

- [Instalação e requisitos do Next.js](https://nextjs.org/docs/app/getting-started/installation)
- [ESLint no Next.js](https://nextjs.org/docs/app/api-reference/config/eslint)
- [Tailwind CSS com Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)

## CI e qualidade — PR-003

O workflow `.github/workflows/ci.yml` executa instalação pelo lockfile, lint, typecheck e build em PRs para main e pushes na main, com Node.js 24, cache npm, permissão `contents: read` e actions oficiais fixadas por SHA. Não há suíte de testes, segredos personalizados ou deploy. Falhas dos comandos interrompem o job; concorrência e timeout limitam execuções redundantes.

Resultados, baseline, limitações de dependências, revisão cruzada e bloqueios do PR-004 estão em [ci-quality.md](ci-quality.md). O PR-004 prepara tokens isolados em `src/styles/proposals/` e âncoras em `src/components/sections/`. A promoção do tema para o CSS global depende de aprovação visual.
