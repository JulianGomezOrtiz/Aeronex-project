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

  await loadPage("./Resources/html/inicio.html", "main");

  document.querySelector(".logo").addEventListener("click", async () => {
    await loadPage("./Resources/html/inicio.html", "main");
  });
});

async function mainMenu(option) {
  switch (option) {
    case "Vuelos":
      await loadPage("./Resources/html/vuelos.html", "main");
      break;
    case "Reservas":
      await loadPage("./Resources/html/reservas.html", "main");
      break;
    case "Servicios":
      await loadPage("./Resources/html/servicios.html", "main");
      break;
    case "Ayuda":
      await loadPage("./Resources/html/ayuda.html", "main");
      break;
    case "Iniciar sesión":
      await loadPage(
        "./Resources/autenticación/html/autenticación.html",
        "main"
      );
      break;
    default:
      await loadPage("./Resources/html/inicio.html", "main");
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
