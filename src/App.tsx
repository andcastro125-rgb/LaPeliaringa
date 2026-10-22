import { useEffect, useState } from 'react';
import type { ItemCarrito, Kit, Orden, Vista } from './types';
import { KITS } from './data/kits';
import { PAGINAS_INFO } from './data/info';
import { resumenCarrito } from './utils/formato';
import { Encabezado } from './componentes/Encabezado';
import { Inicio } from './componentes/Inicio';
import { Catalogo } from './componentes/Catalogo';
import { DetalleKit } from './componentes/DetalleKit';
import { Pago } from './componentes/Pago';
import { CompraExitosa } from './componentes/CompraExitosa';
import { Explora } from './componentes/Explora';
import { Info } from './componentes/Info';
import { Contacto } from './componentes/Contacto';

const CART_KEY = 'peliaringa-carrito';

// Lee el carrito guardado. Se usa como estado inicial (lazy initializer).
const leerCarrito = (): ItemCarrito[] => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) ?? '[]') as ItemCarrito[];
  } catch {
    return [];
  }
};

export default function App() {
  // ---------- Tema 3: useState (memoria del componente) ----------
  const [vista, setVista] = useState<Vista>('inicio');
  const [kitId, setKitId] = useState<number | null>(null);
  const [carrito, setCarrito] = useState<ItemCarrito[]>(leerCarrito);
  const [orden, setOrden] = useState<Orden | null>(null);

  // ---------- Tema 3: useEffect (efectos secundarios) ----------
  // Cada vez que cambia el carrito, se guarda en localStorage.
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(carrito));
  }, [carrito]);

  // Cada vez que cambia la pantalla, sube al inicio de la página.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [vista]);

  // ---------- Tema 3: eventos (funciones que modifican el estado) ----------
  const irA = (destino: Vista) => setVista(destino);

  const verKit = (id: number) => {
    setKitId(id);
    setVista('detalle');
  };

  const agregarAlCarrito = (kit: Kit, cantidad: number) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === kit.id);
      if (existente) {
        return prev.map((item) =>
          item.id === kit.id ? { ...item, quantity: item.quantity + cantidad } : item,
        );
      }
      return [...prev, { id: kit.id, name: kit.name, price: kit.price, quantity: cantidad }];
    });
  };

  const cambiarCantidad = (id: number, delta: number) => {
    setCarrito((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const confirmarPedido = (nuevaOrden: Orden) => {
    setOrden(nuevaOrden);
    setCarrito([]);
    setVista('exito');
  };

  const totalCarrito = resumenCarrito(carrito).items;

  // ---------- Tema 3: renderizado condicional de pantallas ----------
  return (
    <>
      <Encabezado vista={vista} totalCarrito={totalCarrito} irA={irA} />

      {vista === 'inicio' && <Inicio irA={irA} />}
      {vista === 'kits' && <Catalogo irA={irA} onVerKit={verKit} />}
      {vista === 'detalle' && (
        <DetalleKit kit={KITS.find((k) => k.id === kitId)} irA={irA} onAgregar={agregarAlCarrito} />
      )}
      {vista === 'carrito' && (
        <Pago carrito={carrito} irA={irA} onCambiarCantidad={cambiarCantidad} onConfirmado={confirmarPedido} />
      )}
      {vista === 'exito' && <CompraExitosa orden={orden} irA={irA} />}
      {vista === 'explora' && <Explora irA={irA} />}
      {vista === 'cultura' && <Info pagina={PAGINAS_INFO.cultura} irA={irA} />}
      {vista === 'recomendaciones' && <Info pagina={PAGINAS_INFO.recomendaciones} irA={irA} />}
      {vista === 'uso-kit' && <Info pagina={PAGINAS_INFO['uso-kit']} irA={irA} />}
      {vista === 'contacto' && <Contacto irA={irA} />}

      {(vista === 'inicio' || vista === 'kits') && (
        <footer className="app-footer">
          <p>Proyecto académico · Peliaringa · API integrada para disponibilidad y pedidos de prueba</p>
          <Enlace destino="contacto" irA={irA}>¿Necesitas ayuda?</Enlace>
        </footer>
      )}
    </>
  );
}
