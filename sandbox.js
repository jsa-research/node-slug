const slug = require('./');

console.log('>>', slug('<3 || hate 还有中文呢'))
console.log('>>', slug('如果只有中文呢'))
console.log('>>', slug('no spoon: 🍴', {
  multicharmap: {
    '🍴': 'knife-and-fork'
  }
}))
