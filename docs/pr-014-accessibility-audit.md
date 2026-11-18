# PR-014 · Responsividade e acessibilidade

Auditoria da homepage integrada em `26da964`. Felipe responde pela entrega e Kaua pela revisão cruzada. Referências: planos individuais da Onda 3, [desktop](https://www.figma.com/design/hmKnzeyzoxJPO1ECJL3jnr/?node-id=12-2), [mobile](https://www.figma.com/design/hmKnzeyzoxJPO1ECJL3jnr/?node-id=12-93) e [sistema visual](https://www.figma.com/design/hmKnzeyzoxJPO1ECJL3jnr/?node-id=11-14).

## Achados e reteste

| Prioridade | Reprodução na main | Correção e resultado esperado | Referência |
| --- | --- | --- | --- |
| P1 | Em 320 px, ampliar a fonte raiz para 200% levava o documento a 369 px. Palavras do Hero e de Resultados extrapolavam as colunas. | Permitir quebra de palavras no conteúdo principal, inclusive nos filhos de grid. Permitir múltiplas linhas no link de salto focado. | WCAG 1.4.4 e 1.4.10 |
| P1 | O foco dos botões do diálogo era marrom sobre fundo escuro, com contraste 1,88:1. | Contorno claro sobre o painel, 15,34:1. Miniaturas mantêm o contorno escuro sobre fundo claro. | WCAG 1.4.11 e 2.4.7 |
| P2 | Abrir o menu com Espaço, pressionar Tab e Escape deixava o menu expandido. | Escape fecha e devolve o foco ao botão. O menu de navegação continua sendo uma divulgação não modal. | Navegação por teclado |
| P2 | A raiz do documento continuava rolável com o diálogo modal aberto. | O seletor do diálogo aberto bloqueia a rolagem de fundo enquanto o diálogo mantém rolagem própria. | Interação modal |

Arquivos funcionais: `src/app/globals.css`, `src/components/layout/Header.tsx`, `src/components/sections/Gallery.module.css` e `src/app/dev/resultados/page.tsx`. A rota de desenvolvimento aceita `?estado=unica` para reproduzir o caso de uma única imagem. As APIs dos componentes e os contratos de aprovação da cliente foram preservados.

## Evidências e cobertura

[320 px](pr-014/homepage-320.webp) · [390 px](pr-014/homepage-390.webp) · [820 px](pr-014/homepage-820.webp) · [1440 px](pr-014/homepage-1440.webp) · [Menu](pr-014/menu.webp) · [Foco do salto](pr-014/foco.webp) · [Diálogo](pr-014/dialog.webp) · [Ampliação de página](pr-014/zoom-200.webp).

- Chromium controlado pelo Playwright. Na homepage, navegação pelas cinco âncoras do Header e do Footer em 320, 360, 375, 390, 430, 768, 820, 1024, 1280, 1440 e 1920 CSS px. Em 820 px a navegação é horizontal. A página cabe na janela em todas essas larguras.
- A primeira tabulação revela o salto. Enter move o foco para main. O botão do menu anuncia seu estado e Escape devolve o foco. No diálogo, Fechar recebe o foco inicial. Tab e Shift+Tab percorrem controles, setas avançam e retrocedem, Escape e o botão Fechar restauram o foco. Uma imagem em orientação horizontal não oferece anterior/próxima. Com quatro imagens, a posição é anunciada pelo contador.
- axe-core com os conjuntos WCAG A/AA até 2.2, em Chromium: homepage a 320 e 1440 px, prévias locais de cards de serviços, Sobre, Contato, componentes e Resultados, além do diálogo aberto. Zero violações detectadas nos estados examinados. A inspeção dos marcos encontrou banner, main e contentinfo e um único H1 na homepage.
- Contrastes calculados por luminância relativa sRGB: texto principal sobre papel 13,42:1, vinho sobre papel 7,69:1 e texto secundário sobre rosa 4,56:1. O teste de teclado permitiu identificar o contorno de foco do diálogo que a varredura automática não apontou.
- Reflow em 320 CSS px e ampliação de página simulada com CSS zoom de 200% em janela de 640 px. A fonte raiz ampliada em 200% foi testada separadamente em 320 px. O ensaio de zoom não aciona o controle nativo do navegador.
- A composição de texto/foto passa de duas colunas para uma. O Header implementado mede 80 px nas referências testadas e o Figma prevê 67 px. Os estados de curadoria substituem fotos e catálogo da proposta. Manter essas diferenças para julgamento editorial e aceite visual. O arquivo de design identifica a v1 como aguardando aceite.
- Para reproduzir, usar Node 24, executar `npm ci` e `npm run dev`, abrir a homepage e as rotas `/dev/servicos?estado=amostras`, `/dev/sobre` e `/dev/resultados`. Testar a mesma galeria com `?estado=unica`. As capturas da homepage usam o build de produção local; o diálogo usa amostras isoladas.

## Limitações e próximos passos

O teste cobriu Chromium. Permanecem pendentes Safari/iOS, Firefox e uso por pessoas com NVDA ou VoiceOver. A ausência de violações automáticas não certifica conformidade WCAG. Fotos, textos alternativos finais, catálogo, biografia e telefone oficial dependem da cliente. O fluxo de agendamento real depende da confirmação do número. Repetir a auditoria com esses materiais. No PR-015 medir LCP, CLS e INP em dispositivo móvel, sobretudo ao substituir placeholders e abrir a galeria.
