import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import type { EstadoApi, Kit, Vista } from '../types';
import { obtenerProducto } from '../services/api';
import { formatearPrecio } from '../utils/formato';
import { Enlace } from './Enlace';

interface DetalleKitProps {
  kit: Kit | undefined;
  irA: (vista: Vista) => void;
  onAgregar: (kit: Kit, cantidad: number) => void;
}

export const DetalleKit = ({ kit, irA, onAgregar }: DetalleKitProps) => {
  // Tema 3: useState (cantidad controlada, mensaje de confirmación)
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState('');
  // Tema 4: estado de la petición de disponibilidad
  const [disponibilidad, setDisponibilidad] = useState<EstadoApi>('cargando');

  // Tema 3 + 4: useEffect se vuelve a ejecutar cuando cambia el kit mostrado.
  useEffect(() => {
    if (!kit) return;
    const controlador = new AbortController();
    setDisponibilidad('cargando');
    setMensaje('');
    setCantidad(1);

    obtenerProducto(kit.apiId, controlador.signal)
      .then(() => setDisponibilidad('ok'))
      .catch(() => {
        if (!controlador.signal.aborted) setDisponibilidad('error');
      });

    return () => controlador.abort();
  }, [kit]);

  // Tema 3: renderizado condicional (kit inexistente)
  if (!kit) {
    return (
      <main className="detail-page">
        <Enlace destino="kits" irA={irA} className="back-link">← Seguir explorando</Enlace>
        <p className="api-error">No encontramos este kit. Regresa al catálogo para elegir una opción.</p>
      </main>
    );
  }

  const manejarCantidad = (e: ChangeEvent<HTMLInputElement>) => {
    const numero = Number(e.target.value) || 1;
    setCantidad(Math.min(10, Math.max(1, numero)));
  };

  const agregar = () => {
    onAgregar(kit, cantidad);
    setMensaje('Kit agregado. Puedes revisar el carrito cuando quieras.');
  };

  const textoDisponibilidad =
    disponibilidad === 'cargando'
      ? 'Verificando disponibilidad…'
      : disponibilidad === 'ok'
        ? 'Disponible'
        : 'Consulta disponibilidad';

  return (
    <main className="detail-page">
      <Enlace destino="kits" irA={irA} className="back-link">← Seguir explorando</Enlace>
      <section className="api-detail" aria-live="polite">
        <img className="kit-detail__image" src={kit.image} alt={`${kit.name} de Peliaringa`} />
        <div>
          <p className="category">{kit.tag}</p>
          <h1>{kit.name}</h1>
          <p className="api-price">{formatearPrecio(kit.price)}</p>
          <p>{kit.description}</p>
          <h2>Incluye</h2>
          <ul className="kit-includes">
            {kit.includes.map((elemento) => (
              <li key={elemento}>{elemento}</li>
            ))}
          </ul>
          <p className="availability">{textoDisponibilidad}</p>
          <label htmlFor="quantity">Cantidad</label>
          <div className="buy-row">
            <input id="quantity" type="number" min={1} max={10} value={cantidad} onChange={manejarCantidad} />
            <button className="button button--primary" type="button" onClick={agregar}>
              Agregar al carrito
            </button>
          </div>
          <p className="feedback" aria-live="polite">{mensaje}</p>
        </div>
      </section>
    </main>
  );
};
