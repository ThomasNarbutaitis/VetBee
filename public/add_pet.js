// nusitaikyti i el
const formEl = document.getElementById('add-pet');
const usernameEL = document.getElementById('name');
const dateEl = document.getElementById('date');
const emailEL = document.getElementById('email');
const addOnePetEl = document.getElementById('add-one-pet');


// // result EL
// const out1El = document.getElementById('out1');
// const out2El = document.getElementById('out2');
// const out3El = document.getElementById('out3');
// const sliderValueEl = document.querySelector('.value');

// // uzdeti event pasilklausyma ir sustabdyti siuntima
// formEl.addEventListener('submit', (event) => {
//   // stabdom funkcija nuo submit
//   event.preventDefault();
//   console.log('in controll');
//   // clear errors
//   usernameEL.nextElementSibling.textContent = ''; // kas tai ????????????????????????????????
//   // reiksmiu paemimas // trim nukerpa tuscius tarpus prieky ir gale
//   const usernameValue = usernameEL.value.trim();
//   const dateElValue = dateEl.value;
//   const emailValue = emailEL.value;

//   // validation
//   if (!isValid(usernameValue)) {
//     return;
//   }

//   // reiksmiu perkelimas i rezultatus
//   valuesToResults(usernameValue, dateValue, emailValue);
// });

// function valuesToResults(usernameValue, dateValue, emailValue) {
//   // reiksmiu perkelimas i rezultatus
//   out1El.textContent = usernameValue;
//   out3El.textContent = dateValue;
//   out2El.textContent = emailValue;
// }



// function addPet(array) {
//   cardsEl.innerHTML = '';
//   array.forEach((arrObj) => {
//     const cardEl = document.createElement('div');
//     cardEl.className = 'cards';
//     cardEl.innerHTML = ` <div>
//     <h3>${arrObj.name}</h3>
//     <p>${arrObj.dob}</p>
//     <p>${arrObj.client_email}</p></div>`;
//     const deleteBtn = document.createElement('button');
//     deleteBtn.className = `second ${arrObj.id}`;
//     const viewLogBtn = document.createElement('button');
//     viewLogBtn.className = 'prime';
//     const btnDiv = document.createElement('div');
//     deleteBtn.textContent = 'DELETE';
//     viewLogBtn.textContent = 'VIEW LOG';
//     deleteBtn.addEventListener('click', () => {
//       deletePet(arrObj.id);
//     });
//     viewLogBtn.addEventListener('click', () => {
//       window.location.href = 'add_pet.html';
//     });
//     btnDiv.append(viewLogBtn, deleteBtn);
//     cardEl.append(btnDiv);
//     cardsEl.append(cardEl);
//   });
// }