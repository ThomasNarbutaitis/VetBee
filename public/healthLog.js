console.log('healthLog.js');

console.log('our url', window.location.href);
console.log(typeof window.location.href);

const getIdFromUrl = window.location.href.split('?')[1];
console.log('id ===', getIdFromUrl);

const nameEl = document.querySelector('span');

async function getName() {
  try {
    const resp = await fetch('http://localhost:3306/v1/pets');
    console.log('resp ===', resp);
    const petsArray = await resp.json();
    const petArray = petsArray.filter((obj) => obj.id === Number(getIdFromUrl));
    console.log('petArray ===', petArray);
    const petName = petArray[0].name;
    console.log('petName ===', petName);
    nameEl.textContent = petName;
  } catch (error) {
    console.warn('error===', error);
  }
}

getName();
