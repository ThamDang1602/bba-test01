let powerUp = 'none';
let effect = 'Unknown power-up';

if (powerUp === 'mushroom') {
    effect = 'Mario becomes Super!';
} else if (powerUp === 'flower') {
    effect = 'Mario can shoot fireballs!';
} else if (powerUp === 'star') {
    effect = 'Mario is invincible!';
} else if (powerUp ==='none'){
    effect = 'Mario is normal';
}
console.log(effect)