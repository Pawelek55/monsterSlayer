document.addEventListener('DOMContentLoaded', function () {
    new Vue({
        el: '#app',
        data: {
            playerHealth: 100,
            monsterHealth: 100,
            gameIsRanning: true,
            description: false,
            turns: [],
        },
        methods: {
            startGame: function () {
                this.gameIsRanning = false;
                this.playerHealth = 100;
                this.monsterHealth = 100;
                this.turns = [];

            },
            attack: function () {
                let max = 10;
                let min = 5;
                let demage = this.calculateDemage(5, 10);
                this.monsterHealth -= demage;
                let that = this;

                this.turns.unshift({
                    isPlayer: true,
                    text: 'Player hits Monster for ' + demage,
                })

                if (this.checkWin()) {
                    return;
                };

                this.monsterDamage();
            },
            specialAttack: function () {
                let demage = this.calculateDemage(13, 20)
                this.monsterHealth -= demage;

                if (this.checkWin()) {
                    return;
                };

                this.monsterDamage();
                
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Player hits Monster hard for ' + demage,
                })

            },
            heal: function () {
                
                if (this.playerHealth <= 90) {
                    this.playerHealth += 10;
                } else {
                    this.playerHealth = 100;
                }
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Player heals for 10',
                })
                                               
                this.monsterDamage();

            },

            calculateDemage: function (min, max) {
                return Math.max(Math.ceil(Math.random() * max), min);
            },
            
            monsterDamage: function () {
                let demage = this.calculateDemage(2, 13);
                this.playerHealth -= demage;
                this.checkWin();

                this.turns.unshift({
                    isPlayer: false,
                    text: 'Monster hits Player for ' + demage,
                })

            },
            checkWin() {
                if (this.monsterHealth <= 0) {
                    if (confirm('Congratulation, You win. Do you want play again?')) {
                        this.startGame();
                    } else {
                        this.gameIsRanning = false;
                    }
                    return true;
                } else if (this.playerHealth <= 0) {
                    if (confirm('You lose Do you want play again?')) {
                        this.startGame();
                    } else {
                        this.gameIsRanning = false;
                    }
                    return true;
                }
                return false;
            }
        }
    })
})



//1.Pasek pojawia się po kliknięciu w przyciski trzy oprócz ostatniego i znika kiedy naciśniesz give up
