# Arquitectura — ANIMA 0.2

## Prototipo actual
- Frontend: HTML, CSS y JavaScript sin framework.
- Persistencia: localStorage del navegador.
- Motor HARMONIA: heurística determinista y explicable de coincidencia literal.
- Despliegue previsto: GitHub Pages (sitio estático).

## Modelo conceptual
- Person: identidad pública mínima y preferencias de visibilidad.
- Need: necesidad expresada por una persona o iniciativa.
- Resource: recurso compartible con autorización explícita.
- Proposal: propuesta de colaboración.
- Team: grupo aceptado por cada participante.
- Project: objetivo, tareas, acuerdos y resultados.
- Contribution: aportación voluntaria y reconocida sin ranking moral.
- Consent: alcance, estado, fecha y revocación.

## Próximas etapas
1. 0.2: interfaz local, perfiles, pulso privado, proyectos y afinidad experimental.
2. 0.3: backend, autenticación y comunidad compartida.
3. 0.4: equipos, invitaciones y consentimiento granular.
4. 0.5: memoria colectiva, tareas y resultados.
5. 0.6: créditos internos de contribución, sin valor monetario ni clasificación moral.

## Backend futuro
Supabase puede servir para Auth y Postgres. Activar RLS en todas las tablas; denegar por defecto; separar tablas privadas de datos públicos; comprobar pertenencia al proyecto y consentimiento vigente en cada operación. La clave service-role nunca debe estar en código cliente. Las claves públicas solo son seguras con políticas RLS correctas.

## HARMONIA
La versión actual calcula cobertura literal de necesidades (70%), intereses coincidentes (20%) y disponibilidad idéntica (10%). Es una demostración, no IA ni medida científica de compatibilidad. La evolución debe explicar cada sugerencia y permitir corregirla o descartarla.
