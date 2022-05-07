// console.log('veikia');

const BASE_URL = 'http://localhost:3306/v1';
const cardsEl = document.querySelector('.cards-box');

async function getPets() {
  try {
    const resp = await fetch(`${BASE_URL}/pets`);
    console.log('resp ===', resp);
    if (resp.ok === false) throw new Error('something went wrong');
    const petsArray = await resp.json();
    console.log('petsArray ===', petsArray);
    renderPets(petsArray);
  } catch (error) {
    console.warn('error===', error);
  }
}

getPets();

async function renderPets(array) {
  cardsEl.innerHTML = '';
  array.forEach((arrObj) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'cards';
    cardEl.innerHTML = ` <div>
    <h3>${arrObj.name}</h3>
    <p>${arrObj.dob}</p>
    <p>${arrObj.client_email}</p></div>`;
    const deleteBtn = document.createElement('button');
    deleteBtn.className = `second ${arrObj.id}`;
    const viewLogBtn = document.createElement('button');
    viewLogBtn.className = 'prime';
    const btnDiv = document.createElement('div');
    deleteBtn.textContent = 'DELETE';
    viewLogBtn.textContent = 'VIEW LOG';
    deleteBtn.addEventListener('click', async () => {
      deletePet(arrObj.id);
      getPets();
    });
    viewLogBtn.addEventListener('click', () => {
      window.location.href = 'healthLog.html';
    });
    btnDiv.append(viewLogBtn, deleteBtn);
    cardEl.append(btnDiv);
    cardsEl.append(cardEl);
  });
}

async function deletePet(id) {
  console.log(`pet with id: ${id} was deleted`);
  const resp = await fetch(`${BASE_URL}/pets/${id}`, {
    method: 'DELETE',
  });
  console.log('resp ===', resp);

  console.log('data ===', await resp.json());
}
