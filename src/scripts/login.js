import { getUser, login, createUser, validateProfile} from "/src/scripts/request.js";


async function renderLogin() {
  const user = getUser();
  const validate = validateProfile() 
    if (user && validate.is_admin) {
    window.location.replace('/src/pages/dashboard.html')
  } else if(user && !validate.is_admin){
    window.location.replace('/src/pages/users.html')
  }
}
function loginForm() {
  const inputs = document.querySelectorAll(".login > input");
  const button = document.querySelector(".login > button");
  const loginUser = {};
  
  button.addEventListener("click", async (event) => {
    event.preventDefault();
    inputs.forEach((input) => {
      loginUser[input.name] = input.value;
    });
    
    const request = await login(loginUser);
    
    localStorage.setItem("@kenzieEmpresa:user", JSON.stringify(request));
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

  function redirectToRegisterPag() {
    const btnCadastro = document.querySelectorAll(".btnPagCadastro");
        btnCadastro.forEach((button) => {
      button.addEventListener("click", () => {
        window.location.replace("/src/pages/cadastro.html");
      });
    });
  }

  

redirectToHomePag()
redirectToRegisterPag()
loginForm();
renderLogin()
