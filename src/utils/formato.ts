import type { ItemCarrito, Orden } from '../types';

export const formatearPrecio = (valor: number): string =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(valor);

export const resumenCarrito = (carrito: ItemCarrito[]): Orden => ({
  items: carrito.reduce((suma, item) => suma + item.quantity, 0),
  total: carrito.reduce((suma, item) => suma + item.price * item.quantity, 0),
});
