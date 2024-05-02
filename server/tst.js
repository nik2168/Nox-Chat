let a = [1,2,3,4]
let b = [2]
let c = a.filter((i) => !b.includes(i))
console.log(c)