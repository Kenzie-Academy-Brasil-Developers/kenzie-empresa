import { toast } from "/src/scripts/toast.js";

const user = getUser() || {};
const { token } = user;

export function getUser() {
  const user = JSON.parse(localStorage.getItem("@kenzieEmpresa:user"));

  return user;
}

export async function login(data) {
  const loginData = await fetch(`http://localhost:6278/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const loginDataJson = await loginData.json();


  if (!loginData.ok) {
    toast('Usuário ou senha incorreto', '#c20803')
  } else {
    toast('Login realizado com sucesso', '#08c203')
    window.location.replace("/src/pages/dashboard.html");
  }

  return loginDataJson;
}

export async function createUser(data) {
  const newUser = await fetch(`http://localhost:6278/auth/register`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const newUserJson = await newUser.json();

  if (!newUser.ok) {
    toast('Usuário não cadastrado', '#C20803')
  } else {
    toast('Usuário cadastrado com sucesso', '#08C203')
    window.location.replace('/src/pages/login.html')
  }

  return newUserJson;
}

export async function readProfile() {
  const loggedUser = await fetch(`http://localhost:6278/users/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const loggedUserJson = await loggedUser.json();

  if (!loggedUser.ok) {
    toast(loggedUser.message, '#c20803')

  }
   
  return loggedUserJson;
}

export async function validateProfile() {
  const validateUser = await fetch(`http://localhost:6278/auth/validate_user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const validateUserJson = await validateUser.json();
  return validateUserJson;
}

export async function updateProfile(data) {
  const updatedUser = await fetch(`http://localhost:6278/users`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const updatedUserJson = await updatedUser.json();

  if (!updatedUser.ok) {
    toast('O perfil não foi atualizado', '#c20803')
  } else {
    toast('Perfil atualizado', '#08c203')
  }

  return updatedUserJson;
}

export async function deleteProfile(product_id) {
  const deletedUser = await fetch(`http://localhost:6278/admin/delete_user/${product_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
     
    }
  );

  const deletedUserJson = await deletedUser.json();

  if (!deletedUser.ok) {
    toast('Erro ao deletar o usuário', '#c20803')
  } else {
    toast('Usuário deletado', '#08c203')
  }

  return deletedUserJson;
}

export async function createProduct(data) {
  const newProduct = await fetch(`http://localhost:6278/departments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const newProductJson = await newProduct.json();

  if (!newProduct.ok) {
    toast('O departamento não foi cadastrado', '#c20803')
  } else {
    toast('Departamento Cadastrado', '#08c203')
  }
  return newProductJson;
}


export async function readAllCompanies() {
  const companies = await fetch(`http://localhost:6278/companies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const companiesJson = await companies.json();

  if (!companies.ok) {
    toast(companiesJson.message, "#c20803");
  }

  return companiesJson;
}

export async function readAllSector() {
  const sector = await fetch(`http://localhost:6278/sectors`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const sectorJson = await sector.json();

  if (!sector.ok) {
    toast(companiesJson.message, '#c20803');
  }

  return sectorJson;
}

export async function companiesSector() {
  const sector = await fetch(`http://localhost:6278/companies/Alimenticio`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const sectorJson = await sector.json();
  return sectorJson;
}


export async function employerrDepartment() {
  const employeeDep = await fetch(
    `http://localhost:6278/users/departments/coworkers`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const employeeDepJson = await employeeDep.json();
  return employeeDepJson;
}


export async function companyDeparments() {
  const departments = await fetch(`http://localhost:6278/users/departments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const departmentsJson = await departments.json();
  return departmentsJson;
}

export async function updatedUserById(data, product_id) {
  const updateUser = await fetch(
    `http://localhost:6278/admin/update_user/${product_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  const updatedUserJson = await updateUser.json();
  if (!updateUser.ok) {
    toast('O produto não foi atualizado', '#c20803');
  } else {
    toast("Produto atualizado", '#08c203');
  }

  return updatedUserJson;
}


export async function readAllUsers(){
  const users = await fetch(`http://localhost:6278/users`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  const usersJson = await users.json()
  return usersJson

}



export async function usersWithout(){
const users = await fetch(`http://localhost:6278/admin/out_of_work`, {
  method: 'GET',
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
})

const usersJson = await users.json()
return usersJson 
}


export async function readAllDepartments(){
  const departments = await fetch(`http://localhost:6278/departments`,{
    method:'GET',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  const departmentsJson = await departments.json()
  return departmentsJson
}


export async function readAllDepartmentsById(product_id){
const readDepartments = await fetch(`http://localhost:6278/departments/${product_id}`,{
method: 'GET',
headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
},


})

const readDepartmentsJson = await readDepartments.json()
return readDepartmentsJson

}


export async function deleteDepartmentById(product_id){
  const deleteDepartment = await fetch(`http://localhost:6278/departments/${product_id}`,{
    method:'DELETE',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  const deleteDepartmentJson = await deleteDepartment.json()
  if (!deleteDepartment.ok) {
    toast('O departamento não foi deletado', '#c20803')
  } else {
    toast('Departamento deletado', '#08c203')
  }

  return deleteDepartmentJson

  

}


export async function updateDepartmentById(data, product_id){
  const editDepartment = await fetch(`http://localhost:6278/departments/${product_id}`,{
    method:'PATCH',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  })

  const editDepartmentJson = await editDepartment.json()
  if(editDepartment.ok){
    toast('Departamento editado', '#08c203')
  } else{
    toast('Departamento não foi editado', '#c20803')
  }

  return editDepartmentJson


}


export async function hireUser(data){
const newHire = await fetch(`http://localhost:6278/departments/hire/`,{
  method: 'PATCH',
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(data)

})

const newHireJson = await newHire.json()

if(newHire.ok){
  toast('Usuário Contratado', '#08c203')
} else{
  toast('O Usuário não foi contratado', '#c20803')
}

return newHireJson



}



export async function dismissUser(product_id){
  const dismiss = await fetch(`http://localhost:6278/departments/dismiss/${product_id}`,{
    method:'PATCH',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

  })
  const dismissJson = await dismiss.json()

  if(dismiss.ok){
    toast('O Usuário foi demitido', '#08c203')
  } else{
    toast ('O Usuário não foi demitido', '#c20803')
  }

  return dismissJson
}
