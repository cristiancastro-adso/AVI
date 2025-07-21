
// Efecto de scroll suave para los enlaces del menú
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Si es un enlace interno (comienza con #)
            if (href.startsWith('#')) {
                e.preventDefault();
                
                // Por ahora mostrar mensaje, más tarde navegar a las páginas correspondientes
                const section = href.substring(1);
                showMessage(section);
            }
        });
    });
});
<button onclick="window.location.href='registro.html'">Regístrate Ahora</
// Función para mostrar mensajes temporales
function showMessage(section) {
    let message = '';
    
    switch(section) {
        case 'test':
            message = 'Próximamente: Página del Test Vocacional';
            break;
        case 'programas':
            message = 'Próximamente: Catálogo de Programas SENA';
            break;
        case 'mapa':
            message = 'Próximamente: Mapa de Centros SENA';
            break;
        case 'ingresar':
            message = 'Próximamente: Página de Inicio de Sesión';
            break;
        case 'registro':
            message = 'Próximamente: Formulario de Registro';
            break;
        default:
            message = 'Sección en desarrollo';
    }
    
    // Crear y mostrar notificación
    showNotification(message);
}

// Función para mostrar notificaciones
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00b894, #00a085);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        font-weight: 500;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Efecto parallax suave en el hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Animación de aparición para las tarjetas
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a las tarjetas cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.info-card, .program-card');
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});