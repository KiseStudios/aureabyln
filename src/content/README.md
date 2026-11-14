# Contratos de conteúdo - PR-002

Entrada pública: `@/content`. Os módulos não dependem de React ou Next.js e ainda não são importados pela página.

- `services`: catálogo real, inicialmente vazio. `servicePlaceholder` é apenas exemplo estrutural para desenvolvimento, nunca um serviço oferecido.
- `professional`: nome de referência do README, biografia, posicionamento e retrato pendentes de aceite.
- `images`: manifesto com caminho público, texto alternativo e dimensões intrínsecas.
- `types.ts`: contratos compartilhados para as futuras seções.

## Aprovação e consumo

Cada campo tem `status: "placeholder"` com `pending` indicando o material faltante, ou `status: "approved"` com `approvalReference` registrando a referência verificável do aceite. Não trocar o status por inferência. A aprovação do texto não aprova automaticamente a fotografia.

Consumidores devem apresentar somente campos aprovados em produção. Placeholders são exclusivos de desenvolvimento/revisão e devem manter identificação explícita. Não usar `servicePlaceholder` como fallback público do catálogo vazio. CTA nulo não gera âncora, botão ativo ou URL fictícia. A futura integração de WhatsApp pertence ao seu PR próprio.

Para adicionar um serviço real, use um ID estável e único, preencha os campos e registre seus aceites. Não acrescentar preços, certificações, depoimentos ou disponibilidade sem material aprovado.

## Imagens

`public/images/` corresponde à URL `/images/`. Ao substituir um placeholder, atualizar manifesto, dimensões reais, descrição alternativa e referência de autorização. Imagens decorativas usam `alt: ""`; fotografias informativas recebem descrição contextual. Os SVGs provisórios não são fotos nem proposta visual da marca.

A interface, tokens, Header, Serviços e Sobre pertencem aos PRs posteriores e dependem do Figma aprovado. Este PR não muda arquivos existentes, dependências ou configuração.

## Espaços de imagens por área

`imageSlots` separa três espaços de serviços, um de apresentação e quatro de galeria. São referências provisórias para organizar a entrega dos materiais, sem preencher o catálogo real ou definir a interface. Veja a prancha em `public/images/README.md`. Cada espaço tem caminho, dimensões e pendência próprios; aplicam-se as mesmas regras de aprovação e consumo acima.
