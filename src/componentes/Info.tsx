import type { PaginaInfo, Vista } from '../types';
import { Enlace } from './Enlace';

interface InfoProps {
  pagina: PaginaInfo;
  irA: (vista: Vista) => void;
}

// Un solo componente para cultura, recomendaciones y uso del kit (se reutiliza con props).
export const Info = ({ pagina, irA }: InfoProps) => (
  <main className="info-page">
    <Enlace destino="explora" irA={irA} className="back-link">← Explorar</Enlace>
    <section className="info-panel">
      <img src={pagina.imagen} alt={pagina.alt} />
      <div>
        <p className="eyebrow">{pagina.etiqueta}</p>
        <h1>{pagina.titulo}</h1>
        {pagina.texto && <p>{pagina.texto}</p>}
        {pagina.lista && (
          <ol className="recommendation-list">
            {pagina.lista.map((linea) => (
              <li key={linea}>{linea}</li>
            ))}
          </ol>
        )}
        <Enlace destino={pagina.botonDestino} irA={irA} className="button button--primary">
          {pagina.botonTexto}
        </Enlace>
      </div>
    </section>
  </main>
);
