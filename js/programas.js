let programas = [];

const nivelFiltro = document.getElementById("nivelFiltro");
const areaFiltro = document.getElementById("areaFiltro");
const tabla = document.getElementById("tablaProgramas");

function renderTabla() {
  const nivel = nivelFiltro.value;
  const area = areaFiltro.value;

  const filtrados = programas.filter(p => {
    return (nivel === "" || p.nivel === nivel) && (area === "" || p.area === area);
  });

  tabla.innerHTML = filtrados.map(p => `
    <tr>
      <td>${p.nivel}</td>
      <td>${p.nombre}</td>
      <td>${p.area}</td>
    </tr>
  `).join("");
}

nivelFiltro.addEventListener("change", renderTabla);
areaFiltro.addEventListener("change", renderTabla);

fetch('programas.json')
  .then(res => res.json())
  .then(data => {
    programas = data;
    renderTabla();
  })
  .catch(err => console.error("Error cargando JSON:", err));

