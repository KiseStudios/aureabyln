# CI e baseline técnico — PR-003

## Escopo e estado

Responsabilidade original: Kaua — Dev C. Branch: `chore/pr-003-ci-quality`; destino: `main`. Revisão prevista pela matriz dos PDFs: Luan — Dev A. A execução coordenada não substitui revisão independente; o autor do PR não aprova o próprio trabalho. O login do revisor ainda precisa ser identificado. Merge depende de autorização do responsável pelo projeto.

Base inspecionada: `55f8ede2197715f7434748f33fcf6be4e7c4662b`. PR-001 / #1 integrado em `a306ec2e74d9e134f1902a5724439aba9beff106`; PR-002 / #2 integrado em `55f8ede2197715f7434748f33fcf6be4e7c4662b`. Foram relidos os cinco PDFs de UX, engenharia e planos individuais referenciados em `architecture.md`.

O PR-003 acrescenta somente automação e documentação. Não altera dependências, lockfile, `src/content/`, assets, contratos de Felipe ou a interface da aplicação.

## Workflow

Arquivo: `.github/workflows/ci.yml`. Check: **CI / Lint, typecheck and build**.

- Eventos `pull_request` com destino a `main` (abertura, reabertura e novos commits) e `push` em `main`, sem filtros por caminho.
- Runner `ubuntu-24.04`; Node.js `24`, alinhado à `.nvmrc` e ao `engines`. A versão exata de Node e npm usada em cada execução aparece no passo Runtime versions; o npm fornecido pela distribuição Node é utilizado, sem instalação global adicional.
- Cache do npm identificado por `package-lock.json`. O cache não substitui `npm ci` e não armazena `node_modules` ou `.next`.
- Sequência: `npm ci` → `npm run lint` → `npm run typecheck` → `npm run build`.
- Não há suíte de testes nem script `test` na base inspecionada. Por isso não se usa `npm test --if-present` ou comando fictício. Ao integrar uma suíte real em um próximo PR, adicionar explicitamente seu comando ao workflow e a esta documentação.
- Permissão explícita `contents: read`, sem permissões de escrita. Checkout com `persist-credentials: false`. Sem segredos personalizados, deploy, publicação ou `pull_request_target`.
- Actions oficiais fixadas por SHA: checkout v7.0.1 (`3d3c42e5aac5ba805825da76410c181273ba90b1`) e setup-node v7.1.0 (`949feb2413d6458794dcd2491c4babbbce0c15c1`), verificadas contra suas tags oficiais. Atualizações devem revisar tag e SHA em conjunto.
- Timeout de 15 minutos; nova execução cancela a anterior do mesmo PR/ref. Não há `continue-on-error`, tolerância a falha ou aprovação automática.
- `CI=true` e telemetria do Next.js desabilitada durante a execução.

O primeiro evento `push` em `main` só poderá ser observado após um merge autorizado. A execução do evento de PR deve ser conferida no próprio PR; o resultado e o link do run ficam registrados na sua descrição. Esta documentação não antecipa aprovação da CI remota.

## Verificação local

Ambiente Linux compartilhado: Node.js 24.22.1, npm 11.9.0. Medidas coletadas em 15/11/2026 sobre a base indicada acima, com `CI=true` e `NEXT_TELEMETRY_DISABLED=1`.

| Verificação | Resultado observado |
| --- | --- |
| `npm ci` | Código 0; instalação pelo lockfile |
| actionlint 1.7.12 em `ci.yml` | Código 0, sem diagnósticos |
| `npm run lint` | Código 0; 2,29 s |
| `npm run typecheck` | Código 0; 1,52 s |
| `npm run build` | Código 0; 7,68 s totais, sem cache de build prévio |
| Compilação reportada pelo Next.js | 1.918 ms; rota `/` pré-renderizada estaticamente |

Os tempos são uma única amostra deste ambiente, não metas, SLA ou comparação direta com runners GitHub. O aviso de ausência de cache do Next.js é esperado; nesta entrega só é configurado cache npm.

### Propagação de falhas

Foram usados arquivos TypeScript temporários não versionados, removidos em seguida:

1. Declaração não utilizada: `npm run lint` retornou 1 por warning, conforme `--max-warnings=0`.
2. Atribuição de string a number: `npm run build` retornou 1 na checagem TypeScript.
3. Após remover os probes, lint, typecheck e build foram executados novamente e retornaram 0.

Isso confirma a detecção local dos erros e, junto à ausência de tolerância a falhas no job, a propagação esperada ao check. Não foi publicado commit defeituoso ou execução remota propositalmente falha.

### Baseline de arquivos gerados

| Métrica | Resultado |
| --- | --- |
| JavaScript em `.next/static` | 9 arquivos; 570.059 bytes brutos; 174.103 bytes com gzip individual |
| CSS em `.next/static` | 1 arquivo; 4.913 bytes brutos; 1.673 bytes com gzip individual |
| `public/images/` | 12 arquivos, incluindo README; 10.597 bytes |

Os totais JS/CSS somam todos os arquivos estáticos gerados, inclusive chunks compartilhados e rotas internas. Não representam o peso inicial transferido pela página ou medição de rede. O gzip foi calculado localmente por arquivo. Os assets existentes são placeholders e documentação, não fotografias finais.

Não há pontuação Lighthouse ou Core Web Vitals aferida. Este baseline mede a base técnica provisória; a avaliação de UX/performance final pertence ao PR-015, após integração da interface e imagens reais.

### Dependências e limitações conhecidas

- `npm audit --json`: 7 ocorrências moderadas na árvore de desenvolvimento (`minimatch` e pacotes da cadeia TypeScript/ESLint). Com `--omit=dev`: zero vulnerabilidades reportadas na consulta realizada. A contagem pode mudar com novos avisos do registro.
- Não foi executado `npm audit fix`, nem alterado o lockfile. A correção deve ser avaliada em entrega de dependências própria; a CI deste PR não declara um gate de audit aprovado.
- ESLint 9.39.5 informa fim de suporte, já registrado na arquitetura. Os comandos de qualidade passaram; o warning de instalação não equivale a aprovação de segurança.
- O ambiente local emite aviso de configuração npm `http-proxy`. Isso não alterou os códigos de saída dos comandos de qualidade.

## Reproduzir e revisar

```sh
npm ci
npm run lint
npm run typecheck
npm run build
```

Se actionlint 1.7.12 estiver instalado, validar também:

```sh
actionlint .github/workflows/ci.yml
```

No GitHub, conferir na aba Checks se instalação, lint, typecheck e build terminaram com sucesso. A CI verifica a combinação do PR com sua base; proteção de branch e obrigatoriedade do check são configurações administrativas, não alteradas por este PR. A aprovação de outro desenvolvedor continua necessária.

## Bloqueios do PR-004

Branch prevista: `feat/pr-004-design-foundation`. **Não criada nesta entrega.**

1. PR-003 precisa ser revisado e integrado à `main`, mediante autorização expressa. Abrir um PR ou obter CI verde não satisfaz esse pré-requisito.
2. Não há link de Figma desktop/mobile, versão ou referência de aceite no repositório e nos materiais fornecidos. O PDF UX é baixa fidelidade; a prancha Instagram e os SVGs do PR-002 não autorizam inventar tokens.

Depois de satisfazer ambos, sincronizar a `main`, examinar o arquivo aprovado e iniciar o PR-004 separado. Não foram criados tokens definitivos, stubs ou `docs/design-system.md` antes desse gate.

## Referências

- [actions/checkout v7.0.1](https://github.com/actions/checkout/tree/v7.0.1)
- [actions/setup-node v7.1.0](https://github.com/actions/setup-node/tree/v7.1.0)
- [actionlint v1.7.12](https://github.com/rhysd/actionlint/releases/tag/v1.7.12)
