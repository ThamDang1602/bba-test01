// Viết lại ví dụ để hiểu
// class Persion {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     sayHello() {
//         console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
//     }
// }
// const tham = new Persion('Tham', 30);
// tham.sayHello();

// Đây là js
// import { test } from '@playwright/test';
// test('Bài thực hành 1', async ({ page }) => {
//     await test.step('Di den trang chu material', async () => {
//         await page.goto("https://material.playwrightvn.com/");
//     });
//     await test.step('Click vao bai 1 "From"', async () => {
//         await page.locator("//a[@href='01-xpath-register-page.html']").click();
//     });
//     await test.step('Dien vao o input username: xinchaovietnam', async () => {
//         await page.locator("//input[@id='username']").fill("xinChaoVietNam");
//         await page.locator("//input[@id='email']").pressSequentially("xinChaoVietNam", { delay: 200 });
//     });
// });

// Bài 5 dưới dạng ts
import { Page } from '@playwright/test';
export class XinChaoVietNam {
    // 1. Properties: Khai báo kiểu dữ liệu
    page: Page;
    userName: string;
    email: string;
    registerLink: string;

    // 2. Constructor: Nhận vào page để khởi tạo trình duyệt
    constructor(page: Page) {
        this.page = page;
        this.registerLink = "//a[@href='01-xpath-register-page.html']";
        this.userName = "//input[@id='username']";
        this.email = "//input[@id='email']";
    }
    // 3. Methods: Tất cả các hành động trên trang web sẽ được viết trong các phương thức này
    async gotoHomePage() {
        await this.page.goto("https://material.playwrightvn.com/");
    }
    async clickRegisterLink() {
        await this.page.locator(this.registerLink).click();
    }

    async fillUserName(userName: string) {
        await this.page.locator(this.userName).fill(userName);
    }
    async fillemail(email: string) {
        await this.page.locator(this.email).fill(email);
    }
};

