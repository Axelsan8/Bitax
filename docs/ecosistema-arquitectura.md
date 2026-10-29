# ANIMA — Arquitectura del ecosistema

## Propósito
ANIMA es una infraestructura cívica y humana para que personas y comunidades conviertan capacidades, necesidades, intereses e intenciones en colaboraciones consentidas y acciones verificables. No optimiza seguidores, permanencia ni viralidad.

## Mapa del ecosistema
1. **Mi espacio** — identidad elegida, capacidades, intereses, necesidades, disponibilidad y controles de privacidad.
2. **BIO / EMO / OBSERVA / NOUS** — registros voluntarios del cuerpo, estado auto-descrito, atención, ideas y aprendizaje. EMO y notas personales son privados por defecto; nunca se infieren emociones ni diagnósticos.
3. **NEXO** — solicitudes y conexiones mutuas. Una conexión solo se crea tras aceptación explícita de ambas partes.
4. **Radar de posibilidades** — oportunidades explicables basadas en datos autorizados, necesidades cercanas y proyectos abiertos. Mostrar siempre por qué aparece una sugerencia y cómo ocultarla.
5. **HARMONIA** — motor de compatibilidad explicable. Debe mostrar criterios, datos usados, incertidumbre y alternativas; no producir puntuaciones de valor humano.
6. **Jardín de las Posibilidades** — memoria visual del crecimiento, intereses, capacidades, aprendizajes, apoyos y proyectos.
7. **Proyectos vivos** — objetivos, roles, recursos requeridos, tareas, fechas, avances y acuerdos.
8. **Comunidades y territorios** — espacios autónomos con reglas, moderación, administración compartida y portabilidad.
9. **Intercambio y economía solidaria** — registro opcional de aportaciones, intercambios y créditos Good Action. Nunca convertirlos en reputación moral ni permitir comprar visibilidad.
10. **Aprendizaje y cuidado** — talleres, mentorías, prácticas y recursos; no sustituye atención profesional ni servicios de emergencia.
11. **Gobernanza** — consentimiento, transparencia, exportación, eliminación, apelaciones, moderación y auditoría.

## Arquitectura técnica propuesta

### Etapa A — prototipo local
HTML, CSS y JavaScript sin framework, PWA, almacenamiento local. Sin cuentas, sin red social compartida y sin datos sensibles. Exportación/importación local y pruebas automatizadas antes de ampliar.

### Etapa B — comunidad piloto
Frontend web móvil + Supabase (Postgres, Auth, Storage y Realtime en planes disponibles). Separar entornos de desarrollo y producción. Activar RLS en TODAS las tablas antes de exponer datos. Mantener EMO, notas privadas y registros de pulso fuera de consultas públicas. No almacenar claves service_role en el navegador.

Tablas iniciales:
- profiles: id = auth user, alias, bio breve, visibilidad y timestamps.
- capabilities, needs, interests: propietario, texto normalizado, categoría, visibilidad y estado.
- availability: ventanas voluntarias y nivel de precisión.
- projects, project_members, project_needs, tasks: roles y permisos por proyecto.
- connection_requests, connections: estados pending/accepted/declined/blocked; solo mutuo.
- consents: sujeto, propósito, alcance, versión del aviso, fecha y revocación.
- communities, community_members, moderation_actions.
- contributions, good_action_ledger: eventos verificables y reglas públicas; no puntuación de personas.
- audit_events: eventos mínimos de seguridad, sin copiar contenido privado.

### Etapa C — motor HARMONIA
Servicio aislado que compara etiquetas, contexto declarado, disponibilidad y objetivos. Empezar con reglas deterministas y pesos visibles. No enviar notas privadas ni estados emocionales. No usar IA generativa para decidir acceso, confianza o valor de personas. Permitir corregir datos y explicar cada resultado.

### Etapa D — ecosistema abierto
API documentada, exportación JSON/CSV, portabilidad, federación entre comunidades, integraciones opcionales y clientes móviles nativos solo cuando el piloto valide la necesidad.

## Reglas de seguridad no negociables
- Denegar por defecto: RLS, autorización en servidor y pruebas negativas.
- Recoger el mínimo de datos; no pedir fecha de nacimiento, ubicación exacta o datos médicos sin una necesidad demostrada.
- Privacidad granular y revocable por campo/propósito.
- Exportar y borrar cuenta/datos con proceso verificable y plazos claros.
- Bloqueo, denuncia, moderación y prevención de abuso antes de abrir descubrimiento público.
- HTTPS, límites de tasa, validación del lado servidor, protección contra spam y gestión segura de secretos.
- Copias de seguridad y plan de recuperación.
- No publicar datos del usuario por el simple hecho de marcar una intención futura de descubrimiento.

## Plan de entrega

### Sprint 0 — estabilizar
- Validación sintáctica automática y pruebas del motor HARMONIA.
- Corregir el despliegue Pages sin intentar cambiar ajustes administrativos desde CI.
- Mantener prototipo explícitamente local y documentar limitaciones.

### Sprint 1 — experiencia individual
- Editar/eliminar proyectos y registros.
- Exportar/importar respaldo y borrar todos los datos locales.
- Accesibilidad, estados vacíos, validación y manejo de errores.
- Pruebas en Safari iOS y Chrome Android.

### Sprint 2 — piloto privado (12–20 participantes)
- Crear proyecto Supabase y esquema con RLS.
- Login, perfiles opt-in, consentimiento versionado y conexiones mutuas.
- Pruebas de autorización con dos cuentas y pruebas de abuso.
- Piloto por invitación; no indexación pública.

### Sprint 3 — colaboración
- Proyectos con roles, tareas, recursos y aceptación.
- Radar entre participantes que hayan activado descubrimiento.
- Moderación, bloqueo, denuncia y métricas de impacto colectivo.

### Sprint 4 — redes de comunidades
- Espacios autónomos, gobernanza y portabilidad.
- Good Action solo tras definir emisión, caducidad, fraude, disputas y reglas transparentes.
- Evaluación de impacto, seguridad y sostenibilidad.

## Métricas correctas
Colaboraciones aceptadas y completadas, necesidades atendidas, tiempo hasta recibir apoyo, proyectos activados, aprendizajes compartidos, participación sostenible y colaboraciones entre comunidades. No medir éxito por tiempo de pantalla, likes o cantidad de contactos.

## Uso de Claude como segundo revisor
Claude puede revisar módulos, proponer refactorizaciones, escribir pruebas y detectar errores. Debe trabajar sobre una rama separada, recibir arquitectura y criterios de aceptación, y no desplegar ni cambiar secretos/permisos. Todo cambio se revisa con pruebas, diff y revisión humana. Ningún modelo garantiza ausencia de errores.
