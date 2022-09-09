class Person {
  constructor(name, volume) {
    this.name = name;
    this.volume = volume;
  }
}

class Bottle {
  constructor(volume, name, ml) {
    this.volume = volume;
    this.name = name;
    this.ml = ml;
    this.volumeCurrent = volume;
  }

  decrease() {
    this.volumeCurrent = this.volumeCurrent - ml;
  }

  refill() {
    this.volumeCurrent = this.volume;
  }
}

class Model {
  constructor(person, bottle) {
    this.person = person;
    this.bottle = bottle;
  }

  volumeChanged(action) {
    this.changes = action;
  }

  drink() {
    this.bottle.decrease();
    this.changes(this.person, this.bottle);
  }
  bottleRefill() {
    this.bottle.refill();
    this.changes(this.person, this.bottle);
  }
}

class View {
  constructor() {
    this.person = document.querySelector(".person");
    this.container = document.querySelector(".container");
    this.form = document.querySelector("form");
    this.buttons = document.querySelector(".buttons");
    this.btnDrink = document.querySelector(".drink");
    this.btnRefill = document.querySelector(".refill");
    this.titleHuman = document.createElement("h1");
    this.titleBottle = document.createElement("h1");
    this.volumeHuman = document.createElement("h1");
    this.volumeBottle = document.createElement("h1");
    this.volumeBottleEmpty = document.querySelector(".volumeBottleEmpty");
    this.person.innerHTML = "";
    this.container.innerHTML = "";
    this.person.append(this.titleHuman, this.volumeHuman);
    this.container.append(this.titleBottle, this.volumeBottle);
  }

  drink(action) {
    this.btnDrink.addEventListener("click", () => {
      action();
    });
  }

  refill(action) {
    this.btnRefill.addEventListener("click", () => {
      action();
    });
  }

  showData(person, bottle) {
    this.titleHuman.innerText = `${person.name} drinks ~`;
    this.titleBottle.innerText = `You drink from ${bottle.name} V=`;
    this.volumeHuman.textContent = ` ${person.volume} ml`;
    this.volumeBottle.textContent = `${bottle.volumeCurrent} ml`;
    this.buttons.classList.add("visible");
    if (bottle.volumeCurrent < person.volume) {
      this.volumeBottleEmpty.innerText = `Your ${bottle.name} is empty, need to refill water`;
    } else {
      this.volumeBottleEmpty.innerText = "";
    }
  }
}

class Controller {
  constructor(model, view) {
    this.view = view;
    this.model = model;
    this.view.drink(this.drink);
    this.view.refill(this.refill);
    this.model.volumeChanged(this.update);
    this.update(this.model.person, this.model.bottle);
  }

  update = (person, bottle) => {
    this.view.showData(person, bottle);
  };

  drink = () => {
    if (this.model.bottle.volumeCurrent >= this.model.person.volume) {
      this.model.drink();
    }
  };
  refill = () => {
    if (this.model.bottle.volumeCurrent == this.model.bottle.volume) {
      alert(`${this.model.bottle.name} is full`);
    } else {
      this.model.bottleRefill();
    }
  };
}
let human;
let ml;
let bottle;
let app;
const form = document.querySelector("form");
form.addEventListener("click", function (event) {
  if (event.target.tagName != "INPUT") return;
  coosePerson();
});

const coosePerson = () => {
  if (document.getElementById("human").checked) {
    human = new Person("Human", 250);
    ml = human.volume;
    bottle = new Bottle(500, "Bottle", ml);
  } else if (document.getElementById("cat").checked) {
    human = new Person("Сat", 50);
    ml = human.volume;
    bottle = new Bottle(100, "Bowl", ml);
  } else if (document.getElementById("somebody").checked) {
    human = new Person("Somebody", 100);
    ml = human.volume;
    bottle = new Bottle(2000, "Water cooler", ml);
  }

  app = new Controller(new Model(human, bottle), new View());
};
