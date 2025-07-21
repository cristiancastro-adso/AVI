// Simulación de base de datos en localStorage
function getUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios") || "[]")
}

function guardarUsuario(usuario) {
  const usuarios = getUsuarios()
  usuarios.push(usuario)
  localStorage.setItem("usuarios", JSON.stringify(usuarios))
}

function usuarioExiste(identificacion) {
  const usuarios = getUsuarios()
  return usuarios.some((user) => user.identificacion === identificacion)
}

// Validaciones
function validarPassword(password) {
  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }

  // Actualizar indicadores visuales
  document.getElementById("length-req").className = requirements.length ? "valid" : ""
  document.getElementById("uppercase-req").className = requirements.uppercase ? "valid" : ""
  document.getElementById("number-req").className = requirements.number ? "valid" : ""
  document.getElementById("special-req").className = requirements.special ? "valid" : ""

  return Object.values(requirements).every((req) => req)
}

function validarEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validarTelefono(telefono) {
  const telefonoRegex = /^[0-9]{10}$/
  return telefonoRegex.test(telefono.replace(/\s/g, ""))
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroForm")
  const passwordInput = document.getElementById("password")
  const Swal = window.Swal // Declare the Swal variable

  // Validación en tiempo real de la contraseña
  passwordInput.addEventListener("input", function () {
    validarPassword(this.value)
  })

  // Manejo del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    const datos = {
      identificacion: formData.get("identificacion").trim(),
      nombreCompleto: formData.get("nombreCompleto").trim(),
      correo: formData.get("correo").trim(),
      telefono: formData.get("telefono").trim(),
      password: formData.get("password"),
    }

    // Validaciones
    const errores = []

    if (!datos.identificacion) {
      errores.push("La identificación es requerida")
    } else if (usuarioExiste(datos.identificacion)) {
      errores.push("Ya existe un usuario con esta identificación")
    }

    if (!datos.nombreCompleto) {
      errores.push("El nombre completo es requerido")
    }

    if (!validarEmail(datos.correo)) {
      errores.push("El correo electrónico no es válido")
    }

    if (!validarTelefono(datos.telefono)) {
      errores.push("El teléfono debe tener 10 dígitos")
    }

    if (!validarPassword(datos.password)) {
      errores.push("La contraseña no cumple con los requisitos")
    }

    if (datos.password !== formData.get("confirmPassword")) {
      errores.push("Las contraseñas no coinciden")
    }

    if (errores.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Error en el registro",
        html: errores.map((error) => `• ${error}`).join("<br>"),
        confirmButtonColor: "#39a900",
      })
      return
    }

    // Guardar usuario
    guardarUsuario(datos)

    Swal.fire({
      icon: "success",
      title: "¡Registro exitoso!",
      text: "Tu cuenta ha sido creada correctamente",
      confirmButtonColor: "#39a900",
    }).then(() => {
      window.location.href = "login.html"
    })
  })
})
