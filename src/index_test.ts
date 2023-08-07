import { assert } from 'chai';
import { chromium } from 'playwright';
describe("Index tests", () => {
    test("Default display", async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.route("src/watch/watch.html", (route) => {
            route.fulfill({
                status: 200,
                contentType: 'text/html',
                body: ''
            })
        })
        await page.goto('http://localhost:9000');
        const content = await page.content();
        assert.include(content, '<div id="watch>')
        await browser.close();
    })
})