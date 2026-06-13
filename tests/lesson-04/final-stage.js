let count = 0;
console.log("Các cặp số chia hết cho 17 là:");
for (let i = 1; i <= 100; i++) {
    for (let j = i + 1; j <= 100; j++) {
        if ((i + j) % 17 === 0) {
            console.log(`(${i},${j}) = ${i + j}`);
            count++;
        }
    }
}
console.log(`Tổng cộng có tất cả ${count} cặp số chia hết cho 17`);
