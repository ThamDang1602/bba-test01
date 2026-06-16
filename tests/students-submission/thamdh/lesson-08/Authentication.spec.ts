import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
        // B1: Truy cập trang web với role Admin
        const username = page.locator('//input[@id="user_login"]');
        const password = page.locator('//input[@id="user_pass"]');
        const loginButton = page.locator('//input[@name="wp-submit"]');
        await page.goto('https://pw-practice-dev.playwrightvn.com/wp-admin/')
        await username.fill('betterbytes.academy.admin');
        await password.fill('StrongPass@BetterBytesAcademy');
        await loginButton.click();
    });
test.describe('ACCOUNT-Account', () => {
    test('ACC_001: Create account with editor permission', async ({ page }) => {
        const username = page.locator('//input[@id="user_login"]');
        const password = page.locator('//input[@id="user_pass"]');
        const loginButton = page.locator('//input[@name="wp-submit"]');
        const buttonAddUser = page.locator("//a[@href='https://pw-practice-dev.playwrightvn.com/wp-admin/user-new.php' and text()='Add User']");
        const addUserName = page.locator('//input[@name="user_login"]');
        const addPassword = page.locator('//input[@name="pass1"]');
        const addEmail = page.locator('//input[@name="email"]');
        const addFirstrName = page.locator('//input[@name="first_name"]');
        const addEndName = page.locator('//input[@name="last_name"]');
        const addRole = page.locator('//select[@id="role"]');
        const clickAddUser = page.locator('//p[@class="submit"]/child::input');
        const leftMenu = page.locator('//div [@id="adminmenuback"]');
        const searchInput = page.locator('//input[@id="user-search-input"]');
        const deleteUserButton = page.locator('//span[@class="delete"]');
        const deleteUserOption = page.locator('//input[@id="delete_option0"]');
        const deleteUserConfirm = page.locator('//input[@value="Confirm Deletion"]');

        // B2: Đi tới màn quản lý user
        await page.locator("//div[text()='Users']").click();
        // Kiểm tra hiển thị heading và button Add User
        await expect(page.locator("//h1[normalize-space()='Users']")).toBeVisible();
        await expect(buttonAddUser).toBeEnabled();

        // B3: Nhập các thông tin hợp lệ với role Editor
        await buttonAddUser.click({ force: true });
        await addUserName.fill('k23-thamdh');
        await addEmail.fill('thamk55tha@gmail.com');
        await addFirstrName.fill('tham');
        await addEndName.fill('dh');
        await addPassword.fill('thamDH@123456789^');
        await addRole.selectOption('Editor');
        // Ấn Add User
        await expect(clickAddUser).toBeEnabled();
        await clickAddUser.click({ force: true });
        // Kiểm tra hiển thị thông báo thành công
        await expect(page.locator('//div[@class="notice is-dismissible updated"]/child::p')).toContainText('New user created.');

        // B4: Thực hiện đăng xuất và đăng nhập lại với user vừa tạo
        //đăng xuất
        await page.locator("//li[@id='wp-admin-bar-my-account']").hover();
        await page.locator("//li[@id='wp-admin-bar-logout']/a").click({ force: true });
        // đăng nhập lại với user vừa tạo
        await page.goto('https://pw-practice-dev.playwrightvn.com/wp-admin/')
        await username.fill('k23-thamdh');
        await password.fill('thamDH@123456789^');
        await loginButton.click();
        //Đăng nhập thành công và các menu ẩn/ hiện theo từng role tương ứng
        await expect(leftMenu).toHaveText(['Dashboard', 'Posts', 'Media', 'Pages', 'Comments', 'Profile', 'Tools']);
        await expect(page.locator("//div [@id='adminmenuback'] and text()='Appearance'")).toBeHidden();
        await expect(page.locator("//div [@id='adminmenuback'] and text()='Users'")).toBeHidden();
        await expect(page.locator("//div [@id='adminmenuback'] and text()='Plugins'")).toBeHidden();

        // B5: Đăng nhập với acc admin và xoá account mới được tạo ra
        // Đăng nhập lại với acc admin
        await page.goto('https://pw-practice-dev.playwrightvn.com/wp-admin/')
        await username.fill('betterbytes.academy.admin');
        await password.fill('StrongPass@BetterBytesAcademy');
        await loginButton.click();
        //Xoá accoutn mới được tạo ra
        // tìm user cần xoá
        await searchInput.fill('k23-thamdh');
        await page.locator("//a[text()='k23 - thamdh']").hover();
        await deleteUserButton.click();
        await deleteUserOption.check();
        await deleteUserConfirm.click();
        // -> Account không còn trong danh sách tài khoản
        await searchInput.fill('k23-thamdh');
        await expect(page.locator("//td[text()='No users found.']")).toBeVisible();
    })
})
