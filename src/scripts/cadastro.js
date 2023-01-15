import { getUser, login, createUser, validateProfile,} from "./request.js";
import{toast} from './toast.js'
async function renderDash() {
  const user = await getUser();
  const validate = await validateProfile()
 
  if (user && validate.is_admin) {
    window.location.replace("/src/pages/dashboard.html");
  } else if(user && !validate.is_admin){
    window.location.replace('/src/pages/users.html')
  }
}



function redirectToHomePag() {
  const btnHome = document.querySelectorAll(".btnPagHome");
  btnHome.forEach((button) => {
    button.addEventListener("click", () => {
      window.location.replace("/index.html");
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

export async function createUserForm() {
  const inputs = document.querySelectorAll("input");  
  const newUser = {};
  
  inputs.forEach(input =>{
    newUser[input.name] = input.value
  })
  
  
  
  return await createUser(newUser)
  
}

const button = document.getElementById("pag__cadastro-btnCadastro");
button.addEventListener("click", async (event) => {
  event.preventDefault(); 
  createUserForm();
  
  
  

 
              
});


redirectToHomePag();
redirectToLoginPag();
renderDash()
