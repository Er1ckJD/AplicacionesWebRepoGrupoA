// script.js - Funcionalidades JavaScript para el Dashboard de Estacionamiento UCC

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades cuando el DOM esté completamente cargado
    initializeTabs();
    initializeCampusSelector();
    // Inicializar botones y eventos
    initializeButtons();
    // Función para simular carga de datos (para demo)
    simulateDataLoading();
});

/**
 * Inicializa la funcionalidad de pestañas
 */
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Quitar clase activa de todos los botones y contenidos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });

            // Añadir clase activa al botón clickeado
            this.classList.add('active');

            // Mostrar el contenido correspondiente
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-content`).classList.add('active');
        });
    });
}

/**
 * Inicializa el selector de campus
 */
function initializeCampusSelector() {
    const campusButtons = document.querySelectorAll('.campus-btn');

    campusButtons.forEach(button => {
        button.addEventListener('click', function() {
            campusButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Simulación de cambio de campus
            const campusName = this.textContent.trim();
            console.log('Campus seleccionado:', campusName);

            // Aquí se cargarían los datos específicos del campus seleccionado
            updateCampusData(campusName);
        });
    });
}

/**
 * Inicializa los botones de acciones
 */
function initializeButtons() {
    // Inicializar eventos para los botones de salida
    document.querySelectorAll('.btn-outline').forEach(button => {
        if (button.textContent.trim().includes('Salida')) {
            button.addEventListener('click', handleVehicleExit);
        }
    });

    // Inicializar evento para el botón de registro de entrada
    const entryButtons = document.querySelectorAll('.btn-primary');
    entryButtons.forEach(button => {
        if (button.textContent.includes('Registrar Entrada')) {
            button.addEventListener('click', showEntryForm);
        }
    });
}

/**
 * Maneja el evento de salida de un vehículo
 */
function handleVehicleExit(e) {
    e.preventDefault();
    const row = this.closest('tr');
    const userId = row.cells[0].textContent;
    const userType = row.cells[1].textContent.trim();
    const location = row.cells[3].textContent;

    if (confirm(`¿Registrar salida del usuario ${userId} ubicado en ${location}?`)) {
        // Simulación de salida
        row.style.opacity = '0.5';
        setTimeout(() => {
            row.remove();
            alert(`Se ha registrado la salida exitosamente.`);
            // Aquí se actualizarían las estadísticas
            updateCountersAfterVehicleExit();
        }, 1000);
    }
}

/**
 * Muestra el formulario de entrada (simulado)
 */
function showEntryForm() {
    // Simulación de modal para entrada
    alert('Se abrirá un formulario para registrar la entrada de un nuevo usuario al estacionamiento.');
}

/**
 * Actualiza los datos del dashboard según el campus seleccionado
 */
function updateCampusData(campusName) {
    // Simular tiempos de carga
    showLoadingIndicator();

    // Simular tiempos de carga
    setTimeout(() => {
        hideLoadingIndicator();

        // Actualizar datos según el campus (simulado)
        let data = {
            'Campus Torrente': {
                ocupados: '145 / 200',
                porcentaje: '72%',
                estudiantes: '105',
                docentes: '32',
                visitantes: '8'
            },
            'Campus Calasanz': {
                ocupados: '95 / 120',
                porcentaje: '79%',
                estudiantes: '72',
                docentes: '18',
                visitantes: '5'
            },
            'Centro de Posgrados': {
                ocupados: '45 / 60',
                porcentaje: '75%',
                estudiantes: '28',
                docentes: '15',
                visitantes: '2'
            }
        };

        // Actualizar estadísticas
        if (data[campusName]) {
            updateStatistics(data[campusName]);

            // Actualizar fecha y hora de última actualización
            updateLastUpdatedTime();
        }
    }, 1000);
}

/**
 * Muestra el indicador de carga
 */
function showLoadingIndicator() {
    // Eliminar cualquier indicador de carga existente
    hideLoadingIndicator();

    // Crear y mostrar nuevo indicador
    const loadingIndicator = document.createElement('div');
    loadingIndicator.id = 'loading-indicator';
    loadingIndicator.style.position = 'fixed';
    loadingIndicator.style.top = '0';
    loadingIndicator.style.left = '0';
    loadingIndicator.style.width = '100%';
    loadingIndicator.style.height = '4px';
    loadingIndicator.style.backgroundColor = 'var(--primary-color)';
    loadingIndicator.style.zIndex = '9999';
    loadingIndicator.style.animation = 'loading 2s ease-in-out';

    document.body.appendChild(loadingIndicator);
}

/**
 * Oculta el indicador de carga
 */
function hideLoadingIndicator() {
    const existingIndicator = document.getElementById('loading-indicator');
    if (existingIndicator) {
        document.body.removeChild(existingIndicator);
    }
}

/**
 * Actualiza la hora de última actualización
 */
function updateLastUpdatedTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    document.querySelector('.last-update').innerHTML =
        `<i class="fas fa-sync-alt"></i> Última actualización: ${now.toLocaleDateString()} ${timeString}`;
}

/**
 * Actualiza las estadísticas en el dashboard
 */
function updateStatistics(data) {
    // Actualizar tarjetas de estadísticas
    const cards = document.querySelectorAll('.stat-card');
    cards[0].querySelector('.stat-value').textContent = data.ocupados;
    cards[0].querySelector('.stat-info').textContent = `${data.porcentaje} de ocupación`;

    cards[1].querySelector('.stat-value').textContent = data.estudiantes;
    cards[1].querySelector('.stat-info').textContent =
        `${Math.round(parseInt(data.estudiantes) / parseInt(data.ocupados.split('/')[0]) * 100)}% del estacionamiento`;

    cards[2].querySelector('.stat-value').textContent = data.docentes;
    cards[2].querySelector('.stat-info').textContent =
        `${Math.round(parseInt(data.docentes) / parseInt(data.ocupados.split('/')[0]) * 100)}% del estacionamiento`;

    cards[3].querySelector('.stat-value').textContent = data.visitantes;
    cards[3].querySelector('.stat-info').textContent =
        `${Math.round(parseInt(data.visitantes) / parseInt(data.ocupados.split('/')[0]) * 100)}% del estacionamiento`;
}

/**
 * Simula la carga de datos periódica (para demo)
 */
function simulateDataLoading() {
    // Actualizar la hora cada minuto
    setInterval(updateLastUpdatedTime, 60000);
}

/**
 * Actualiza contadores después de registrar salida
 */
function updateCountersAfterVehicleExit() {
    // Obtener valores actuales
    const ocupados = document.querySelectorAll('.stat-card')[0].querySelector('.stat-value').textContent;
    const partes = ocupados.split('/');
    const total = parseInt(partes[1].trim());
    const ocupadosNum = parseInt(partes[0].trim());

    // Actualizar contador de ocupados
    const nuevosOcupados = ocupadosNum - 1;
    document.querySelectorAll('.stat-card')[0].querySelector('.stat-value').textContent = `${nuevosOcupados} / ${total}`;

    // Actualizar porcentaje
    const nuevoPorcentaje = Math.round((nuevosOcupados / total) * 100);
    document.querySelectorAll('.stat-card')[0].querySelector('.stat-info').textContent = `${nuevoPorcentaje}% de ocupación`;
}

// Añadir estilos para animación de carga
const style = document.createElement('style');
style.innerHTML = `
@keyframes loading {
    0% { width: 0; }
    50% { width: 100%; }
    100% { width: 100%; opacity: 0; }
}`;
document.head.appendChild(style);