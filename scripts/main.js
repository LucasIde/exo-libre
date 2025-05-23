// ==============================
// 🌱 Sélection des éléments
// ==============================
const btnKill = document.querySelector(".kill");
const btnMary = document.querySelector(".mary");
const btnInsult = document.querySelector(".insult");
const btnComplimenter = document.querySelector(".complimenter");
const btnFriend = document.querySelector(".friend");
const btnProcreate = document.querySelector(".procreate");
const wrapper = document.querySelector(".player-cards-wrapper");
const printError = document.querySelector(".error");
const printResponse = document.querySelector(".response");
const btnAll = document.querySelector(".buttons-container")

// Inputs
const inputFirstName = document.querySelector(`.input-first-name`);
const inputName = document.querySelector(`.input-name`);
const inputAge = document.querySelector(`.input-age`);
const inputCategory = document.querySelector(`.category-select`);
const inputGender = document.querySelector(`.gender-select`);

// Button
const addCharacterButton = document.querySelector(`.add-character-button`);

// Display
const playerCardsContainer = document.querySelector(`.player-cards-wrapper`);
// ==============================
// 🌍 Variables globales
// ==============================

class Personnage {
    constructor(firstName, name, age, genre, category) {
      this.firstName = firstName;
      this.name = name;
      this.age = age;
      this.category = category;
      this.genre = genre;
  
      this.index = firstName + name;

      this.single = "";
      this.happinness = 55;
      this.color = "#CCCCCC";
  
      this.friends = [];
      this.alive = true;
      this.child = 0;
    }
    // Méthodes
  
    // Tomber amoureux
    fallInLove(target) {
      this.single = target.index;
      target.single = this.index;
      // Augmenter happiness
      this.happinness += 20;
      // S'assurer que la hapinness max soit bloquée à 100
      if (this.happinness >= 100) {
          this.happinness = 100;
      }
      target.happinness += 20;
      // S'assurer que la hapinness max soit bloquée à 100
      if (target.happinness >= 100) {
          target.happinness = 100;
      }
      changeBtn();
    }
  
    // Tuer une cible
    killTarget(target) {
      // Vérifier que la cible est majeure
      if (target.age >= 18) {
        // Vérifier que la target est en vie
        if (target.alive) {
          // Tuer
          target.alive = false;
          addDeath(target);
          return (`${this.firstName} ${this.name} a tué ${target.firstName} ${target.name}`);
        }
      }
      else {
        return `On ne tue pas les enfants !`
      }
    }

    argue(target) {
      const myRand =  Math.floor(Math.random() * 16) + 5;
      const targetRand =  Math.floor(Math.random() * 16) + 5;
      this.happinness -= myRand;
      target.happinness -= targetRand;
      deathRoll(this);
      deathRoll(target);
    }

    festoyer(target) {
      const myRand =  Math.floor(Math.random() * 16) + 5;
      const targetRand =  Math.floor(Math.random() * 16) + 5;
      this.happinness += myRand;
      target.happinness += targetRand;
      if (this.happinness > 100) {
        this.happinness = 100;
      }
      if (target.happinness > 100) {
        target.happinness = 100;
      }
      return (`${this.firstName} ${this.name} et ${target.firstName} ${target.name} sont heureux`)
    }

    addfriend(target) {
      // l'idée est de comparée le friend index avec le target index checker si fonctionne
      if (this.friends.length == 0 || !this.friends.find(friend => friend.index === target.index)) {
        this.friends.push(target);
        target.friends.push(this);
        console.log(this.festoyer(target));
        changeBtn();
        return (`${this.firstName} ${this.name} et ${target.firstName} ${target.name} sont désormais amis`);
      }
    }
    procreate(target) {
      this.child++;
      target.child++;
      console.log(this.festoyer(target));
    }

    getHumeur() {
      if (this.happinness <= 0) {
        this.color = "#4B0000";
        return `Suicidaire`;
      }
      else if (this.happinness <= 20) {
        this.color = "#8B0000";
        return `Désespéré`;
      }
      else if (this.happinness <= 40) {
        this.color = "#CD5C5C";
        return `Déprimé`;
      }
      else if (this.happinness <= 50) {
        this.color = "#E9967A";
        return `Triste`;
      }
      else if (this.happinness <= 60) {
        this.color = "#CCCCCC";
        return `Neutre`;
      }
      else if (this.happinness <= 80) {
        this.color = "#C1E1C1";
        return `Content`;
      }
      else if (this.happinness < 100) {
        this.color = "#98FB98";
        return `Joyeux`;
      }
      else if (this.happinness == 100) {
        this.color = "#7CFC98";
        return `Euphorique`;
      }
    }
    
    getStatut() {
      if (this.single) {
        return `<img src="./img/vecteezy_game-heart-pixelated_54978926_2.png" alt=""> ${this.single}`
      }
    
      else {
        return `Célibataire`
      }
    }
  } 

const listCard = [];
const selectedCard = [];
let timeoutError;
let timeout;

// ==============================
// 🎊 Fonctionnalités
// ==============================

function displayError(str) {
    clearTimeout(timeoutError);
	  printError.innerHTML = str;
    timeoutError = setTimeout(`printError.innerHTML = ""`, 3000);
}

function displayResponse(str) {
    clearTimeout(timeout);
	  printResponse.innerHTML = str;
    timeout = setTimeout(`printResponse.innerHTML = ""`, 3000);
}

function deathRoll(target) {
  if (target.happinness < 0) { 
    target.happinness = 0;
  }
  if (target.happinness == 0) {
    const randRoll =  Math.floor(Math.random() * 100);
    console.log(randRoll);
    if (randRoll >= 50) {
      target.alive = false;
      addDeath(target);
    }
  }
}

function addDeath(target) {
  const name = target.index;
  const index = selectedCard.indexOf(name);
  const deadbody = document.querySelector(`[data-name="${name}"]`);
  deadbody.classList.add("dead");
  deadbody.classList.remove("active");
  if (index >= 0) {
    selectedCard.splice(index, 1);
  }
  checkFriend(target);
  checkMary(target);
  disableBtn();
}

function checkFriend(target) {
  target.friends.forEach(friend => {
    if (friend.alive) {
      const targetRand =  Math.floor(Math.random() * 16) + 5;
      friend.happinness -= targetRand;
      deathRoll(friend);
    }
  });
}

function checkMary(target) {
  // pas sur de ce truc
  if (target.single) {
    const tmp = listCard[findIndex(target.single)];
    tmp.single = '';
    target.single = '';
    tmp.happinness -= Math.floor(Math.random() * 16) + 5;
    deathRoll(tmp);
  }
}

function changeBtn() {
  const first = listCard.find(card => card.index === selectedCard[0]);
  const second = listCard.find(card => card.index === selectedCard[1]);
  (second.age >= 18) ? btnKill.disabled = false : btnKill.disabled = true;
  (first.age >= 18 && second.age >= 18 && !first.single && !second.single) ? btnMary.disabled = false : btnMary.disabled = true; 
  btnInsult.disabled = false;
  btnComplimenter.disabled = false;
  (first.friends.length == 0 || !first.friends.find(friend => friend.index === second.index)) ? btnFriend.disabled = false : btnFriend.disabled = true;
  (first.single == second.index) ? btnProcreate.disabled = false: btnProcreate.disabled = true;
}

function disableBtn() {
  btnKill.disabled = true;
  btnMary.disabled = true;
  btnInsult.disabled = true;
  btnComplimenter.disabled = true;
  btnFriend.disabled = true;
  btnProcreate.disabled = true;
}

// Créer nouveau personnage

function addCharacterToListCard() {

  if (inputFirstName.value && inputName.value && inputAge.value && inputCategory.value && inputGender.value) {

    if (!listCard.find(card => card.index === (inputFirstName.value + inputName.value))) {
      const newCharacter = new Personnage(`${inputFirstName.value}`, `${inputName.value}`, inputAge.value, `${inputGender.value}`, `${inputCategory.value}`);
      listCard.push(newCharacter)
      console.log(listCard);
    } else {
      return `Nom d'utilisateur indisponible`;
    }
  } else {
      retun (`Veuillez remplir tous les champs`)
  }
  resetvalue()
}

function resetvalue() {
  inputFirstName.value = "";
  inputName.value = "";
  inputAge.value = "";
  inputCategory.value = "";
  inputGender.value= "";
}

function displayPlayerCards() {
  playerCardsContainer.innerHTML = ``;
  listCard.forEach((element) => {
    let index = element.firstName + element.name;
    // check si tmp marche en condition réel
    let tmp = '';
    if (selectedCard.indexOf(index) >= 0) {
      tmp += " active";
    }
    if (!element.alive) {
      tmp += " dead";
    }
    const barWidth = 100 - element.happinness;
    const status = element.getStatut()
    const photo = getPhoto(element);
    playerCardsContainer.innerHTML += `
    <div class="player-card${tmp}" data-name="${index}">
                    <div class="player-card-content">
                        <div class="display-name-first-name-wrapper">
                            <div class="displayed-firstname">${element.firstName}</div>
                            <div class="displayed-name">${element.name}</div>
                            <div class="displayed-category">${element.category}</div>
                        </div>
                        <div class="displayed-player-image">
                            <div class="player-image"><img src=${photo} alt=""></div>
                        </div>
                        <div class="displayed-age">Age : ${element.age}</div>
                        <div class="displayed-gender">Genre : ${element.genre}</div>
                        <div class="displayed-happiness">Humeur : ${element.getHumeur()}</div>
                        <div class="happinessBar" style="background-color: ${element.color}";><div class="happinessBar--empty" style="width:${barWidth}%;"></div></div>
                        <div class="displayed-status">Statut : ${status}</div>
                        <div class="displayed-status">enfants : ${element.child}</div>
                    </div>
                </div>
    `;
  })
}

function findIndex(str) {
  let i = 0;
  for (const item of listCard) {
    if (item.index === str) {
      return (i);
    }
    i++;
  }
  i = -1;
  return (i);
}

// Photo Matching
function getPhoto(element) {

  if (element.alive) {
    // Male Choice
    if (element.genre == "Homme") {
      if (element.category == "Sans-Chaumière") {
        return (`./img/vagabond-male.png`);
      } 
      else if (element.category == "Noble") {
        return (`./img/lord-male.png`);
      } 
      else if (element.category == "Paysan") {
        return (`./img/farmer-male.png`);
      } 
      else if (element.category == "Fidèle") {
        return (`./img/monk-male.png`);
      } 
      else if (element.category == "Mage") {
        return (`./img/vagabond-male.png`);
      } 
      else if (element.category == "Loup-Garou") {
        return (`./img/werewolf-male.png`);
      }
    }

    // Female Choice
    else if (element.genre == "Femme") {
      if (element.category == "Sans-Chaumière") {
        return (`./img/vagabond-female.png`);
      } 
      else if (element.category == "Noble") {
        return (`./img/lord-female.png`);
      } 
      else if (element.category == "Paysan") {
        return (`./img/farmer-female.png`);
      } 
      else if (element.category == "Fidèle") {
        return (`./img/monk-female.png`);
      } 
      else if (element.category == "Mage") {
        return (`./img/monk-female.png`);
      } 
      else if (element.category == "Loup-Garou") {
        return (`./img/werewolf-female.png`);
      }
    }

    else {
      return (`./img/unknown.png`)
    }
  } 

  else {
    return (`./img/dead-night.png`)
  }
}


// ==============================
// 🧲 Événements
// ==============================

// ajouter la classe dead sur les card morte et empecher la selection dans l'event listener

disableBtn();

btnAll.addEventListener("click", (e) => {
  if (e.target.classList.contains("button")) {
    console.log((e.target.classList)[2])
    const first = listCard[findIndex(selectedCard[0])];
    const second = listCard[findIndex(selectedCard[1])];
    switch((e.target.classList)[2]) {
      case("kill") : {
        console.log(first.killTarget(second));
        break;
      }
      case("mary") : {
        first.fallInLove(second);
        break;
      }
      case("insult") : {
        first.argue(second)
        break;
      }
      case("complimenter") : {
        console.log(first.festoyer(second));
        break;
      }
      case("friend") : {
        console.log(first.addfriend(second));
        break;
      }
      case("procreate") : {
        first.procreate(second);
        break;
      }
    }
    displayPlayerCards();
  }
})


playerCardsContainer.addEventListener("click", (e) => {
  const target = e.target.closest(".player-card");
  if (target && !target.classList.contains("dead")) {
    // initialisation valeur
    let isActive = target.classList.contains("active");
    let cardIndex = target.dataset.name;
    // limiteur nb perso
    if (selectedCard.length == 2 && !isActive) {
        displayError("max 2 person can be selected");
    }
    // si array vide
    else if (selectedCard.length == 0) {
        target.classList.add("active");
        selectedCard.push(cardIndex);
        console.log(selectedCard);
    }
    // deselect la zone
    else if (isActive) {
        target.classList.remove("active");
        selectedCard.splice(selectedCard.indexOf(cardIndex), 1);
        console.log(selectedCard);
    }
    // les deux élément sont selectionné
    else {
        target.classList.add("active");
        selectedCard.push(cardIndex);
        console.log(selectedCard);
        changeBtn();
      }
      if (selectedCard.length < 2) {
        disableBtn();
      }
  }
})

addCharacterButton.addEventListener(`click`, (e) => {
  e.preventDefault();
  addCharacterToListCard();
  displayPlayerCards();
})
