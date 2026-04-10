# Skill: Mantenimiento del Plano Maestro

Este documento define las reglas de oro para actualizar y expandir la plataforma "El Plano del Minimalismo Digital".

## 🏗️ Arquitectura del Sistema
El sitio opera como una **SPA (Single Page Application)** ligera:
- **Navegación**: Gestionada por la función `switchView(viewId)` en `app.js`.
- **Estética**: Basada en una cuadrícula técnica (blueprint) definida en `style.css`.
- **Laboratorios**: Cada sesión usa un sistema de pestañas gestionado por `switchTab(index)`.

## 🛠️ Cómo añadir nuevas Sesiones (II, III, IV)

Para poblar las sesiones pendientes, sigue este protocolo:

### 1. Actualizar el Script (`app.js`)
Añade la lógica de los prompts en la función `generatePrompt()` siguiendo el patrón de la Sesión I.
- **Sesión II**: Foco en Estructura LaTeX.
- **Sesión III**: Foco en Curaduría con NotebookLM.
- **Sesión IV**: Foco en Ecosistemas e Inmersión.

### 2. Actualizar el Contenido (`index.html`)
Busca el contenedor `lab-placeholder` y reemplázalo por la estructura de laboratorio de la nueva sesión (Inputs de parámetros + Tabs de fases).

### 3. Mantener el Formato LaTeX
Cualquier prompt generado debe incluir la **Regla Inquebrantable**:
- Salida exclusiva en código LaTeX compilable.
- Estética en escala de grises.
- Inserción de `\hrule` y tipografía jerárquica.

## 📐 Reglas Estéticas
1. **Colores**: Usar solo la paleta `Stone` (fondos) y `Emerald` (acentos).
2. **Iconos**: Usar Lucide Icons y ejecutar `lucide.createIcons()` tras cualquier cambio en el DOM.
3. **Tipografía técnica**: Mantener el uso de `font-mono` para labels técnicos.

---
*Este skill garantiza la coherencia académica y técnica del proyecto a largo plazo.*
