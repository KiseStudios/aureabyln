import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { approvedValue } from "../src/content/approved.ts";
import { buildWhatsAppUrl } from "../src/lib/whatsapp.ts";

test("exibe somente materiais com referência de aprovação", () => {
  assert.equal(approvedValue({ status: "placeholder", value: "amostra" }), undefined);
  assert.equal(approvedValue({ status: "approved", approvalReference: " ", value: "amostra" }), undefined);
  assert.equal(approvedValue({ status: "approved", approvalReference: "aceite", value: "texto" }), "texto");
});

test("valida o telefone e codifica a mensagem uma única vez", () => {
  for (const invalid of [null, "", "123", "texto12345678901", "00000000000", "1".repeat(16)]) {
    assert.equal(buildWhatsAppUrl(invalid), null);
  }
  const link = new URL(buildWhatsAppUrl("+1 (202) 555-0100", "Olá & até + tarde"));
  assert.equal(link.origin + link.pathname, "https://wa.me/12025550100");
  assert.equal(link.searchParams.get("text"), "Olá & até + tarde");
});

test("build de homologação mantém âncoras, idioma e restrições de indexação", async () => {
  const output = ".next/server/app/";
  const html = await readFile(output + "index.html", "utf8");
  for (const id of ["conteudo-principal", "inicio", "servicos", "sobre", "resultados", "contato"]) {
    assert.equal(html.split(' id="' + id + '"').length, 2);
    assert.ok(html.includes('href="#' + id + '"'));
  }
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /<html lang="pt-BR"/);
  assert.match(html, /noindex, nofollow/);
  assert.doesNotMatch(html, /rel="canonical"/);
  assert.match(await readFile(output + "robots.txt.body", "utf8"), /Disallow: \/(?:\s|$)/);
  assert.doesNotMatch(await readFile(output + "sitemap.xml.body", "utf8"), /<loc>/);
});
