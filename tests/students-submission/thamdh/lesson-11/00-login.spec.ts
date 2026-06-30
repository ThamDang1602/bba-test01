import { expect, test } from '@playwright/test';
//fixture
test('Login success', async ({ request }) => {
    // khai bao url
    const baseUrl = 'https://material.playwrightvn.com/api/user-management/v1';

    // Bước 1: Đăng nhập tài khoản admin 
    await test.step('Login with admin account', async () => {
        const loginResponse = await request.post(`${baseUrl}/login.php`, {
            data: {
                "email": "admin@example.com",
                "password": "password"
            }
        });

        // verify status
        const statusCode = loginResponse.status();
        expect(statusCode).toBe(200);
        // verify token
        // lay du lieuj json
        const loginResponseJSON = await loginResponse.json()
        const token = loginResponseJSON.data.token;
        expect(token).not.toBeNull();
        console.log('Login admin successfully');
    });
    //Bước 2:  Đăng nhập tài khoản user
    await test.step('Login with user account', async () => {
        const loginResponse = await request.post(`${baseUrl}/login.php`, {
            data: {
                "email": "john@example.com",
                "password": "password"
            }
        });
        // verify status
        const statusCode = loginResponse.status();
        expect(statusCode).toBe(200);
        // verify token
        // lay du lieuj json
        const loginResponseJSON = await loginResponse.json()
        const token = loginResponseJSON.data.token;
        expect(token).not.toBeNull();
        console.log('Login user successfully');

    });
});
test('Create user', async ({ request }) => {
    const baseUrl = 'https://material.playwrightvn.com/api/user-management/v1';
    let token = 'string';
    let idUserDelete = 1;
    // Precondition: Đăng nhập tài khoản admin
    await test.step('Login with admin account', async () => {
        const loginResponse = await request.post(`${baseUrl}/login.php`, {
            data: {
                "email": "admin@example.com",
                "password": "password"
            }
        });
        const loginResponseJSON = await loginResponse.json();
        token = loginResponseJSON.data.token;
        console.log(`Login admin successfully with ${token}`);
    });
    // Bước 1: Tạo user thành công
    await test.step('Create user', async () => {
        const createUserResponse = await request.post(`${baseUrl}/users.php`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                "name": "New User7",
                "email": "newuser7@example.com",
                "password": "password",
                "facebook": "https://facebook.com/newuser",
                "avatar": "https://i.pravatar.cc/150?img=20",
                "hobbies": "Reading, Coding",
                "role": "user"
            }
        });
        // Verify status
        const createUserStatusCode = createUserResponse.status();
        expect(createUserStatusCode).toBe(201);
        // Verify user data
        const createUserResponseJSON = await createUserResponse.json();
        const userCreate = createUserResponseJSON.user
        expect(userCreate).not.toBeEmpty;
        console.log('Create user successully with:', userCreate)

    });
    // Bước 2: Lấy danh sách user để kiểm tra
    await test.step('Get user list', async () => {
        const listUserResponse = await request.get(`${baseUrl}/users.php`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const listUserJSON = await listUserResponse.json();
        console.log('Get user list successully:', listUserJSON);
        const foundUser = listUserJSON.users.find((user: any) => user.email === "newuser7@example.com");
        expect(foundUser).toBeDefined(); //Đảm bảo tìm thấy
        console.log('User found:', foundUser);
        // Lưu biến id để dùng xoá
        idUserDelete = listUserJSON.users.find((user: any) => user.email === "newuser7@example.com")?.id;
    });
    // Bước 3: Xoá user đã tạo
    await test.step('Delete user', async () => {
        const deleteResponse = await request.delete(`${baseUrl}/users.php`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                'id': idUserDelete
            }
        });
        const deleteStatusCode = deleteResponse.status();
        expect(deleteStatusCode).toBe(200);
        const deleteResponseJSON = await deleteResponse.json();
        expect(deleteResponseJSON.success).toBe(true);
        expect(Number(deleteResponseJSON.deleted.id)).toBe(idUserDelete);
        console.log('Delete user successfully');
    });
});