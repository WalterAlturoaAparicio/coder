
export function randomNumbers(cant) {
  let randoms = {};
  for (let i = 0; i < cant; i++) {
    const random = Math.floor(Math.random() * (1000 - 1)) + 1;
    if (!randoms[random]) randoms[random] = 0;
    randoms[random]++;
    //console.log(random);
  }
  return randoms;
}

// process.on('message', (res)=>{
//   const resultado = randomNumbers(res.cant);
//   process.send(resultado);
// })