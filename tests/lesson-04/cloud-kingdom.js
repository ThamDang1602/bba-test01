let playerName = "Mario";
let currentLives = 3;
// const coinsLevel1 = 25;
// const coinsLevel2 = 30;
// const coinsLevel3 = 45;

function tongCoins(a, b, c) {
    return a + b + c
}
let ketQua = tongCoins(25, 30, 45)
console.log(`Tổng coins của 3 level là: ${ketQua}`)
console.log(`Giá trị trung bình là: ${ketQua / 3}`)
console.log(`Tổng số coins dư khi chia 3 là: ${ketQua % 3}`)

// console.log(`Tổng coins của 3 level là: ${coinsLevel1 + coinsLevel2 + coinsLevel3}`);
// console.log(`Giá trị trung bình là: ${(coinsLevel1 + coinsLevel2 + coinsLevel3)/3}`)
// console.log(`Tổng số coins dư khi chia 3 là: ${((coinsLevel1 + coinsLevel2 + coinsLevel3)%3)}`)