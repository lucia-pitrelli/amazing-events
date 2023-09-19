let currentDate;
let events;

//TABLE 1
let dinamicTable1 = document.getElementById("table1Id");
console.log("table 1", dinamicTable1);

//TABLE 2
let dinamicTable2 = document.getElementById("table2Id");
console.log("table 2", dinamicTable2);

//TABLE 3
let dinamicTable3 = document.getElementById("table3Id");
console.log("table 3", dinamicTable3);

function callFecth() {
  fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then((response) => response.json())
    .then((datosApi) => {
      events = datosApi.events;
      currentDate = new Date(datosApi.currentDate);
      console.log("list", events);
      console.log("fecha actual", currentDate);

      //fn called
      createTable123();
    })
    .catch((error) => {
      console.log(error);
    });
}

callFecth();

//Create Tables 1, 2 & 3
function createTable123() {
  //Array of past events
  const pastEvents = [];

  function getPastEvents(event) {
    const eventExists = pastEvents.find(
      (item) => event.category === item.category
    );
    if (eventExists) {
      eventExists.revenues += event.price * event.assistance;
      eventExists.assistance += event.assistance;
      eventExists.capacity += event.capacity;
    } else {
      pastEvents.push({
        category: event.category,
        revenues: event.price * event.assistance,
        assistance: event.assistance,
        capacity: event.capacity,
      });
    }
  }

  //fn filter past events from array events by assistance and sort
  const filteredPastEvents = events
    .filter((event) => event.assistance)
    .sort((a, b) => b.assistance / b.capacity - a.assistance / a.capacity);

  filteredPastEvents.forEach(getPastEvents);
  console.log("fill data past events", filteredPastEvents);

  const capacityAllEvents = events.sort((a, b) => b.capacity - a.capacity);

  // PRINT STRUCTURE TABLE 1
  function structureTable1(attendance, capacity) {
    let template = "";

    for (let i = 0; i < 1; i++) {
      template += `
            <tr>
            <td>${attendance[i].name}  ${(
        (attendance[i].assistance / attendance[i].capacity) *
        100
      ).toFixed(2)} %</td>
            <td>${attendance[attendance.length - i - 1].name} ${(
        (attendance[attendance.length - i - 1].assistance /
          attendance[attendance.length - i - 1].capacity) *
        100
      ).toFixed(2)} %</td>
            <td>${capacity[i].name} ${capacity[i].capacity}</td>
          </tr>
    `;
    }

    return template;
  }

  console.log(structureTable1);

  dinamicTable1.innerHTML = structureTable1(
    filteredPastEvents,
    capacityAllEvents
  );

  // PRINT STRUCTURE TABLE 2 - PAST EVENTS
  function structureTable2(events) {
    let template = "";
    for (let item of events) {
      template += ` <tr>
            <th scope="row">${item.category}</th>
            <td>$ ${item.revenues}</td>
            <td>${((item.assistance / item.capacity) * 100).toFixed(2)} %</td>
          </tr>`;
    }

    return template;
  }

  dinamicTable2.innerHTML = structureTable2(pastEvents);
  console.log(structureTable2);

  //TABLE 3 - UPCOMING EVENTS
  //array of upcoming events
  const upcomingEvents = [];

  function getUpcomingEvents(event) {
    const eventExists = upcomingEvents.find(
      (item) => event.category === item.category
    );
    if (eventExists) {
      eventExists.revenues += event.price * event.estimate;
      eventExists.estimate += event.estimate;
      eventExists.capacity += event.capacity;
    } else {
      upcomingEvents.push({
        category: event.category,
        revenues: event.price * event.estimate,
        estimate: event.estimate,
        capacity: event.capacity,
      });
    }
  }

  //fn filter upcoming events from array events by esimate and sort
  const filteredUpcomingEvents = events
    .filter((event) => event.estimate)
    .sort((a, b) => b.estimate / b.capacity - a.estimate / a.capacity);

  filteredUpcomingEvents.forEach(getUpcomingEvents);
  console.log("fill data upcoming events", filteredUpcomingEvents);

  // PRINT STRUCTURE TABLE 3 - upcoming events
  function structureTable3(events) {
    let template = "";
    for (let item of events) {
      template += ` <tr>
            <th scope="row">${item.category}</th>
            <td>$ ${item.revenues}</td>
            <td>${((item.estimate / item.capacity) * 100).toFixed(2)} %</td>
          </tr>`;
    }

    return template;
  }

  dinamicTable3.innerHTML = structureTable3(upcomingEvents);
  console.log(structureTable3);
}
