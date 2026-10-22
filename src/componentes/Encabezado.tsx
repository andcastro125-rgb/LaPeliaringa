import type { Vista } from '../types';
import { Enlace } from './Enlace';

interface EncabezadoProps {
  vista: Vista;
  totalCarrito: number;
  irA: (vista: Vista) => void;
}

export const Encabezado = ({ vista, totalCarrito, irA }: EncabezadoProps) => (
  <header className="app-header">
    <Enlace destino="inicio" irA={irA} className="brand-image">
      <img src="/Imagenes/logoprincipsl.png" alt="Peliaringa" />
    </Enlace>
    <nav aria-label="Navegación principal">
      <Enlace destino="kits" irA={irA} actual={vista === 'kits' || vista === 'detalle'}>Kits</Enlace>
      <Enlace destino="explora" irA={irA} actual={vista === 'explora'}>Explora</Enlace>
      <Enlace destino="contacto" irA={irA} actual={vista === 'contacto'}>Ayuda</Enlace>
      <Enlace destino="carrito" irA={irA} className="cart-link" actual={vista === 'carrito'}>
        Carrito <span>{totalCarrito}</span>
      </Enlace>
    </nav>
  </header>
);
