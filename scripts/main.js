// ==============================
// 🌱 Sélection des éléments
// ==============================

const wrapper = document.querySelector(".cards");
const printError = document.querySelector(".error");
const printResponse = document.querySelector(".response");
// ==============================
// 🌍 Variables globales
// ==============================

class Personnage {
    constructor(firstName, name, age, category) {
      this.firstName = firstName;
      this.name = name;
      this.age = age;
      this.category = category;
  
      this.single = "";
      this.happinness = 50;
  
      this.friends = [];
      this.alive = true;
    }
    // Méthodes
  
    // Tomber amoureux
    fallInLove(target) {
      // Vérifier si les deux personnages sont majeurs
      if (this.age >= 18 && target.age >= 18) {
        // Vérifier si les deux sont en célibataires
        if (!this.single && !target.single) {
            this.single = target.firstName + target.name;
            target.single = this.firstName + this.name;
            // Augmenter happiness
            this.happinness += 10;
            // S'assurer que la hapinness max soit bloquée à 100
            if (this.happinness >= 100) {
                this.happinness = 100;
            }
        } 
        else {
          return `Un des personnages et déjà en couple`
        }
      }

      else {
        return `Les personnages doivent être majeurs !`
      }
    }
  
    // Tuer une cible
    killTarget(target) {
      // Vérifier que la cible est majeure
      if (target.age >= 18) {
        // Vérifier que la target est en vie
        if (target.alive) {
          // Tuer
          target.alive = false;
          return `${this.firstName} ${this.name} a tué ${target.firstName} ${target.name}`;
        }
      }
      else {
        return `On ne tue pas les enfants !`
      }
    }

    toArgue(target) {

    }
  } 

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

// ==============================
// 🧲 Événements
// ==============================

// ajouter la classe dead sur les card morte et empecher la selection dans l'event listener

wrapper.addEventListener("click", (e) => {
    if (e.target.classList.contains("card")) {
        let isActive = e.target.classList.contains("active");
        let cardIndex = e.target.dataset.index;
        if (selectedCard.length == 2 && !isActive) {
            displayError("max 2 person can be selected");
        }
        else if (selectedCard.length == 0) {
            e.target.classList.add("active");
            selectedCard.push(cardIndex);
            console.log(selectedCard);
        }
        else if (isActive) {
            e.target.classList.remove("active");
            selectedCard.splice(selectedCard.indexOf(cardIndex), 1);
            console.log(selectedCard);
        }
        else {
            e.target.classList.add("active");
            selectedCard.push(cardIndex);
            console.log(selectedCard); 
            displayResponse(selectedCard);
        }
    }
})