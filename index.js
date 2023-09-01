console.log(data);

//function imprimirEnHtml(dato) {
// let template = "";
//  template = `
//              <div class="card text-center border-secondary" style="width: 18rem">
//          <img src="./img/cinema.jpg" class="card-img-top" alt="Cinema" />
//        <div class="card-body">
//        <h5 class="card-title text-secondary fw-bold">Cinema</h5>
//      <p class="card-text text-secondary">
//         Some quick example text to build on the card title and make up
//         the bulk of the card's content.
//      </p>
//     <p class="card text-success fw-semibold">$500</p>
//     <a href="details.html" class="btn btn-dark">Details</a>
//   </div>
//     </div>

// `;
// return template;
//}

//let estructure;

//for (let data of data) {
//  estructure += imprimirEnHtml(data);
//}

//console.log("hola", estructure);

let template = "";

for (let event of data.events) {
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

let dinamicCard = document.getElementById("card");

dinamicCard.innerHTML += template;
