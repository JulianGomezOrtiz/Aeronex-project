let data = [];

document.addEventListener("DOMContentLoaded", async () => {
  data = await fetchData("./resources/assets/info.json");

  let cards = "";
  data.forEach(
    (item) =>
      (cards += `<div class="${item.class}" style="${item.style}"></div>`)
  );
  cards = `
        <section class="masonry-grid">
            ${cards}
        </section> 
    `;
  document.querySelector("main").innerHTML = cards;

  const menuIcon = document.querySelector(".menu-icon");
  const listItems = document.querySelectorAll(".item");
  const listOptions = document.querySelectorAll(".item");

  menuIcon.addEventListener("click", () => {
    listItems.forEach((item) => {
      item.classList.toggle("hide");
    });
  });

  listOptions.forEach((item) => {
    item.addEventListener("click", (e) => {
      //Esto elimina el comportamiento habitual de las anclas
      e.preventDefault();
      mainMenu(e.target.text);
    });
  });

  await loadPage("./resources/html/inicio.html", "main");

  document.querySelector(".logo").addEventListener("click", async () => {
    await loadPage("./resources/html/inicio.html", "main");
  });
});

async function mainMenu(option) {
  switch (option) {
    case "Reservas":
      await loadPage("./resources/html/reservas.html", "main");
      break;
    case "Servicios":
      await loadPage("./resources/html/servicios.html", "main");
      break;
    case "Ayuda":
      await loadPage("./resources/html/ayuda.html", "main");
      break;
    case "Iniciar sesión":
      await login();
      break;
    case "Registrarse":
      await registerUser();
      break;
    default:
      await loadPage("./resources/html/inicio.html", "main");
  }
}
async function loadPage(url, container) {
  try {
    const element = document.querySelector(container);
    if (!element) {
      throw new Error(`Parece que el selector '${container}' no es válido`);
    }
    const response = await fetch(url);
    if (response.ok) {
      const html = await response.text();
      element.innerHTML = html;
      return element; // para permitir encadenamiento
    } else {
      throw new Error(
        `${response.status} - ${response.statusText}, al intentar acceder al recurso '${response.url}'`
      );
    }
  } catch (e) {
    console.log(e);
  }
}

async function fetchData(url, data = {}) {
  if (!("headers" in data)) {
    data.headers = {
      "Content-Type": "application/json; charset=utf-8",
    };
  }

  if ("body" in data) {
    data.body = JSON.stringify(data.body);
  }

  const respuesta = await fetch(url, data);
  return await respuesta.json();
}

async function login() {
  await loadPage("./resources/html/inicio-de-sesion.html", "main");
  const crearCuenta = document.querySelector(".registrarse");
  crearCuenta.addEventListener("click", async (e) => {
    registerUser()
  })
  document.querySelector("#login").addEventListener("click", async (e) => {
    e.preventDefault(); // ojo

    try {
      let response = await fetchData(
        "http://localhost:4567/usuarios/autenticar",
        {
          method: "POST",
          body: {
            identificacion: document.querySelector("#username").value,
            password: document.querySelector("#password").value,
          },
        }
      );

      if (response.message === "ok") {
        console.log("autenticación exitosa");
        typeUser(response.data.perfil)
        console.log(response.data);
      } else {
        console.log("autenticación fallida");
        console.log(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  });
}
async function registerUser() {
  await loadPage("Resources/html/registro.html", "main");
  const iniciarSesion = document.querySelector(".iniciar-sesion");
  iniciarSesion.addEventListener("click", () => {
    login();
  });
  document.querySelector("#register").addEventListener("click", async (e) => {
    e.preventDefault();
    const identificacion = document.querySelector("#identify").value;
    const nombres = document.querySelector("#first-names").value;
    const apellidos = document.querySelector("#second-names").value;
    const perfil = document.querySelector("#perfil").value;
    const password = document.querySelector("#password").value;
    console.log(identificacion + nombres + apellidos + perfil + password);
    try {
      let response = await fetchData("http://localhost:4567/usuarios", {
        method: "POST",
        body: {
          identificacion: identificacion,
          nombres: nombres,
          apellidos: apellidos,
          perfil: perfil,
          password: password,
        },
      });
      if (response.message === "ok") {
        console.log("registro exitoso");
        login();
        console.log(response.data);
      } else {
        console.log("registro fallido");
        console.log(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  });
}
async function typeUser(opcion) {
  switch (opcion) {
    case "PASAJERO":
      await loadPage("Resources/html/clientes.html", "main");
      break;
    case "AUXILIAR":
      await loadPage("Resources/html/auxiliares.html", "main");
      break;
    case "ADMINISTRADOR":
      await loadPage("Resources/html/administrador.html", "main");
      break;
    default:
      await loadPage("Resources/html/Inicio.html", "main");
  }
}