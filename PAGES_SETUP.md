# Activación del sitio

## GitHub Pages

En el repositorio nuevo abre:

<https://github.com/25023307-crear/vans-brand-journalism-interactive/settings/pages>

En **Build and deployment → Source**, selecciona **GitHub Actions**. No selecciones `Deploy from a branch`, porque el proyecto necesita compilarse antes de publicarse.

Después abre **Actions**, ejecuta **Deploy to GitHub Pages** con **Run workflow** y espera a que `build` y `deploy` terminen en verde.

La URL resultante será:

<https://25023307-crear.github.io/vans-brand-journalism-interactive/>

## Formulario

El formulario está preparado para enviar respuestas reales a Formspree:

1. Crea un formulario en <https://formspree.io/>.
2. Copia el endpoint que te asignen.
3. En **Settings → Secrets and variables → Actions → Variables**, crea `VITE_FORMSPREE_ENDPOINT` con el endpoint completo.
4. Ejecuta de nuevo el workflow.

El archivo `.env.example` documenta el valor esperado. Mientras no se configure el endpoint, el formulario muestra un aviso claro y no finge registrar la respuesta.

## Álbum

La sección **Registro visual / visita del estudiante** ahora incluye:

- Tres descripciones corregidas y específicas.
- Texto alternativo detallado para accesibilidad.
- Apertura en pantalla completa.
- Navegación anterior/siguiente.
- Cierre al pulsar el botón o el fondo oscuro.
