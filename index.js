let events = data.events;

//  DINAMIC CARDS

//Return the parameter on id, Html of cards
let dinamicCard = document.getElementById("cardId");

// Create structure of dinamic cards with interpolation of data
function structureCards(objects, container) {
  let template = "";
  for (let oneObject of objects) {
    //add template html for each iteration of objects
    template += `
          <div class="card text-center border-secondary" style="width: 18rem">
            <img src="${oneObject.image}" class="card-img-top" alt="Cinema" />
            <div class="card-body">
              <h5 class="card-title text-secondary fw-bold">${oneObject.name}</h5>
              <p class="card-text text-secondary">
            ${oneObject.description}
              </p>
              <p class="card text-success fw-semibold">Price : ${oneObject.price}</p>
              <a href="details.html?id=${oneObject._id}" class="btn btn-dark">Details</a>
            </div>
          </div>
    `;
  }
  //Inject dinamic cards list - HTML
  container.innerHTML = template;
}

//Call the fn with parameters of array and dinamicCard
structureCards(events, dinamicCard);

// DINAMIC CHECKBOX

//Return the parameter on id, Html of checkbox
let dinamicCheckbox = document.getElementById("chekboxId");

//Create new array about categories of events and with Set remove the elements repeated. then save in categoryCheckbox
let categoryCheckbox = [
  ...new Set(events.map((oneObject) => oneObject.category)),
];

//Create structure of checkboxes with interpolation of data
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

//Fn show checkbox in HTML
function showCheck(array, container) {
  let checkBox = "";
  array.forEach((categories) => {
    checkBox += sctructureCheck(categories);
  });
  //Inject dinamic checkbox list - HTML
  container.innerHTML += checkBox;
}

//Call fn with parameters of array and dinamicCheckbox
showCheck(categoryCheckbox, dinamicCheckbox);

// CHECKBOX FILTER

//Fn checkbox
function checkboxFilter() {
  // QuerySelectorAll returns all the inputs element with type checkbox
  let nodeList = document.querySelectorAll("input[type='checkbox']:checked");

  //Create new array of elements selected and save in inputValue
  let arrayValue = Array.from(nodeList).map((check) => check.value);

  //If checkbox is selected, show filter of array events
  if (arrayValue.length > 0) {
    let checkboxFilter = events.filter((oneObject) =>
      arrayValue.includes(oneObject.category)
    );
    return checkboxFilter;
  } else {
    //If checkbox isn't selected, return array of events without a filter
    return events;
  }
}

//Event change
dinamicCheckbox.addEventListener("change", (e) => {
  const returnCombinedFilters = filterCombined(events, search);

  //Call fn with parameters of returnCombinedFilters and variable dinamicCard
  structureCards(returnCombinedFilters, dinamicCard);
});

// SEARCH FILTER

//Select element by input search
const search = document.querySelector('input[type="search"]');

// Event keyup
search.addEventListener("keyup", (e) => {
  const returnCombinedFilters = filterCombined(events, search);
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
