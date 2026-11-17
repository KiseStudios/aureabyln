# Áurea Beauty Studio · proposta visual v1

Direção de arte em revisão pelo responsável. A base estrutural orienta a ordem de leitura. As escolhas abaixo passam a orientar a implementação visual somente após aceite registrado. Nenhum token de marca está aprovado nesta versão.

## Handoff editável

| Referência | Frame | Captura desta revisão |
| --- | --- | --- |
| [Desktop · 1440 px](https://www.figma.com/design/hmKnzeyzoxJPO1ECJL3jnr/?node-id=12-2) | `12:2` | [Desktop](design-v1/desktop.webp) |
| [Mobile · 390 px](https://www.figma.com/design/hmKnzeyzoxJPO1ECJL3jnr/?node-id=12-93) | `12:93` | [Mobile](design-v1/mobile.webp) |
| [Sistema visual · variáveis e estados](https://www.figma.com/design/hmKnzeyzoxJPO1ECJL3jnr/?node-id=11-14) | `11:14` | Página de proposta `11:2` |

A página original conserva o sitemap (2:2), desktop (2:3), mobile (2:4), componentes (2:5) e anotações (2:6). “v1” identifica esta proposta e suas capturas de 15/11/2026. Os links de frames abrem a edição corrente do arquivo.

## Direção de arte e tokens propostos

Abertura em duas colunas, título em duas linhas e fotografia fechada sobre o olhar. O itálico dá ênfase à segunda linha. O CTA em vinho reaparece como campo de cor no contato. Filetes separam o catálogo editorial, que pode crescer sem fixar uma quantidade de serviços. Uma alternativa de cards fotográficos depende de receber catálogo e imagens consistentes. As curvas abstratas apresentam possibilidades de recorte para retrato e resultados.

| Variável Figma | Hex | Papel e combinação |
| --- | --- | --- |
| cor/paper | #F9F3EA | Fundo marfim e texto sobre vinho |
| cor/ink | #34241F | Texto principal sobre marfim ou rosa |
| cor/rose | #E3C6B6 | Fundo da seção Serviços |
| cor/wine | #713E44 | Acento, ação primária e fundo do contato |
| cor/hover | #553039 | Fundo da ação ao passar o ponteiro |
| cor/line | #B99F91 | Divisórias decorativas de 1 px |
| cor/mute | #61534E | Legendas em superfícies claras |
| cor/focus | #72450E | Anel externo de 3 px em superfície clara |
| cor/disabled | #D6C9C0 | Fundo de controle indisponível |

No CSS de proposta, `cor/wine` corresponde a `--color-aurea-wine`, e as demais cores seguem o mesmo padrão. O arquivo usa o bloco `@theme` do Tailwind 4. A aplicação não o importa. O carregamento das fontes será definido com o aceite.

| Uso | Desktop / mobile | Família e peso |
| --- | --- | --- |
| Título do Hero | 100 / 60 px | Instrument Serif, regular e itálico, 400 |
| Título de seção | 64 / 44 px | Instrument Serif, 400 |
| Contato | 72 / 44 px | Instrument Serif Italic, 400 |
| Corpo e navegação | 16–18 px | DM Sans, 400 ou 500 |
| Legenda | 14 px | DM Sans, 400 ou 500 |

Entrelinha proposta de 108% nos títulos e 140% no texto. Espaços de 4, 8, 16, 24, 32, 48, 64 e 96 px correspondem a múltiplos da unidade de 4 px do Tailwind. Fotos com cantos retos, sem sombra. Botão com raio de 100 px e padding de 16 × 24 px. Link textual sublinhado. No futuro componente, usar foco visível com afastamento e contraste adequado à superfície, inclusive foco claro sobre vinho. A amostra disabled documenta aparência. Um destino ausente impede renderizar link de agendamento.

## Composição e responsividade

Desktop com largura útil máxima de 1248 px, margens de 96 px em 1440, 12 colunas e gutter de 24 px. Mobile com 342 px úteis, margens de 24 px em 390, quatro colunas e gutter de 16 px. A partir de 768 px, testar o espaço antes de abrir a segunda coluna. A ordem mobile é título, CTA e imagem, com o menu compacto. A galeria conserva dois estudos lado a lado. Validar 320 px, zoom de 200% e navegação por teclado na implementação.

## Contratos e aprovação

O contrato `src/components/sections/anchors.ts` fixa as âncoras do sitemap. Header e Footer ficam fora do conteúdo principal. Entre Resultados e Contato, inserir Experiência e Confiança somente quando houver material com aceite e autorização. Sem esse material, a navegação segue diretamente para Contato.

Consumir `services`, `professional`, `images` e `imageSlots` de Felipe. Verificar `status === "approved"` por campo e conferir `approvalReference`. O catálogo real está vazio. Foto conceitual gerada por IA, grafismos, nome de apresentação e chamada editorial são material de revisão. Solicitar catálogo, biografia, retrato, resultados autorizados e texto e destino de agendamento. O Instagram serve de referência visual.

Para aprovar, registrar responsável, data, frames e versão aceita no Figma ou no PR. Revisar paleta, famílias, hierarquia, ritmo, direção fotográfica e CTA nos dois tamanhos. Vincular o aceite dos textos e imagens separadamente. Divergências devem retornar aos frames antes de promover o tema. Felipe faz a revisão cruzada do trabalho de Luan.

| PR | Responsável | Handoff após aceite |
| --- | --- | --- |
| 005 | Luan | Button, Container e Section, com foco, estados e grid responsivo |
| 006 | Felipe | Header e menu mobile usando as âncoras compartilhadas |
| 007 | Kaua | Footer e cards atribuídos com os estados do caderno |
| 008 | Luan | Hero com texto e fotografia autorizados |
| 009 | Felipe | Serviços a partir do catálogo aprovado |
| 010 | Felipe | Sobre com nome público, biografia e retrato aprovados |
| 011 | Kaua | Galeria com autorização e texto alternativo de cada foto |
| 012 | Kaua | Contato com texto e destino de WhatsApp confirmados |

## PR-005 · componentes disponíveis

Importe `Button`, `Container` e `Section` de `@/components/ui`. Os três aceitam `children`, `className`, ref e atributos nativos do elemento correspondente. Funcionam em Server Components. Um consumidor com manipuladores como `onClick` deve ser um Client Component.

| Componente | Contrato funcional e medidas provisórias |
| --- | --- |
| Button | `variant="primary"\| "secondary"`, `size="regular"\| "compact"`. Padrão primary/regular. Alturas mínimas de 48/44 px. Ação nativa com `type="button"` por padrão e suporte a submit, reset e disabled. Com href válido, renderiza âncora nativa interna ou externa. A tipagem exclui disabled em links. |
| Container | Div centralizada. Padding lateral de 24 px, 48 px a partir de 768 e 96 px a partir de 1280. Limite externo de 1440 px incluindo padding, equivalente aos 1248 px úteis de `--container-aurea` no desktop. Aos 390 px restam 342 px úteis. |
| Section | Seção semântica com padding vertical de 48, 64 e 96 px nos mesmos intervalos. Passe id e aria-labelledby. O consumidor escolhe o heading adequado e compõe Container quando precisar de alinhamento. |

A geometria segue o estudo v1. Os controles usam tons neutros até a aprovação das cores paper, wine, hover, focus e disabled. A cápsula antecipa o papel de radius-aurea-action. A variante secundária é uma alternativa funcional de contorno em revisão. O tema de proposta continua isolado.

```tsx
import { sectionAnchors } from "@/components/sections/anchors";
import { Button, Container, Section } from "@/components/ui";

<Section id={sectionAnchors.gallery} aria-labelledby="gallery-title">
  <Container>
    <h2 id="gallery-title">Resultados</h2>
    <Button href={`#${sectionAnchors.hero}`} variant="secondary">Voltar ao início</Button>
  </Container>
</Section>
```

Para agendamento, o consumidor verifica o contrato do PR-002 antes de passar o destino. Exemplo com um objeto `service` do tipo `Service`:

```tsx
const { cta } = service;
return cta.status === "approved" && cta.value?.href.trim()
  ? <Button href={cta.value.href}>{cta.value.label}</Button>
  : null;
```

Felipe pode compor o Header com Container, usar Button como ação do menu e âncoras para destinos reais. Kaua pode alinhar o Footer com Container e usar Button como link de card quando houver destino. Evitar controles interativos aninhados. Usar Section para agrupamentos temáticos dentro da página e os elementos header/footer para os respectivos marcos.

### Revisão local

Execute `npm ci` e `npm run dev` e abra `/dev/componentes`. Preencha o campo e acione “Limpar campo” por teclado. Com Tab, confira o anel de foco, o salto sobre o controle indisponível e o link “Ver estrutura”. Compare 390 e 1440 px. A rota retorna 404 no build de produção. A identidade definitiva e o uso de fotos e conteúdo continuam sujeitos ao aceite.

## PR-009 · Serviços

Felipe mantém o catálogo em `src/content/services.ts`. A seção lê o contrato `Service` e exibe somente entradas com nome aprovado e referência de aceite. Descrição, imagem e CTA têm aprovações independentes. O Card do PR-007 mantém a semântica de artigo na ausência de ação válida. Um destino aprovado transforma o card em um único link, identificado com o nome e o texto da ação. A imagem opcional usa next/image e a proporção 4:3 do Card.

Com o catálogo atual vazio, o H2 e o estado “Catálogo em curadoria” seguem os frames [desktop](https://www.figma.com/design/hmKnzeyzoxJPO1ECJL3jnr/?node-id=12-17) e [mobile](https://www.figma.com/design/hmKnzeyzoxJPO1ECJL3jnr/?node-id=12-108). A seção usa os tons rosa, tinta e filete da proposta v1 e os mesmos arquivos de fontes locais do Hero. O aceite visual continua pendente. A grade com itens preenchidos é uma hipótese para revisão quando houver catálogo. A cliente ainda precisa fornecer nomes, descrições, fotos autorizadas e destinos. Preços dependem de conteúdo e contrato próprios.

Para revisão, execute `npm ci` e `npm run dev`. Em `/dev/servicos` confira o catálogo atual. Abra “Conferir amostras de cards” para comparar um link com imagem e um artigo sem imagem usando dados simulados exclusivos da prévia. O PR inclui capturas nas três larguras em `docs/pr-009/`.

Luan pode importar `Services` de `@/components/sections/Services`, inserir `<Services />` logo após `<Hero />` e incluir `sectionAnchors.services` em `Header.availableAnchors`. Para o PR-010, posicionar Sobre após Serviços. No PR-012, usar somente o destino de agendamento aprovado. Revisão cruzada do PR-009 atribuída a Kaua.

Validação local do PR-009: instalação pelo lockfile, lint, typecheck e build passaram. O Chromium confirmou o estado de curadoria e as amostras em 390, 820 e 1440 px, sem overflow horizontal, com foco e ativação por teclado no card com destino. O servidor compilado retornou 200 em / e 404 na prévia. O Next em desenvolvimento identificou o SVG de demonstração como LCP na prévia isolada; os cards continuam usando carregamento padrão para sua posição prevista abaixo do Hero.

## PR-010 · Sobre

Felipe mantém a apresentação em `src/content/about.ts`, pelo contrato `ProfessionalProfile` exportado em `@/content`. Nome, posicionamento e biografia são avaliados individualmente: somente um campo com `status: "approved"` e `approvalReference` não vazia é apresentado. O retrato segue a mesma regra e usa `next/image`, as dimensões intrínsecas e o texto alternativo fornecido no manifesto. O placeholder gráfico não é tratado como fotografia.

O layout de Sobre reorganiza a ordem para mobile (título, espaço do retrato, texto) e mantém a fotografia à esquerda e o conteúdo à direita em telas maiores. Sem material autorizado, a seção informa que a apresentação está em curadoria, sem publicar nome, cargo, trajetória ou credenciais presumidas. A prévia `/dev/sobre` usa textos explicitamente fictícios e retorna 404 fora do ambiente de desenvolvimento.

Para revisar, execute `npm ci` e `npm run dev`, abra `/dev/sobre` e confira 390, 820 e 1440 px, leitura, ausência de overflow e contraste. O conteúdo da prévia é apenas amostra técnica; não copiar para o manifesto público.

A integração na página principal permanece separada: Luan pode importar `About` de `@/components/sections/About`, inserir `<About />` logo após `<Services />` e habilitar `sectionAnchors.about` em `Header.availableAnchors` quando a seção estiver integrada. Esta entrega não altera `page.tsx`, Header, Footer, tokens globais nem os contratos de conteúdo.

**Bloqueios de aceite:** a proposta visual desktop/mobile ainda precisa de aprovação registrada; a cliente precisa fornecer e autorizar o retrato e aprovar nome público, posicionamento e biografia. Até lá, o estado em curadoria é intencional e a entrega deve permanecer em rascunho.
