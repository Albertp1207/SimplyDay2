function Gladiator (health,power,spped,name,index){
    this.health,
    this.power,
    this.speed,
    this.name,
    this.index
}

function createRandomGladiator(i){
    const health = Math.floor(50+Math.random() * 31);
    const power = +(2+Math.random()*3).toFixed(1);
    const speed = +(1+Math.random()*4).toFixed(3);
    const name = "glad"+ health+power;//...
    return new Gladiator(health,power,speed,name,index)
}


function gladiatorFactory(n) {
    let arr = []
    for(let i = 0; i < n; i++) {
        arr.push(createRandomGladiator(i));
    }
    return arr;
}

let gladiator = {
    health:88,
    power:2.4,
    speed:3.234,
    name:"Gle1"
}
let gladiator2 = {
    health:78,
    power:1.4,
    speed:4.534,
    name:"Gle2"
}

setInterval(()=>{
    gladiator2.health-=gladiator.power;
    console.log(gladiator2.health)
    if(gladiator2.health <= 0) {
        console.log("SATKEC,,,")
    }
},6000-gladiator.speed*1000)