import type { EstadoApi, Kit } from '../types';
import { formatearPrecio } from '../utils/formato';

interface TarjetaKitProps {
  kit: Kit;
  disponibilidad: EstadoApi;
  disponible: boolean;
  onVer: (id: number) => void;
}

// Componente de presentación: recibe todo por props (Tema 2).
export const TarjetaKit = ({ kit, disponibilidad, disponible, onVer }: TarjetaKitProps) => {
  // Tema 3: renderizado condicional del texto de disponibilidad.
  const textoDisponibilidad =
    disponibilidad === 'cargando'
      ? 'Verificando…'
      : disponibilidad === 'ok' && disponible
        ? 'Disponible'
        : 'Consultar disponibilidad';

  return (
    <article className="kit-card">
      <img className="kit-card__image" src={kit.image} alt={`${kit.name} de Peliaringa`} />
      <p className="category">{kit.tag}</p>
      <h2>{kit.name}</h2>
      <p>{kit.description}</p>
      <p className="availability">{textoDisponibilidad}</p>
      <p className="api-price">{formatearPrecio(kit.price)}</p>
      <a
        className="button button--small"
        href="#detalle"
        onClick={(e) => {
          e.preventDefault();
          onVer(kit.id);
        }}
      >
        Ver kit
      </a>
    </article>
  );
};
