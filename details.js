//return the parameter on id, Html of details
let dinamicDetails = document.getElementById("detailsId");

function callFecth() {
  fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then((response) => response.json())
    .then((datosApi) => {
      let events = datosApi.events;

      const locationSearch = location.search;
      console.log(locationSearch);
      const objectURL = new URLSearchParams(locationSearch);
      console.log(objectURL);
      //method get
      const valueKeyParam = objectURL.get("id");
      console.log(valueKeyParam);

      //find - return unique value in array events
      let eventId = events.find((object) => object._id == valueKeyParam);
      console.log(eventId);

      showDetails(dinamicDetails, eventId);
    })
    .catch((error) => {
      console.log(error);
    });
}

callFecth();

//fn structure of card detail
function structureDetails(oneObject) {
  let template = "";
  return (template = ` 
    <div class="card shadow-sm p-3 mb-5 bg-body-tertiary rounded"
        style="max-width: 600px"
      >
        <div class="row g-0">
          <div class="col-md-4">
            <img
              src="${oneObject.image}"
              alt=""
              class="img-fluid rounded-start"
            >
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title text-secondary fw-bold">${oneObject.name}</h5>
              <p class="card-text text-secondary"> ${oneObject.description}</p>
              <p class="card-text">Date: ${oneObject.date}</p>
              <p class="card-text">Place: ${oneObject.place}</p>
              <p class="card-text">Category: ${oneObject.category}</p>
              <p class="card-text">Capacity: ${oneObject.capacity}</p>
              <p class="card-text">Assistance: ${oneObject.assistance}</p>
              <p class="card-text">
                <small class="card text-success fw-semibold text-center"
                  >$ ${oneObject.price}</small
                >
              </p>
            </div>
          </div>
        </div>
      </div>
      `);
}

//Fn print card detail
function showDetails(elementHTML, oneObject) {
  elementHTML.innerHTML = structureDetails(oneObject);
}
