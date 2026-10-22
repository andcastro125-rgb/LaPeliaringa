import type { Vista } from '../types';
import { Enlace } from './Enlace';

interface InicioProps {
  irA: (vista: Vista) => void;
}

const PASOS = [
  { titulo: 'Elige tu kit', texto: 'Explora opciones, precios y lo que incluye cada kit.' },
  { titulo: 'Revisa tu carrito', texto: 'Cambia cantidades antes de confirmar el pedido.' },
  { titulo: 'Disfruta con cuidado', texto: 'Consulta recomendaciones para el Carnaval.' },
];

export const Inicio = ({ irA }: InicioProps) => (
  <main>
    <section className="welcome welcome--with-image">
      <div>
        <p className="eyebrow">Carnaval de Negros y Blancos</p>
        <h1>Vive el Carnaval<br />con respeto y color.</h1>
        <p>Encuentra kits para celebrar, aprende a usarlos y compra en pocos pasos.</p>
        <div className="action-row">
          <Enlace destino="kits" irA={irA} className="button button--primary">Ver kits</Enlace>
          <Enlace destino="explora" irA={irA} className="text-link">Aprender antes de jugar →</Enlace>
        </div>
      </div>
      <img className="hero-character" src="/Imagenes/compras.png" alt="Personaje Peliaringa con accesorios del Carnaval" />
    </section>

    <section className="quick-guide" aria-labelledby="guia-titulo">
      <h2 id="guia-titulo">Todo claro desde el inicio</h2>
      <div className="guide-grid">
        {/* Tema 3: renderizado dinámico de listas con map y key */}
        {PASOS.map((paso, indice) => (
          <article key={paso.titulo}>
            <span>{indice + 1}</span>
            <h3>{paso.titulo}</h3>
            <p>{paso.texto}</p>
          </article>
        ))}
      </div>
    </section>
  </main>
);
