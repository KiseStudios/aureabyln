# Áurea · Checklist para publicação

**Decisão atual: BLOQUEADO para publicação.** Kaua responde pelo PR-015. Luan revisa o código, o Product Owner homologa a entrega integrada e a cliente aprova conteúdo e interface. [Relatório e evidências](pr-015-performance-report.md).

| Critério | Estado | Evidência ou condição |
| --- | --- | --- |
| Homepage, navegação e smoke tests | APROVADO | Cinco seções integradas, builds locais e regressão de âncoras e foco |
| Responsividade | APROVADO | Faixa de 320 a 1920 px e ampliação de texto com conteúdo atual |
| SEO de homologação | APROVADO | Testes sobre HTML, robots e sitemap do build |
| CI do commit para revisão | APROVADO | Ver execução vinculada ao SHA na descrição do PR |
| Performance de laboratório com placeholders | APROVADO | LCP e CLS dentro das referências nos ensaios locais |
| Performance com fotos e tráfego reais | NÃO TESTADO | Repetir com imagens autorizadas e medir p75 após liberação |
| Acessibilidade final | PENDENTE | Reteste Chromium e Firefox concluído; validar com leitor de tela, zoom nativo e Safari/iOS |
| Segurança da cadeia de build | PENDENTE | Zero apontamentos no escopo de produção; tratar os 15 apontamentos nas ferramentas |
| Figma, aprovação da cliente e aceite do Product Owner | PENDENTE | Registrar versão, data, responsável e escopo do aceite |
| Revisão cruzada de Luan | PENDENTE | Registrar revisão por conta independente no GitHub |
| Fotografias, catálogo, biografia e galeria | PENDENTE | Aprovação por material, autorização de uso e texto alternativo |
| Agendamento comercial | PENDENTE | Confirmar telefone e destinatário com a cliente |
| Domínio, HTTPS e imagem social final | PENDENTE | Definir domínio, validar certificado e aprovar material de compartilhamento |
| Plano de publicação e monitoramento | PENDENTE | Procedimento abaixo; designar responsável e hospedagem |
| Recuperação e rollback | NÃO TESTADO | Versionar parâmetros, preservar build anterior e ensaiar na hospedagem escolhida |
| Autorização para publicar | BLOQUEADO | Depende dos aceites, da infraestrutura e da decisão expressa do Product Owner |

## Procedimento após autorização

1. Registrar a revisão independente, o SHA aprovado, a aprovação da cliente e a janela de publicação. Escolher infraestrutura que execute Next.js com Node 24, npm 11 e suporte ao otimizador de imagens. A aplicação não requer banco de dados.
2. Gerar primeiro um ambiente de homologação usando `.env.example`, indexação desabilitada, lockfile e somente material autorizado. Executar `npm ci`, lint, typecheck, build e `npm test` nesse build restritivo. Iniciar com `npm start`, usando a porta e o proxy da hospedagem. Confirmar os smoke tests abaixo.
3. Guardar SHA, artefato e configuração anterior em local de acesso controlado. Ensaiar restauração por versão. Nomear o responsável por reverter se surgirem falhas nas rotas, no agendamento, no certificado ou na entrega de assets.
4. Somente após autorização separada para lançamento, provisionar domínio oficial, HTTPS e redirecionamento para a origem canônica na hospedagem aprovada. Configurar `SITE_URL` com a origem HTTPS sem caminho, o telefone comercial em `NEXT_PUBLIC_WHATSAPP_NUMBER` e habilitar `ENABLE_INDEXING` no build destinado ao público. Gerar novo artefato. O teste automatizado de SEO de homologação exige noindex; verificar a configuração pública separadamente.
5. Validar HTTPS, resposta 200 da homepage, 404 das prévias técnicas, cinco destinos de navegação, conteúdo autorizado, metadados, canonical, sitemap absoluto e robots correspondentes à decisão de lançamento. Conferir o número e texto no CTA, sem enviar mensagem de teste sem combinar. Revisar em celular real.
6. Monitorar disponibilidade, erros 5xx, falhas de imagem, latência e métricas de usuários quando houver coleta autorizada. Conferir imediatamente após a troca e no primeiro dia. Em caso de falha relevante, restaurar o artefato e as variáveis anteriores, verificar redirects/cache e repetir os smoke tests.
