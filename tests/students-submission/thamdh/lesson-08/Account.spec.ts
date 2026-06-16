import { test, expect } from '@playwright/test';
test.describe('AUTH-Authentication', async () => {
    test.beforeEach(async ({ page }) => {
        //B1: Truy cập trang web
        await page.goto('https://pw-practice-dev.playwrightvn.com/wp-admin');
    });
    test('AUTH_001: Login fail', async ({ page }) => {
        //B2: Nhập vào thông tin user/pass sai
        const username = page.locator('//input[@id="user_login"]');
        const password = page.locator('//input[@id="user_pass"]');
        const loginButton = page.locator('//input[@name="wp-submit"]');
        await username.fill('thamdh');
        await password.fill('thamdhpass');

        // Verify dữ liệu đã nhập
        await expect(username).toHaveValue('thamdh');
        await expect(password).toHaveValue('thamdhpass');

        //B3: Click button Login  
        await loginButton.click();

        //B4: Verify lại lỗi hiển thị
        await expect(page.locator('//div[@id="login_error"]')).toHaveText('Error: The username thamdh is not registered on this site. If you are unsure of your username, try your email address instead.');
    });
    test('AUTH_002: Login success', async ({ page }) => {
        //B2: Nhập vào thông tin user/pass đúng
        const username = page.locator('//input[@id="user_login"]');
        const password = page.locator('//input[@id="user_pass"]');
        const loginButton = page.locator('//input[@name="wp-submit"]');
        await username.fill('betterbytes.academy.admin');
        await password.fill('StrongPass@BetterBytesAcademy');

        // Verify dữ liệu đã nhập
        await expect(username).toHaveValue('betterbytes.academy.admin');
        await expect(password).toHaveValue('StrongPass@BetterBytesAcademy');

        //B3: Click button Login  
        await loginButton.click();

        //B4: Verify login thành công
        await expect(page).toHaveURL(/.*wp-admin/);
        await expect(page.locator('//h1[text()="Dashboard"]')).toBeVisible();
        await expect(page.locator('//h2[text()="At a Glance"]')).toBeVisible();
    });
});