class Gladiator {
    constructor(health,power,speed,name,index) {
        this.health = health,
        this.initialHealth = health,
        this.power = power,
        this.speed = speed,
        this.initialSpeed = speed,
        this.name = name,
        this.index = index
    }

    getRandomOpponent(forwardGladiatorIndex) {
        let gladiatorsLength = this.game.gladiators.length
        let randInex = Math.floor(Math.random()*gladiatorsLength);
        
        while(randInex === forwardGladiatorIndex){
            randInex = Math.floor(Math.random()*gladiatorsLength);
        }
        return this.game.gladiators[randInex];
    }

    startHitting() {
        const interval = this.initialSpeed*(this.health/this.initialHealth);
        const power = this.power;

        this.hit(this.getRandomOpponent(),power,interval)
        
    }

    hit(opponentGladiator,power,interval){
        if(this.game.gameFinished) {
            return
        }
        console.log(`[${this.name}]x${this.health} hits [${opponentGladiator.name}] with power ${this.power}`)
        new Promise((resolve,reject)=> {
            this.intervId = setTimeout(opponentGladiator.getHit.bind(opponentGladiator,resolve,reject,this),interval)
        }).then(()=> {
            this.startHitting();
        }).catch(() => {

            this.game.makeDecision(this)
        })

    }

    getHit(resolve,reject,hitter){
        if(this.game.isPause) {
            console.log("-----")
            return false
        }
        if(this.game.gameFinished) {
            return    
        }
        this.health = this.health - hitter.power;
        if(this.health >= 15 && this.health <= 30){
            this.speed = this.initialSpeed;
        };
        if(this.health <= 0) {
            console.log(`[${this.name}] dying`);

            reject(this.index);
        } else {
            resolve(this)
        }
    }

    die(){
        this.isDied = true;
    }
}

function createRandomGladiator(index){
    const health = Math.floor(50+Math.random() * 31);
    const power = +(2+Math.random()*3).toFixed(1);
    const speed = +(1+Math.random()*4).toFixed(3);
    const name = faker.name.findName();
    return new Gladiator(health,power,speed,name,index)
}
function gladiatorFactory(n) {
    let arr = []
    for(let i = 0; i < n; i++) {
        arr.push(createRandomGladiator(i));
    }
    return arr;
}

const gm = makeGame(3);
gm.makeArena(gm);

function makeGame(gladiatorsNum) {
    return {
        isPause: false,
        gameFinished:false,
        gladiators: gladiatorFactory(gladiatorsNum),
        removeGladiator: function(gladiator){
            console.log(`Caesar showed :-1: to [${gladiator.name}]`);
            gladiator.die();
            this.gladiators.splice(gladiator.index,1);
            if(this.gladiators.length <= 1) {
                this.gameOver(this.gladiators[0])
                return;
            } 

            //changing indexes
            this.gladiators.forEach((gladiator,i)=>{
                gladiator.index = i;
            })
        },
        gameOver: function(winner) {
            this.gameFinished = true;
            console.log(`[${winner.name}] won the battle with health x${winner.health}`);
        },
        repairGladiator: function(gladiator) {
            console.log(`Caesar showed :+1: to [${gladiator.name}]`);
            gladiator.health = 40;
        },
        continueBattle: function() {
            if(this.gameFinished) {
                return
            }
            this.isPause = false,
            this.startBattle();
        },
        makeDecision: function(gladiator)  {
            this.pauseBattle();
            Math.random() >= 0.5 ? 
                this.removeGladiator(gladiator): 
                this.repairGladiator(gladiator);
                
            this.continueBattle();
        },
        pauseBattle: function() {
            this.gladiators.forEach(gladiator=>{
                clearTimeout(gladiator.intervId)
            })
            this.isPause = true;
        },

        makeArena: function(game) {
            this.gladiators.forEach(gladiator=>{
                gladiator.game = game;
            })
        },
        startBattle: function() {
            this.gladiators.forEach((gladiator,index) => {
                gladiator.startHitting(gladiator,index)
            })
        }
    }
}

function start() {
    gm.startBattle();
}