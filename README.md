# Vans Brand Journalism — álbum interactivo

Sitio académico sobre Vans creado con React, Vite, TypeScript y Tailwind CSS.

## Funciones nuevas

- Álbum interactivo con vista ampliada, descripción individual y navegación anterior/siguiente.
- Textos alternativos y pies de foto corregidos para distinguir fachada, exhibición y recorrido de observación.
- Formulario funcional conectado a Formspree mediante `VITE_FORMSPREE_ENDPOINT`.
- Despliegue automático a GitHub Pages mediante `.github/workflows/deploy.yml`.

## Activar el formulario

1. Crea una cuenta gratuita en [Formspree](https://formspree.io/).
2. Crea un formulario nuevo y copia su endpoint, por ejemplo `https://formspree.io/f/abcde123`.
3. En GitHub abre **Settings → Secrets and variables → Actions → Variables**.
4. Crea la variable `VITE_FORMSPREE_ENDPOINT` con ese endpoint.
5. Ejecuta nuevamente el workflow de Pages.

El endpoint se inyecta durante la compilación y las respuestas llegan al correo verificado en Formspree. No se almacenan datos personales en este repositorio.

## Desarrollo local

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

## Producción

```bash
pnpm check
pnpm build
```
