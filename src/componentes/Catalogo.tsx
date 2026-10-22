import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import type { EstadoApi, Vista } from '../types';
import { KITS } from '../data/kits';
import { obtenerProductos } from '../services/api';
import { Enlace } from './Enlace';
import { TarjetaKit } from './TarjetaKit';

interface CatalogoProps {
  irA: (vista: Vista) => void;
  onVerKit: (id: number) => void;
}

export const Catalogo = ({ irA, onVerKit }: CatalogoProps) => {
  // Tema 3: useState. Campo de búsqueda controlado.
  const [busqueda, setBusqueda] = useState('');

  // Tema 4: estados de la petición (cargando / ok / error).
  const [estadoApi, setEstadoApi] = useState<EstadoApi>('cargando');
  const [idsDisponibles, setIdsDisponibles] = useState<number[]>([]);

  // Tema 3 + 4: useEffect consulta la API una sola vez al montar el componente ([]).
  useEffect(() => {
    const controlador = new AbortController();

    const sincronizar = async () => {
      try {
        const productos = await obtenerProductos(3, controlador.signal);
        setIdsDisponibles(productos.map((p) => p.id));
        setEstadoApi('ok');
      } catch {
        if (!controlador.signal.aborted) setEstadoApi('error');
      }
    };

    sincronizar();
    // Limpieza: cancela la petición si el usuario sale de la pantalla.
    return () => controlador.abort();
  }, []);

  // Tema 3: lista derivada del estado "busqueda".
  const termino = busqueda.toLowerCase().trim();
  const kitsFiltrados = KITS.filter((kit) =>
    `${kit.name} ${kit.tag} ${kit.description}`.toLowerCase().includes(termino),
  );

  const kitsDisponibles = KITS.filter((kit) => idsDisponibles.includes(kit.apiId)).length;

  const mensajeApi =
    estadoApi === 'cargando'
      ? 'Conectando disponibilidad…'
      : estadoApi === 'ok'
        ? `Disponibilidad sincronizada · ${kitsDisponibles} kits listos para consultar`
        : 'Modo sin conexión: consulta la disponibilidad por nuestros canales.';

  return (
    <main className="catalog-page">
      <Enlace destino="inicio" irA={irA} className="back-link">← Inicio</Enlace>

      <section className="catalog-banner">
        <div className="catalog-intro">
          <p className="eyebrow">Compra fácil y clara</p>
          <h1>Kits para el Carnaval</h1>
          <p>
            Elige el kit que más se adapte a tu plan. Los artículos son propios de Peliaringa y la
            disponibilidad se consulta mediante la API del proyecto.
          </p>
        </div>
        <img src="/Imagenes/kit para el carnaval.png" alt="Composición de accesorios para el Carnaval" />
      </section>

      <div className="catalog-tools">
        <div>
          <label htmlFor="search">Buscar un kit</label>
          <input
            id="search"
            type="search"
            placeholder="Ej. básico o premium..."
            value={busqueda}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setBusqueda(e.target.value)}
          />
        </div>
        <p aria-live="polite">{mensajeApi}</p>
      </div>

      <section className="api-grid" aria-live="polite">
        {/* Tema 3: renderizado condicional + dinámico */}
        {kitsFiltrados.length === 0 ? (
          <p>No encontramos kits con “{busqueda}”.</p>
        ) : (
          kitsFiltrados.map((kit) => (
            <TarjetaKit
              key={kit.id}
              kit={kit}
              disponibilidad={estadoApi}
              disponible={idsDisponibles.includes(kit.apiId)}
              onVer={onVerKit}
            />
          ))
        )}
      </section>
    </main>
  );
};
