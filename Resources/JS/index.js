document.addEventListener("DOMContentLoaded", async () => {
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
    case "Vuelos":
      await loadPage("./resources/html/vuelos.html", "main");
      break;
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
      await loadPage("./resources/html/autenticacion.html", "main");
      break;
    case "Buscar":
      await loadPage(".resources/html/autenticacion.html", "main");
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
