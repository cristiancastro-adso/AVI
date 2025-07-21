function getUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios") || "[]")
}

function autenticarUsuario(identificacion, password) {
  const usuarios = getUsuarios()
  return usuarios.find((user) => user.identificacion === identificacion && user.password === password)
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm")

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    const identificacion = formData.get("identificacion").trim()
    const password = formData.get("password")

    if (!identificacion || !password) {
      Swal.fire({
        icon: "warning",
        title: "Campos requeridos",
        text: "Por favor completa todos los campos",
        confirmButtonColor: "#39a900",
      })
      return
    }

    const usuario = autenticarUsuario(identificacion, password)

    if (usuario) {
      // Guardar sesión
      localStorage.setItem("usuarioActual", JSON.stringify(usuario))

      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: `Hola ${usuario.nombreCompleto}`,
        confirmButtonColor: "#39a900",
        timer: 2000,
      }).then(() => {
        window.location.href = "bienvenida-test.html"
      })
    } else {
      Swal.fire({
        icon: "error",
        title: "Error de autenticación",
        text: "Identificación o contraseña incorrectos",
        confirmButtonColor: "#39a900",
      })
    }
  })
})
