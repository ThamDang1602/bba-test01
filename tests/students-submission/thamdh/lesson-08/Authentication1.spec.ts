import { test, expect } from "playwright/test";
test.beforeEach(async ({ page }) => {
    // B1: Truy cập trang web với role Admin
    await page.goto('https://pw-practice-dev.playwrightvn.com/wp-admin/')
    await page.locator('//input[@id="user_login"]').fill('betterbytes.academy.admin');
    await page.locator('//input[@id="user_pass"]').fill('StrongPass@BetterBytesAcademy');
    await page.locator('//input[@name="wp-submit"]').click();
});
test.describe("ACCOUNT - Account", () => {
    test("@ACC_001 - Create account with editor permission", async ({ page }) => {

        await test.step('ACC_001_01', async () => {

            // Đi tới màn hình quản lý user
            await page.locator("//div[text()='Users']").click();
            // Kiểm tra hiển thị heading 
            await expect(page.locator("//h1[normalize-space()='Users']")).toBeVisible();
            // Kiểm tra button Add User Enable

            await expect(page.locator("//a[@href='https://pw-practice-dev.playwrightvn.com/wp-admin/user-new.php' and text()='Add User']")).toBeEnabled();

        });

        await test.step('ACC_001_02', async () => {
            // click nút Add User 
            await page.locator("//a[@href='https://pw-practice-dev.playwrightvn.com/wp-admin/user-new.php' and text()='Add User']").click({ force: true });
            //Nhập các thông tin hợp lệ với role Editor
            await page.locator('//input[@name="user_login"]').fill('k23-thamdh');
            await page.locator('//input[@name="email"]').fill('thamk55tha@gmail.com');
            await page.locator('//input[@name="first_name"]').fill('tham');
            await page.locator('//input[@name="last_name"]').fill('dh');
            await page.locator("//input[@id='pass1']").clear();
            await page.locator('//input[@name="pass1"]').fill('thamDH@123456789^');
            await page.locator('//select[@id="role"]').selectOption('Editor');
            // Ấn Add User
            await expect(page.locator("//input[@id='createusersub']")).toBeEnabled();
            await page.locator("//input[@id='createusersub']").click({ force: true });

            //Kiểm tra hiển thị thông báo thành công
            await expect(page.locator('//div[@class="notice is-dismissible updated"]/child::p')).toContainText('New user created.');
        });

        await test.step('ACC_001_03', async () => {
            // Đăng xuất user admin
            await page.locator("//li[@id='wp-admin-bar-my-account']").hover();
            await page.locator("//li[@id='wp-admin-bar-logout']/a").click();

            //// đăng nhập lại với user vừa tạo
            await page.goto('https://pw-practice-dev.playwrightvn.com/wp-admin/')
            await page.locator('//input[@id="user_login"]').fill('k23-thamdh');
            await page.locator('//input[@id="user_pass"]').fill('thamDH@123456789^');
            await page.locator('//input[@id="wp-submit"]').click();

            ///Kiểm tra menu ẩn/ hiện theo từng role tương ứng
            await expect(page.locator('//div [@id="adminmenuback"]')).toHaveText(['Dashboard', 'Posts', 'Media', 'Pages', 'Comments', 'Profile', 'Tools']);
            await expect(page.locator("//div [@id='adminmenuback'] and text()='Appearance'")).toBeHidden();
            await expect(page.locator("//div [@id='adminmenuback'] and text()='Users'")).toBeHidden();
            await expect(page.locator("//div [@id='adminmenuback'] and text()='Plugins'")).toBeHidden();
        });

        await test.step('ACC_001_04', async () => {
            //Đăng xuất user vừa tạo
            await page.locator("//li[@id='wp-admin-bar-my-account']").hover();
            await page.locator("//li[@id='wp-admin-bar-logout']/a").click();

            //Đăng nhập lại với user admin
            await page.locator("//input[@id='user_login']").fill("betterbytes.academy.admin");
            await page.locator("//input[@id='user_pass']").fill(" StrongPass@BetterBytesAcademy");
            await page.locator("//input[@id='wp-submit']").click();

            //Click vào menu Users
            await page.locator("//div[text()='Users']").click();

            //Tìm kiếm user vừa tạo
            await page.locator('//input[@id="user-search-input"]').fill('k23-thamdh');
            await page.locator("//input[@id='search-submit']").click();

            //hover để xoá
            await page.locator("//td[@data-colname='Username']").hover();
            await page.locator("//span[@class='delete']").click();

            //Chọn content?
            await page.locator("//label[@for='delete_option0']").check();

            //Click xoá
            await page.locator("//input[@value='Confirm Deletion']").click();

            //Kiểm tra user đã bị xoá
            await page.locator("//input[@id='user-search-input']").fill("k23-thamdh");
            await page.locator("//input[@id='search-submit']").click();
            await expect(page.locator("//td[text()='No users found.']")).toBeVisible();

        });
    });
});