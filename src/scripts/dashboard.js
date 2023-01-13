import {
  getUser,
  createProduct,
  readProfile,
  companiesSector,
  validateProfile,
  readAllDepartments,
  readAllSector,
  deleteDepartmentById,
  readAllCompanies,
  readAllDepartmentsById,
  updateDepartmentById,
} from "/src/scripts/request.js";

async function renderDash() {
  const user = getUser();
  const validate = await validateProfile();
  const sector = await readAllSector();
  const sectorCompanies = await companiesSector();
  

  if (!user) {
    window.location.replace("/");
  } else if (user && !validate.is_admin) {
    window.location.replace("/src/pages/users.html");
  }
}

async function renderDepartments() {
  const ulAllDepartments = document.querySelector(".ulAllDepartments");
  const departments = await readAllDepartments();

  departments.forEach((department) => {
    ulAllDepartments.insertAdjacentHTML(
      "beforeend",
      `

    <div class="departmentCardDashboard">
    <li class="liDepartmentsDashboard">
    <span><h2>${department.name}</h2></span>
    <span>${department.description}</span>
    <span>${department.companies.name}</span>
    <div class="allBtnCardDepartments">
    <button id="info-${department.uuid}" class="btnReadInformation"></button>
    <button id="edit-${department.uuid}" class="btnEditInformation"></button>
    <button id="trash-${department.uuid}"class="btnTrashDelete"></button>    
    </div>
    </li>
    
    </div>
    `
    );
  });
}

async function createSelect() {
  const select = document.querySelector(".selectDepartments");
  const allCompanies = await readAllCompanies();
  const departments = await readAllDepartments();
  const ulAllDepartments = document.querySelector(".ulAllDepartments");
  

  allCompanies.forEach((companie) => {
    select.insertAdjacentHTML(
      "beforeend",
      `
    <option value="${companie.sectors.description}">${companie.name}</option>  

    `
    );
  });

  select.addEventListener("change", () => {
    ulAllDepartments.innerHTML = "";

    departments.forEach((department) => {
      if (select.value == "selectEnterprise") {
        ulAllDepartments.insertAdjacentHTML(
          "beforeend",
          `

    <div class="departmentCardDashboard">
    <li class="liDepartmentsDashboard">
    <span><h2>${department.name}</h2></span>
    <span>${department.description}</span>
    <span>${department.companies.name}</span>
    <div class="allBtnCardDepartments">
    <button class="btnReadInformation"></button>
    <button class="btnEditInformation"></button>
    <button id="trash-${department.uuid}"class="btnTrashDelete"></button>    
    </div>
    </li>    
    </div>
    `
        );
      }

      if (department.name == select.value) {
        ulAllDepartments.insertAdjacentHTML(
          "beforeend",
          `

    <div class="departmentCardDashboard">
    <li class="liDepartmentsDashboard">
    <span><h2>${department.name}</h2></span>
    <span>${department.description}</span>
    <span>${department.companies.name}</span>
    <div class="allBtnCardDepartments">
    <button class="btnReadInformation"></button>
    <button class="btnEditInformation"></button>
    <button id="trash-${department.uuid}"class="btnTrashDelete"></button>    
    </div>
    </li>    
    </div>
    `
        );
      }
    });
  });
}

function showModalCreateDepartment() {
  const modalBtn = document.querySelector("#btnCreateDepartProfile");
  const modalCreateDepartment = document.querySelector(".modalContainerCreate");

  modalBtn.addEventListener("click", () => {
    modalCreateDepartment.showModal();
    closeModalCreateDepartment();
  });
}

function closeModalCreateDepartment() {
  const modalBtn = document.querySelector("#closeModalCreateDepartment");
  const modalCreateDepartment = document.querySelector(".modalContainerCreate");

  modalBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modalCreateDepartment.close();
  });
}

async function selectModal() {
  const inputs = document.querySelectorAll(".dialogCreateDepartment > input");
  const button = document.querySelector("#btnCreateDepartment");
  const modalCreateDepartment = document.querySelector(".modalContainerCreate");
  const select = document.querySelector(".selectModalDepartments");
  const allCompanies = await readAllCompanies();
  const newDepartment = {};

  allCompanies.forEach((companie) => {
    select.insertAdjacentHTML(
      "beforeend",
      `
    <option value="${companie.uuid}">${companie.name}</option>      `
    );
  });

  select.addEventListener("change", (e) => {
    e.preventDefault();
    newDepartment["company_uuid"] = select.value;
  });

  button.addEventListener("click", async (e) => {

    inputs.forEach((input) => {
      newDepartment[input.name] = input.value;
    });

    await createProduct(newDepartment);
    modalCreateDepartment.close();
  });
}

async function modalOpenDepartment() {
  const departments = await readAllDepartments();
  const btnDeleteTrash = document.querySelectorAll(".btnTrashDelete");
  const modalContainerTrash = document.querySelector(".modalContainerTrash");

  btnDeleteTrash.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.target.id.slice(6)
      
      modalContainerTrash.showModal();

      closeModalDelete();
    });
  });
}



async function deleteDepartmentModal() {
  const allCompanies = await readAllDepartments();

  const modalTrash = document.querySelector(".formDeleteModal");
  const modalOpenBtnTrash = document.querySelectorAll(".btnTrashDelete");

  allCompanies.forEach((companie) => {
    modalTrash.insertAdjacentHTML(
      "beforeend",
      ` 
   <button id="${companie.uuid}" class="confirmeDelete">Confirmar</button>
   `
    );
  });

  const dataSetBtnConfirm = document.querySelectorAll(".confirmeDelete");

  dataSetBtnConfirm.forEach((button) => {
    button.addEventListener("click", async (e) => {
      await deleteDepartmentById(e.target.id);
      const departments = await readAllDepartments();
      renderDepartments(departments);
    });
  });
}

function closeModalDelete() {
  const closeModalBtn = document.querySelectorAll(
    ".closeModalDeleteDepartment"
  );
  const modalContainerTrash = document.querySelector(".modalContainerTrash");

  closeModalBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      modalContainerTrash.close();
    });
  });
}

function logout() {
  const logoutBtn = document.querySelector(".logout");

  logoutBtn.addEventListener("click", () => {
    localStorage.clear();
    window.location.replace("/src/pages/login.html");
  });
}


async function modalEdit(){
  const departments = await readAllDepartments();
  const allCompanies = await readAllDepartments();
  

  const btnEditModal = document.querySelectorAll('.btnEditInformation')
  const modalContainerEdit = document.querySelector('.modalContainerEdit')
  const input = document.querySelector('.inputEdit')




      


  btnEditModal.forEach(button =>{
    button.addEventListener('click', (e)=>{


      allCompanies.forEach(companie=>{
        if(companie.uuid == e.target.id.slice(5)){
          input.value = companie.description   
        }
      })
      modalContainerEdit.showModal()
      closeModalEdit()
      })

  })
}


function closeModalEdit(){
  const closeModalBtn = document.querySelectorAll('.closeModalEditDepartment')
  const modalContainerEdit = document.querySelector('.modalContainerEdit')

  closeModalBtn.forEach(button=>{
    button.addEventListener('click',(e)=>{
      e.preventDefault()
      modalContainerEdit.close()
    })
  })

}




async function editDepartment(){
  const allCompanies = await readAllDepartments();
  const formEditModal = document.querySelector('.formEditModal')
  const input = document.querySelector('.inputEdit')
  const modalContainerEdit = document.querySelector('.modalContainerEdit')




  const newDescription = {}

  


  allCompanies.forEach(companie=>{
    formEditModal.insertAdjacentHTML('beforeend', `
    <button id="${companie.uuid}" class="confirmEdit">Editar</button> 
    
    
    `)
  })


 
  const dataSetBtnEdit = document.querySelectorAll('.confirmEdit')

  dataSetBtnEdit.forEach(button=>{
    button.addEventListener('click', async (e)=>{
      newDescription["description"] = input.value
      await updateDepartmentById(newDescription, e.target.id)
      modalContainerEdit.close()


      console.log(newDescription)




    })


  })
  
  


   


      
    
  }


































renderDash();
renderDepartments();
createSelect();
showModalCreateDepartment();
closeModalCreateDepartment();
selectModal();
modalOpenDepartment();
modalEdit()
logout();
deleteDepartmentModal();
editDepartment()
