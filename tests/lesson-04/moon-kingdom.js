
function createCharacters() {
    const characters = [{ name: 'My', level: 8, health: 1100 }, { name: 'Donut', level: 2, health: 50000 }, { name: 'Camelia', level: 30, health: 200 }, { name: 'One', level: 40, health: 1000 }];
    const charactersPowerUp = characters.map(char =>
    ({
        name: char.name.toUpperCase(),
        level: char.level * 2,
        health: char.health * 3
    }))
    console.log('Mảng mới với các chỉ số linh tinh là:');
    console.log(charactersPowerUp);
    console.log('==========================================');
    const possibleWinners = characters.filter(char => char.health > 1000);
    console.log('Danh sách chỉ số health > 1000 là:');

    console.log(possibleWinners);
}
createCharacters();

function printLeaderboard() {
    const player = [{ name: "Mario", score: 1000 }, { name: "congChua", score: 2000 }, { name: "hoangTu", score: 500 }, { name: "conNgua", score: 100 }];
    const playerSort = player.sort((a, b) => b.score - a.score);
    player.forEach(function (player, index) {
        let medal = '';
        if (index === 0) {
            medal = '🥇 1.';
        } else if (index === 1) {
            medal = '🥈 2.';
        } else if (index === 2) {
            medal = '🥉 3.'
        } else {
            medal = `   ${index + 1 + '.'}`
        }
        console.log(`${medal} ${player.name} - ${player.score}`)
    })
};
printLeaderboard();

