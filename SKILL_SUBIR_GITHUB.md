# Skill: Sincronización Automática con GitHub

Este Skill permite al asistente de IA gestionar el flujo de versiones del proyecto "El Plano del Minimalismo Digital".

## 🤖 Protocolo para el Asistente IA
Cada vez que se realice un cambio en el código (`index.html`, `app.js`, `style.css`), el asistente debe ejecutar automáticamente:

1.  **Staging**: Preparar los archivos con `git add .`.
2.  **Commit**: Crear un mensaje de commit descriptivo: `git commit -m "Descripción del cambio"`.
3.  **Notificación**: Informar al usuario que los cambios están listos en "rampa de lanzamiento".

## 🚀 Protocolo de Subida (Push)
Debido a que GitHub requiere autenticación personal (Token/Contraseña), el asistente **NO** puede realizar el `push` directamente. En su lugar, debe:
- Instruir al usuario para que haga doble clic en el archivo `SUBIR_A_GITHUB.command` de la carpeta del proyecto.
- Explicar brevemente qué cambios se están subiendo.

## 📝 Ejemplo de uso
*Asistente:* "He actualizado el logo. He dejado listo el commit localmente. Para que estos cambios se vean en tu web pública, por favor ejecuta el archivo `SUBIR_A_GITHUB.command` en tu carpeta."
