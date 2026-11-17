# PR-011 · Galeria de resultados

## Entrega

- `Gallery` consome os espaços tipados de `imageSlots.gallery` e só apresenta imagens cujo campo esteja aprovado e tenha `approvalReference` não vazia.
- O grid usa duas colunas no mobile e três em telas maiores, com `next/image`, dimensões intrínsecas, `sizes` e texto alternativo do manifesto.
- A ampliação usa o elemento nativo `dialog`, com fechar, anterior/próximo, Escape, setas do teclado e retorno de foco nativo.
- `/dev/resultados` demonstra o layout com placeholders claramente identificados; a rota retorna 404 fora do ambiente de desenvolvimento.

## Materiais

A prancha do feed incluída no PDF de referência está identificada como material de referência, não como conteúdo final. Por isso não foi recortada nem publicada como portfólio. O catálogo real permanece vazio até o envio de arquivos individuais em resolução adequada e autorização de uso, com alt text descritivo e referência de aceite.

## Revisão

Execute `npm ci`, `npm run lint`, `npm run typecheck` e `npm run build`. Em desenvolvimento, abra `/dev/resultados`; confira 390, 820 e 1440 px, foco, ampliação, setas, Escape e ausência de overflow.

## Integração

Luan integra `<Gallery />` após `<About />` e habilita `sectionAnchors.gallery` no Header quando estiver pronto. Esta PR não altera `page.tsx`, Header, Footer ou tokens globais. A composição segue em draft até o aceite visual desktop/mobile e recebimento dos trabalhos autorizados.
