//rename array
let events = data.events;
console.log("list events", events);

const locationSearch = location.search;
console.log("location", locationSearch);

const objetoURL = new URLSearchParams(locationSearch);
console.log("URL", objetoURL);

//terminar codigo ----VER
const valueKeyParam = objetoURL.get("id");
console.log("value", valueKeyParam);

// falta variable para pasar en show details  ---VER
let eventId = events.find((object) => object._id === valueKeyParam);
console.log("eventId", eventId);

//return the parameter on id, Html of details
let dinamicDetails = document.getElementById("detailsId");
console.log("details", dinamicDetails);

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
              class="img-fluid rounded-start"
              alt=""
            />
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

//falta desarrollo -> va sin bucle porque queremos imprimir un solo objeto
function showDetails(elementHTML, object) {
  elementHTML.innerHTML = structureDetails(object);
}

//falta la segunda variable que es el objeto creado --- VER
showDetails(dinamicDetails, eventId);
