import type { ItemCarrito, ProductoApi } from '../types';

// Tema 4: aquí vive TODO el consumo de la API (Fake Store API).
const API_URL = 'https://fakestoreapi.com';

async function pedirJson<T>(ruta: string, opciones?: RequestInit): Promise<T> {
  const respuesta = await fetch(`${API_URL}${ruta}`, opciones);
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} en la respuesta del servidor`);
  }
  return (await respuesta.json()) as T;
}

// Llamada 1 (GET): sincroniza disponibilidad del catálogo.
export const obtenerProductos = (limite: number, signal?: AbortSignal) =>
  pedirJson<ProductoApi[]>(`/products?limit=${limite}`, { signal });

// Llamada 2 (GET): valida disponibilidad de un kit en el detalle.
export const obtenerProducto = (id: number, signal?: AbortSignal) =>
  pedirJson<ProductoApi>(`/products/${id}`, { signal });

// Llamada 3 (POST): registra un pedido simulado.
export const registrarPedido = (carrito: ItemCarrito[]) =>
  pedirJson<unknown>('/carts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: 1,
      date: new Date().toISOString().slice(0, 10),
      products: carrito.map((item) => ({ productId: item.id, quantity: item.quantity })),
    }),
  });
