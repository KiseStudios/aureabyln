"""Teste de navegador contra o servidor de desenvolvimento local."""
import os
from playwright.sync_api import expect, sync_playwright

BASE = "http://127.0.0.1:3000"

with sync_playwright() as playwright:
    engine = getattr(playwright, os.getenv("QA_BROWSER", "chromium"))
    browser = engine.launch(executable_path=os.getenv("QA_BROWSER_PATH"))
    page = browser.new_page(viewport={"width": 390, "height": 844}, reduced_motion="reduce")
    page.goto(BASE, wait_until="networkidle")
    page.keyboard.press("Tab")
    expect(page.locator('a[href="#conteudo-principal"]')).to_be_focused()
    page.keyboard.press("Enter")
    expect(page.locator("main")).to_be_focused()

    menu = page.locator("header button")
    menu.focus()
    page.keyboard.press("Space")
    page.keyboard.press("Tab")
    page.keyboard.press("Escape")
    expect(menu).to_be_focused()
    expect(menu).to_have_attribute("aria-expanded", "false")

    for anchor in ["inicio", "servicos", "sobre", "resultados", "contato"]:
        menu.click()
        page.locator(f'header nav:visible a[href="#{anchor}"]').click()
        expect(menu).to_have_attribute("aria-expanded", "false")
        expect(page).to_have_url(f"{BASE}/#{anchor}")
        expect(page.locator(f"main section#{anchor}")).to_have_count(1)

    for suffix, count in [("", 4), ("?estado=unica", 1)]:
        page.goto(BASE + "/dev/resultados" + suffix, wait_until="networkidle")
        thumbnail = page.get_by_role("button", name="Ampliar imagem 1", exact=False)
        thumbnail.focus()
        page.keyboard.press("Enter")
        dialog = page.get_by_role("dialog")
        expect(dialog.get_by_text("Fechar")).to_be_focused()
        page.keyboard.press("ArrowRight")
        expect(dialog.get_by_text(f"{min(2, count)} de {count}")).to_be_visible()
        page.keyboard.press("Escape")
        expect(thumbnail).to_be_focused()
    browser.close()
