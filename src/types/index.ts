// Tipos compartidos de todo el proyecto.

export interface Kit {
  id: number;
  apiId: number; // producto de Fake Store API usado para validar disponibilidad
  name: string;
  price: number;
  tag: string;
  image: string;
  description: string;
  includes: string[];
}

export interface ItemCarrito {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Orden {
  items: number;
  total: number;
}

export interface ProductoApi {
  id: number;
  title: string;
  price: number;
}

// Estado de una petición a la API (Tema 4).
export type EstadoApi = 'cargando' | 'ok' | 'error';

// Pantallas de la aplicación (SPA sin recargar la página).
export type Vista =
  | 'inicio'
  | 'kits'
  | 'detalle'
  | 'carrito'
  | 'exito'
  | 'explora'
  | 'cultura'
  | 'recomendaciones'
  | 'uso-kit'
  | 'contacto';

export interface PaginaInfo {
  imagen: string;
  alt: string;
  etiqueta: string;
  titulo: string;
  texto?: string;
  lista?: string[];
  botonTexto: string;
  botonDestino: Vista;
}
