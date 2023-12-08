const md5 = require('md5')

const findLowestHash = () => {
    const prefix = "ckczppom";
    // const prefix = "abcdef"
    let i =0;
    while (!md5(`${prefix}${i}`).startsWith('000000')) {
        console.log(i)
        i++
    }

    return i
}

console.log(findLowestHash())