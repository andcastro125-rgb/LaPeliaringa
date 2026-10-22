import type { Vista } from '../types';
import { Enlace } from './Enlace';

interface ContactoProps {
  irA: (vista: Vista) => void;
}

const REDES = [
  { clase: 'instagram', icono: '◎', nombre: 'Instagram', dato: '@lapeliaringa', url: 'https://instagram.com/lapeliaringa' },
  { clase: 'facebook', icono: 'f', nombre: 'Facebook', dato: '/peliaringa', url: 'https://facebook.com/peliaringa' },
  { clase: 'whatsapp', icono: '☎', nombre: 'WhatsApp', dato: '300 456 789', url: 'https://wa.me/57300456789' },
  { clase: 'email', icono: '✉', nombre: 'Correo', dato: 'lapeliaringa@gmail.com', url: 'mailto:lapeliaringa@gmail.com' },
];

export const Contacto = ({ irA }: ContactoProps) => (
  <main className="contact-page">
    <Enlace destino="inicio" irA={irA} className="back-link">← Inicio</Enlace>
    <section className="contact-panel">
      <div>
        <p className="eyebrow">Estamos aquí para ayudarte</p>
        <h1>Contáctanos</h1>
        <p>Si tienes dudas sobre los kits o la forma de vivir el Carnaval, escríbenos por el canal que prefieras.</p>
        <address className="social-list">
          {REDES.map((red) => (
            <a key={red.clase} href={red.url} target="_blank" rel="noopener noreferrer">
              <span className={`social-icon social-icon--${red.clase}`} aria-hidden="true">{red.icono}</span>
              {red.nombre} <b>{red.dato}</b>
            </a>
          ))}
        </address>
      </div>
      <img className="contact-character" src="/Imagenes/compras.png" alt="Personaje de Peliaringa" />
    </section>
  </main>
);
