let events = [];

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
      currentDate = datosApi.currentDate;
      console.log("list", events);
      console.log("fecha actual", currentDate);
      //fn called
      structureTable2(events, dinamicTable1);
      //fn called
      structureTable2(events, dinamicTable2);
      //fn called
      structureTable3(events, dinamicTable3);
    })
    .catch((error) => {
      console.log(error);
    });
}

callFecth();

// COMO OBTENGO NUEVO ARRAY CON EVENTOS PASADOS
//const arrayPastEvents = [];

//function filterPastEvents() {
// const currentDate = new Date(data.currentDate);
//El método filter() crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada.
// arrayPastEvents.push(
//   ...events.filter((event) => {
//     const dateEvent = new Date(event.date);
//    return dateEvent < currentDate;
//  })
// );
//}

//filterPastEvents();

// PRINT STRUCTURE TABLE 1
function structureTable1(string) {
  let template = "";
  template = `
            <tr>
            <td>${string}</td>
            <td>${string}</td>
            <td>${string}</td>
          </tr>
    `;

  return template;
}

console.log(structureTable1);

// PRINT STRUCTURE TABLE 2
function structureTable2(objects, container) {
  let template = "";
  for (let oneObject of objects) {
    template += ` <tr>
            <th scope="row">${oneObject.category}</th>
            <td>$ ${oneObject.price}</td>
            <td>${oneObject.assistance} %</td>
          </tr>`;
  }
  //Inject dinamic table list - HTML
  container.innerHTML = template;
}

console.log(structureTable2);

// PRINT STRUCTURE TABLE 3
function structureTable3(objects, container) {
  let template = "";
  for (let oneObject of objects) {
    template += ` <tr>
            <th scope="row">${oneObject.category}</th>
            <td>$ ${oneObject.price}</td>
            <td>${oneObject.assistance} %</td>
          </tr>`;
  }
  //Inject dinamic table list - HTML
  container.innerHTML = template;
}

console.log(structureTable3);
