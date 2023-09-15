let upcomingEvents = [];
//return the parameter on id, Html of cards
let dinamicCard = document.getElementById("cardId");
//return the parameter on id, Html of checkbox
let dinamicCheckbox = document.getElementById("chekboxId");
//create new array about categories of events and with Set remove the elements repeated. then save in categoryCheckbox
let categoryCheckbox = [];
//Select element by input search
const search = document.querySelector('input[type="search"]');

function callFecth() {
  fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then((response) => response.json())
    .then((datosApi) => {
      upcomingEvents = datosApi.events;
      //call the fn with parameters of arrayUpcomingEvents and dinamicCard
      structureCards(upcomingEvents, dinamicCard);
      //create new array about categories of events and with Set remove the elements repeated. then save in categoryCheckbox
      categoryCheckbox = [
        ...new Set(upcomingEvents.map((oneObject) => oneObject.category)),
      ];
      //call fn with parameters of array and dinamicCheckbox
      showCheck(categoryCheckbox, dinamicCheckbox);
    })
    .catch((error) => {
      console.log(error);
    });
}

callFecth();

//  DINAMIC CARDS

//fn filter upcoming events and add in arrayUpcomingEvents - VER
const arrayUpcomingEvents = [];

function filterEvents() {
  const currentDate = new Date(data.currentDate);

  arrayUpcomingEvents.push(
    ...events.filter((event) => {
      const dateEvent = new Date(event.date);
      return dateEvent > currentDate;
    })
  );
}

// Structure of dinamic cards
function structureCards(objects, container) {
  let template = "";
  for (let oneObject of objects) {
    template += `
          <div class="card text-center border-secondary" style="width: 18rem">
            <img src="${oneObject.image}" class="card-img-top" alt="" />
            <div class="card-body">
              <h5 class="card-title text-secondary fw-bold">${oneObject.name}</h5>
              <p class="card-text text-secondary">
            ${oneObject.description}
              </p>
              <p class="card text-success fw-semibold">Price : ${oneObject.price}</p>
              <a href="details.html?id=${oneObject._id}"class="btn btn-dark">Details</a>
            </div>
          </div>
    `;
  }
  //inject dinamic cards list - HTML
  container.innerHTML = template;
}

// DINAMIC CHECKBOX

//create structure of checkboxes with interpolation of data
function sctructureCheck(categories) {
  let template = "";
  template = `
      <div class="form-check form-check-inline mb-4 mt-4 mb-lg-0">   
        <input
       class="form-check-input"
       type="checkbox"
       id="inlineCheckbox"
       value="${categories}"
     />
     <label class="form-check-label" for="inlineCheckbox"
       >${categories}</label
    >
   </div>
 `;
  return template;
}

//fn show checkbox in HTML
function showCheck(array, container) {
  let checkBox = "";
  array.forEach((categories) => {
    checkBox += sctructureCheck(categories);
  });
  //inject dinamic checkbox list - HTML
  container.innerHTML += checkBox;
}

// CHECKBOX FILTER

//Fn checkbox
function checkboxFilter() {
  // QuerySelectorAll returns all the inputs element with type checkbox
  let nodeList = document.querySelectorAll("input[type='checkbox']:checked");

  //Create new array of elements selected and save in variable inputValue
  let arrayValue = Array.from(nodeList).map((check) => check.value);

  //If checkbox is selected, show filter of arrayUpcomingEvents
  if (arrayValue.length > 0) {
    let checkboxFilter = arrayUpcomingEvents.filter((oneObject) =>
      arrayValue.includes(oneObject.category)
    );
    return checkboxFilter;
  } else {
    //If checkbox isn't selected, return arrayUpcomingEvents without a filter
    return arrayUpcomingEvents;
  }
}

//Event change
dinamicCheckbox.addEventListener("change", (e) => {
  const returnCombinedFilters = filterCombined(arrayUpcomingEvents, search);

  //Call fn with parameters of returnCombinedFilters dinamicCard
  structureCards(returnCombinedFilters, dinamicCard);
});

// SEARCH FILTER

// Event keyup
search.addEventListener("keyup", (e) => {
  const returnCombinedFilters = filterCombined(arrayUpcomingEvents, search);

  if (returnCombinedFilters != 0) {
    structureCards(returnCombinedFilters, dinamicCard);
  } else {
    return (dinamicCard.innerHTML = `<p>No results found</p>`);
  }
});

//Fn search
function filterSearch(array, input) {
  let arrayFilterSearch = array.filter((object) =>
    object.name.toLowerCase().includes(input.value.toLowerCase())
  );

  return arrayFilterSearch;
}

//  Filters combined - search and checkbox
function filterCombined(array, input) {
  const arrayFilterCheck = checkboxFilter(array);
  const arrayFilterSearch = filterSearch(arrayFilterCheck, input);

  return arrayFilterSearch;
}
