// Global State
let currentView = 'home';
let currentTab = 1;

// Metadata for Phases (Sesión I)
const phasesS1 = {
    1: {
        title: "Alineación MEN",
        desc: "Investigación profunda de los referentes del ministerio para actualizar el currículo.",
        icon: "book"
    },
    2: {
        title: "Mejores Prácticas Globales",
        desc: "Extrapolación internacional. Identifica metodologías exitosas en el mundo aplicables a la base MEN.",
        icon: "globe"
    },
    3: {
        title: "Referentes Epistemológicos",
        desc: "Profundización pedagógica e integración de autores contemporáneos (Dussel, Floridi).",
        icon: "library"
    },
    4: {
        title: "Diseño del Agente (LaTeX)",
        desc: "Síntesis final para estructurar un Agente IA que genere guías en código LaTeX.",
        icon: "cpu"
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initializeScrollReveal();
    renderPhase(); // Initial render for S1 Lab
});

// SPA View Switching
function switchView(viewId) {
    const viewHome = document.getElementById('view-home');
    const viewSessions = document.getElementById('view-sessions');
    const labContent = document.getElementById('lab-content-m1');
    const labPlaceholder = document.getElementById('lab-placeholder');

    // Update active view
    if (viewId === 'home') {
        viewHome.classList.remove('hidden');
        viewSessions.classList.add('hidden');
    } else {
        viewHome.classList.add('hidden');
        viewSessions.classList.remove('hidden');
        
        // Show session I or placeholder
        if (viewId === 's1') {
            labContent.classList.remove('hidden');
            labPlaceholder.classList.add('hidden');
            updateLabHeader("Laboratorio M1: Planeación Curricular", "flask-conical");
        } else {
            labContent.classList.add('hidden');
            labPlaceholder.classList.remove('hidden');
            const sessionNum = viewId.replace('s', '');
            updateLabHeader(`Laboratorio M${sessionNum}`, "construction");
        }
    }

    // Update Nav Buttons
    updateNavButtons(viewId);
    
    // Refresh icons and animations
    lucide.createIcons();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateLabHeader(title, icon) {
    document.getElementById('lab-title').textContent = title;
    const iconEl = document.getElementById('lab-icon');
    iconEl.setAttribute('data-lucide', icon);
    lucide.createIcons();
}

function updateNavButtons(activeId) {
    const buttons = ['home', 's1', 's2', 's3', 's4'];
    buttons.forEach(id => {
        const btn = document.getElementById(`nav-btn-${id}`);
        if (id === activeId) {
            btn.classList.add('nav-active');
        } else {
            btn.classList.remove('nav-active');
        }
    });
}

// Lab Tab Switching (Sesión I)
function switchTab(index) {
    currentTab = index;
    
    // Update active tab style
    for (let i = 1; i <= 4; i++) {
        const btn = document.getElementById(`tab-${i}`);
        if (i === index) {
            btn.className = "border-emerald-700 text-emerald-700 whitespace-nowrap py-3 px-6 border-b-2 font-bold text-xs uppercase tracking-widest flex items-center";
        } else {
            btn.className = "border-transparent text-slate-400 whitespace-nowrap py-3 px-6 border-b-2 font-bold text-xs uppercase tracking-widest flex items-center hover:text-slate-800 transition-all";
        }
    }
    
    renderPhase();
}

function renderPhase() {
    const phase = phasesS1[currentTab];
    document.getElementById('phase-title').textContent = phase.title;
    document.getElementById('phase-desc').textContent = phase.desc;
    document.getElementById('phase-icon').setAttribute('data-lucide', phase.icon);
    document.getElementById('prompt-output').value = ""; // Clear output on tab change
    lucide.createIcons();
}

// Prompt Generation Logic (Integrated from user request)
function generatePrompt() {
    const asignaturaVal = document.getElementById('inputAsignatura').value.trim();
    const gradoVal = document.getElementById('inputGrado').value.trim();
    
    const asignatura = asignaturaVal || "[Asignatura]";
    const grado = gradoVal || "[Grado]";
    
    let promptText = "";

    switch(currentTab) {
        case 1:
            promptText = `Actúua como un experto en diseño curricular y normatividad educativa de Colombia. 
Tu tarea es realizar una investigación profunda y estructurar la base académica para la asignatura de ${asignatura} en el nivel de ${grado}.

Por favor, proporciona lo siguiente basándote estrictamente en los lineamientos vigentes del MEN:
1. Identifica los Lineamientos Curriculares, Estándares Básicos de Competencia y DBA aplicables para ${asignatura} en ${grado}.
2. Define los Ejes Temáticos principales para todo el año lectivo.
3. Establece las competencias específicas a desarrollar (Saber, Hacer, Ser).
4. Entrega esta información estructurada en formato de tabla o esquema lógico.`;
            break;
        case 2:
            promptText = `Actúa como un investigador en pedagogía comparada e innovación educativa.
Contexto: Estamos planificando la asignatura de ${asignatura} para el nivel de ${grado}.
INSTRUCCIÓN CRÍTICA: Utiliza EXACTAMENTE la estructura curricular definida en la Fase 1.

Tu tarea es identificar las mejores prácticas mundiales para enseñar los temas específicos:
1. Revisa enfoques exitosos a nivel global (Singapur, Finlandia, ABP STEM, etc.) pertinentes para ${grado}.
2. Explica cómo estas prácticas globales pueden integrarse orgánicamente en cada uno de los ejes temáticos.
3. Genera recomendaciones prácticas sobre formatos de evaluación y proyectos.`;
            break;
        case 3:
            promptText = `Actúa como un filósofo de la educación y especialista en pedagogías contemporáneas.
Contexto: Planificación integral de ${asignatura} para ${grado}. Tomando la Fase 1 y Fase 2 como base.

Vamos a darle profundidad epistemológica:
1. Realiza un cruce conceptual identificando cómo autores clave como Inés Dussel o Luciano Floridi aportan valor a la didáctica de ${asignatura}.
2. Redacta los "Principios Pedagógicos" que guiarán esta asignatura a lo largo del año lectivo.
3. Argumenta la integración del "Minimalismo Digital" como eje vertebrador.`;
            break;
        case 4:
            const nameSugg = `TecnoSapiens ${gradoVal.replace(/[^0-9]/g, '') || "10.0"}`;
            promptText = `Nombre: ${nameSugg}
Descripcion: Consultor pedagógico de alto nivel para ${asignatura} en ${grado}. Integra la normativa técnica del MEN con una visión humanista y ética basada en Dussel y Floridi.

Instrucciones: 
Toda tu lógica de actuación y conocimiento especializado se encuentra en los documentos de tu base de conocimiento denominados "Fase I", "Fase II" y "Fase III".

- CONTEXTO MAESTRO: Debes articular los componentes del MEN con el desarrollo del pensamiento computacional, bajo el filtro crítico de Enrique Dussel y Luciano Floridi.

- ROL Y OBJETIVO: 
  1. Fase de Diagnóstico: DEBES preguntar al usuario periodos académicos y clases por periodo.
  2. Fase de Planeación: Propondrás una malla temática anual.
  3. Fase de Ejecución: Generarás la GUÍA DE CLASE COMPLETA para el tema elegido.

- REGLA DE FORMATO INQUEBRANTABLE: Toda guía de clase (Fase de Ejecución) debe entregarse exclusivamente en código fuente LaTeX válido y compilable, dentro de un bloque de código técnico. PROHIBIDO EL USO DE CUALQUIER TEXTO O EXPLICACIÓN FUERA DEL BLOQUE LATEX.

- ESTÉTICA Y ESTRUCTURA TÉCNICA (LaTeX):
  1. Configuración: \\documentclass{article}, paquete geometry (márgenes de 2cm), amsmath y xcolor con [gray].
  2. Diseño: Escala de grises, uso de \\hrule para separar momentos, tipografía jerárquica y limpia.
  3. Contenido Pedagógico Obligatorio: Título y Objetivo (MEN/DBA), Contextualización (Dussel/Floridi), Secuencia Didáctica (Exploración, Estructuración, Transferencia) y Valoración (Metacognición).

- PROTOCOLO DE INICIO: Tu primer mensaje tras ser activado será exactamente: 
"Bienvenido, colega. Para iniciar la configuración del entorno pedagógico de ${nameSugg}, necesito establecer la estructura temporal del curso. Por favor, indícame: ¿Cuántos periodos académicos definiremos para el ${grado}? ¿Cuántas sesiones de clase se imparten por periodo? Con esto, presentaré la propuesta curricular para proceder luego con la generación de tus guías en LaTeX."`;
            break;
    }

    const textarea = document.getElementById('prompt-output');
    textarea.value = promptText;
}

// Copy to Clipboard with Toast
function copyPrompt() {
    const textarea = document.getElementById('prompt-output');
    if (!textarea.value) return;
    
    navigator.clipboard.writeText(textarea.value).then(() => {
        showToast("Prompt copiado al portapapeles");
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-message').textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Scroll Reveal
function initializeScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
