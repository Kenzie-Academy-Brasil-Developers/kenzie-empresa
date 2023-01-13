import {
  getUser,
  readAllCompanies,
  companiesSector,
  readAllSector,
} from "/src/scripts/request.js";

async function renderCompanies() {
  const ulAllCompanies = document.querySelector(".ulCompanies");
  const companies = await readAllCompanies();

  companies.forEach((companie) => {
    ulAllCompanies.insertAdjacentHTML(
      "beforeend",
      `

      <div class="divCompanies">
      <li>
    <span class="companieName">${companie.name}</span>
    <span class="companieHours">${companie.opening_hours} horas</span>
   <span class="companieSectorDescription">${companie.sectors.description}</span> 
    </li>
      </div>
    `
    );

  });
}

async function createSelect() {
  const select = document.querySelector("select");
  const allCompanies = await readAllCompanies();
  const allSector = await readAllSector();

  const ulAllCompanies = document.querySelector(".ulCompanies");

  allSector.forEach((sector) => {
    select.insertAdjacentHTML(
      "beforeend",
      `
      <option value="${sector.description}">${sector.description}</option>
      `
    );
  });

  select.addEventListener("change", () => {
    ulAllCompanies.innerHTML = "";

    allCompanies.forEach((companie) => {
      if (select.value == "selectSector") {
        ulAllCompanies.insertAdjacentHTML(
          "beforeend",
          `
    

          <div class="divCompanies">
          <li>
        <span class="companieName">${companie.name}</span>
        <span class="companieHours">${companie.opening_hours} horas</span>
       <span class="companieSectorDescription">${companie.sectors.description}</span> 
        </li>
          </div>
        
        `
        );
      }

      if (companie.sectors.description == select.value) {
        ulAllCompanies.insertAdjacentHTML(
          "beforeend",
          `
      
          <div class="divCompanies">
          <li>
        <span class="companieName">${companie.name}</span>
        <span class="companieHours">${companie.opening_hours} horas</span>
       <span class="companieSectorDescription">${companie.sectors.description}</span> 
        </li>
          </div>
          `
        );
      }
    });
  });
}

function redirectToLoginPag() {
  const btnLogin = document.querySelectorAll(".btnPagLogin");
  btnLogin.forEach((button) => {
    button.addEventListener("click", () => {
      window.location.replace("/src/pages/login.html");
    });
  });
}

function redirectToRegisterPag() {
  const btnCadastro = document.querySelectorAll(".btnPagCadastro");

  btnCadastro.forEach((button) => {
    button.addEventListener("click", () => {
      window.location.replace("/src/pages/cadastro.html");
    });
  });
}
function redirectToHomePag() {
  const btnHome = document.querySelectorAll(".btnPagHome");
  btnHome.forEach((button) => {
    button.addEventListener("click", () => {
      window.location.replace("/index.html");
    });
  });
}
redirectToLoginPag();
redirectToRegisterPag();
redirectToHomePag();
renderCompanies();
createSelect();
