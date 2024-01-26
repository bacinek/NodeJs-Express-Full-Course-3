const fs = require('fs');
const superagent = require('superagent');

// Promises
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find the file'); // ako se pojavi error
      resolve(data); // ovo ce biti output ako nema errora
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file');
      resolve('success');
    });
  });
};

const getDogPic = async () => {
  // await mozemo koristiti samo ako je u async funkciji
  try {
    // odradi ovo
    const data = await readFilePro(`${__dirname}/dog.txt`); // u data smo shranili output readFilePro funkcije, await sluzi da ne dopusti da se nista drugo izvrsi prije te funkcije
    console.log(`Breed: ${data}`); // ispis data

    const res1Pro = superagent.get(
      // onda smo shranili u res url slike psa koji se nalazi u dati
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      // onda smo shranili u res url slike psa koji se nalazi u dati
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      // onda smo shranili u res url slike psa koji se nalazi u dati
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    // console.log(res.body.message); // ispis urla
    await writeFilePro('dog-img.txt', imgs.join('\n')); // upisivanje poruke u dog-img-txt
    console.log('Random dog image saved to file!');
  } catch (err) {
    // reaguj ako naidje error
    console.log(err);
    throw err;
  }
  return '2: READY'; // ako bas zelimo da returnamo ovu vrijednost moramo sljedece uraditi:
};

(async () => {
  // ovo je IIFE ili funkcija koja se sama izvrsava
  // async smo koristili da bi omogucili koristenje awaita
  try {
    console.log('1: Will get dog pics');
    const x = await getDogPic(); // await smo koristili da bi dobili zeljeni output(2: READY), ako nema awaita onda ce samo pisati Promise pending
    console.log(x);
    console.log('3: Done getting dog pics');
  } catch (err) {
    console.log('ERROR');
  }
})();

/*
console.log('1: Will get dog pics');
getDogPic()
  .then((x) => {
    // moramo staviti then na funckiju koja je promise, jer ako ne stavimo samo ce nam pisati Promise pending
    console.log(x);
    console.log('3: Done getting dog pics');
  })
  .catch((err) => {
    // za hvatanje errora nije dovoljno napisati samo ovo nego se error mora i throwati throw err; to pise iznad
    console.log('ERROR');
  });
*/

// //
// //
// readFilePro(`${__dirname}/dog.txt`) // ubacili smo url u funkciju
//   .then((data) => {
//     // onda output koji dobijemo iz funkcije ide dalje, to jeste ispisuje se Breed
//     console.log(`Breed: ${data}`); // ispis Breeda
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`); // returnali smo sliku tog breeda jer je uslov ispunjen
//   })
//   .then((res) => {
//     console.log(res.body.message); // ispis urla te slike u konzoli
//     return writeFilePro('dog-img.txt', res.body.message); // kao return smo ispisali res.body.message u dog-img.txt
//   })
//   .then(() => {
//     console.log('Random dog image saved to file!'); // onda ovo ispisi u konzolu
//   })
//   .catch((err) => {
//     // ako dodje do errora uradi ovo
//     console.log(err);
//   });
