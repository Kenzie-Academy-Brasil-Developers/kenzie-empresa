import {
  readProfile,
  getUser,
  validateProfile,
  updateProfile,
  companyDeparments,
  employerrDepartment,

} from "./request.js";

async function renderUser() {
  const user = getUser();
  const validate = await validateProfile();
  if (!user) {
    window.location.replace("/");
  } else if (user && validate.is_admin) {
    window.location.replace("/src/pages/dashboard.html");
  }
}

function showmodal() {
  const modalBtn = document.querySelector("#btnModalEdit");
  const modalContainer = document.querySelector("dialog");

  modalBtn.addEventListener("click", () => {
    modalContainer.showModal();
    closeModal();
  });
}

function closeModal() {
  const modalBtn = document.querySelector("#closeModal");
  const modalContainer = document.querySelector("dialog");

  modalBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modalContainer.close();
  });
}

async function youProfile() {
  const sectionUserProfile = document.querySelector(".usuario__editar");
  const modailityJob = document.querySelector('.modalityJob');
  const readYouProfile = await readProfile();

  sectionUserProfile.insertAdjacentHTML(
    "afterbegin",
    `
<div class="profileInformations">
<h1>${readYouProfile.username}</h1>
<p>${readYouProfile.email}</p>
</div>
`
  );

  if (readYouProfile.kind_of_work !== null) {
    modailityJob.insertAdjacentHTML(
      `beforeend`,
      `
  <p>
  ${readYouProfile.kind_of_work}     
  </p>
  `
    );

    if (readYouProfile.professional_level
      !== null) {
      modailityJob.insertAdjacentHTML(
        `beforeend`,
        `
  <p>${readYouProfile.professional_level}</p>
       
  `
      );
    }
  }
}

async function updateProfileForm() {
  const user = await readProfile();
  const { email, username } = user;
  
    const inputs = document.querySelectorAll(".editLogin > input");
  const modalContainer = document.querySelector("dialog");
  const submit = document.querySelector("#btn-editar-perfil");
  const updateUser = {};

  inputs.forEach((input) => {
    if (input.name === "name") {
      input.value = username;
    } else if (input.name === "email") {
      input.value = email;
    }
  });

  submit.addEventListener("click", async (e) => {
    inputs.forEach((input) => {
      updateUser[input.name] = input.value;
    });

    if (updateUser.email === email || updateUser.email === "") {
      delete updateUser.email;
    }

    await updateProfile(updateUser);
    modalContainer.close();
  });
}

function logout() {
  const logoutBtn = document.querySelector(".logout");

  logoutBtn.addEventListener("click", () => {
    localStorage.clear();
    window.location.replace("/src/pages/login.html");
  });
}

async function renderCoWorkers(){
  const coWorkes = document.querySelector('.divInfoCoworkes')
  const ulAllCoworkes = document.querySelector('.ulAllCoworkes')
  const infoUserCompany = await companyDeparments()
  const coWorkesInfo = await employerrDepartment()



  if(infoUserCompany.error){
    coWorkes.insertAdjacentHTML('beforeend',`
    
    <h1>${infoUserCompany.error}</h1>
    `)
  } else{


   coWorkes.insertAdjacentHTML('afterbegin', `
   <h1>

   ${infoUserCompany.name}
   </h1>
   `)

    coWorkesInfo.forEach(coworkes =>{      
      coworkes.users.forEach(array =>{
                ulAllCoworkes.insertAdjacentHTML('beforeend', `
        <li>
        <div>
        <h2>${array.username}</h2>
        <p>${array.professional_level}</p>
        
        </div>
        </li>
        
        `)
      })
    })
    
    
    
    

  }
}









renderUser();
youProfile();
showmodal();
renderCoWorkers()
updateProfileForm();
logout();
