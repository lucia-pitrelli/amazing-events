fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then((response) => response.json())
  .then((data) => {
    let events = data.events;
    console.log(events);
    showNames(events);
    showcategories(events);
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
//past events
const arrayPastEvents = [];

function filterEvents() {
  const currentDate = new Date(data.currentDate);

  arrayPastEvents.push(
    ...events.filter((event) => {
      const dateEvent = new Date(event.date);
      return dateEvent < currentDate;
    })
  );
}

function percetage(number, percentage) {
  return ((number / 100) * percentage).toFixed(2);
}
