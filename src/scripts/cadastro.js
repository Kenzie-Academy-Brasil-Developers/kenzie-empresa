import { getUser, login, createUser,} from "./request.js";

async function renderDash() {
  const user = await getUser();
 
  if (user) {
    window.location.replace("/src/pages/login.html");
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
  const button = document.getElementById("pag__cadastro-btnCadastro");

  const newUser = {};

  button.addEventListener("click", async (event) => {
    event.preventDefault();
    inputs.forEach((input) => {
      newUser[input.id] = input.value;
    });

    const request = await createUser(newUser);
    localStorage.setItem("@kenzieEmpresa:user", JSON.stringify(request));

    
   
                
  });
  return newUser
 
}



redirectToHomePag();
redirectToLoginPag();
createUserForm();
renderDash()
