# Privacidad y consentimiento — ANIMA 0.2

## Estado actual
Este prototipo almacena el perfil, los registros personales y los proyectos en el almacenamiento local del navegador (`localStorage`). Los datos no se envían a un servidor de ANIMA, pero cualquier persona con acceso al mismo dispositivo y navegador podría verlos. Borrar los datos del navegador puede eliminarlos.

## Compromisos de diseño
1. Perfil privado por defecto.
2. Descubrimiento comunitario solo mediante una acción afirmativa y revocable.
3. Consentimiento separado para mostrar perfil, participar en proyectos y compartir recursos.
4. Ninguna inclusión automática de personas o recursos en equipos.
5. No inferir emociones, diagnosticar ni asignar puntuaciones morales.
6. Minimizar datos y ofrecer exportación y borrado cuando exista backend.

## Antes de un piloto con comunidad
Implementar autenticación segura, RLS por usuario y proyecto, consentimiento con fecha y alcance, revocación, borrado/exportación, controles de abuso, política de retención y pruebas de acceso cruzado. Los registros EMO y notas privadas deben permanecer privados y no alimentar recomendaciones compartidas por defecto.

Este documento describe intención de diseño, no una certificación legal ni una auditoría de seguridad.
