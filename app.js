// Global State
let currentView = 'home';
let currentTab = 1;

// LaTeX Templates Logic
const latexTemplates = {
    minimal: {
        name: "Minimalista Moderno",
        preamble: `\\documentclass[11pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[gray]{xcolor}
\\usepackage{geometry}
\\geometry{a4paper, margin=2cm}
\\usepackage{helvet}
\\renewcommand{\\familydefault}{\\sfdefault}
\\usepackage{titlesec}
\\titleformat{\\section}{\\color{black!80}\\large\\bfseries}{}{0em}{}
\\titleformat{\\subsection}{\\color{black!60}\\normalsize\\bfseries}{}{0em}{}`
    },
    scientific: {
        name: "Rigor Académico",
        preamble: `\\documentclass[12pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage{amsmath, amssymb, amstfonts}
\\usepackage{geometry}
\\geometry{a4paper, margin=2.5cm}
\\usepackage{charter}
\\usepackage{titlesec}
\\titleformat{\\section}{\\centering\\scshape\\large}{}{0em}{}[\\titlerule]`
    },
    workshop: {
        name: "Taller Interactivo",
        preamble: `\\documentclass[11pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[most]{tcolorbox}
\\usepackage{geometry}
\\geometry{a4paper, margin=1.5cm}
\\newtcolorbox{pregunta}{colback=gray!5,colframe=gray!80,fonttitle=\\bfseries,title=Actividad de Reflexión}
\\newcommand{\\answerbox}[1]{\\vspace{0.5cm}\\hrule\\vspace{#1}}`
    }
};

// Metadata for Phases
const phasesS1 = {
    1: { title: "Alineación MEN", desc: "Investigación profunda de los referentes del ministerio para actualizar el currículo.", icon: "book" },
    2: { title: "Mejores Prácticas Globales", desc: "Extrapolación internacional. Identifica metodologías exitosas en el mundo.", icon: "globe" },
    3: { title: "Referentes Epistemológicos", desc: "Profundización pedagógica e integración de autores contemporáneos (Dussel, Floridi).", icon: "library" },
    4: { title: "Diseño del Agente (LaTeX)", desc: "Síntesis final para estructurar un Agente IA que genere guías en código LaTeX.", icon: "cpu" }
};

const phasesS2 = {
    1: { title: "El Andamiaje de la IA", desc: "Configuración inicial. Le diremos a Gemini quién es, qué va a enseñar y para quién. Establecemos todo el contexto curricular.", icon: "settings" },
    2: { title: "Plantilla Minimalista", desc: "Prompt para generar una guía elegante, enfocada puramente en el texto y estructura, usando márgenes amplios y tipografía Sans-Serif.", icon: "layout-template" },
    3: { title: "Plantilla Académico", desc: "Prompt para un documento riguroso. Habilita paquetes matemáticos (amsmath), formato clásico y estructura para artículos o Tesis.", icon: "book-open" },
    4: { title: "Plantilla Taller Interactivo", desc: "Prompt para guías dinámicas de clase. Usa cajas de color (tcolorbox) para preguntas y deja espacios para respuestas del alumno.", icon: "clipboard-edit" }
};

const phasesS3 = {
    1: { title: "Configuración NotebookLM", desc: "Preparación del entorno de curaduría y carga de las fuentes de verdad.", icon: "database" },
    2: { title: "Auditoría de Fuentes", desc: "Instrucciones para forzar el grounding y evitar alucinaciones en el análisis.", icon: "shield-check" },
    3: { title: "Síntesis Pedagógica", desc: "Extracción coordinada de conceptos clave alineados con el currículo.", icon: "file-text" },
    4: { title: "Guión de Salida", desc: "Prompt final para integrar la curaduría auditada en el generador LaTeX.", icon: "terminal" }
};

const phasesS4 = {
    1: { title: "Sincronización Contextual", desc: "Alineación del ecosistema con el entorno del estudiante.", icon: "refresh-cw" },
    2: { title: "Estrategias de Ubicuidad", desc: "Diseño de canales de acceso (QR, Enlaces, Mobile).", icon: "smartphone" },
    3: { title: "Feedback Asincrónico", desc: "Configuración de ciclos de respuesta mediada por IA.", icon: "message-square" },
    4: { title: "Génesis de la Memoria", desc: "Construcción del portafolio y evidencias del ecosistema.", icon: "album" }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initializeScrollReveal();
    renderPhase(); 
});

// SPA View Switching
function switchView(viewId) {
    currentView = viewId;
    const viewHome = document.getElementById('view-home');
    const viewSessions = document.getElementById('view-sessions');
    const labContent1 = document.getElementById('lab-content-m1');
    const labContent2 = document.getElementById('lab-content-m2');
    const labContent3 = document.getElementById('lab-content-m3');
    const labPlaceholder = document.getElementById('lab-placeholder');

    // Hide all
    [viewHome, viewSessions, labContent1, labContent2, labContent3, labPlaceholder].forEach(el => el && el.classList.add('hidden'));

    if (viewId === 'home') {
        viewHome.classList.remove('hidden');
    } else {
        viewSessions.classList.remove('hidden');
        currentTab = 1;
        
        if (viewId === 's1') {
            labContent1.classList.remove('hidden');
            updateLabHeader("Laboratorio M1: Planeación Curricular", "flask-conical");
        } else if (viewId === 's2') {
            labContent2.classList.remove('hidden');
            updateLabHeader("Laboratorio M2: Programación de Gemas", "cpu");
        } else if (viewId === 's3') {
            labContent3.classList.remove('hidden');
            updateLabHeader("Laboratorio M3: Curaduría IA", "database");
        } else {
            labPlaceholder.classList.remove('hidden');
            const sessionNum = viewId.replace('s', '');
            updateLabHeader(`Laboratorio M${sessionNum}`, "construction");
        }
        renderPhase();
    }

    updateNavButtons(viewId);
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
        // Desktop nav
        const btn = document.getElementById(`nav-btn-${id}`);
        if (btn) {
            if (id === activeId) btn.classList.add('nav-active');
            else btn.classList.remove('nav-active');
        }
        // Mobile bottom nav
        const mobBtn = document.getElementById(`mob-nav-${id}`);
        if (mobBtn) {
            if (id === activeId) mobBtn.classList.add('mob-nav-active');
            else mobBtn.classList.remove('mob-nav-active');
        }
    });
}

// Lab Tab Switching
function switchTab(index) {
    currentTab = index;
    let suffix = '';
    if (currentView === 's2') suffix = '-m2';
    if (currentView === 's3') suffix = '-m3';
    
    for (let i = 1; i <= 4; i++) {
        const btn = document.getElementById(`tab${suffix}-${i}`);
        if (btn) {
            if (i === index) {
                btn.className = "py-3 px-2 md:px-6 border-b-2 font-bold text-[9px] md:text-xs uppercase tracking-widest border-emerald-700 text-emerald-700 w-full md:w-auto break-words";
            } else {
                btn.className = "py-3 px-2 md:px-6 border-b-2 font-bold text-[9px] md:text-xs uppercase tracking-widest border-transparent text-slate-400 hover:text-slate-800 transition-all w-full md:w-auto break-words";
            }
        }
    }
    renderPhase();
}

function renderPhase() {
    let suffix = '';
    let phases = phasesS1;
    
    if (currentView === 's2') { suffix = '-m2'; phases = phasesS2; }
    else if (currentView === 's3') { suffix = '-m3'; phases = phasesS3; }
    
    const phase = phases[currentTab];
    if (phase) {
        document.getElementById(`phase-title${suffix}`).textContent = phase.title;
        document.getElementById(`phase-desc${suffix}`).textContent = phase.desc;
        document.getElementById(`prompt-output${suffix}`).value = ""; 
        lucide.createIcons();
    }
}

// Prompt Generation Logic
function generatePrompt() {
    const asignaturaVal = document.getElementById('inputAsignatura')?.value.trim();
    const gradoVal = document.getElementById('inputGrado')?.value.trim();
    const asignatura = asignaturaVal || "[Asignatura]";
    const grado = gradoVal || "[Grado]";
    
    let promptText = "";

    if (currentView === 's1') {
        switch(currentTab) {
            case 1: promptText = `Actuá como experto en diseño curricular del MEN de Colombia para ${asignatura} (${grado}). Investiga y entrega DBA, estándares y ejes temáticos anuales.`; break;
            case 2: promptText = `Actúa como investigador pedagógico comparado. Basándote en la malla de S1-F1, identificar mejores prácticas globales (PISA, STEM) para aplicar a ${asignatura} (${grado}).`; break;
            case 3: promptText = `Integra a Enrique Dussel (Filosofía de la Liberación) y Luciano Floridi (Ética Info) en la didáctica de ${asignatura} (${grado}). Define principios pedagógicos.`; break;
            case 4: promptText = `MODO PROGRAMADOR LATEX: Genera las instrucciones de comportamiento final para un Agente IA que actúe como par académico. REGLA: Todas las guías deben ser en bloques de código LaTeX puro, escala de grises, diseño arquitectónico.`; break;
        }
        document.getElementById('prompt-output').value = promptText;
    } else if (currentView === 's2') {
        const asig = document.getElementById('inputAsignaturaM2')?.value.trim() || "[Asignatura]";
        const pub = document.getElementById('inputPublicoM2')?.value.trim() || "[Público Objetivo]";
        const obj = document.getElementById('inputObjetivosM2')?.value.trim() || "[Objetivos de Aprendizaje]";
        const act = document.getElementById('inputActividadesM2')?.value.trim() || "[Actividades Esperadas]";
        
        // Ficha de Transparencia (Gobernanza)
        const gobernanza = `
% --- FICHA DE ASISTENCIA IA ---
% Herramienta utilizada: Gemini 
% Intervención: < 25% (Alineado a normas de Gobernanza)
% Causal: Andamiaje Estructural y Compilación LaTeX
% Tensión Ética: El contenido pedagógico fue diseñado y validado por el docente (${asig} - ${pub}).
% ------------------------------`;

        switch(currentTab) {
            case 1: promptText = `Eres un experto diseñador instruccional y un compilador matemático estricto en LaTeX. 
Misión: Vas a generar el código COMPILABLE de una guía pedagógica para ${asig}, pensada para ${pub}. 
El documento debe lograr los siguientes objetivos: ${obj}.
Para ello, el diseño instruccional incluirá las siguientes actividades: ${act}.

REGLAS DE OPERACIÓN EN GEMINI:
1. No dejes plantillas vacías ni uses corchetes []. Redacta TODO el contenido teórico y pedagógico completo y extenso.
2. Utiliza tu entorno de ejecución de código (Python) para compilar el código usando 'pdflatex'. Para evitar que el archivo de descarga se rompa y quede sin extensión, comprime el PDF y el código .tex en un archivo llamado 'material_clase.zip' y entrégame el enlace de descarga del ZIP.`; break;
            case 2: promptText = `PROMPT PARA GEMINI (ESTILO MINIMALISTA)
Basado en el contexto curricular (${asig} para ${pub}), genera el código LaTeX completo de la guía. Aplica ESTRICTAMENTE esta plantilla estándar (no uses paquetes externos para evitar errores de compilación):

\\documentclass[11pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[gray]{xcolor}
\\usepackage{geometry}
\\geometry{a4paper, margin=2cm}

${gobernanza}

\\begin{document}
% Redacta aquí de forma extensa el contenido de la guía teórica sobre ${asig}. Incluye los objetivos (${obj}) y desarrolla a cabalidad las actividades (${act}) sin dejar placeholders vacíos.

% NOTA PARA EL DOCENTE: Puedes exportar fragmentos de este documento final en PDF para embellecerlos visualmente con Canva.
\\end{document}

INSTRUCCIÓN FINAL: Una vez escrito el código, usa Python de inmediato para compilarlo con 'pdflatex'. Obligatorio: Para evitar fallos en la extensión del archivo, empaqueta el PDF finalizado en un archivo 'guia_minimalista.zip' y proporciónalo para descargar.`; break;
            case 3: promptText = `PROMPT PARA GEMINI (ESTILO RIGOR ACADÉMICO)
Basado en el contexto curricular (${asig} para ${pub}), genera el código LaTeX completo de la guía aplicando ESTRICTAMENTE esta plantilla para entornos limitados de LaTeX:

\\documentclass[12pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage{amsmath, amssymb, amsfonts}
\\usepackage{geometry}
\\geometry{a4paper, margin=2.5cm}

${gobernanza}

\\begin{document}
\\begin{center}
\\LARGE\\textsc{Guía Académica}\\\\[0.4cm]
\\rule{\\linewidth}{0.4mm}
\\end{center}

% Redacta abajo todo el contenido científico y matemático sobre ${asig}, definiendo los postulados necesarios y desarrollando las actividades (${act}) sin dejar espacios o corchetes vacíos.
\\end{document}

INSTRUCCIÓN FINAL: Finalizada la redacción, utiliza Python para compilar con 'pdflatex'. Para asegurar que el archivo descargado no quede sin formato, empaqueta el PDF y el .tex en 'guia_academica.zip' y comparte el enlace de descarga del archivo ZIP.`; break;
            case 4: promptText = `PROMPT PARA GEMINI (ESTILO TALLER INTERACTIVO)
Basado en el contexto curricular (${asig} para ${pub}), genera el código LaTeX de la guía práctica. Utiliza únicamente cajas estándar como \`minipage\` y \`fbox\` para evitar fallos de compilación. Aplica estrictamente este andamiaje:

\\documentclass[11pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage{geometry}
\\geometry{a4paper, margin=1.5cm}

${gobernanza}

\\begin{document}
% Redacta aquí la introducción conceptual extensa de la temática ${asig}.

\\vspace{1cm}
\\noindent\\fbox{%
\\begin{minipage}{\\linewidth}
\\textbf{Actividad Práctica Integrada:}
% Define claramente la actividad basándote en: ${act}
\\vspace{0.5cm}
\\hrule
\\vspace{3cm} % Espacio real para que el alumno responda
\\end{minipage}
}
\\end{document}

INSTRUCCIÓN FINAL: Guarda este código en Python y compílalo con pdflatex nativo. CRÍTICO: Para prevenir el error de archivos irreconocibles en la descarga, comprime tu PDF en un archivo 'taller_interactivo.zip' y ofréceme el enlace directo de descarga.`; break;
        }
        document.getElementById('prompt-output-m2').value = promptText;
    } else if (currentView === 's3') {
        const sourceType = document.getElementById('inputSourceType').value.trim() || "PDFs/Fuentes";
        const topicCur = document.getElementById('inputTopicSearch').value.trim() || "[Tema]";
        switch(currentTab) {
            case 1: promptText = `NotebookLM: Sube fuentes de tipo ${sourceType} para el tema ${topicCur}. Configura la libreta de curaduría blindada.`; break;
            case 2: promptText = `Fact-Check: Analiza las fuentes cargadas. Identifica 3 ideas fuerza y relaciónalas con DBA del MEN. Si no está en el PDF, di 'No disponible'.`; break;
            case 3: promptText = `Síntesis Curada: Genera un resumen de ${topicCur} citando los documentos fuente. Prepara el contenido para la Gema de la Sesión II.`; break;
            case 4: promptText = `Prompt de Integración: Toma la síntesis auditada y dile a tu Gema: 'Genera la guía final en LaTeX usando esta información blindada'.`; break;
        }
        document.getElementById('prompt-output-m3').value = promptText;
    }
}

// Copy to Clipboard with Toast
function copyPrompt(type) {
    let id = 'prompt-output';
    if (type === 'm2') id = 'prompt-output-m2';
    if (type === 'm3') id = 'prompt-output-m3';
    
    const textarea = document.getElementById(id);
    if (!textarea || !textarea.value) return;
    
    navigator.clipboard.writeText(textarea.value).then(() => {
        showToast("Prompt copiado al portapapeles");
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    document.getElementById('toast-message').textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// Scroll Reveal
function initializeScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
