import type { MouseEvent, ReactNode } from 'react';
import type { Vista } from '../types';

interface EnlaceProps {
  destino: Vista;
  irA: (vista: Vista) => void;
  className?: string;
  actual?: boolean;
  children: ReactNode;
}

// Enlace de la SPA: cambia de pantalla sin recargar la página.
export const Enlace = ({ destino, irA, className, actual, children }: EnlaceProps) => {
  const manejarClic = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    irA(destino);
  };
  return (
    <a
      href={`#${destino}`}
      className={className}
      aria-current={actual ? 'page' : undefined}
      onClick={manejarClic}
    >
      {children}
    </a>
  );
};
