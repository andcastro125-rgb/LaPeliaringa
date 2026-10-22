# Peliaringa · Documentación técnica (React + TypeScript)

Interacción Hombre-Máquina · Unidad 2 · Guía práctica Temas 3, 4 y 5

## Propósito
Sitio académico para presentar y simular la compra de kits del Carnaval de Negros y Blancos.
Flujo corto: **Inicio → Kits → Detalle → Carrito → Confirmación**.

## Cómo ejecutarlo
```bash
npm install
npm run dev      # desarrollo en http://localhost:5173
npm run build    # genera la carpeta dist/ (Tema 5)
npm run preview  # prueba local de la versión de producción
```

## Estructura
```
src/
├─ App.tsx                 estado global (vista, carrito, orden) y efectos
├─ main.tsx                punto de entrada
├─ componentes/            Encabezado, Inicio, Catalogo, TarjetaKit, DetalleKit,
│                          Pago, FormularioPago, CompraExitosa, Explora, Info, Contacto, Enlace
├─ data/                   kits.ts (catálogo propio) e info.ts (páginas educativas)
├─ services/api.ts         las 3 llamadas a Fake Store API (GET, GET, POST)
├─ types/index.ts          interfaces TypeScript (Kit, ItemCarrito, Orden, EstadoApi...)
├─ utils/formato.ts        formato de precio y resumen del carrito
└─ estilos/index.css       estilos globales (los mismos del proyecto original en HTML)
```

## Tema 3 · Hooks y estados
**useState** guarda la "memoria" del componente; al cambiar, React vuelve a renderizar.
**useEffect** ejecuta efectos secundarios (peticiones, guardar datos) y se controla con su arreglo de dependencias.

| Dónde | Qué se implementó |
|---|---|
| `App.tsx` | `useState` para `vista`, `kitId`, `carrito`, `orden`. `useEffect([carrito])` guarda en localStorage. `useEffect([vista])` sube al inicio de la página. |
| `Catalogo.tsx` | Búsqueda controlada (`busqueda`), lista filtrada y renderizado condicional ("sin resultados"). |
| `DetalleKit.tsx` | Cantidad controlada, mensaje de confirmación, renderizado condicional si el kit no existe. |
| `FormularioPago.tsx` | **Formulario controlado**: un estado por campo, `onChange`, `onSubmit` con `preventDefault`. |
| `Pago.tsx` | Renderizado condicional (carrito vacío) y de lista (`map` con `key`) con botones +/−. |
| Eventos | `onClick`, `onChange`, `onSubmit` en todos los componentes. |

## Tema 4 · Consumo de API
Archivo `services/api.ts`, con `fetch`, `async/await` y manejo de `response.ok`:

1. `GET /products?limit=3` → `Catalogo.tsx` (disponibilidad de los kits).
2. `GET /products/:id` → `DetalleKit.tsx` (disponibilidad del kit abierto).
3. `POST /carts` → `FormularioPago.tsx` (pedido simulado).

- **Estado de carga:** `EstadoApi = 'cargando' | 'ok' | 'error'` y `enviando` (el botón se bloquea mientras la petición está en curso).
- **Errores:** `try/catch/finally`. Si la API falla se muestra un aviso y la app sigue funcionando.
- **AbortController:** cancela la petición si el usuario sale de la pantalla (limpieza del `useEffect`).
- La API es solo de demostración: los kits visibles son propios de Peliaringa.

## Tema 5 · Despliegue
1. `npm run build` → se crea `dist/` con archivos estáticos optimizados.
2. Subir el repositorio a GitHub (`dist/` y `node_modules/` están en `.gitignore`).
3. En vercel.com → *Add New Project* → importar el repositorio. Vercel detecta Vite automáticamente
   (Build Command: `npm run build`, Output Directory: `dist`).
4. URL pública del proyecto: **(pegar aquí el enlace de Vercel)**

## Cambiar o agregar un kit
En `src/data/kits.ts` agrega un objeto al arreglo `KITS` (`id` único, `apiId` entre 1 y 20, `price` numérico) y guarda la imagen en `public/Imagenes/`.

## Pruebas antes de entregar
1. `npm run dev`, abrir Kits, buscar "premium", abrir el detalle y agregar al carrito.
2. Cambiar cantidades en el carrito y confirmar el formulario con datos válidos.
3. Verificar la pantalla de confirmación y que el contador vuelve a cero.
4. Recargar la página con productos en el carrito: se conservan (localStorage).
5. Desconectar internet: aparece el aviso "Modo sin conexión" y el sitio sigue navegable.
6. `npm run build` sin errores.
