// Đây là hàm gọi ra.
// Import test từ playwright và calss XinChaoVietNam từ file 01-pom.ts
import { test } from '@playwright/test';
import { XinChaoVietNam } from './01-pom';

test('Test 01', async ({ page }) => {
    // Khởi tạo đối tượng từ class XinChaoVietNam
    const xinChao = new XinChaoVietNam(page);
    // Gọi các phương thức đã được định nghĩa trong class để thực hiện các bước test
    await xinChao.gotoHomePage();
    await xinChao.clickRegisterLink();
    await xinChao.fillUserName("xinChaoVietNam");
    await xinChao.fillEmail("thamk55ttha@gmail.com");
});