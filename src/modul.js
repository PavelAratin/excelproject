
console.log('modul js')

async function start(){
  return await Promise.resolve('async working!!!!');
}
start().then(console.log)