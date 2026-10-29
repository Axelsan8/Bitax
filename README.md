# ANIMA 0.2 — Red Viva

ANIMA es un prototipo de infraestructura social para conectar personas, capacidades, necesidades, recursos e iniciativas. No es una red social basada en seguidores ni en tiempo de pantalla.

## Estado
Prototipo web móvil (PWA-ready) en fase experimental. Los datos se guardan localmente en el navegador mediante `localStorage`. Todavía no existen cuentas, sincronización entre dispositivos ni comunidad compartida.

## Principios
- Privacidad por defecto y participación voluntaria.
- Ningún perfil se comparte ni se descubre sin activar esa opción.
- Ninguna persona o recurso se incorpora a un proyecto sin consentimiento.
- Sin puntuaciones morales, diagnósticos ni inferencias emocionales.
- HARMONIA ofrece sugerencias explicables, no verdades ni evaluaciones humanas.

## Probar
Abre `index.html` en un navegador moderno o publica el repositorio con GitHub Pages. Para probar en móvil, visita la URL pública de Pages desde Safari/Chrome y añádela a la pantalla de inicio si lo deseas.

## Estructura
- `index.html`: interfaz.
- `styles/main.css`: diseño adaptable.
- `scripts/app.js`: estado local e interacciones.
- `scripts/harmonia.js`: motor experimental de compatibilidad.
- `docs/privacidad.md`: límites y compromisos de privacidad.
- `docs/arquitectura.md`: arquitectura y siguientes etapas.

## Antes de abrir a usuarios reales
Este prototipo no debe usarse para almacenar información sensible. Para habilitar comunidad compartida habrá que implementar autenticación, base de datos, políticas estrictas de acceso por fila (RLS), consentimiento verificable, borrado/exportación de datos y pruebas de seguridad. Nunca colocar claves secretas de servidor en el frontend.

## Licencia
Prototipo de trabajo. Definir licencia antes de distribuir o aceptar contribuciones externas.
