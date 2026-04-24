# Skill: Motor de Expansión Curricular (Sesiones II, III, IV)

Este documento es una guía técnica y pedagógica para que una Inteligencia Artificial genere nuevos contenidos para la plataforma **"El Plano del Minimalismo Digital"**.

---

## 📋 Fase 1: Cuestionario de Diagnóstico
Antes de generar código, el asistente debe realizar las siguientes preguntas al usuario para cada sesión:

1. **Objetivo Técnico**: ¿Qué herramienta específica se dominará en esta sesión? (Ej: Estructura LaTeX, Curaduría en NotebookLM, Inmersión en IA Gen).
2. **Eje Temático**: ¿Sobre qué contenido específico del currículo de ${Asignatura} se aplicará el laboratorio?
3. **Público Objetivo**: ¿A qué grado o nivel docente está dirigido este contenido específico?

---

## 🏛️ Fase 2: Plantilla de Estructura Visual (HTML)
Al crear una nueva sesión en `index.html`, utiliza este bloque base para mantener la estética:

```html
<div id="lab-content-m[NUMERO]" class="hidden">
    <!-- Manual de la Sesión -->
    <section class="mb-12">
        <div class="bg-white border border-stone-200 p-8 md:p-12 relative overflow-hidden">
            <h3 class="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest mb-4">Manual de Sesión [NUMERO]</h3>
            <h4 class="text-2xl font-bold text-slate-900 mb-6">[TITULO DE LA SESIÓN]</h4>
            <p class="text-slate-600 leading-relaxed mb-8">[EXPLICACIÓN DE LA IMPORTANCIA DE ESTA FASE]</p>
        </div>
    </section>

    <!-- Parámetros -->
    <section class="bg-white p-6 border border-stone-200 shadow-sm mb-8">
        <h2 class="text-sm font-bold mb-4 flex items-center text-slate-800 uppercase tracking-widest">
            <i data-lucide="settings-2" class="w-4 h-4 mr-2 text-emerald-600"></i> Parámetros Técnicos
        </h2>
        <!-- Inputs correspondientes -->
    </section>

    <!-- Tabs y Contenido de Prompts (Seguir el patrón de la Sesión I) -->
</div>
```

---

## 🧠 Fase 3: Lógica Pedagógica (JS)
Para cada sesión, se deben definir 4 fases de "Prompting Encadenado". Utiliza este estándar de rigurosidad:

### Reglas para los Prompts Resultantes:
1. **Fase 1 (Alineación)**: Debe basarse siempre en la normatividad nacional (MEN) o estándares internacionales.
2. **Fase 2 (Estructuración/Diseño)**: Debe enfocarse en la parte técnica (LaTeX, Prompt Engineering avanzado).
3. **Fase 3 (Profundización)**: Debe incluir referentes teóricos (Dussel, Floridi, etc.).
4. **Fase 4 (Meta-Prompt)**: El resultado final debe ser un "Instrucciones del Agente" con el formato: `Nombre, Descripcion, Instrucciones` y la mención obligatoria a la **Base de Conocimiento**.

### Reglas de LaTeX (Fase de Ejecución):
- **Escala de Grises**: Siempre usar `[gray]` en `xcolor`.
- **Estructura Didáctica**: Dividir en *Exploración, Estructuracion, Transferencia y Valoración*.
- **Código Compilable**: Asegurar que sea `\documentclass{article}` y use `geometry`.

---

## 🎨 Fase 4: Sincronización Estética
- **Colores**: Solo usar `emerald-700` para acentos y `stone-50` para fondos de inputs.
- **Iconos**: Referenciar Lucide Icons y asegurar la ejecución de `lucide.createIcons()` en el script.
- **Micro-animaciones**: Usar la clase `.reveal` en cada sección nueva para mantener la fluidez del "Plano".

---
*Este Skill garantiza que el proyecto crezca de forma orgánica sin perder su identidad académica de "Plano Maestro".*
