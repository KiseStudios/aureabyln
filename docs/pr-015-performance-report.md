# PR-015 · Performance e QA da homepage

**Parecer:** pronta para revisão de Luan. A autorização de publicação depende dos itens do [checklist operacional](release-readiness.md). O PR-014 entrou na main pelo merge `49d0c67`, que contém `25f2f06`. A consulta às revisões dos PRs #14 e #15 retornou listas vazias.

## Medições de laboratório

Lighthouse 13.6.0, Headless Chromium 153.0.8010.0, Linux, Node 24.22.3 e npm 11.9.0. Cada build foi servido com `next start` no loopback. Foram três navegações frias por perfil e por build, alternando mobile e desktop, doze ao todo. As medições abrangem a homepage com os estados editoriais efetivamente disponíveis.

| Perfil simulado | FCP e LCP antes, ms | FCP e LCP depois, ms | CLS antes → depois | TBT |
| --- | --- | --- | --- | --- |
| Mobile 412 × 823, RTT 150 ms, 1.638 kb/s, CPU 4× | 914 (909–927) | 916 (914–921) | 0,029 → 0,029 | 0 ms |
| Desktop 1350 × 940, RTT 40 ms, 10.240 kb/s, CPU 1× | 254 (249–255) | 252 (249–277) | 0,008 → 0,008 | 0 ms |

A tabela apresenta medianas e intervalos. Neste conteúdo, FCP e LCP coincidiram. Os tempos oscilaram entre execuções. A redução reproduzível foi de rede: **16 → 14 requisições e 224.030 → 219.658 bytes transferidos**. Duas requisições de prefetch RSC vieram dos links de navegação por fragmento. Header e Footer agora usam âncoras nativas; a navegação continua dentro do documento. O JavaScript transferido passou de 148.857 a 148.849 bytes (oito scripts). Não há ganho relevante de bundle. [Valores individuais](pr-015/lighthouse.csv).

O Lighthouse informou `NO_SCREENSHOTS` na análise da sequência de pintura. Speed Index e nota global ficaram sem resultado. A tentativa adicional com outro binário Chromium falhou na abertura da porta de depuração. As capturas de revisão são screenshots independentes. INP de usuários e percentil 75 dependem de tráfego real. O TBT acima é de laboratório.

## Assets e renderização

A homepage renderiza no servidor. Header mantém estado local para o menu, e a galeria reserva a interatividade ao lightbox quando há fotos autorizadas. A página atual carrega três fontes locais WOFF2, 58.260 bytes transferidos no total, com `font-display: swap` e licenças OFL no diretório de fontes. Sem chamadas a terceiros ou transferências de fotos no carregamento medido. O CSS reserva o quadro do Hero e a imagem autorizada usa `next/image`, `sizes`, preenchimento e preload. Miniaturas têm dimensões e carregamento sob demanda, e o diálogo só monta a ampliação da imagem ativa.

Um ensaio local substituiu o gráfico do Hero no navegador por uma imagem de ruído de 1000 × 1200, JPEG de 567.826 bytes, e solicitou a variante de 1080 px pelo otimizador do Next. Foram 693.396 bytes reportados pela entrada de recurso. As caixas mantiveram exatamente 342 × 348 px no mobile e 600 × 552 no desktop durante a troca. O ensaio valida a geometria; compressibilidade, enquadramento e LCP com fotografia definitiva continuam pendentes. A imagem de ensaio não integra a branch.

## QA e regressões

- Os builds locais e a CI executam lint, typecheck, build e três testes com o runner nativo do Node. Para reproduzir em homologação: `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm test`. Os testes verificam aprovação de conteúdo, telefones, mensagem codificada e HTML/robots/sitemap gerados. O Hero passa a exigir a mesma referência de aceite conferida em Sobre e Serviços. Strings com letras ou prefixos inválidos de telefone ficam sem destino de agendamento.
- Chromium 153 e Firefox 153 no Linux: âncoras nas vistas de 390, 820 e 1440 px, reflow a 320 px com fonte a 200%, fechamento do menu com Escape e movimento reduzido habilitado. Em ambos, as cinco rotas de desenvolvimento responderam 404 no servidor de produção local. O site manteve um H1, idioma pt-BR, título, descrição e Open Graph. Com a configuração padrão, a canonical é omitida, o robots bloqueia rastreamento e o sitemap não expõe URLs.
- No Chromium, o reteste da auditoria anterior percorreu onze larguras, salto ao conteúdo, navegação do rodapé e todos os destinos do menu. Nas rotas locais foram exercitados cards com e sem destino, texto longo, perfil demonstrativo, galeria com uma e quatro imagens, setas, Escape e retorno de foco. A raiz ficou com overflow bloqueado no diálogo, com indicador claro de foco sobre o painel escuro. axe-core não apontou violações nas varreduras. O caso sem telefone oficial exibe o estado de indisponibilidade.
- Suite de navegador opcional: em um ambiente Python isolado, instalar `playwright==1.62.0` e executar `python -m playwright install chromium firefox`. Com `npm run dev` em localhost:3000, executar `python tests/navigation.py` e `QA_BROWSER=firefox python tests/navigation.py` em outro terminal. A CI executa os testes Node após o build; a rodada de navegador é local.
- WebKit foi baixado, mas o host não dispõe das bibliotecas GTK4, Graphene e demais dependências exigidas. Safari/iOS, leitor de tela e zoom pela interface nativa permanecem sem homologação. Os testes de ampliação de texto e zoom CSS têm cobertura distinta.

## Segurança e dependências

`npm audit` retornou código 1: 15 pacotes sinalizados, nove em severidade alta e seis moderada, nenhum crítico. São caminhos de dependências de ferramentas de desenvolvimento envolvendo picomatch e minimatch, entre outros dependentes, e não 15 falhas independentes. `npm audit --omit=dev` retornou zero. A exposição no pipeline de build/lint permanece em avaliação. A tentativa de atualização de minimatch dentro dos intervalos permitidos preservou o lockfile. O npm sugeriu inclusive downgrade major de eslint-config-next. Reavaliar a cadeia de lint em PR separado com validação de compatibilidade.

`npm outdated` apontou majors para ESLint, TypeScript e tipos do Node. A instalação reportou ESLint 9 descontinuado e configuração de proxy do ambiente; o runner Node emitiu aviso de detecção de módulo ao ler fontes TypeScript. Na galeria isolada de desenvolvimento o Next também alertou que a primeira miniatura era LCP. Na homepage essa seção fica abaixo da primeira dobra, portanto preservamos o carregamento sob demanda. Nenhum desses avisos interrompeu lint, typecheck, build ou testes. A busca por padrões comuns de chave privada e chave AWS nos arquivos de projeto não encontrou correspondências. A única variável pública prevista é o telefone comercial. Os links de contato em nova janela usam `noopener noreferrer`; nenhum destino externo foi acionado para reservar horário.

## Preview e referências

Executar `npm ci && npm run dev` e abrir http://localhost:3000. O Hero e a apresentação passam de uma coluna no celular para composição lado a lado no desktop. As capturas mostram curadoria e o estado de agendamento pendente. O Header implementado mantém 80 px frente aos 67 px da proposta. Os frames 12:2, 12:93 e 11:14 identificam a proposta v1; o aceite visual continua pendente.

[390 px](pr-015/homepage-390.webp) · [820 px](pr-015/homepage-820.webp) · [1440 px](pr-015/homepage-1440.webp) · [Menu](pr-015/menu.webp) · [Lightbox de amostra](pr-015/dialog.webp).

A execução de CI vinculada ao commit final fica na descrição do PR, evitando que registrar o resultado gere outro commit sem validação.
