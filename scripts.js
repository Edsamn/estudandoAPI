const characterContainer = document.querySelector(".contentList");
const pageNumber = document.getElementById("pageNumber");
const prevButton = document.getElementById("previousPage");
const nextButton = document.getElementById("nextPage");
const nameValue = document.getElementById("name").value;
const searchButton = document.getElementById("searchButton");
const header = document.getElementById("header");
let initialPage = 1;
let pageSelect = 1;

const renderOnDisplay = (character) => {
  const userCard = document.createElement("div");
  userCard.classList.add("userCard");

  userCard.innerHTML = `
  <img src='${character.image}' alt=''>
  <p> ${character.name} </p>
  <p> ${character.status} </p>
  <p> ${character.species} </p>
  `;
  characterContainer.appendChild(userCard);
};

async function getCharacters() {
  try {
    header.textContent = "";
    const response = await api.get(`/character?page=${initialPage}`);
    const characters = response.data.results;

    characters.forEach((character) => {
      renderOnDisplay(character);
      pageNumber.textContent = `Página atual: ${initialPage}`;
    });
  } catch (error) {
    console.log(error);
  }
}
getCharacters();

async function searchCharacterByName() {
  try {
    if (initialPage > 1) {
      initialPage = 1;
    }
    const response = await api.get(`/character?name=${nameValue}&page=${pageSelect}`);
    const characters = response.data.results;
    const totalPages = response.data.info.pages;

    characterContainer.innerHTML = "";

    const filteredCharacters = characters.filter((character) => character.name.includes(`${nameValue}`));
    filteredCharacters.forEach((filteredCharacter) => {
      renderOnDisplay(filteredCharacter);
    });
    pageNumber.textContent = `Total de páginas da pesquisa: ${totalPages}`;
    prevButton.disabled;
    nextButton.disabled;
    if (pageSelect === totalPages) {
      searchButton.disabled;
      pageNumber.textContent = `Fim da pesquisa.`;
    } else {
      pageSelect++;
    }
    header.textContent = "Para visualizar mais resultados da pesquisa, continue usando o botão com o campo preenchido";
  } catch (error) {
    console.log(error);
  }
}

function nextPage() {
  initialPage += 1;

  characterContainer.innerHTML = "";

  getCharacters();
}

function previousPage() {
  if (initialPage > 1) {
    initialPage -= 1;
  }
  characterContainer.innerHTML = "";

  getCharacters();
}
