import type { Vista } from '../types';
import { Enlace } from './Enlace';

interface ExploraProps {
  irA: (vista: Vista) => void;
}

const TARJETAS: { destino: Vista; imagen: string; alt: string; texto: string }[] = [
  { destino: 'cultura', imagen: '/Imagenes/iformacionculturarl.png', alt: 'Información cultural del Carnaval', texto: 'Información cultural' },
  { destino: 'recomendaciones', imagen: '/Imagenes/recomedaciones.png', alt: 'Recomendaciones para el Carnaval', texto: 'Recomendaciones' },
  { destino: 'uso-kit', imagen: '/Imagenes/uso de kits.png', alt: 'Uso responsable de los kits', texto: 'Uso del kit' },
];

export const Explora = ({ irA }: ExploraProps) => (
  <main className="explore-page">
    <Enlace destino="inicio" irA={irA} className="back-link">← Inicio</Enlace>
    <div className="catalog-intro">
      <p className="eyebrow">Conoce antes de celebrar</p>
      <h1>Explora el Carnaval</h1>
      <p>Información breve y clara para disfrutar una celebración respetuosa.</p>
    </div>
    <section className="explore-grid">
      {TARJETAS.map((t) => (
        <Enlace key={t.destino} destino={t.destino} irA={irA} className="explore-card">
          <img src={t.imagen} alt={t.alt} />
          <span>{t.texto}</span>
        </Enlace>
      ))}
    </section>
  </main>
);
