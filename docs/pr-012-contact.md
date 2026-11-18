# PR-012 · Contato e WhatsApp

## Entrega

- `Contact` apresenta a chamada final, localização, Instagram e estado do agendamento.
- `buildWhatsAppUrl` valida o número internacional e codifica a mensagem predefinida.
- O telefone é lido de `NEXT_PUBLIC_WHATSAPP_NUMBER`; sem um número plausível, a interface não renderiza um link ativo nem inventa um destino.
- A mensagem inicial segue o handoff: “Olá, gostaria de informações para agendar um horário na ÁUREA.”
- Localização exibida: Afonso Cláudio, Espírito Santo. Horários permanecem indicados como pendentes.
- `/dev/contato` permite conferir o estado sem telefone e retorna 404 fora de desenvolvimento.

## Configuração pendente

Definir `NEXT_PUBLIC_WHATSAPP_NUMBER` no ambiente de execução com DDI + DDD + número, somente depois de confirmar o contato oficial com a cliente. Exemplo de formato, não é um telefone real: `55DDNUMERO`. Não configurar o exemplo.

## Revisão

Execute `npm ci`, `npm run lint`, `npm run typecheck` e `npm run build`. Em desenvolvimento, abra `/dev/contato`; confira 390, 820 e 1440 px, foco, destino do Instagram e o estado sem telefone. Com o número oficial configurado, testar o link em desktop e mobile e confirmar texto e destino antes de habilitar a publicação.

## Integração

Luan integra `<Contact />` após a galeria, junto com a sequência principal, quando estiver pronto. Esta PR não altera `page.tsx`, Header, Footer ou tokens globais. A entrega fica em draft até confirmar número oficial, horários e aceite visual.
