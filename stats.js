let events = [];

fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((response) => response.json())
  .then((data) => {
    console.log(data.events);
    showNames(data.events);
    showcategories(data.events);
  })
  .catch((error) => {
    console.log(error);
  });

function showNames(array) {
  for (let object of array) {
    console.log(object.name);
  }
}

function showcategories(array) {
  for (let object of array) {
    console.log(object.category);
  }
}
