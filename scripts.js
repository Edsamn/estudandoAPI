const characterContainer = document.querySelector(".contentList");
let initialPage = 1;

async function getCharacters() {
  try {
    const response = await api.get("/character");
    const characters = response.data.results;

    characters.forEach((character) => {
      const userCard = document.createElement("div");
      userCard.classList.add("userCard");

      userCard.innerHTML = `
      <img src='${character.image}' alt=''>
      <p> ${character.name} </p>
      <p> ${character.status} </p>
      <p> ${character.species} </p>
      `;
      characterContainer.appendChild(userCard);
    });
  } catch (error) {
    console.log(error);
  }
}
getCharacters();

async function searchCharacterByName() {
  const nameValue = document.getElementById("name").value;
  try {
    const response = await api.get(`/character?name=${nameValue}`);
    const characters = response.data.results;

    characterContainer.innerHTML = "";

    const filteredCharacters = characters.filter((character) => character.name.includes(`${nameValue}`));
    filteredCharacters.forEach((character) => {
      const userCard = document.createElement("div");
      userCard.classList.add("userCard");

      userCard.innerHTML = `
      <img src='${character.image}' alt=''>
      <p> ${character.name} </p>
      <p> ${character.status} </p>
      <p> ${character.species} </p>
      `;
      characterContainer.appendChild(userCard);
    });
  } catch (error) {
    console.log(error);
  }
}

async function nextPage() {
  try {
    if (initialPage) {
      initialPage += 1;
    }
    const response = await api.get(`/character?page=${initialPage}`);
    const characters = response.data.results;

    characterContainer.innerHTML = "";

    characters.forEach((character) => {
      const userCard = document.createElement("div");
      userCard.classList.add("userCard");

      userCard.innerHTML = `
        <img src='${character.image}' alt=''>
        <p> ${character.name} </p>
        <p> ${character.status} </p>
        <p> ${character.species} </p>
        `;
      characterContainer.appendChild(userCard);
    });
  } catch (error) {
    console.log(error);
  }
}

async function previousPage() {
  try {
    if (initialPage > 1) {
      initialPage -= 1;
    }
    const response = await api.get(`/character?page=${initialPage}`);
    const characters = response.data.results;

    characterContainer.innerHTML = "";

    characters.forEach((character) => {
      const userCard = document.createElement("div");
      userCard.classList.add("userCard");

      userCard.innerHTML = `
        <img src='${character.image}' alt=''>
        <p> ${character.name} </p>
        <p> ${character.status} </p>
        <p> ${character.species} </p>
        `;
      characterContainer.appendChild(userCard);
    });
  } catch (error) {
    console.log(error);
  }
}
