document.addEventListener("DOMContentLoaded", () => {
  // Verificar si hay usuario logueado
  const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"))

  if (!usuarioActual) {
    window.Swal.fire({
      icon: "warning",
      title: "Acceso denegado",
      text: "Debes iniciar sesión para acceder a esta página",
      confirmButtonColor: "#39a900",
    }).then(() => {
      window.location.href = "login.html"
    })
    return
  }

  // Mostrar nombre del usuario
  document.getElementById("userName").textContent = usuarioActual.nombreCompleto
})

function iniciarTest() {
  window.Swal.fire({
    title: "¿Estás listo para comenzar?",
    text: "El test vocacional te tomará aproximadamente 15-20 minutos",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#39a900",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Sí, comenzar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      // Aquí se redirigirá al test cuando esté creado
      window.Swal.fire({
        icon: "info",
        title: "Test en desarrollo",
        text: "El test vocacional estará disponible próximamente",
        confirmButtonColor: "#39a900",
      })
    }
  })
}

function cerrarSesion() {
  window.Swal.fire({
    title: "¿Cerrar sesión?",
    text: "Tendrás que volver a iniciar sesión para acceder al test",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#39a900",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Sí, cerrar sesión",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("usuarioActual")
      window.location.href = "index.html"
    }
  })
}
