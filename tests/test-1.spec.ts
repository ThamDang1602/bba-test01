import { test } from '@playwright/test';

test('Bài thực hành 1', async ({ page }) => {
    await test.step('Di den trang chu material', async () => {
        await page.goto("https://material.playwrightvn.com/");
    });
    await test.step('Click vao bai 1 "From"', async () => {
        await page.locator("//a[@href='01-xpath-register-page.html']").click();

    });
    await test.step('Dien vao o input username: xinchaovietnam', async () => {
        await page.locator("//input[@id='username']").fill("xinChaoVietNam");
        await page.locator("//input[@id='email']").pressSequentially("xinChaoVietNam", { delay: 200 });

    });
});