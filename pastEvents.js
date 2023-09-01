let template = "";

for (let event of data.events) {
  if (Date.parse(data.currentDate) > Date.parse(event.date)) {
    template += `
          <div class="card text-center border-secondary" style="width: 18rem">
            <img src="${event.image}" class="card-img-top" alt="Cinema" />
            <div class="card-body">
              <h5 class="card-title text-secondary fw-bold">${event.name}</h5>
              <p class="card-text text-secondary">
            ${event.description}
              </p>
              <p class="card text-success fw-semibold">Price : ${event.price}</p>
              <a href="details.html" class="btn btn-dark">Details</a>
            </div>
          </div>
    `;
  }
}

let dinamicCard = document.getElementById("card");

dinamicCard.innerHTML += template;
