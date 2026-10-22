import type { Orden, Vista } from '../types';
import { formatearPrecio } from '../utils/formato';
import { Enlace } from './Enlace';

interface CompraExitosaProps {
  orden: Orden | null;
  irA: (vista: Vista) => void;
}

export const CompraExitosa = ({ orden, irA }: CompraExitosaProps) => (
  <main className="confirmation">
    <p className="confirmation-mark" aria-hidden="true">✓</p>
    <p className="eyebrow">Pedido confirmado</p>
    <h1>¡Gracias por celebrar con nosotros!</h1>
    <p>
      {orden
        ? `Recibimos ${orden.items} kit(s) por ${formatearPrecio(orden.total)}. Te contactaremos pronto.`
        : 'Tu pedido ha sido recibido. Te contactaremos pronto.'}
    </p>
    <Enlace destino="inicio" irA={irA} className="button button--primary">Volver al inicio</Enlace>
  </main>
);
