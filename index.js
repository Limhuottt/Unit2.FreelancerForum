/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

// Utility: Generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Step 1: Create a freelancer object
function generateFreelancer() {
  const name = NAMES[getRandomInt(0, NAMES.length - 1)];
  const occupation = OCCUPATIONS[getRandomInt(0, OCCUPATIONS.length - 1)];
  const rate = getRandomInt(MIN_RATE, MAX_RATE);
  return { name, occupation, rate };
}

// Step 2: Initialize freelancers array
let freelancers = Array.from({ length: NUM_FREELANCERS }, generateFreelancer);

// Step 3: Calculate average rate
function calculateAverageRate(freelancers) {
  if (!freelancers.length) return 0;
  const total = freelancers.reduce(
    (sum, freelancer) => sum + freelancer.rate,
    0
  );
  return (total / freelancers.length).toFixed(2);
}

// Step 4: Store average rate
let averageRate = calculateAverageRate(freelancers);

// Step 5: Single freelancer component
function FreelancerRow(freelancer) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${freelancer.name}</td>
    <td>${freelancer.occupation}</td>
    <td>$${freelancer.rate}</td>
  `;
  return tr;
}

// Step 6: Component for array of freelancers
function FreelancerTableRows(freelancers) {
  const fragment = document.createDocumentFragment();
  for (const freelancer of freelancers) {
    fragment.appendChild(FreelancerRow(freelancer));
  }
  return fragment;
}

// Step 7: Component for average rate
function AverageRate(rate) {
  const p = document.createElement("p");
  p.textContent = `The average rate is $${rate}.`;
  return p;
}

// Step 8: Render the application
function render() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h1>Freelancer Forum</h1>
    <div id="avg-rate"></div>
    <table>
      <thead>
        <tr><th>NAME</th><th>OCCUPATION</th><th>RATE</th></tr>
      </thead>
      <tbody id="FreelancerRows"></tbody>
    </table>
  `;

  app.querySelector("#avg-rate").appendChild(AverageRate(averageRate));

  // Create a new <tbody> with the freelancer rows
  const newBody = document.createElement("tbody");
  newBody.id = "FreelancerRows";
  newBody.appendChild(FreelancerTableRows(freelancers));

  // Replace the old tbody with the new one
  app.querySelector("tbody#FreelancerRows").replaceWith(newBody);
}
