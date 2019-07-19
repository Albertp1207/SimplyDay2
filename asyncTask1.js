function Person(name,age) {
    this.name = name;
    this.age = age;
    this.intervId = setInterval(()=>{
        this.age++;
        },1000)
}
//it's instead top
// class Person{
//     constructor(name,age) {
//         this.name = name;
//         this.age = age;
//         this.intervId = setInterval(()=>{
//             this.age++;
//             },1000)
//     }    
// }

let personsArr = [new Person("asd",37),
                  new Person("oooood",39),
                  new Person("cccc",40),
                  new Person("iiii",38)]


function checkAge(arr){
    const intervId =setInterval(()=>{
        if(arr.length === 0) {
            return
        }
        console.log("checking")

        arr.forEach((item,index) => {
        if(item.age >= 40) {
            console.log(`${item.name} deleted`)
            clearInterval(item.intervId);
            arr.splice(index,1)
        }
    })
    },1000)
    
}

function createPerson(arr){
    setInterval(()=>{
        const newPersonName = makeRandomName(4);
        const newPersonAge = Math.floor(1+Math.random() * 50);
        console.log(newPersonName + "added" )
        arr.push(new Person(newPersonName,newPersonAge))
    },2000)
}


checkAge(personsArr)
createPerson(personsArr);

function makeRandomName(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }