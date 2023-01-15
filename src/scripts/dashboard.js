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
  readAllUsers,
  updateDepartmentById,
  updatedUserById,
  deleteProfile,
  usersWithout,
  hireUser,
  dismissUser,
  employerrDepartment,
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
      const idBtnDelete = e.target.id.slice(6);
      

      modalContainerTrash.showModal();
      deleteDepartmentModal(idBtnDelete);

      closeModalDelete();
    });
  });
}

async function deleteDepartmentModal(id) {
  const allCompanies = await readAllDepartments();

  const modalTrash = document.querySelector(".formDeleteModal");
  const modalOpenBtnTrash = document.querySelectorAll(".btnTrashDelete");

  modalTrash.insertAdjacentHTML(
    "beforeend",
    ` 
   <button id="${id}" class="confirmeDelete">Confirmar</button>
   `
  );

  const dataSetBtnConfirm = document.querySelectorAll(".confirmeDelete");

  dataSetBtnConfirm.forEach((button) => {
    button.addEventListener("click", async (e) => {
      await deleteDepartmentById(e.target.id);
      const departments = await readAllDepartments();
      renderDepartments(departments);
      modalOpenBtnTrash.close()
     

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

async function modalEdit() {
  const departments = await readAllDepartments();
  const allCompanies = await readAllDepartments();

  const btnEditModal = document.querySelectorAll(".btnEditInformation");
  const modalContainerEdit = document.querySelector(".modalContainerEdit");
  const input = document.querySelector(".inputEdit");

  btnEditModal.forEach((button) => {
    button.addEventListener("click", (e) => {
      const idBtnEdit = e.target.id.slice(5);

      allCompanies.forEach((companie) => {
        if (companie.uuid == idBtnEdit) {
          input.value = companie.description;
        }
      });

      modalContainerEdit.showModal();
      editDepartment(idBtnEdit);
      closeModalEdit();
    });
  });
}

function closeModalEdit() {
  const closeModalBtn = document.querySelectorAll(".closeModalEditDepartment");
  const modalContainerEdit = document.querySelector(".modalContainerEdit");

  closeModalBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
      modalContainerEdit.close();
    });
  });
}

async function editDepartment(id) {
  const allCompanies = await readAllDepartments();
  const formEditModal = document.querySelector(".formEditModal");
  const input = document.querySelector(".inputEdit");
  const modalContainerEdit = document.querySelector(".modalContainerEdit");

  const newDescription = {};

  formEditModal.insertAdjacentHTML(
    "beforeend",
    `
    <button id="${id}" class="confirmEdit">Editar</button> 
    
    
    `
  );

  const dataSetBtnEdit = document.querySelectorAll(".confirmEdit");

  dataSetBtnEdit.forEach((button) => {
    button.addEventListener("click", async (e) => {
      newDescription["description"] = input.value;
      await updateDepartmentById(newDescription, e.target.id);
      modalContainerEdit.close();
    });
  });
}

// view Department

async function createHireViewDepartment() {
  const allUsers = await usersWithout();
  const departments = await readAllDepartments();
  const btnViewInformation = document.querySelectorAll(".btnReadInformation");
  const modalViewDepartment = document.querySelector(".dialogViewDepartment");
  const select = document.querySelector(".selectViewDepartment");
  btnViewInformation.forEach((button) => {
    button.addEventListener("click", (e) => {
      const idBtnDepartment = e.target.id.slice(5);
      renderCoWorkes(idBtnDepartment);

      viewDepartment(idBtnDepartment);
      modalViewDepartment.showModal();
      closeModalViewDepartment();
    });
  });
}

function closeModalViewDepartment() {
  const closeModalBtn = document.querySelectorAll(".closeModalViewDepartment");
  const modalViewDepartment = document.querySelector(".dialogViewDepartment");

  closeModalBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
      modalViewDepartment.close();
    });
  });
}

async function viewDepartment(id) {
  const allCompanies = await readAllDepartments();
  const formViewModal = document.querySelector(".formNav");
  const divViewInfo = document.querySelector(".divViewInfo");

  const newViewUser = {};

  const allUsers = await usersWithout();
  const select = document.querySelector(".selectViewDepartment");

  allUsers.forEach((user) => {
    select.insertAdjacentHTML(
      "beforeend",
      `
      <option value="${user.uuid}">${user.username}</option>
      
      `
    );
  });

  select.addEventListener("change", () => {
    newViewUser["user_uuid"] = select.value;
  });

  allCompanies.forEach((companie) => {
    if (id == companie.uuid) {
      formViewModal.insertAdjacentHTML(
        "beforeend",
        `
         <div class="navCompanieInfo">
         <h1>${companie.name}</h1>
         <h3>${companie.description}</h3>
         <p>${companie.companies.name}</p>
         </div>

  
  `
      );

      divViewInfo.insertAdjacentHTML(
        "beforeend",
        `
  <button id="${id}" class="btnViewConfirm">Contratar</button>
  
  `
      );
    }
  });

  const dataSetBtnViewDepartment = document.querySelectorAll(".btnViewConfirm");

  dataSetBtnViewDepartment.forEach((button) => {
    button.addEventListener("click", async (e) => {
      newViewUser["department_uuid"] = id;
      await hireUser(newViewUser);
    });
  });
}

async function renderCoWorkes(id) {
  const modalViewDepartment = document.querySelector(".dialogViewDepartment");

  const allUsers = await readAllUsers();
  const allCompanies = await readAllDepartments();

  const ulUserOff = document.querySelector(".userOff");

  allUsers.forEach((user) => {
    if (id == user.department_uuid) {
     
      ulUserOff.insertAdjacentHTML(
        "beforeend",
        `
      <li class="liUserOff">
      <h2>${user.username}</h2>
      <p>${user.professional_level}</p>         
      
      <button id="${user.uuid}" class="btnConfirmOff">Desligar</button>    
      </li>
      
    `
      );
    }
  });

  const liUserOff = document.querySelectorAll(".liUserOff");

  allCompanies.forEach((companie) => {

    liUserOff.forEach((lista) => {
      if (id === companie.uuid) {
        
        lista.insertAdjacentHTML(
          "beforeend",
          `

    <p>${companie.companies.name}</p>
    
    
    `
        );
      }
    });
  });


  const btnOff = document.querySelectorAll('.btnConfirmOff')
 
  btnOff.forEach(button=>{
    button.addEventListener('click', async (e)=>{
      await dismissUser(e.target.id)
      modalViewDepartment.close()


    })
  })


}




















async function renderUser() {
  const ulUsers = document.querySelector(".allUsersDashboard");
  const users = await readAllUsers();

  users.forEach((user) => {
    const liEditUser = document.createElement("li");
    liEditUser.classList.add("liUserEdit");
    const divNavEditUser = document.createElement("div");
    divNavEditUser.classList.add("divNavEditUser");

    const userUsername = document.createElement("h2");
    userUsername.innerHTML = user.username;

    const divButtonsEditUser = document.createElement("div");
    divButtonsEditUser.classList.add("divButtonsEditUser");

    const btnEditUser = document.createElement("button");
    btnEditUser.id = `crayon-${user.uuid}`;
    btnEditUser.classList.add("btnUserEdit");
    const btnDeleteUser = document.createElement("button");
    btnDeleteUser.id = `trashU-${user.uuid}`;
    btnDeleteUser.classList.add("btnDeleteUser");

    if (!user.is_admin) {
      ulUsers.append(liEditUser);
      liEditUser.append(divNavEditUser, divButtonsEditUser);
      divNavEditUser.append(userUsername);
      divButtonsEditUser.append(btnEditUser, btnDeleteUser);
    }

    if (!user.is_admin && user.professional_level !== null) {
      divNavEditUser.insertAdjacentHTML(
        "beforeend",
        `
             <span>${user.professional_level}</span>
                    `
      );
    }

    if (!user.is_admin && user.kind_of_work !== null) {
      divNavEditUser.insertAdjacentHTML(
        "beforeend",
        `
               <span>${user.kind_of_work}</span>
                    `
      );
    }
  });
}

async function showModalEditUser() {
  const users = await readAllUsers();
  users.forEach((user) => {
    const btnEditModal = document.querySelectorAll(".btnUserEdit");
    const modalEditUser = document.querySelector(".modalContainerUsersEdit");

    btnEditModal.forEach((button) => {
      button.addEventListener("click", (e) => {
        const idBtnEdit = e.target.id.slice(7);
        modalEditUser.showModal();
        editUser(idBtnEdit);
        closeModalUserEdit();
      });
    });
  });
}

function closeModalUserEdit() {
  const closeModalBtn = document.querySelectorAll(".closeModalEditUser");
  const modalEditUser = document.querySelector(".modalContainerUsersEdit");

  closeModalBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
      modalEditUser.close();
    });
  });
}

async function editUser(id) {
  const formEditUser = document.querySelector(".formUsersEdit");

  const inputWork = document.querySelector("#kind_of_work");
  const inputLevel = document.querySelector("#professional_level");

  const editUser = {};

  inputWork.addEventListener("change", (e) => {
    editUser["kind_of_work"] = inputWork.value;
  });

  inputLevel.addEventListener("change", (e) => {
    editUser["professional_level"] = inputLevel.value;
  });

  formEditUser.insertAdjacentHTML(
    "beforeend",
    `
  <button id="${id}" class="btnEditUserConfirm">Editar</button>
  
  
  `
  );

  const dataSetBtnEditUser = document.querySelectorAll(".btnEditUserConfirm");

  dataSetBtnEditUser.forEach((button) => {
    button.addEventListener("click", async (e) => {
      await updatedUserById(editUser, id);
    });
  });
}

async function showModalDeleteUser() {
  const users = await readAllUsers();
  const btnDeleteModal = document.querySelectorAll(".btnDeleteUser");
  const modalDeleteUser = document.querySelector(".userDeleteModal");

  btnDeleteModal.forEach((button) => {
    button.addEventListener("click", (e) => {
      const idBtnUserDelete = e.target.id.slice(7);
      modalDeleteUser.showModal();
      deleteUserModal(idBtnUserDelete);
      closeModalUserDelete();
    });
  });
}

function closeModalUserDelete() {
  const closeModalBtn = document.querySelectorAll(".closeModalDeleteUser");
  const modalDeleteUser = document.querySelector(".userDeleteModal");

  closeModalBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
      modalDeleteUser.close();
    });
  });
}

async function deleteUserModal(id) {
  const users = await readAllUsers();
  const modalDelete = document.querySelector(".formModalDeleteUser");

  users.forEach((user) => {
    if (id == user.uuid) {
      modalDelete.insertAdjacentHTML(
        "beforeend",
        `
            <div class="deleteUserDiv">
            <h2>Deseja realmente deletar o usuário <span class="
            underline">${user.username}</span></h2>
          <button id="${id}" class="btnDeleteUserConfirm">Deletar</button>
            
            </div>
          `
      );
    }
  });

  const dataSetBtnDeleteUser = document.querySelectorAll(
    ".btnDeleteUserConfirm"
  );

  dataSetBtnDeleteUser.forEach((button) => {
    button.addEventListener("click", async (e) => {
      await deleteProfile(id);
    });
  });
}

renderDash();
renderDepartments();
createSelect();
showModalCreateDepartment();
closeModalCreateDepartment();
selectModal();
modalOpenDepartment();
modalEdit();
logout();

createHireViewDepartment();

renderUser();
showModalEditUser();
showModalDeleteUser();
