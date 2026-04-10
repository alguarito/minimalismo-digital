#!/bin/bash
cd "$(dirname "$0")"
echo "------------------------------------------------"
echo "🚀 INICIANDO SUBIDA A GITHUB"
echo "------------------------------------------------"
git push -u origin main
echo "------------------------------------------------"
echo "✅ Si no hubo errores, tu código ya está en la nube."
echo "Presiona cualquier tecla para cerrar esta ventana..."
read -n 1
