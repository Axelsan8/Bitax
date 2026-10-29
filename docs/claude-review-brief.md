# Brief para revisión externa de ANIMA

Actúa como revisor senior de frontend, seguridad web y arquitectura de producto. Revisa este repositorio sin asumir que las funciones descritas en documentos ya están implementadas.

## Contexto del producto
ANIMA es una infraestructura para conectar capacidades, necesidades, proyectos y comunidades con consentimiento mutuo. No es una red social de seguidores. La privacidad, la autonomía y la transparencia son requisitos de producto.

## Estado real que debes respetar
La app actual es un prototipo HTML/CSS/JavaScript con localStorage. No hay backend, cuentas, sincronización ni red comunitaria real. HARMONIA y el Radar son heurísticas locales. No describas estas funciones como IA avanzada ni como conexiones reales.

## Reglas para revisar
1. Primero inspecciona todo el repositorio y entrega un diagnóstico priorizado (crítico/alto/medio/bajo).
2. Identifica errores reproducibles, problemas de accesibilidad, XSS, pérdida de datos, errores de estado, problemas PWA/offline y fallos de despliegue.
3. No cambies el diseño ni elimines funciones sin justificarlo.
4. No agregues dependencias pagadas ni claves, tokens o secretos.
5. No agregues backend o publicación de datos sin diseño de autorización, RLS y consentimiento explícito.
6. Mantén EMO, notas privadas y pulso personal fuera de cualquier mecanismo de descubrimiento.
7. Para cada cambio, escribe pruebas que fallen antes y pasen después.
8. Trabaja en una rama nueva y entrega un PR con resumen, riesgos, pruebas ejecutadas y limitaciones.
9. No hagas merge ni despliegues sin aprobación humana.

## Entregables
- Informe de revisión con rutas y líneas concretas.
- Lista de defectos con pasos de reproducción.
- Refactorizaciones pequeñas y justificadas.
- Pruebas automatizadas.
- Propuesta de siguientes cambios sin implementarlos si requieren decisiones de producto o infraestructura.

## Criterios de aceptación
La app existente sigue funcionando en móvil; los datos locales no se pierden; no se filtran datos privados; las pruebas pasan; los límites del prototipo siguen claramente visibles.
