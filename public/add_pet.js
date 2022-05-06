// nusitaikyti i el
const formEl = document.getElementById('petForm');
const usernameEL = document.getElementById('name');
const dateEl = document.getElementById('date');
const emailEL = document.getElementById('email');
const BASE_URL = 'http://localhost:3306/v1/pets';

async function createPet(petObj) {
  console.log('pries connect');
  // try {
  //   const resp = await fetch(`${BASE_URL}/pets`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(petObj),
  //   });
  try {
    const resp = await fetch('http://localhost:3306/v1/pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(petObj),
    });
    const data = await resp.json();
    console.log('data ===', data);
  } catch (error) {
    console.log('error ===', error);
  }
}

// // uzdeti event pasilklausyma ir sustabdyti siuntima
formEl.addEventListener('submit', (event) => {
  // stabdom funkcija nuo submit
  event.preventDefault();

  // validation
  if (usernameEL.value && dateEl.value && emailEL.value) {
    console.log('viskas ok');
    const newPetObj = {
      name: usernameEL.value.trim(),
      dob: dateEl.value,
      email: emailEL.value.trim(),
    };

    console.log('newPetObj ===', newPetObj);
    createPet(newPetObj);
    formEl.reset();
    window.location.href = 'index.html';
  } else {
    alert('Please fill in all fields');
  }
});
