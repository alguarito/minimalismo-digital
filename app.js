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
    1: { title: "Alineación y Mapeo MEN", desc: "Genera un informe curricular completo y estricto desde los estándares del Ministerio.", icon: "book" },
    2: { title: "Manual de Prácticas", desc: "Creación de un manual de pedagogía con propuestas medibles y experiencias significativas globales y locales.", icon: "globe" },
    3: { title: "Marco Teórico Integral", desc: "Selección de modelos, filósofos y competencias clave para dar rigor epistemológico a la asignatura.", icon: "library" },
    4: { title: "Diseño del Agente (LaTeX)", desc: "Síntesis final para estructurar un Agente IA que genere guías en código LaTeX.", icon: "cpu" }
};

const phasesS2 = {
    1: { title: "El Andamiaje de la IA", desc: "Configuración inicial. Le diremos a Gemini quién es, qué va a enseñar y para quién. Establecemos todo el contexto curricular.", icon: "settings" },
    2: { title: "Plantilla Minimalista", desc: "Prompt para generar una guía elegante, enfocada puramente en el texto y estructura, usando márgenes amplios y tipografía Sans-Serif.", icon: "layout-template" },
    3: { title: "Plantilla Académico", desc: "Prompt para un documento riguroso. Habilita paquetes matemáticos (amsmath), formato clásico y estructura para artículos o Tesis.", icon: "book-open" },
    4: { title: "Plantilla Taller Interactivo", desc: "Prompt para guías dinámicas de clase. Usa cajas de color (tcolorbox) para preguntas y deja espacios para respuestas del alumno.", icon: "clipboard-edit" }
};

const phasesS3 = {
    1: { title: "Configuración del Sistema", desc: "Instrucciones base para que NotebookLM asuma su rol de creador transmedia anclado a tu PDF.", icon: "settings" },
    2: { title: "Activos Visuales", desc: "Instrucciones unificadas para extraer esquemas de infografía y estructuras jerárquicas para Diapositivas de clase.", icon: "image" },
    3: { title: "Guión Explicativo (Video)", desc: "Conversión de texto a formato audiovisual cronometrado (Visual / Narración) para plataformas como YouTube o TikTok.", icon: "video" },
    4: { title: "Formato Sonoro (Podcast)", desc: "Transición del texto a consumo auditivo. Generación de libretos de debate o preparación para Audio Overview.", icon: "mic" }
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
            case 1: promptText = `Actúa como un analista experto en diseño instruccional y lineamientos del Ministerio de Educación Nacional de Colombia.
TU MISIÓN: Realizar una búsqueda profunda y reglamentaria para la asignatura de ${asignatura} orientada al grado ${grado}.

ENTREGABLE ESPERADO (INFORME MEN): Redacta un informe completo, formal e íntegro en formato de texto claro (Markdown) detallando TODOS los saberes, metas, Derechos Básicos de Aprendizaje (DBA), estándares de competencia y ejes temáticos anuales obligatorios.`; break;

            case 2: promptText = `Actúa como investigador de innovación educativa y experto en didáctica. 
Basándote en los saberes previstos del MEN para ${asignatura} (${grado}), tu misión es realizar un barrido exhaustivo de las MEJORES prácticas pedagógicas mundiales y locales.

ENTREGABLE ESPERADO (MANUAL DE PRÁCTICAS): Desarrolla un manual estructurado en formato de texto (Markdown) que contenga:
- Experiencias significativas exitosas relevantes a los temas de esta área.
- Las mejores propuestas MEDIBLES para enseñar estos tópicos.
- Una guía paso a paso explicando cómo aplicar en el aula cada práctica identificada frente al saber disciplinar.`; break;

            case 3: promptText = `Actúa como epistemólogo y doctor en filosofía de la educación.
Conecta el currículo base y las metodologías obtenidas de ${asignatura} para grado ${grado} con marcos teóricos profundos para llenarlo de valor humano y cognitivo de clase mundial.

ENTREGABLE ESPERADO (MARCO TEÓRICO INTEGRAL): Un documento estructurado en formato de texto (Markdown) que busque, seleccione y justifique la inclusión obligatoria de:
- Autores, modelos pedagógicos, filósofos y psicólogos que soporten el contenido.
- Enfoque metodológico en competencias socioemocionales.
- Integración real de saberes ancestrales (Epistemologías pertinentes).
- Desarrollo explícito del Pensamiento Crítico.
- Estrategias de lectura del mundo desde el lente de esta disciplina.`; break;

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
        const docente = document.getElementById('inputDocenteM3')?.value.trim() || "[Nombre del Docente]";
        const inst = document.getElementById('inputInstitucionM3')?.value.trim() || "[Institución Educativa]";
        const obj = document.getElementById('inputObjetivoM3')?.value.trim() || "[Objetivo Pedagógico]";
        
        switch(currentTab) {
            case 1: promptText = `Actúa como mi diseñador instruccional experto, basándote de forma ESTRICTA en la Guía PDF que acabo de cargar en este cuaderno.
Soy el/la docente ${docente} de la institución ${inst}. El objetivo de aprendizaje de este material es: ${obj}.

A partir de ahora, todo el material, infografías, guiones y resúmenes que te solicite deben estar auditados únicamente contra mi documento. Además, debes adaptar el tono de tus respuestas incluyendo mi firma como autor intelectual del currículo y las menciones a la institución en los recursos generados.`; break;

            case 2: promptText = `Basándote únicamente en el documento maestro cargado y en nuestro perfil (${docente} - ${inst}), extrae y formatea el contenido en dos activos visuales directos para Canva/PowerPoint:

PARTE 1: ESTRUCTURA DE INFOGRAFÍA
Extrae los 5 conceptos clave. Dame los títulos cortos, viñetas de impacto visual y una metáfora para la estructura de la infografía.

PARTE 2: DIAPOSITIVAS DE CLASE MAGISTRAL
Arma una presentación de 5 a 10 diapositivas basada en el texto. Para cada una define:
- Título y Subtítulo.
- 3 Bullet points.
- Notas del orador (qué debo decir a los estudiantes sobre el tema).`; break;

            case 3: promptText = `Usa el contenido de mi guía PDF cargada para estructurar un Guion Técnico para un Video Educativo corto (de 3 a 5 minutos) ideal para mis estudiantes.

Estructura requerida:
1. TÍTULO DEL VIDEO (Llamativo)
2. GANCHO VISUAL (Los primeros 15 segundos para captar atención)
3. DESARROLLO (Columna Visual: Describe lo que se muestra en pantalla. Columna Audio: El texto exacto que yo (${docente}) leeré narrado en voz en off para cumplir el objetivo: ${obj}).
4. CIERRE (Llamado a la acción y actividad sugerida).`; break;

            case 4: promptText = `Transformemos el texto académico de mi documento maestro en un formato de consumo auditivo. 
Utilizando TODO el conocimiento de la guía cargada (sin alucinar datos externos), escribe un Libreto Completo para un Podcast educativo conversacional a dos voces (Ejemplo: Un experto y un entrevistador).

El tono debe ser coloquial y muy dinámico, pero asegurando el rigor científico. Haz que el debate entre los locutores resuelva el objetivo pedagógico de la sesión: ${obj}.

*(Nota técnica: Si utilizo explícitamente el botón "Audio Overview" de NotebookLM, este prompt servirá como la configuración u orientador del debate en inglés).*`; break;
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
